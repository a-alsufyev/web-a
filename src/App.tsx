/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  PenTool, 
  Database, 
  Cpu, 
  Zap, 
  Rocket,
  Shield,
  ArrowUpRight,
  Send,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Code2,
  Terminal,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Globe
} from "lucide-react";
import { 
  projectsDataRU, 
  projectsDataEN, 
  servicesDataRU, 
  servicesDataEN, 
  reasonsDataRU, 
  reasonsDataEN 
} from "./data";
import { ContactForm } from "./types";
import { AdminPanel } from "./components/AdminPanel";

const translations = {
  ru: {
    agencySubTitle: "ИТ и ИИ как искусство",
    services: "Услуги",
    portfolio: "Портфолио",
    whyMe: "Преимущества",
    contact: "Контакты",
    submitRequest: "ОСТАВИТЬ ЗАЯВКУ",
    techCompetences: "Разрабатываемые услуги",
    portfolioProjects: "Проекты портфолио",
    whyUs: "Почему мы",
    contactFormTitle: "Форма обратной связи",
    startProject: "Начать проект",
    badgeText: "it-agency.art • ИТ и ИИ как искусство",
    visitorNamePlaceholder: "Введите ваше имя...",
    helloVisitor: "Привет",
    contactWithUs: "Связаться с нами",
    viewPortfolio: "Посмотреть портфолио",
    metrics1Val: "3+",
    metrics1Tag: "Флагманских проекта",
    metrics2Val: "100%",
    metrics2Tag: "Ориентация на MVP",
    metrics3Val: "ИИ",
    metrics3Tag: "Архитектура под ключ",
    servicesPreheading: "Что мы разрабатываем для клиентов",
    servicesHeading: "Спецификация технических компетенций",
    servicesDesc: "Проектирование и разработка под практические бизнес-задачи. Готовые рабочие системы, а не теоретические концепции.",
    advantagesPre: "Преимущества реализации:",
    portfolioPreheading: "Архив лучших работ",
    portfolioHeading: "Ключевые проекты агентства",
    portfolioDesc: "Каждое решение представляет собой полностью развернутое веб-приложение. Работает в проде.",
    techStackTitle: "СТЕК ТЕХНОЛОГИЙ:",
    hideDetails: "Скрыть детали",
    showDetails: "Подробное описание",
    openUrl: "ОТКРЫТЬ",
    hostingStatus: "Состояние хостинга: В сети (Live)",
    whyMePreheading: "Ориентация на развитие и результат",
    whyMeHeading: "Почему с IT-AGENCY.ART выгодно и надежно работать",
    whyMeDesc: "Достижение бизнес-целей требует не просто прагматичного, а эстетически выверенного технического подхода. Мы превращаем разработку ИТ-систем и интеграцию ИИ в настоящее инженерное искусство — создавая быстрые, надежные и изящные решения.",
    cleanCodeWithAI: "Защищенный чистый код с поддержкой от ИИ",
    freeForProjects: "🟢 СВОБОДНЫ ДЛЯ НОВЫХ ПРОЕКТОВ",
    contactHeading: "Связаться прямо сейчас",
    contactDesc: "Оставьте подробную заявку. Серверный ИИ мгновенно оценит архитектуру вашего будущего проекта и сформирует отчет о рекомендуемом стеке.",
    directEmail: "Direct Email",
    telegram: "Telegram",
    privacyHeader: "Условия конфиденциальности",
    privacyDesc: "Ваш email и телефон используются строго для первичной связи. Ваша информация скрыта от третьих лиц благодаря закрытому серверному бэкенду.",
    leadGenSchema: "Блок лидогенерации // lead_gen_schema",
    yourName: "Ваше Имя *",
    namePlaceholder: "Константин",
    emailLabel: "Электронная почта *",
    emailPlaceholder: "client@company.ru",
    phoneLabel: "Телефон (Опционально)",
    phonePlaceholder: "+7 (999) 000-00-00",
    projectTypeLabel: "Тип нужного проекта",
    messageLabel: "Постановка задачи *",
    messagePlaceholder: "Расскажите о ваших целях, необходимых интеграциях и примерных сроках...",
    submitBtn: "ОТПРАВИТЬ ЗАПРОС",
    loadingLogger: "Системный Журнал Заявки",
    loadingStatus: "Идет надежная обработка данных...",
    successTitle: "Заявка принята!",
    successDesc: (email: string) => `Сервер успешно зафиксировал лид в базе данных SQL и сохранил ИИ-анализ для ${email}`,
    aiReportHeader: "🧠 Реалтайм Отчет ИИ-Архитектора",
    leadCode: "Код лида:",
    receiverEmail: "Почта получатель:",
    spamGauge: "Спецификация спама:",
    complexityGauge: "Оценка Сложности:",
    recommendedStack: "Рекомендуемый технологический стек ИИ:",
    actionItemsPlan: "План действий разработки MVP (Action Items):",
    sendAnotherBtn: "ОТПРАВИТЬ ЕЩЕ ОДНУ ЗАЯВКУ",
    errorTitle: "Упс! Произошла ошибка",
    errorDesc: "Не удалось завершить сохранение в базу данных. Пожалуйста, попробуйте еще раз.",
    returnToForm: "ВЕРНУТЬСЯ К ФОРМЕ",
    projectTypes: {
      "ai-crm": "AI CRM для вашего бизнеса",
      "ai-content": "AI контент-платформа / Блоггинг",
      "rag-system": "Индивидуальная RAG-система",
      "other": "Другая веб-разработка под ключ"
    },
    rightsReserved: "© 2026 IT-AGENCY.ART • ИТ и ИИ как искусство • Все права защищены",
    backToTop: "[вверх ↑]",
    steps: [
      "⚡ Инициализация безопасного TLS соединения с сервером...",
      "🔍 Валидация входных данных на стороне клиента...",
      "🧠 Отправка заявки ИИ-аналитику для оценки сложности...",
      "💾 Подключение к локальной базе данных SQL...",
      "📝 Запись лида и результатов анализа в базу данных IT-AGENCY.ART...",
      "🔥 Готово! Заявка успешно сохранена в реляционной БД."
    ],
    requiredFields: {
      name: "Имя обязательно для заполнения",
      email: "Email обязателен для заполнения",
      phone: "Телефон заполнен некорректно",
      message: "Сообщение обязательно для заполнения",
      invalidEmail: "Укажите корректный адрес электронной почты"
    }
  },
  en: {
    agencySubTitle: "IT & AI as an Art Form",
    services: "Services",
    portfolio: "Portfolio",
    whyMe: "Advantages",
    contact: "Contact",
    submitRequest: "SUBMIT REQUEST",
    techCompetences: "Core Competencies",
    portfolioProjects: "Agency Portfolio",
    whyUs: "Why IT-AGENCY.ART",
    contactFormTitle: "Contact Form",
    startProject: "Start Project",
    badgeText: "it-agency.art • IT & AI as Art",
    visitorNamePlaceholder: "Enter your name...",
    helloVisitor: "Hi",
    contactWithUs: "Get in touch",
    viewPortfolio: "View portfolio",
    metrics1Val: "3+",
    metrics1Tag: "Featured Projects",
    metrics2Val: "100%",
    metrics2Tag: "MVP Orientation",
    metrics3Val: "AI",
    metrics3Tag: "Turnkey Architecture",
    servicesPreheading: "What We Develop For Clients",
    servicesHeading: "Technical Specialization Spectrum",
    servicesDesc: "Engineering optimized systems for business challenges. Production-ready solutions instead of raw summaries.",
    advantagesPre: "Implementation Perks:",
    portfolioPreheading: "Featured Case Studies",
    portfolioHeading: "Key Projects Portfolio",
    portfolioDesc: "Each of the listed projects is a fully active web application running live in production.",
    techStackTitle: "TECH STACK:",
    hideDetails: "Hide details",
    showDetails: "Full description",
    openUrl: "OPEN LIVE",
    hostingStatus: "Hosting status: Online (Live)",
    whyMePreheading: "Focus on Growth & Output",
    whyMeHeading: "Why It's Safe & Profitable to Work with IT-AGENCY.ART",
    whyMeDesc: "Achieving product objectives demands more than just pragmatism — it requires cohesive technical elegance. We elevate software development and AI integration into a true digital art form, crafting fast, beautiful, and flawless product architectures.",
    cleanCodeWithAI: "Production-ready code backed by AI feedback",
    freeForProjects: "🟢 OPEN FOR NEW VENTURES",
    contactHeading: "Let's Start Your Project",
    contactDesc: "Send us a detailed request. Our backend intelligence will instantly score your idea's complexity and generate a complete tech stack blueprint.",
    directEmail: "Direct Email",
    telegram: "Telegram",
    privacyHeader: "Data Confidentiality Policy",
    privacyDesc: "Your email and phone numbers are exclusively used for primary contact. Your business details are fully secured behind our closed backend system.",
    leadGenSchema: "Lead Generation Block // lead_gen_schema",
    yourName: "Your Genial Name *",
    namePlaceholder: "Gregory",
    emailLabel: "Email Address *",
    emailPlaceholder: "client@company.com",
    phoneLabel: "Phone Number (Optional)",
    phonePlaceholder: "+1 (555) 000-0000",
    projectTypeLabel: "Required Project Type",
    messageLabel: "Project Brief / Goals *",
    messagePlaceholder: "Tell us about your objectives, desired integrations, and timeline...",
    submitBtn: "SEND PROJECT INQUIRY",
    loadingLogger: "System Deployment Logger",
    loadingStatus: "Processing your request securely...",
    successTitle: "Request Logged!",
    successDesc: (email: string) => `The server successfully recorded the project inquiry in the SQL database for ${email}`,
    aiReportHeader: "🧠 Real-Time AI Architect Assessment",
    leadCode: "Lead Reference:",
    receiverEmail: "Recipient Inbox:",
    spamGauge: "Spam Risk Index:",
    complexityGauge: "Estimated Complexity:",
    recommendedStack: "Recommended AI Solution Tech Stack:",
    actionItemsPlan: "Suggested Actions for MVP Development:",
    sendAnotherBtn: "SEND ANOTHER INQUIRY",
    errorTitle: "Oops! Something went wrong",
    errorDesc: "Could not complete SQL database insertion. Please try again later.",
    returnToForm: "RETURN TO FORM",
    projectTypes: {
      "ai-crm": "AI CRM Custom Setup",
      "ai-content": "AI Content Platform / Blogging",
      "rag-system": "Proprietary RAG System",
      "other": "Custom Full-Stack Web App"
    },
    rightsReserved: "© 2026 IT-AGENCY.ART • IT & AI as Art • All rights reserved",
    backToTop: "[back to top ↑]",
    steps: [
      "⚡ Initializing secure TLS connection with the gateway...",
      "🔍 Reviewing client inputs for syntax accuracy...",
      "🧠 Transferring brief to deep AI analyzer core...",
      "💾 Initializing session with SQLite database instance...",
      "📝 Committing lead data and analysis to IT-AGENCY.ART database tables...",
      "🔥 Success! Lead successfully committed to relational SQL database."
    ],
    requiredFields: {
      name: "Name is required",
      email: "Email is required",
      phone: "Phone consists of invalid symbols",
      message: "Task details are required",
      invalidEmail: "Please input a valid email inbox"
    }
  }
};

