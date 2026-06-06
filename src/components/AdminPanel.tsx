import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Terminal, 
  Trash2, 
  RefreshCw, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Database,
  Lock,
  LogOut,
  AlertCircle,
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  X,
  FileText
} from "lucide-react";
import { LeadSubmission } from "../types";

// Translation dictionary for Admin Panel
const adminTranslations = {
  ru: {
    adminTitle: "WEB-A Панель Администрирования",
    secureLogin: "Безопасный вход в систему",
    username: "Имя пользователя",
    password: "Пароль",
    loginBtn: "Войти в панель",
    loggingIn: "Проверка подлинности...",
    errorMessage: "Неверные учетные данные или сбой сервера",
    allLeads: "Всего заявок в Базе Данных",
    placeholderSearch: "Поиск по имени, почте или сообщению...",
    projectTypeFilter: "Тип проекта",
    allProjects: "Все типы",
    logout: "Выйти",
    refresh: "Обновить данные",
    noData: "В базе данных пока нет ни одной заявки.",
    colDate: "Дата регистрации",
    colClient: "Клиент",
    colType: "Тип проекта",
    colMessage: "Бриф / Сообщение",
    colAiScore: "Спам ИИ",
    colAiComplexity: "Сложность",
    colActions: "Действия",
    detailTitle: "Детализация заявки",
    closeBtn: "Закрыть",
    spamRating: "Рейтинг спама",
    aiRecStack: "Рекомендованный стек",
    aiActionItems: "Рекомендуемые действия MVP",
    complexity: "Сложность ИИ",
    details: "Подробности заявки",
    confirmDelete: "Удалить лид?",
    confirmDeleteYes: "Да, удалить",
    confirmDeleteCancel: "Отмена",
    goHome: "Вернуться на сайт",
    searching: "Поиск...",
    leadId: "ID Заявки"
  },
  en: {
    adminTitle: "WEB-A Administration Console",
    secureLogin: "Secure System Authentication",
    username: "Username",
    password: "Password",
    loginBtn: "Authenticate Console",
    loggingIn: "Verifying credentials...",
    errorMessage: "Invalid security credentials or server error",
    allLeads: "Total Database Inquiries",
    placeholderSearch: "Search name, email, or brief description...",
    projectTypeFilter: "Project Type",
    allProjects: "All project types",
    logout: "Logout",
    refresh: "Reload Database",
    noData: "No inquiries has been recorded in the database.",
    colDate: "Received Date",
    colClient: "Client Brief",
    colType: "Type",
    colMessage: "Task Brief / Message",
    colAiScore: "Spam Index",
    colAiComplexity: "Complexity",
    colActions: "Actions",
    detailTitle: "Client Inquiry Details",
    closeBtn: "Dismiss",
    spamRating: "AI Spam Analysis",
    aiRecStack: "AI Suggested Stack",
    aiActionItems: "AI Suggested Action Steps",
    complexity: "AI Complexity",
    details: "Inquiry Content",
    confirmDelete: "Delete lead?",
    confirmDeleteYes: "Yes, delete",
    confirmDeleteCancel: "Cancel",
    goHome: "Back to Portfolio",
    searching: "Searching...",
    leadId: "Lead Reference Code"
  }
};

interface AdminPanelProps {
  lang: "ru" | "en";
  onBackToHome: () => void;
}

