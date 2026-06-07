/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Service } from "./types";

// --- RUSSIAN VERSION ---

export const projectsDataRU: Project[] = [
  {
    id: "project-1",
    title: "AI CRM для риелторов",
    description: "CRM-система, созданная для автоматизации рутины риелторов. Использует встроенный ИИ для мгновенной обработки входящих заявок, глубокого скоринга клиентов и сопровождения сделок для резкого увеличения конверсии.",
    longDescription: "Высоконагруженное решение для агентств недвижимости. Интеграция больших языковых моделей позволяет автоматически извлекать данные из переписок, формировать точные карточки объектов недвижимости, распределять лиды по свободным агентам и подсказывать лучшие тактики продаж.",
    url: "https://vistarealai.web-a.ru/",
    tags: ["AI CRM", "PropTech", "Sales Automation"],
    techStack: ["React.js", "Express.js", "Node.js", "MongoDB", "OpenAI SDK", "Tailwind CSS"]
  },
  {
    id: "project-2",
    title: "AI Content Maker",
    description: "Многофункциональная платформа для автоматической генерации маркетингового и медиа-контента. Адаптирована под задачи блогеров, авторов соцсетей и продвинутых SMM-агентств.",
    longDescription: "Сервис конструирования текстов, способный выдерживать заданный Tone of Voice (голос бренда). ИИ автоматически формулирует публикации, пишет SEO-оптимизированные лонгриды, планирует посты для Telegram, VK и Instagram, снижая расходы на контент-маркетинг на 70%.",
    url: "https://ai-content-maker.web-a.ru/",
    tags: ["Generative AI", "Content Tech", "SaaS"],
    techStack: ["React.js", "Vite", "FastAPI", "Anthropic Claude API", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "project-3",
    title: "AI Museum (RAG система)",
    description: "Интерактивный цифровой музей, демонстрирующий возможности связки ИИ и семантического поиска. Использует технологию RAG (Retrieval-Augmented Generation) для получения достоверных ответов.",
    longDescription: "Информационно-образовательный проект на базе локальной базы знаний. RAG-архитектура подключается к архивным историческим документам, позволяя виртуальному экскурсоводу цитировать подлинные летописи и исключать дезинформацию (галлюцинации LLM).",
    url: "http://sovauto.su/",
    tags: ["RAG System", "Semantic Search", "EdTech"],
    techStack: ["React.js", "LangChain", "Vector Search (Chroma)", "Gemini SDK", "WebSockets", "Tailwind CSS"]
  }
];

export const servicesDataRU: Service[] = [
  {
    id: "service-1",
    title: "AI CRM системы",
    description: "Разработка интеллектуальных панелей управления продажами. Автоматизация скоринга, распределения лидов, парсинга сообщений и авто-заполнения сделок.",
    iconName: "LayoutDashboard",
    features: [
      "Автоматическое вычленение требований из хаоса переписок",
      "Умное тегирование и ИИ-аналитика эффективности воронки",
      "Глубокие интеграции с мессенджерами и телефонией"
    ]
  },
  {
    id: "service-2",
    title: "AI контент-платформы",
    description: "Создание адаптированных под ваш бренд генераторов постов, блогов, товарных описаний, рекламных креативов и писем.",
    iconName: "PenTool",
    features: [
      "Кастомная настройка Tone of Voice и целевой аудитории",
      "Пакетная генерация на месяц вперед по одному запросу",
      "Умный ИИ-редактор с поддержкой SEO оптимизации"
    ]
  },
  {
    id: "service-3",
    title: "RAG-системы и Базы Знаний",
    description: "Создание внутренних ИИ-ассистентов для сотрудников или клиентов, которые ищут информацию по вашим документам, регламентам, PDF-файлам и вики.",
    iconName: "Database",
    features: [
      "Семантический поиск точных предложений с ссылками на источник",
      "Нулевое галлюцинирование ИИ благодаря контекстным рамкам",
      "Сверхбыстрая индексация новых версий инструкций"
    ]
  },
  {
    id: "service-4",
    title: "Web-приложения под бизнес-задачи",
    description: "Проектирование и запуск индивидуальных веб-сервисов любой сложности с продуманным интерфейсом (UX) и высокой адаптивной отзывчивостью.",
    iconName: "Cpu",
    features: [
      "Быстрый и чистый фронтенд на React / Next.js / Vite",
      "Отказоустойчивое серверное NodeJS/Python API под нагрузки",
      "Поддержка реалтайм протоколов связи и защищенных сессий"
    ]
  },
  {
    id: "service-5",
    title: "Интеграция LLM / OpenAI",
    description: "Качественное бесшовное встраивание ИИ-модулей в уже существующую ИТ-инфраструктуру, сайты, CRM или Telegram-боты.",
    iconName: "Zap",
    features: [
      "Оптимальный выбор поставщиков API (Gemini, Claude, Llama)",
      "Тонкая инженерия промптов (Prompt Engineering) и цепочек вызовов",
      "Оптимизация потребления токенов для снижения расходов"
    ]
  },
  {
    id: "service-6",
    title: "MVP и стартап-решения под ключ",
    description: "Помощь проектам на ранних стадиях: быстрая сборка первого рабочего прототипа для валидации гипотез и демонстрации инвесторам.",
    iconName: "Rocket",
    features: [
      "Фокус только на критически важных функциях (Core Value)",
      "Запуск первой версии в течение 10–14 дней",
      "Чистая расширяемая архитектура, готовая к росту и масштабированию"
    ]
  }
];

export const reasonsDataRU = [
  {
    title: "Быстрая разработка MVP",
    description: "Используем передовые фреймворки и шаблоны для сборки первого работающего прототипа бизнеса в рекордные сроки. Минимизируем время вывода продукта на рынок (Time-to-Market)."
  },
  {
    title: "Опыт ИИ-интеграций",
    description: "Владеем глубокими навыками интеграции языковых моделей, семантического векторного поиска и кастомной отладки промптов. Знаем, как заставить ИИ работать без галлюцинаций."
  },
  {
    title: "Практические рабочие системы",
    description: "Создаем полностью функционирующие продукты с базами данных и бэкенд логикой, а не просто красивые мокапы или презентации. Любая деталь в нашем коде решает конкретную задачу."
  },
  {
    title: "Фокус на бизнес-результат",
    description: "Всегда смотрим на продукт глазами заказчика и его клиентов. Технологии — лишь инструмент для автоматизации, сокращения ФОТ или увеличения объема продаж."
  }
];


// --- ENGLISH VERSION ---

export const projectsDataEN: Project[] = [
  {
    id: "project-1",
    title: "AI CRM for Real Estate Agents",
    description: "A specialized CRM system designed to automate the routine tasks of real estate agents. Uses built-in AI for instant lead processing, deep customer scoring, and transaction assistance to boost conversions.",
    longDescription: "A high-performance solution for real estate agencies. Integration of large language models allows automatic extraction of data from chat flows, creation of precise property sheets, fair distribution of hot leads, and real-time generation of custom selling strategies.",
    url: "https://vistarealai.web-a.ru/",
    tags: ["AI CRM", "PropTech", "Sales Automation"],
    techStack: ["React.js", "Express.js", "Node.js", "MongoDB", "OpenAI SDK", "Tailwind CSS"]
  },
  {
    id: "project-2",
    title: "AI Content Maker",
    description: "A multi-functional copy assistant and campaign generator. Automated creation of blogs, social media posts, and marketing materials for SMM agencies and content managers.",
    longDescription: "A powerful content generator designed to output precise texts in a specific brand voice (Tone of Voice). Automatically designs postings, drafts SEO-optimized articles, maps out publication calendars for Telegram, VK, and Instagram, cutting marketing spend by 70%.",
    url: "https://ai-content-maker.web-a.ru/",
    tags: ["Generative AI", "Content Tech", "SaaS"],
    techStack: ["React.js", "Vite", "FastAPI", "Anthropic Claude API", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "project-3",
    title: "AI Museum (RAG System)",
    description: "An interactive educational digital museum demonstrating advanced semantic search. Implements RAG (Retrieval-Augmented Generation) to deliver highly-factual answers from custom archives.",
    longDescription: "An EdTech demo solution driven by structured local knowledge bases. RAG architecture connects historical archives to the LLM agent, allowing a virtual museum guide to quote direct documents while strictly eliminating false info (hallucinations).",
    url: "http://sovauto.su/",
    tags: ["RAG System", "Semantic Search", "EdTech"],
    techStack: ["React.js", "LangChain", "Vector Search (Chroma)", "Gemini SDK", "WebSockets", "Tailwind CSS"]
  }
];

export const servicesDataEN: Service[] = [
  {
    id: "service-1",
    title: "AI CRM Systems",
    description: "Development of intelligent sales control panels. Automation of user scoring, smart matching, email scraping, and automated pipeline updates.",
    iconName: "LayoutDashboard",
    features: [
      "Extraction of precise requirements from messy user chats",
      "Dynamic tagging and AI-powered conversion funnel analytics",
      "Seamless integrations with telephony and instant messaging apps"
    ]
  },
  {
    id: "service-2",
    title: "AI Content Platforms",
    description: "Tailoring generators for articles, product descriptions, marketing copy, newsletters, and social media posts, matching your brand voice.",
    iconName: "PenTool",
    features: [
      "Custom Tone of Voice and targeted audience alignment",
      "Batch editorial plan generations with single-prompt inputs",
      "Intelligent text editor equipped with real-time SEO scoring"
    ]
  },
  {
    id: "service-3",
    title: "RAG Systems & Knowledge Bases",
    description: "Building proprietary AI assistants that answer employee or client queries strictly based on your inner guides, PDFs, spreadsheets, and wikis.",
    iconName: "Database",
    features: [
      "Semantic search locating precise passages with source links",
      "Zero LLM hallucination thanks to rigorous context boundary routing",
      "Ultra-fast re-indexing of modified regulations or new documents"
    ]
  },
  {
    id: "service-4",
    title: "Web Apps for Business",
    description: "Designing and releasing custom-built web services of any capability, focusing on intuitive UX, smooth layouts, and fast load speeds.",
    iconName: "Cpu",
    features: [
      "Fast and structured user interfaces on React / Next.js / Vite",
      "Resilient, highly available server-side APIs on Node.js / Python",
      "Fully responsive architecture adapting to any device screen"
    ]
  },
  {
    id: "service-5",
    title: "LLM & OpenAI Integration",
    description: "Seamless embedding of AI capabilities into your existing products, CRM pipelines, software dashboards, or automated Telegram bots.",
    iconName: "Zap",
    features: [
      "Optimal API provider selection matching your budget (Gemini, Claude, Llama)",
      "Profound Prompt Engineering and complex LLM chains orchestrations",
      "Token usage optimizations reducing API bills by significant margins"
    ]
  },
  {
    id: "service-6",
    title: "MVP & Startup Solutions",
    description: "Helping early-stage startups design and release functional initial versions of their ideas to validate product-market fit.",
    iconName: "Rocket",
    features: [
      "Laser focus only on the core value elements",
      "Fast-track delivery of initial prototype within 10 to 14 days",
      "Clean, scalable, documented code architecture ready to scale later"
    ]
  }
];

export const reasonsDataEN = [
  {
    title: "Fast-Track MVP Production",
    description: "We employ modern frameworks and pre-built components to assemble a fully operational first version of your application in record time, lowering your Time-to-Market."
  },
  {
    title: "Profound AI Expertise",
    description: "We have proven skills building with LLMs, semantic vector search systems, and rigorous prompt architectures. We know how to keep AI reliable and structured."
  },
  {
    title: "Real Practical Architecture",
    description: "We ship complete full-stack web products configured with backend routes and secure databases, not just high-fidelity designs or mock screens."
  },
  {
    title: "Focus on Business Growth",
    description: "We look at every task through the eyes of the Business and its End Users. Technology is a tool for automation, cost reduction, or direct sales multiplication."
  }
];
