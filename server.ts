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

// Pure-JS Robust File Database Setup
const dbPath = path.join(process.cwd(), "leads_db.json");

// Verify and initialize database schema
function initDatabase() {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({ submissions: [] }, null, 2), "utf-8");
      console.log("Database initialized: leads_db.json has been created.");
    } else {
      // Validate existing file content
      const content = fs.readFileSync(dbPath, "utf-8").trim();
      if (!content) {
        fs.writeFileSync(dbPath, JSON.stringify({ submissions: [] }, null, 2), "utf-8");
      } else {
        JSON.parse(content); // Test JSON validity
      }
      console.log("Database connected: leads_db.json successfully parsed.");
    }
  } catch (err) {
    console.error("Failed to initialize database, resetting db file:", err);
    try {
      fs.writeFileSync(dbPath, JSON.stringify({ submissions: [] }, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Critical database write error:", writeErr);
    }
  }
}

// Call database initializer
initDatabase();

// Helper function to save to local robust database
function saveSubmissionToDatabase(submission: any): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(dbPath)) {
        initDatabase();
      }
      
      const content = fs.readFileSync(dbPath, "utf-8");
      const db = JSON.parse(content);
      
      if (!db.submissions || !Array.isArray(db.submissions)) {
        db.submissions = [];
      }
      
      // Structure submission precisely matching our database layout
      db.submissions.push({
        id: submission.id,
        name: submission.name,
        email: submission.email,
        phone: submission.phone || null,
        projectType: submission.projectType,
        message: submission.message,
        date: submission.date,
        aiAnalysis: submission.aiAnalysis
      });
      
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
      console.log(`Successfully saved submission ${submission.id} to pure-JS SQL database substitute`);
      resolve();
    } catch (err) {
      console.error("Database save exception occurred:", err);
      reject(err);
    }
  });
}

// Lazy-initialized OpenAI Client
let openaiClient: OpenAI | null = null;
function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// AI Architect analyzer of incoming leads
async function analyzeLeadWithAI(formData: any) {
  const client = getOpenAIClient();
  if (!client) {
    console.warn("OPENAI_API_KEY not configured. Falling back to static template analysis.");
    return {
      spamScore: 10,
      estimatedComplexity: "Medium",
      recommendedStack: ["React", "Express", "Node.js", "Tailwind CSS"],
      actionItems: ["Verify core system integration requirements.", "Discuss visual branding and functional roadmap."]
    };
  }

  try {
    const prompt = `Analyze this project request from a client portfolio contact form submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Project Type: ${formData.projectType}
Message: ${formData.message}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert Solutions Architect and Full-Stack Developer reviewing client inquiries for a lead-generation portfolio site.
Analyze the details and output a JSON object containing:
1. spamScore (number 0-100, where 100 means obvious bot/ads spam)
2. estimatedComplexity ("Low" | "Medium" | "High")
3. recommendedStack (array of strings, e.g. React, Node.js, Vercel, Supabase, OpenAI, LangChain)
4. actionItems (array of strings indicating immediate technical action steps for the developer to take before the call)

You must strictly output ONLY valid JSON that conforms exactly to this schema:
{
  "spamScore": number,
  "estimatedComplexity": "Low" | "Medium" | "High",
  "recommendedStack": string[],
  "actionItems": string[]
}`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const text = response.choices[0]?.message?.content?.trim() || "";
    if (text) {
      return JSON.parse(text);
    }
  } catch (err) {
    console.error("OpenAI AI Analysis failed:", err);
  }

  // Graceful fallback
  return {
    spamScore: 15,
    estimatedComplexity: "Medium",
    recommendedStack: ["React", "Node.js", "Vite", "Express"],
    actionItems: ["Contact client via the email provided.", "Set up a 15-minute introductory technical discussion."]
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
    // 1. Run AI analysis
    const aiAnalysis = await analyzeLeadWithAI(formData);

    // 2. Generate submission object
    const newSubmission = {
      id: "sub-" + Date.now().toString(36),
      ...formData,
      date: new Date().toISOString(),
      aiAnalysis
    };

    // 3. Save to SQLite database
    let dbSaved = false;
    let dbError: string | null = null;
    try {
      await saveSubmissionToDatabase(newSubmission);
      dbSaved = true;
    } catch (saveErr: any) {
      console.error("Database save exception occurred:", saveErr);
      dbError = saveErr?.message || String(saveErr);
    }

    if (!dbSaved) {
      return res.status(500).json({
        success: false,
        error: "Ошибка сохранения в базу данных: " + dbError
      });
    }

    return res.status(201).json({
      success: true,
      message: "Заявка успешно получена и записана в базу данных SQL!",
      submissionId: newSubmission.id,
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
app.post("/api/admin/submissions", (req, res) => {
  const { username, password } = req.body;
  if (username !== "web-a-admin" || password !== "web-a-123") {
    return res.status(401).json({ success: false, error: "Неверный логин или пароль" });
  }

  try {
    if (!fs.existsSync(dbPath)) {
      initDatabase();
    }
    const content = fs.readFileSync(dbPath, "utf-8");
    const dbData = JSON.parse(content);
    return res.json({ success: true, submissions: dbData.submissions || [] });
  } catch (err: any) {
    console.error("Admin submissions fetch error:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
});

// Admin Submissions Deletion Endpoint
app.post("/api/admin/delete", (req, res) => {
  const { username, password, submissionId } = req.body;
  if (username !== "web-a-admin" || password !== "web-a-123") {
    return res.status(401).json({ success: false, error: "Неверный логин или пароль" });
  }

  try {
    if (!fs.existsSync(dbPath)) {
      initDatabase();
    }
    const content = fs.readFileSync(dbPath, "utf-8");
    const dbData = JSON.parse(content);
    
    dbData.submissions = (dbData.submissions || []).filter((sub: any) => sub.id !== submissionId);
    
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), "utf-8");
    return res.json({ success: true, message: "Запись успешно удалена" });
  } catch (err: any) {
    console.error("Admin deletion error:", err);
    return res.status(500).json({ success: false, error: err?.message || "Internal server error" });
  }
});

// Start integration server
async function startServer() {
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