export function AdminPanel({ lang, onBackToHome }: AdminPanelProps) {
  const t = adminTranslations[lang];

  // Form parameters
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // App state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  // Selection details
  const [selectedSubmission, setSelectedSubmission] = useState<LeadSubmission | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [spamFilter, setSpamFilter] = useState("all");

  // Load session from sessionStorage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("admin_user");
    const storedPass = sessionStorage.getItem("admin_pass");
    if (storedUser && storedPass) {
      setUsername(storedUser);
      setPassword(storedPass);
      fetchSubmissions(storedUser, storedPass);
    }
  }, []);

  const fetchSubmissions = async (user: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmissions(data.submissions || []);
        setIsLoggedIn(true);
        sessionStorage.setItem("admin_user", user);
        sessionStorage.setItem("admin_pass", pass);
      } else {
        setError(data.error || t.errorMessage);
        sessionStorage.removeItem("admin_user");
        sessionStorage.removeItem("admin_pass");
      }
    } catch (err: any) {
      console.error(err);
      setError(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmissions(data.submissions || []);
        setIsLoggedIn(true);
        sessionStorage.setItem("admin_user", username);
        sessionStorage.setItem("admin_pass", password);
      } else {
        setError(data.error || t.errorMessage);
      }
    } catch (err: any) {
      console.error(err);
      setError(t.errorMessage);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    sessionStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_pass");
    onBackToHome();
  };

  const handleDeleteSubmission = async (id: string) => {
    setDeleteLoadingId(id);
    try {
      const response = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, submissionId: id })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
        setConfirmDeleteId(null);
      } else {
        alert(data.error || "Failed to delete item");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occured while deleting");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString(lang === "ru" ? "ru-RU" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Filter list
  const filteredSubmissions = submissions.filter((sub) => {
    // 1. Project type filter
    if (projectFilter !== "all" && sub.projectType !== projectFilter) {
      return false;
    }

    // 2. Spam risk rating filter
    if (spamFilter !== "all") {
      const score = sub.aiAnalysis?.spamScore ?? 0;
      if (spamFilter === "clean" && score > 30) return false;
      if (spamFilter === "suspicious" && (score <= 30 || score > 70)) return false;
      if (spamFilter === "spam" && score <= 70) return false;
    }

    // 3. Search text query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = sub.name.toLowerCase().includes(q);
      const emailMatch = sub.email.toLowerCase().includes(q);
      const phoneMatch = sub.phone ? sub.phone.toLowerCase().includes(q) : false;
      const messageMatch = sub.message.toLowerCase().includes(q);
      const idMatch = sub.id.toLowerCase().includes(q);
      return nameMatch || emailMatch || phoneMatch || messageMatch || idMatch;
    }

    return true;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-indigo-500/30">
        <button 
          onClick={onBackToHome}
          className="absolute top-6 left-6 text-2xs sm:text-xs font-mono text-slate-400 hover:text-indigo-400 flex items-center gap-1.5 transition-all cursor-pointer py-2 px-3 border border-slate-900 bg-slate-900/40 rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.goHome}
        </button>

        <div className="w-full max-w-md bg-slate-900/30 border border-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-indigo-600" />
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-900/40 flex items-center justify-center text-indigo-400 mx-auto">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="font-display font-bold text-lg text-slate-100 tracking-tight">{t.adminTitle}</h1>
            <p className="text-slate-500 text-xs font-mono">// {t.secureLogin}</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-mono uppercase block">{t.username}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                placeholder="web-a-admin"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-mono uppercase block">{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-rose-950/20 border border-rose-950/40 p-3.5 rounded-xl flex items-start gap-2 text-rose-400 font-mono text-xs text-left leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 glow-indigo cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-300" />
                  {t.loggingIn}
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  {t.loginBtn}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center glow-indigo">
                <Database className="w-4 h-4 text-indigo-400" />
              </div>
              <h1 className="font-display font-extrabold text-xl text-slate-100 tracking-tight">{t.adminTitle}</h1>
            </div>
            <p className="text-slate-500 text-xs font-mono">
              🟢 {t.allLeads}: <span className="text-indigo-400 font-bold font-sans">{submissions.length}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => fetchSubmissions(username, password)}
              disabled={loading}
              className="px-4 py-2.5 border border-slate-900 bg-slate-900/30 hover:bg-slate-900 hover:text-white text-slate-400 text-xs font-mono rounded-xl tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 w-1/2 sm:w-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`} />
              {t.refresh}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-300 text-xs font-mono rounded-xl tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer w-1/2 sm:w-auto"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              {t.logout}
            </button>
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="relative md:col-span-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.placeholderSearch}
              className="w-full bg-slate-900/30 border border-slate-900 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-all font-sans"
            />
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="w-full bg-slate-900/30 border border-slate-900 rounded-xl py-3 pl-9 pr-4 text-xs text-slate-400 focus:outline-none focus:border-indigo-500 transition-all cursor-pointer text-left"
              >
                <option value="all">{t.allProjects}</option>
                <option value="ai-crm">AI CRM</option>
                <option value="ai-content">AI Content Platform</option>
                <option value="rag-system">RAG System</option>
                <option value="other">{lang === "ru" ? "Другое" : "Other"}</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <select
                value={spamFilter}
                onChange={(e) => setSpamFilter(e.target.value)}
                className="w-full bg-slate-900/30 border border-slate-900 rounded-xl py-3 pl-9 pr-4 text-xs text-slate-400 focus:outline-none focus:border-indigo-500 transition-all cursor-pointer text-left"
              >
                <option value="all">{lang === "ru" ? "По спаму: Все" : "Spam: All"}</option>
                <option value="clean">{lang === "ru" ? "По спаму: Чистые (<30%)" : "Spam: Safe (<30%)"}</option>
                <option value="suspicious">{lang === "ru" ? "По спаму: Подозрительные" : "Spam: Suspicious"}</option>
                <option value="spam">{lang === "ru" ? "По спаму: Спам (>70%)" : "Spam: High Risk (>70%)"}</option>
              </select>
            </div>
          </div>
        </div>

        {/* WORKSPACE CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* DATABASE TABLE */}
          <div className={`lg:col-span-7 transition-all duration-300 ${selectedSubmission ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <div className="bg-slate-900/10 border border-slate-900/80 rounded-2xl overflow-hidden relative">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-sans text-slate-300">
                  <thead className="bg-slate-950 font-mono text-[10px] text-slate-500 uppercase tracking-wider border-b border-slate-900 select-none">
                    <tr>
                      <th className="py-4 px-5">{t.colDate}</th>
                      <th className="py-4 px-5">{t.colClient}</th>
                      <th className="py-4 px-5">{t.colType}</th>
                      <th className="py-4 px-5">{t.colAiScore}</th>
                      <th className="py-3 px-4 text-center">{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 px-5 text-center text-slate-500 font-mono">
                          {loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
                              <span>{t.searching}</span>
                            </div>
                          ) : (
                            t.noData
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((sub) => {
                        const isSelected = selectedSubmission?.id === sub.id;
                        const spamVal = sub.aiAnalysis?.spamScore ?? 0;
                        const riskColor = spamVal > 70 
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-400" 
                          : spamVal > 30 
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                            
                        return (
                          <tr 
                            key={sub.id}
                            className={`transition-colors duration-200 border-l-[3px] group ${
                              isSelected 
                                ? "bg-indigo-950/10 border-indigo-500 border-l-[3px]" 
                                : "hover:bg-slate-900/30 border-l-transparent"
                            }`}
                          >
                            <td className="py-4 px-5 cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
                                <Calendar className="w-3.5 h-3.5 stroke-1" />
                                <span>{formatDate(sub.date)}</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500 block">ID: {sub.id}</span>
                            </td>

                            <td className="py-4 px-5 cursor-pointer max-w-[180px] truncate" onClick={() => setSelectedSubmission(sub)}>
                              <div className="font-semibold text-slate-100 flex items-center gap-1">
                                <User className="w-3.5 h-3.5 text-indigo-400 stroke-[1.5]" />
                                {sub.name}
                              </div>
                              <div className="text-slate-400 font-mono text-[10px] truncate">{sub.email}</div>
                              {sub.phone && <div className="text-slate-500 font-mono text-[9px]">{sub.phone}</div>}
                            </td>

                            <td className="py-4 px-5 cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                              <span className="px-2 py-0.5 rounded-md bg-indigo-950/40 border border-indigo-900/30 text-[10px] text-indigo-300 font-mono uppercase">
                                {sub.projectType}
                              </span>
                            </td>

                            <td className="py-4 px-5 cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
                              <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-[10px] font-mono rounded-md ${riskColor}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${spamVal > 70 ? "bg-rose-500" : spamVal > 30 ? "bg-amber-500" : "bg-emerald-500"}`} />
                                {spamVal}%
                              </div>
                            </td>

                            <td className="py-4 px-4 text-center">
                              {confirmDeleteId === sub.id ? (
                                <div className="flex items-center justify-center gap-2 font-mono text-[10px]">
                                  <button
                                    onClick={() => handleDeleteSubmission(sub.id)}
                                    disabled={deleteLoadingId === sub.id}
                                    className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                  >
                                    {deleteLoadingId === sub.id ? (
                                      <RefreshCw className="w-3 h-3 animate-spin" />
                                    ) : (
                                      t.confirmDeleteYes
                                    )}
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded transition-all cursor-pointer"
                                  >
                                    {t.confirmDeleteCancel}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDeleteId(sub.id)}
                                  title="Удалить заявку"
                                  className="w-8 h-8 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 flex items-center justify-center transition-all mx-auto cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4 stroke-[1.5]" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* DETAIL DRAWER / SUBMISSION PREVIEW PANEL */}
          {selectedSubmission && (
            <div className="lg:col-span-5 bg-slate-900/30 border border-slate-900 rounded-3xl p-6 relative overflow-hidden space-y-6 animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-indigo-500" />
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="text-left space-y-0.5">
                  <div className="font-mono text-2xs uppercase text-indigo-400 tracking-wider flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    {t.detailTitle}
                  </div>
                  <h4 className="font-display font-extrabold text-base text-white">{selectedSubmission.name}</h4>
                  <p className="text-[10px] font-mono text-slate-500">ID: {selectedSubmission.id}</p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="w-7 h-7 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-500 hover:text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Data body */}
              <div className="text-left space-y-5">
                
                {/* Contact list */}
                <div className="bg-slate-950/60 border border-slate-900/80 p-4 rounded-2xl space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-indigo-400 shrink-0 stroke-[1.5]" />
                    <a href={`mailto:${selectedSubmission.email}`} className="text-indigo-400 hover:underline hover:text-indigo-300 truncate font-semibold">
                      {selectedSubmission.email}
                    </a>
                  </div>
                  {selectedSubmission.phone && (
                    <div className="flex items-center gap-3 border-t border-slate-900/50 pt-2.5">
                      <Phone className="w-4 h-4 text-emerald-400 shrink-0 stroke-[1.5]" />
                      <span className="font-semibold">{selectedSubmission.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 border-t border-slate-900/50 pt-2.5 text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-500 shrink-0 stroke-[1.5]" />
                    <span className="font-normal">{formatDate(selectedSubmission.date)}</span>
                  </div>
                </div>

                {/* Inquiry text body */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{t.details}</span>
                  <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-2xl text-slate-200 text-xs leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap font-sans text-left">
                    {selectedSubmission.message}
                  </div>
                </div>

                {/* AI Assessment results */}
                {selectedSubmission.aiAnalysis && (
                  <div className="space-y-4 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                      <h5 className="font-display font-medium text-xs text-indigo-200 uppercase tracking-wider">
                        🧠 AI ARCHITECT REPORT
                      </h5>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Spam Risk score banner */}
                      <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">{t.spamRating}</span>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedSubmission.aiAnalysis.spamScore > 50 ? "bg-rose-500" : "bg-emerald-500"}`} />
                          <span className="text-[11px] font-extrabold text-slate-300">
                            {selectedSubmission.aiAnalysis.spamScore}%
                          </span>
                        </div>
                      </div>

                      {/* Estimated complexity block */}
                      <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">{t.complexity}</span>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="text-[11px] font-extrabold text-indigo-400">
                            {selectedSubmission.aiAnalysis.estimatedComplexity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SUGGESTED TECH STACK */}
                    <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">
                        {t.aiRecStack}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSubmission.aiAnalysis.recommendedStack?.map((tech: string, tIdx: number) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-300 text-[9px] font-mono border border-indigo-900/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SUGGESTED ACTION ITEMS */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">
                        {t.aiActionItems}
                      </span>
                      <div className="space-y-1.5">
                        {selectedSubmission.aiAnalysis.actionItems?.map((act: string, aIdx: number) => (
                          <div key={aIdx} className="flex gap-2 text-[11px] text-slate-300 leading-relaxed font-sans items-start">
                            <span className="text-indigo-400 font-mono">↳</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
