import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables for production/development
dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing
app.use(express.json());

// SQLite Database Setup with Robust JSON Fallback
const sqliteDbPath = path.join(process.cwd(), "leads_db.sqlite");
const jsonDbPath = path.join(process.cwd(), "leads_db.json");

let sqlite3Pkg: any = null;
let db: any = null;
let useSQLite = false;

// Helper to interact with JSON database fallback
function readJsonDb(): any[] {
  try {
    if (!fs.existsSync(jsonDbPath)) {
      fs.writeFileSync(jsonDbPath, JSON.stringify({ submissions: [] }, null, 2), "utf-8");
      return [];
    }
    const content = fs.readFileSync(jsonDbPath, "utf-8").trim();
    if (!content) return [];
    try {
      const data = JSON.parse(content);
      return Array.isArray(data.submissions) ? data.submissions : [];
    } catch {
      return [];
    }
  } catch (err) {
    console.error("JSON database read exception:", err);
    return [];
  }
}

function writeJsonDb(submissions: any[]) {
  try {
    fs.writeFileSync(jsonDbPath, JSON.stringify({ submissions }, null, 2), "utf-8");
  } catch (err) {
    console.error("JSON database write exception:", err);
  }
}

// Integrated dbRun supporting both SQL and JSON modes
const dbRun = (query: string, params: any[] = []): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (useSQLite && db) {
      db.run(query, params, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      try {
        const qUpper = query.trim().toUpperCase();
        if (qUpper.startsWith("CREATE TABLE")) {
          if (!fs.existsSync(jsonDbPath)) {
            writeJsonDb([]);
          }
          resolve();
        } else if (qUpper.startsWith("INSERT")) {
          const submissions = readJsonDb();
          const newSub = {
            id: params[0],
            name: params[1],
            email: params[2],
            phone: params[3],
            projectType: params[4],
            message: params[5],
            date: params[6],
            aiAnalysis: params[7] ? JSON.parse(params[7]) : null
          };
          // Upsert logic matches SQLite ID uniqueness
          const filtered = submissions.filter((s: any) => s.id !== newSub.id);
          filtered.push(newSub);
          writeJsonDb(filtered);
          resolve();
        } else if (qUpper.startsWith("DELETE")) {
          const submissions = readJsonDb();
          const idToDelete = params[0];
          const filtered = submissions.filter((s: any) => s.id !== idToDelete);
          writeJsonDb(filtered);
          resolve();
        } else {
          reject(new Error("Unsupported local SQL query: " + query));
        }
      } catch (err) {
        reject(err);
      }
    }
  });
};

// Integrated dbAll supporting both SQL and JSON modes
const dbAll = <T = any>(query: string, params: any[] = []): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    if (useSQLite && db) {
      db.all(query, params, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    } else {
      try {
        const qUpper = query.trim().toUpperCase();
        if (qUpper.includes("COUNT(*)")) {
          const submissions = readJsonDb();
          resolve([{ count: submissions.length }] as any);
        } else if (qUpper.includes("SELECT * FROM SUBMISSIONS")) {
          const submissions = readJsonDb();
          // Sort reverse chronological
          const sorted = [...submissions].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
          const rows = sorted.map((s: any) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            phone: s.phone,
            projectType: s.projectType,
            message: s.message,
            date: s.date,
            aiAnalysis: s.aiAnalysis ? JSON.stringify(s.aiAnalysis) : null
          }));
          resolve(rows as any[]);
        } else {
          reject(new Error("Unsupported local SQL query: " + query));
        }
      } catch (err) {
        reject(err);
      }
    }
  });
};