export default function App() {
  // Admin Mode State
  const [isAdminMode, setIsAdminMode] = useState(window.location.pathname === "/admin");

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminMode(window.location.pathname === "/admin");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Localization State
  const [lang, setLang] = useState<"ru" | "en">("ru");

  // Navigation & Menu Status
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Greeting Personalized State
  const [visitorName, setVisitorName] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);

  // Expanded Portfolio State
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Form State managers
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    projectType: "ai-crm",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error" >("idle");
  const [submissionProgress, setSubmissionProgress] = useState<string[]>([]);
  const [serverResponse, setServerResponse] = useState<any | null>(null);

  // Bind localized dictionaries
  const t = lang === "ru" ? translations.ru : translations.en;
  const projectsData = lang === "ru" ? projectsDataRU : projectsDataEN;
  const servicesData = lang === "ru" ? servicesDataRU : servicesDataEN;
  const reasonsData = lang === "ru" ? reasonsDataRU : reasonsDataEN;

  // Track active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "portfolio", "why-me", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Dynamic lucide-react icons safely
  const renderServiceIcon = (name: string) => {
    switch (name) {
      case "LayoutDashboard":
        return <LayoutDashboard className="w-6 h-6 text-indigo-400" />;
      case "PenTool":
        return <PenTool className="w-6 h-6 text-purple-400" />;
      case "Database":
        return <Database className="w-6 h-6 text-emerald-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-violet-400" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-400" />;
      case "Rocket":
        return <Rocket className="w-6 h-6 text-rose-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-400" />;
    }
  };

  // Scroll to element smoothly
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Form submission handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = t.requiredFields.name;
    }
    if (!formData.email.trim()) {
      errors.email = t.requiredFields.email;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t.requiredFields.invalidEmail;
    }
    if (!formData.message.trim()) {
      errors.message = t.requiredFields.message;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionStatus("submitting");
    setSubmissionProgress([]);
    setServerResponse(null);

    const stepsList = t.steps;

    for (let i = 0; i < stepsList.length - 1; i++) {
      setSubmissionProgress(prev => [...prev, stepsList[i]]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lang // pass lang context to server if server wants to generate localized email templates
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionProgress(prev => [...prev, stepsList[stepsList.length - 1]]);
        setServerResponse(data);
        setSubmissionStatus("success");
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "ai-crm",
          message: ""
        });
      } else {
        throw new Error(data.error || (lang === "ru" ? "Неизвестная ошибка сервера" : "Unknown server error"));
      }
    } catch (err: any) {
      console.error(err);
      setSubmissionProgress(prev => [...prev, `${lang === "ru" ? "❌ Сбой отправки" : "❌ Dispatched error"}: ${err?.message || "Connection timeout"}`]);
      setSubmissionStatus("error");
    }
  };

  if (isAdminMode) {
    return (
      <AdminPanel 
        lang={lang} 
        onBackToHome={() => {
          setIsAdminMode(false);
          window.history.pushState({}, "", "/");
        }} 
      />
    );
  }

  return (
    <div className="tech-grid min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo("hero")}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center glow-indigo">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-white">it-agency<span className="text-indigo-400 font-normal">.art</span></span>
              <span className="text-[9px] block text-indigo-400/80 font-mono tracking-wider leading-none mt-0.5">// {t.agencySubTitle}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {[
              { id: "services", label: t.services },
              { id: "portfolio", label: t.portfolio },
              { id: "why-me", label: t.whyMe },
              { id: "contact", label: t.contact }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors relative py-1 cursor-pointer ${
                  activeSection === item.id ? "text-indigo-400 font-semibold" : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Action & Language Switch Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setLang("ru")}
                className={`px-2.5 py-1 text-xs font-mono rounded-md font-semibold transition-all cursor-pointer ${
                  lang === "ru"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-mono rounded-md font-semibold transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => scrollTo("contact")}
              className="px-4 py-2 text-xs font-mono tracking-wider font-semibold border border-indigo-500/30 text-indigo-300 bg-indigo-950/20 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 rounded-lg cursor-pointer flex items-center gap-2"
            >
              {t.submitRequest}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburguer and language badge */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Language select icon based on button click */}
            <button
              onClick={() => setLang(prev => (prev === "ru" ? "en" : "ru"))}
              className="px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              {lang.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950 border-b border-slate-900 px-4 pt-2 pb-6 space-y-3 overflow-hidden"
            >
              {[
                { id: "services", label: t.techCompetences },
                { id: "portfolio", label: t.portfolioProjects },
                { id: "why-me", label: t.whyUs },
                { id: "contact", label: t.contactFormTitle }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900/60 hover:text-white transition-all flex items-center justify-between cursor-pointer"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-center rounded-lg text-sm transition-all cursor-pointer"
                >
                  {t.startProject}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow pt-16">
        
        {/* HERO BLOCK */}
        <section id="hero" className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden pt-8 md:pt-16">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
            {/* Engineering pill badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/40 text-[10px] sm:text-xs font-mono text-slate-400"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.badgeText}
            </motion.div>

            {/* Title Display */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none lowercase"
            >
              it-agency<span className="text-indigo-400 font-light">.art</span>
            </motion.h1>

            {/* Elevator pitch */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 font-sans leading-relaxed"
            >
              {lang === "ru" ? (
                <>
                  Проектирование и разработка под ключ <span className="text-indigo-400 font-semibold font-display">AI-решений</span>, автоматизированных <span className="text-indigo-400 font-semibold font-display">CRM-систем</span>, умных контент-генераторов и надежных <span className="text-indigo-400 font-semibold font-display">RAG-продуктов</span> на базе больших языковых моделей.
                </>
              ) : (
                <>
                  Engineering and developing ready-to-run <span className="text-indigo-400 font-semibold font-display">AI Solutions</span>, automated <span className="text-indigo-400 font-semibold font-display">CRM architectures</span>, generative publishing apps, and resilient <span className="text-indigo-400 font-semibold font-display">RAG networks</span> powered by LLMs.
                </>
              )}
            </motion.p>

            {/* Greeting Interactive Widget */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xs sm:max-w-sm mx-auto bg-slate-900/30 p-2 rounded-xl border border-slate-900/50 flex gap-2 items-center text-xs text-slate-400 group"
            >
              <div className="flex-grow pl-2 flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <input
                  type="text"
                  placeholder={t.visitorNamePlaceholder}
                  value={visitorName}
                  onChange={(e) => {
                    setVisitorName(e.target.value);
                    setShowGreeting(e.target.value.trim().length > 0);
                  }}
                  className="bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-600 flex-grow py-1 text-xs"
                />
              </div>
              <AnimatePresence>
                {showGreeting && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-indigo-950 font-medium text-indigo-300 border border-indigo-700/30 px-2.5 py-1 rounded-md"
                  >
                    {t.helloVisitor}, {visitorName}! 👋
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 text-xs sm:text-sm"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 glow-indigo flex items-center justify-center gap-3 group cursor-pointer"
              >
                {t.contactWithUs}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="w-full sm:w-auto px-8 py-4 border border-slate-800 bg-slate-900/20 hover:bg-slate-950 text-slate-300 hover:text-white rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                {t.viewPortfolio}
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-10 grid grid-cols-3 max-w-xl mx-auto gap-4 md:gap-8 border-t border-slate-900/60"
            >
              {[
                { val: t.metrics1Val, tag: t.metrics1Tag },
                { val: t.metrics2Val, tag: t.metrics2Tag },
                { val: t.metrics3Val, tag: t.metrics3Tag }
              ].map((m, idx) => (
                <div key={idx} className="text-center group">
                  <div className="font-display font-medium text-white text-xl sm:text-2xl group-hover:text-indigo-400 transition-colors uppercase">{m.val}</div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 font-mono mt-1 leading-relaxed">{m.tag}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICES / COMPETENCES */}
        <section id="services" className="py-24 px-4 max-w-7xl mx-auto border-t border-slate-900/50">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xs sm:text-xs font-mono tracking-widest text-indigo-400 uppercase">{t.servicesPreheading}</h2>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">{t.servicesHeading}</h3>
            <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">{t.servicesDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-slate-900/20 border border-slate-900 hover:border-indigo-950/40 p-6 sm:p-8 rounded-2xl hover:bg-slate-900/40 transition-all duration-300 flex flex-col justify-between group h-full relative"
              >
                {/* Visual dynamic state background */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/[0.01] blur-xl group-hover:bg-indigo-500/[0.02] transition-colors pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {renderServiceIcon(service.iconName)}
                  </div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">{service.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{service.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900/60 space-y-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">{t.advantagesPre}</div>
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-indigo-400 font-mono mt-0.5">▪</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-24 px-4 bg-slate-900/10 border-t border-slate-900/50">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-2xs sm:text-xs font-mono tracking-widest text-indigo-400 uppercase">{t.portfolioPreheading}</h2>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">{t.portfolioHeading}</h3>
              <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">{t.portfolioDesc}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projectsData.map((project, idx) => {
                const isExpanded = expandedProject === project.id;
                
                return (
                  <motion.div
                    key={project.id}
                    layout="position"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:bg-slate-900/60 transition-all duration-300 relative group overflow-hidden"
                  >
                    
                    {/* Glow effect on hover */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-right from-indigo-500 via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                    <div className="space-y-6">
                      
                      {/* Top banner / tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title & basic info */}
                      <div>
                        <h4 className="font-display text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono tracking-wider mt-1">{project.url}</p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed min-h-[4rem]">
                        {project.description}
                      </p>

                      {/* Technical Stack */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-slate-500 tracking-wider">{t.techStackTitle}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, sIdx) => (
                            <span key={sIdx} className="px-2 py-0.5 rounded-md bg-indigo-950/20 text-indigo-300 text-xs border border-indigo-900/40">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic expanded data panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 border-t border-slate-900 mt-4 overflow-hidden"
                          >
                            <p className="text-xs text-slate-300 leading-relaxed mt-2">{project.longDescription}</p>
                            <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-900 flex items-center gap-2">
                              <span className="w-2 justify-self-start h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                              <span className="text-[10px] text-slate-400 font-mono">{t.hostingStatus}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Action Panel Buttons */}
                    <div className="mt-8 pt-6 border-t border-slate-900/60 flex items-center justify-between gap-4">
                      <button
                        onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                        className="text-xs font-mono text-indigo-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? t.hideDetails : t.showDetails}
                        <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </button>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-xs font-mono text-white bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600 hover:border-indigo-500 rounded-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
                      >
                        {t.openUrl}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* BLOCK "WHY WITH ME" */}
        <section id="why-me" className="py-24 px-4 max-w-7xl mx-auto border-t border-slate-900/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Left intro panel */}
            <div className="space-y-6">
              <h2 className="text-2xs sm:text-xs font-mono tracking-widest text-indigo-400 uppercase">{t.whyMePreheading}</h2>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">{t.whyMeHeading}</h3>
              <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
                {t.whyMeDesc}
              </p>
              <div className="pt-4 flex items-center gap-1.5 text-xs text-indigo-300 font-mono">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>{t.cleanCodeWithAI}</span>
              </div>
            </div>

            {/* Right bullet cards grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasonsData.map((reason, rIdx) => (
                <div key={rIdx} className="bg-slate-900/25 border border-slate-900 p-6 sm:p-8 rounded-2xl hover:bg-slate-900/50 transition-all duration-300 space-y-3 group">
                  <div className="text-[10px] font-mono text-indigo-500 font-bold">0{rIdx + 1} // STACK OPTIMIZED</div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">{reason.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CONTACT SYSTEM */}
        <section id="contact" className="py-24 px-4 bg-slate-900/20 border-t border-slate-900/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left column: Info & Contact cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded bg-indigo-950/40 border border-indigo-900/60 text-indigo-400 font-mono text-xs uppercase tracking-wide">
                  {t.freeForProjects}
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">{t.contactHeading}</h3>
                <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
                  {t.contactDesc}
                </p>
              </div>

              {/* Contacts */}
              <div className="space-y-4 pt-4">
                
                {/* Telegram info option */}
                <div className="bg-slate-900/30 border border-slate-900/80 p-5 rounded-xl flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-indigo-950 border border-indigo-900/40 flex items-center justify-center text-indigo-400">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase">{t.telegram}</div>
                    <a href="https://t.me/alsufyev99" target="_blank" rel="noreferrer" className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                      @alsufyev99
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Privacy block */}
              <div className="p-6 rounded-2xl bg-indigo-950/10 border border-indigo-950/30 space-y-3">
                <div className="text-xs text-indigo-400 font-mono flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  {t.privacyHeader}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.privacyDesc}
                </p>
              </div>
            </div>

            {/* Right column: Interactive Form / AI output log */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/20 border border-slate-900/80 p-6 sm:p-10 rounded-3xl relative overflow-hidden">
                
                {/* Visual header for technical card */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-5 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="font-mono text-2xs sm:text-xs tracking-widest text-slate-400 uppercase">{t.leadGenSchema}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-indigo-400 bg-indigo-950/30 px-2 py-0.5 rounded border border-indigo-900/40">v1.3.0</div>
                </div>

                <AnimatePresence mode="wait">
                  
                  {/* IDLE / FILLING FORM STATE */}
                  {submissionStatus === "idle" && (
                    <motion.form
                      key="contact-form-key"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={submitContactForm}
                      className="space-y-6 animate-fade-in"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label className="text-xs text-slate-400 font-mono uppercase block">{t.yourName}</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t.namePlaceholder}
                            className={`w-full bg-slate-950 border rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:ring-1 transition-all ${
                              formErrors.name ? "border-rose-500/50 focus:ring-rose-500" : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500"
                            }`}
                          />
                          {formErrors.name && <p className="text-xs text-rose-500 font-mono">{formErrors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-xs text-slate-400 font-mono uppercase block">{t.emailLabel}</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t.emailPlaceholder}
                            className={`w-full bg-slate-950 border rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:ring-1 transition-all ${
                              formErrors.email ? "border-rose-500/50 focus:ring-rose-500" : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500"
                            }`}
                          />
                          {formErrors.email && <p className="text-xs text-rose-500 font-mono">{formErrors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="text-xs text-slate-400 font-mono uppercase block">{t.phoneLabel}</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t.phonePlaceholder}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                          />
                        </div>

                        {/* Dropdown project selector */}
                        <div className="space-y-2">
                          <label className="text-xs text-slate-400 font-mono uppercase block">{t.projectTypeLabel}</label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-left transition-all cursor-pointer"
                          >
                            <option value="ai-crm">{t.projectTypes["ai-crm"]}</option>
                            <option value="ai-content">{t.projectTypes["ai-content"]}</option>
                            <option value="rag-system">{t.projectTypes["rag-system"]}</option>
                            <option value="other">{t.projectTypes["other"]}</option>
                          </select>
                        </div>
                      </div>

                      {/* Message body */}
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400 font-mono uppercase block">{t.messageLabel}</label>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t.messagePlaceholder}
                          className={`w-full bg-slate-950 border rounded-xl py-3 px-4 text-sm text-slate-200 focus:outline-none focus:ring-1 transition-all ${
                            formErrors.message ? "border-rose-500/50 focus:ring-rose-500" : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500"
                          }`}
                        />
                        {formErrors.message && <p className="text-xs text-rose-500 font-mono">{formErrors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-3 glow-indigo cursor-pointer group"
                      >
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-200" />
                        {t.submitBtn}
                      </button>
                    </motion.form>
                  )}

                  {/* SUBMITTING STATE WITH LOGGING */}
                  {submissionStatus === "submitting" && (
                    <motion.div
                      key="submitting-log-key"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 font-mono text-[11px] sm:text-xs text-slate-300 space-y-2 h-72 overflow-y-auto">
                        <div className="text-indigo-400 flex items-center gap-2 mb-2 font-bold select-none border-b border-slate-900 pb-1.5 uppercase">
                          <Terminal className="w-4 h-4 animate-spin text-indigo-500" />
                          {t.loadingLogger}
                        </div>
                        {submissionProgress.map((prog, idx) => (
                          <div key={idx} className="fade-in leading-relaxed">
                            {prog}
                          </div>
                        ))}
                      </div>
                      <div className="text-center font-mono text-xs text-slate-500 flex items-center justify-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-600" />
                        {t.loadingStatus}
                      </div>
                    </motion.div>
                  )}

                  {/* SUCCESS REPORT RECEIVED */}
                  {submissionStatus === "success" && (
                    <motion.div
                      key="success-card-key"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2 py-4">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 text-emerald-400">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-2xl text-white">{t.successTitle}</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          {t.successDesc("alsufyev@gmail.com")}
                        </p>
                      </div>

                      {/* Server-returned AI evaluation results panel */}
                      {serverResponse && serverResponse.aiAnalysis && (
                        <div className="p-5 sm:p-6 bg-indigo-950/15 border border-indigo-700/20 rounded-2xl space-y-4">
                          <div className="flex items-center gap-2 border-b border-indigo-900/40 pb-3">
                            <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
                            <h5 className="font-display font-medium text-xs sm:text-sm text-indigo-200 uppercase tracking-widest">
                              {t.aiReportHeader}
                            </h5>
                          </div>

                          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] sm:text-xs">
                            <div className="bg-slate-950/55 p-3 rounded-lg border border-slate-900/80">
                              <span className="text-slate-500 block uppercase text-[9px]">{t.leadCode}</span>
                              <span className="text-white font-bold">{serverResponse.submissionId}</span>
                            </div>
                            <div className="bg-slate-950/55 p-3 rounded-lg border border-slate-900/80">
                              <span className="text-slate-500 block uppercase text-[9px]">{t.receiverEmail}</span>
                              <span className="text-emerald-400 font-bold text-[9px] sm:text-[10px] break-all">{serverResponse.targetEmail}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-950/40 p-3 sm:p-4 rounded-xl border border-slate-900 space-y-1">
                              <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 block uppercase">{t.spamGauge}</span>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${serverResponse.aiAnalysis.spamScore > 50 ? "bg-rose-500" : "bg-emerald-500"}`} />
                                <span className="text-xs text-slate-300 font-mono font-semibold">
                                  {serverResponse.aiAnalysis.spamScore}% ({serverResponse.aiAnalysis.spamScore > 50 ? (lang === "ru" ? "Риск" : "Risk") : (lang === "ru" ? "Низкий риск" : "Low risk")})
                                </span>
                              </div>
                            </div>

                            <div className="bg-slate-950/40 p-3 sm:p-4 rounded-xl border border-slate-900 space-y-1">
                              <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 block uppercase">{t.complexityGauge}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-slate-300 font-mono font-semibold">
                                  {serverResponse.aiAnalysis.estimatedComplexity} {lang === "ru" ? "Приоритет" : "Priority"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 bg-slate-950/30 p-4 rounded-xl border border-slate-900/80">
                            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                              {t.recommendedStack}
                            </span>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {serverResponse.aiAnalysis.recommendedStack?.map((sTech: string, sIdx: number) => (
                                <span key={sIdx} className="px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-300 text-[9px] sm:text-[10px] font-mono border border-indigo-900/30">
                                  {sTech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                              {t.actionItemsPlan}
                            </span>
                            <div className="space-y-1.5">
                              {serverResponse.aiAnalysis.actionItems?.map((act: string, aIdx: number) => (
                                <div key={aIdx} className="flex gap-2 text-xs text-slate-300 leading-relaxed font-sans items-start">
                                  <span className="text-indigo-400 font-mono mt-0.5">↳</span>
                                  <span>{act}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setSubmissionStatus("idle")}
                        className="w-full py-3 border border-slate-800 bg-slate-950/55 hover:bg-slate-900 hover:text-white text-slate-400 text-xs font-mono rounded-xl tracking-wider transition-all cursor-pointer"
                      >
                        {t.sendAnotherBtn}
                      </button>
                    </motion.div>
                  )}

                  {/* ERROR RESCUE STATE */}
                  {submissionStatus === "error" && (
                    <motion.div
                      key="error-card-key"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-2 text-rose-400">
                        <XCircle className="w-8 h-8" />
                      </div>
                      <h4 className="font-display font-bold text-xl text-white">{t.errorTitle}</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        {t.errorDesc}
                      </p>

                      <div className="p-4 bg-rose-950/10 border border-rose-950/30 rounded-xl font-mono text-xs text-rose-300 text-left">
                        {submissionProgress[submissionProgress.length - 1]}
                      </div>

                      <button
                        onClick={() => setSubmissionStatus("idle")}
                        className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {t.returnToForm}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-2xs sm:text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <div className="font-display font-semibold text-slate-300 text-sm">it-agency<span className="text-indigo-400 font-normal">.art</span></div>
            <p className="mt-1">{t.rightsReserved}</p>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:alsufyev@gmail.com" className="hover:text-indigo-400 transition-colors">alsufyev@gmail.com</a>
            <a href="https://t.me/alsufyev99" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Telegram</a>
            <button onClick={() => scrollTo("hero")} className="hover:text-white transition-colors cursor-pointer font-mono">
              {t.backToTop}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