// Database initialization block called during startup (no top-level await!)
async function initializeDatabaseEngine() {
  // Load sqlite3 dynamically inside startup routing to support CommonJS target architecture
  try {
    const sqliteModule = await import("sqlite3");
    sqlite3Pkg = sqliteModule.default || sqliteModule;
    if (sqlite3Pkg) {
      const s3 = sqlite3Pkg.verbose ? sqlite3Pkg.verbose() : sqlite3Pkg;
      await new Promise<void>((resolve) => {
        db = new s3.Database(sqliteDbPath, (err: any) => {
          if (err) {
            console.error("SQLite opening failed. Using local storage fallback. Error:", err);
            resolve();
          } else {
            console.log("Connected to SQLite database: leads_db.sqlite");
            useSQLite = true;
            resolve();
          }
        });
      });
    }
  } catch (err) {
    console.warn("sqlite3 package could not be imported. Falling back to robust local JSON DB:", String(err));
  }

  try {
    await dbRun(`
      CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        projectType TEXT,
        message TEXT NOT NULL,
        date TEXT NOT NULL,
        aiAnalysis TEXT
      )
    `);
    console.log("Database schema initialize check completed.");

    // Migrate old JSON database to SQLite if driver succeeded and SQLite is empty
    if (useSQLite) {
      try {
        const checkCount = await dbAll<{ count: number }>("SELECT COUNT(*) as count FROM submissions");
        const count = checkCount[0]?.count ?? 0;

        const legacyDbPath = path.join(process.cwd(), "leads_db.json");
        if (count === 0 && fs.existsSync(legacyDbPath)) {
          const content = fs.readFileSync(legacyDbPath, "utf-8").trim();
          if (content) {
            const parsed = JSON.parse(content);
            const list = parsed.submissions || [];
            if (list.length > 0) {
              console.log(`Migrating ${list.length} existing submission(s) to SQLite database...`);
              for (const item of list) {
                await dbRun(
                  `INSERT OR REPLACE INTO submissions (id, name, email, phone, projectType, message, date, aiAnalysis)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                  [
                    item.id,
                    item.name,
                    item.email,
                    item.phone || null,
                    item.projectType,
                    item.message,
                    item.date,
                    item.aiAnalysis ? JSON.stringify(item.aiAnalysis) : null
                  ]
                );
              }
              console.log("Data migration to SQLite completed successfully.");
            }
          }
        }
      } catch (migrationErr) {
        console.warn("Could not migrate from JSON to SQLite table:", migrationErr);
      }
    }
  } catch (err) {
    console.error("Failed to initialize database structures:", err);
  }
}

// Local, offline-only privacy-preserving lead analyzer (NO LLM, NO Cloud data export!)
function analyzeLeadOfflineToMaintainPrivacy(formData: any) {
  let spamScore = 0;
  const lowercaseMsg = (formData.message || "").toLowerCase();
  const lowercaseName = (formData.name || "").toLowerCase();

  // Heuristically detect common automated spam keywords
  const spamKeywords = [
    "seo", "crypto", "casino", "poker", "free traffic", "marketing agency", "drugs",
    "viagra", "pills", "earn money", "investment option", "click here", "advertisement"
  ];

  for (const word of spamKeywords) {
    if (lowercaseMsg.includes(word)) {
      spamScore += 25;
    }
  }

  // Links in submission message increase spam risk slightly
  if (/https?:\/\//i.test(formData.message)) {
    spamScore += 30;
  }

  // Name length verification
  if (lowercaseName.length > 50 || lowercaseName.length < 2) {
    spamScore += 15;
  }

  // Cap spamScore at 100
  spamScore = Math.min(spamScore, 100);

  // Estimating project complexity by inquiry depth / message length
  const msgLength = (formData.message || "").length;
  let estimatedComplexity: "Low" | "Medium" | "High" = "Medium";
  if (msgLength < 60) {
    estimatedComplexity = "Low";
  } else if (msgLength > 300) {
    estimatedComplexity = "High";
  }

  // Select suitable tech recommendation based on project type
  let recommendedStack: string[] = ["React", "TypeScript", "Tailwind CSS"];
  const pType = String(formData.projectType || "").toLowerCase();
  
  if (pType.includes("web") || pType.includes("landing")) {
    recommendedStack.push("Express.js", "SQLite", "Vite");
  } else if (pType.includes("mobile") || pType.includes("app")) {
    recommendedStack.push("React Native", "Expo", "SQLite");
  } else if (pType.includes("bot") || pType.includes("telegram") || pType.includes("tg")) {
    recommendedStack.push("Grammy SDK", "Node.js", "SQLite");
  } else if (pType.includes("ai") || pType.includes("rag")) {
    recommendedStack.push("LangChain", "Vector Indexes", "SQLite");
  } else {
    recommendedStack.push("Node.js", "SQLite");
  }

  // Generate robust immediate action steps
  let actionItems: string[] = [
    `Изучить требования проекта по направлению "${formData.projectType}".`,
    "Подготовить предварительный список уточняющих вопросов."
  ];

  if (spamScore > 50) {
    actionItems = [
      "Внимание! Заявка помечена как потенциальный спам. Не переходите по ссылкам.",
      "Рекомендуется связаться с отправителем осторожно."
    ];
  } else {
    if (estimatedComplexity === "High") {
      actionItems.push("Составить черновик технического задания (ТЗ).");
      actionItems.push("Запланировать видео-звонок для детального обсуждения.");
    } else {
      actionItems.push("Подготовить типовое коммерческое предложение.");
    }
  }

  return {
    spamScore,
    estimatedComplexity,
    recommendedStack,
    actionItems
  };
}

// REST API Contact Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;

  // Serverside Validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Поле 'Имя' обязательно для заполнения" });
  }
  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({ error: "Поле 'Email' обязательно для заполнения" });
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Поле 'Сообщение' обязательно для заполнения" });
  }

  const formData = {
    name: name.trim(),
    email: email.trim(),
    phone: phone ? String(phone).trim() : undefined,
    projectType: projectType || "other",
    message: message.trim()
  };

  try {
    // 1. Run local, offline-only privacy-preserving analysis (NO LLM, NO Cloud!)
    const aiAnalysis = analyzeLeadOfflineToMaintainPrivacy(formData);

    // 2. Generate submission object
    const id = "sub-" + Date.now().toString(36);
    const date = new Date().toISOString();

    // 3. Save directly to SQLite database
    let dbSaved = false;
    let dbError: string | null = null;
    try {
      await dbRun(
        `INSERT INTO submissions (id, name, email, phone, projectType, message, date, aiAnalysis)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          formData.name,
          formData.email,
          formData.phone || null,
          formData.projectType,
          formData.message,
          date,
          JSON.stringify(aiAnalysis)
        ]
      );
      dbSaved = true;
      console.log(`Saved submission ${id} successfully into SQLite.`);
    } catch (saveErr: any) {
      console.error("SQLite save exception occurred:", saveErr);
      dbError = saveErr?.message || String(saveErr);
    }

    if (!dbSaved) {
      return res.status(500).json({
        success: false,
        error: "Ошибка сохранения в базу данных SQLite: " + dbError
      });
    }

    return res.status(201).json({
      success: true,
      message: "Заявка успешно получена и записана в локальную базу данных SQLite!",
      submissionId: id,
      dbSaved,
      aiAnalysis,
      error: null
    });
  } catch (err: any) {
    console.error("Endpoint system failure:", err);
    return res.status(500).json({ error: "System error: " + (err?.message || String(err)) });
  }
});

// Admin Authentication & Submissions Fetch Endpoint
app.post("/api/admin/submissions", async (req, res) => {
  const { username, password } = req.body;
  if (username !== "web-a-admin" || password !== "web-a-123") {
    return res.status(401).json({ success: false, error: "Неверный логин или пароль" });
  }

  try {
    const rows = await dbAll("SELECT * FROM submissions ORDER BY date DESC");
    const parsedSubmissions = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      projectType: row.projectType,
      message: row.message,
      date: row.date,
      aiAnalysis: row.aiAnalysis ? JSON.parse(row.aiAnalysis) : null
    }));
    return res.json({ success: true, submissions: parsedSubmissions });
  } catch (err: any) {
    console.error("Admin submissions fetch error from SQLite:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
});

// Admin Submissions Deletion Endpoint
app.post("/api/admin/delete", async (req, res) => {
  const { username, password, submissionId } = req.body;
  if (username !== "web-a-admin" || password !== "web-a-123") {
    return res.status(401).json({ success: false, error: "Неверный логин или пароль" });
  }

  try {
    await dbRun("DELETE FROM submissions WHERE id = ?", [submissionId]);
    return res.json({ success: true, message: "Запись успешно удалена" });
  } catch (err: any) {
    console.error("Admin deletion error in SQLite:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
});

// Start integration server
async function startServer() {
  // Pre-initialize our privacy-preserving SQLite database / JSON fallback engine
  await initializeDatabaseEngine();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack App] Running on http://localhost:${PORT} under NODE_ENV=${process.env.NODE_ENV || 'dev'}`);
  });
}

startServer();
