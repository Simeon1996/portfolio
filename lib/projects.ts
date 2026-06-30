export interface ProjectDetail {
  title: string
  description: string
  preview?: string
  portrait?: boolean
  interval?: number
  demo?: boolean
  stack: string[]
  images: { src: string; caption: string }[]
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  cheatsheet: {
    title: 'Cheatsheet — Reference Manager for Developers',
    description: 'Developer-focused cheatsheet and command reference manager. It lets you organize CLI commands, code snippets, and one-liners into searchable, categorized collections. You get a private workspace to build your personal library (grouped by tool like AWS, Docker, K8s, etc.) and a public explore page for curated community cheatsheets. Commands are syntax-highlighted across multiple languages (Bash, Python, SQL, YAML, HCL, etc.) and copyable with one click.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    preview: 'https://referential-sheet.com',
    images: [
      { src: '/projects/cheatsheet/1.svg', caption: 'Landing Page' },
      { src: '/projects/cheatsheet/2.svg', caption: 'Categories Page' },
      { src: '/projects/cheatsheet/3.svg', caption: 'Snippets in a specific category along all commands' },
      { src: '/projects/cheatsheet/4.svg', caption: 'Login screen' },
      { src: '/projects/cheatsheet/5.svg', caption: 'Personal workspace with its own categories' },
    ],
  },

  // ───────────── AI Agents (live demos) ─────────────
  'customer-support-agent': {
    title: 'Hazel — AI Customer Support Agent',
    preview: 'https://customer-agent-support.vercel.app/',
    demo: true,
    description:
      'An AI support agent that works a shared inbox end to end. Hazel triages incoming conversations, drafts replies grounded in connected systems — Shopify orders, Stripe payments, returns, and a help center — surfaces the exact records behind every answer, and flags the cases that genuinely need a human. Routine tickets get resolved automatically while the team keeps full oversight.',
    stack: ['Next.js', 'TypeScript', 'LangGraph', 'OpenAI', 'PostgreSQL', 'Qdrant'],
    images: [
      { src: '/projects/customer-support-agent/preview.png', caption: 'Shared inbox with grounded, AI-drafted replies' },
    ],
  },
  'ops-agent': {
    title: 'Helix — Internal Knowledge & Ops Assistant',
    preview: 'https://ops-agent-omega.vercel.app/',
    demo: true,
    description:
      'An enterprise knowledge assistant that answers any question about your company by searching across every connected source — Slack, Google Drive, Notion, Confluence, Jira, GitHub, and an SOP library — and citing the exact documents behind each answer. It handles onboarding questions, policy lookups, decision history, and meeting summaries, with a live feed of what the rest of the team is asking.',
    stack: ['Next.js', 'TypeScript', 'LangChain', 'Qdrant', 'OpenAI', 'PostgreSQL'],
    images: [
      { src: '/projects/ops-agent/preview.png', caption: 'Ask-anything home with cited, multi-source answers' },
    ],
  },
  'security-agent': {
    title: 'Warden — AI Agent Governance & Audit',
    preview: 'https://security-agent-chi.vercel.app/',
    demo: true,
    description:
      'A control plane that keeps a fleet of AI agents safe and accountable. Warden enforces live guardrails on every action, redacts PII, gates spend, and routes high-risk steps to human approval — while a flight-recorder audit log captures every decision, verdict, and record. It includes a policy studio for authoring rules and a red-team & evals suite for stress-testing agents before they ship.',
    stack: ['Next.js', 'TypeScript', 'LangGraph', 'PostgreSQL', 'Redis'],
    images: [
      { src: '/projects/security-agent/preview.png', caption: 'Command center — live fleet governance & risk' },
    ],
  },
  'backoffice-agent': {
    title: 'Manila — Back-Office Document Agent',
    preview: 'https://backoffice-agent-dun.vercel.app/',
    demo: true,
    description:
      'An intelligent document desk for the back office. Manila reads everything that lands in the mailroom — invoices, purchase orders, contracts and NDAs, insurance claims, HR forms — classifies and routes each one with a confidence score, auto-files the clear cases, and escalates the rest for human review. It ships with a rulebook, configurable document types, an approvals queue, and throughput analytics.',
    stack: ['Next.js', 'TypeScript', 'LangChain', 'OpenAI', 'PostgreSQL', 'Qdrant'],
    images: [
      { src: '/projects/backoffice-agent/preview.png', caption: 'Document intake — auto-classified and routed' },
    ],
  },

  // ───────────── AI Web Apps (live demos) ─────────────
  'ai-detector': {
    title: 'AI Detector — Was This Written by a Machine?',
    preview: 'https://ai-detector-gules.vercel.app/',
    demo: true,
    description:
      'Paste text, upload a document, or drop in a URL or a whole website, and the detector returns the probability that the content was written by AI. Powered by Claude, it works across plain text, files, and live pages, giving a clear authorship read for educators, publishers, and content teams.',
    stack: ['Next.js', 'TypeScript', 'Claude', 'FastAPI'],
    images: [
      { src: '/projects/ai-detector/preview.png', caption: 'Analyze text, files, URLs, or full websites' },
    ],
  },
  'cv-analyzer': {
    title: 'CV Analyzer — Instant Résumé Feedback',
    preview: 'https://cv-analyzer-wheat-ten.vercel.app/',
    demo: true,
    description:
      'Drop in a CV as a PDF or text file and get instant, detailed feedback scored against industry-leading standards — structure, clarity, impact, keyword coverage, and concrete, actionable suggestions. It gives candidates the kind of review a senior recruiter would, in seconds.',
    stack: ['Next.js', 'TypeScript', 'Claude', 'PostgreSQL'],
    images: [
      { src: '/projects/cv-analyzer/preview.png', caption: 'Upload a CV for instant, standards-based feedback' },
    ],
  },
  'ai-chatbot': {
    title: 'Knowledge-Base Chatbot — Cited RAG',
    preview: 'https://chatbot-zeta-livid-46.vercel.app/',
    demo: true,
    description:
      'A retrieval-augmented chat assistant over your own documents. Pick which sources to search, ask a question in natural language, and get answers that cite the exact documents they came from. It includes multi-conversation history and a managed document store, so every response stays grounded and verifiable.',
    stack: ['Next.js', 'TypeScript', 'LangChain', 'Pinecone', 'OpenAI'],
    images: [
      { src: '/projects/ai-chatbot/preview.png', caption: 'Source-grounded chat with document citations' },
    ],
  },

  // ───────────── AI Engineering & Platforms ─────────────
  'jobs-categorizer': {
    title: 'Global Job Pulse — Job-Market Intelligence',
    preview: 'https://jobs-categorizer.vercel.app/',
    demo: true,
    description:
      'A market-intelligence dashboard that ingests job openings from multiple global sources, normalizes a messy role taxonomy into clean categories, and tracks demand velocity across sectors and regions. It surfaces what is rising, cooling, and shifting right now — with momentum curves, demand leaders, and an automatic cache refresh.',
    stack: ['Next.js', 'TypeScript', 'Python', 'PostgreSQL'],
    images: [
      { src: '/projects/jobs-categorizer/preview.png', caption: 'Worldwide opening intelligence & demand trends' },
    ],
  },
  'email-rag': {
    title: 'High-Traffic Email RAG Engine',
    description:
      'Production RAG pipeline ingesting millions of emails and attachments (PDF, DOCX, XLSX) daily. Hybrid retrieval combines BM25 sparse search via OpenSearch with dense vector search via Qdrant, fused through Reciprocal Rank Fusion. Includes chunking with overlap, per-tenant index isolation, async ingestion queues (Celery/Redis), deduplication, embedding caching, query rewriting, re-ranking with a cross-encoder, and streaming LLM responses — sustaining 10k+ queries/day with p99 latency under 300ms.',
    stack: ['Python', 'OpenSearch', 'Qdrant', 'Celery', 'Redis'],
    images: [
      { src: '/projects/email-rag/ingestion.svg', caption: 'Email & attachment ingestion pipeline' },
      { src: '/projects/email-rag/search.svg', caption: 'Hybrid sparse + dense search interface' },
      { src: '/projects/email-rag/results.svg', caption: 'RRF-fused results with re-ranking' },
    ],
  },
  'langchain-platform': {
    title: 'LangChain AI Application Platform',
    description:
      "A production multi-tenant platform built on LangChain's full stack — LCEL pipelines, ConversationalRetrievalChain, custom tool-calling agents (AgentExecutor), memory backends (ConversationSummaryBufferMemory), and structured output parsers. Integrates LangSmith for tracing and eval, LangServe for one-command API deployment, and LangGraph for stateful multi-step agent workflows. Supports hot-swappable LLM providers, retrieval over 50M+ documents, and per-user session persistence.",
    stack: ['LangChain', 'LangGraph', 'LangSmith', 'Python', 'FastAPI'],
    images: [
      { src: '/projects/langchain-platform/pipeline.svg', caption: 'LCEL pipeline builder' },
      { src: '/projects/langchain-platform/trace.svg', caption: 'LangSmith trace & eval viewer' },
      { src: '/projects/langchain-platform/agent.svg', caption: 'LangGraph agent execution log' },
    ],
  },
  'mcp-platform': {
    title: 'Claude MCP Integration Platform',
    description:
      'Built a suite of production Model Context Protocol (MCP) servers that give Claude structured, permissioned access to internal tools — databases, REST APIs, file systems, and ticketing systems. Implemented custom resource, tool, and prompt primitives with strict input validation, OAuth-scoped auth, and full audit logging. Enabled non-technical teams to interact with live business data through natural language with zero prompt injection surface.',
    stack: ['Python', 'MCP', 'TypeScript', 'FastAPI', 'OAuth'],
    images: [
      { src: '/projects/mcp-platform/registry.svg', caption: 'MCP server registry & status' },
      { src: '/projects/mcp-platform/permissions.svg', caption: 'Tool permission & OAuth controls' },
      { src: '/projects/mcp-platform/chat.svg', caption: 'Natural language query interface' },
    ],
  },

  // ───────────── Web / Full-Stack ─────────────
  'web-templates': {
    title: 'The Template Studio — 30 Client-Ready Templates',
    preview: 'https://web-templates-eight.vercel.app/',
    demo: true,
    description:
      'A working catalogue of 30 complete, multi-page templates — websites and native Android app designs — each with its own typography, colour, and temperament. Every entry opens a live demo you can click through end to end, making it easy for a client to find the world that fits and make it their own.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Jetpack Compose'],
    images: [
      { src: '/projects/web-templates/preview.png', caption: 'Thirty sites, thirty worlds — one studio' },
    ],
  },
  'kameliya-ivanova': {
    title: 'Kameliya Ivanova — Portfolio Site',
    preview: 'https://kameliyaivanova.com/',
    demo: true,
    description:
      'A polished personal portfolio for an AI engineer — an animated hero, work showcase, certifications, skills, and a career timeline, built as a fast, fully responsive single-page experience with a refined dark aesthetic.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    images: [
      { src: '/projects/kameliya-ivanova/preview.png', caption: 'Animated hero — “I build software that scales”' },
    ],
  },
  freelance: {
    title: 'Freelance Web Development',
    interval: 30000,
    description:
      'Delivered 20+ custom websites and client platforms across industries — from e-commerce storefronts and booking systems to internal dashboards and REST APIs. Built with React, Angular, Python (Django/FastAPI), Java (Spring Boot), and vanilla JavaScript. Each engagement covered full-cycle delivery: scoping, architecture, implementation, and handoff.',
    stack: ['React', 'Angular', 'Django', 'Spring Boot', 'TypeScript', 'Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'AWS'],
    images: [
      { src: '/projects/freelance/1.mp4', caption: '' },
      { src: '/projects/freelance/2.mp4', caption: '' },
      { src: '/projects/freelance/4.mp4', caption: '' },
      { src: '/projects/freelance/5.mp4', caption: '' },
      { src: '/projects/freelance/6.mp4', caption: '' },
      { src: '/projects/freelance/7.svg', caption: '' },
      { src: '/projects/freelance/8.svg', caption: '' },
      { src: '/projects/freelance/9.svg', caption: '' },
      { src: '/projects/freelance/10.svg', caption: '' },
      { src: '/projects/freelance/11.mp4', caption: '' },
      { src: '/projects/freelance/12.mp4', caption: '' },
    ],
  },

  // ───────────── AI Web Apps (existing live products) ─────────────
  quizforge: {
    title: 'QuizzYourself — AI Quiz Platform',
    preview: 'https://quizz-yourself.com',
    description:
      'Describe a topic and QuizzYourself generates a full quiz in seconds using LLMs — questions, multiple-choice options, correct answers, and explanations all crafted automatically. Users run quizzes and receive detailed result breakdowns: per-question accuracy, wrong-answer analysis, and knowledge gap insights. Quizzes can be published publicly, kept private, or shared via invite link with specific individuals.',
    stack: ['Angular', 'TypeScript', 'LangChain', 'Python', 'FastAPI'],
    images: [
      { src: '/projects/quizforge/1.svg', caption: '' },
      { src: '/projects/quizforge/2.svg', caption: '' },
      { src: '/projects/quizforge/3.svg', caption: '' },
      { src: '/projects/quizforge/4.svg', caption: '' },
      { src: '/projects/quizforge/5.svg', caption: '' },
      { src: '/projects/quizforge/6.svg', caption: '' },
      { src: '/projects/quizforge/7.svg', caption: '' },
      { src: '/projects/quizforge/8.svg', caption: '' },
      { src: '/projects/quizforge/9.svg', caption: '' },
      { src: '/projects/quizforge/10.svg', caption: '' },
    ],
  },
  cookingintelligence: {
    title: 'CookingIntelligence',
    preview: 'https://cookingintelligence.com',
    description:
      'Describe a dish, dietary preference, or available ingredients and CookingIntelligence generates a complete recipe in seconds using LLMs — ingredients, quantities, steps, and tips included. Recipes can be cooked interactively step-by-step with timers, substitution suggestions, and contextual guidance at each stage. Like QuizzYourself, recipes can be published publicly, kept private, or shared with specific people via invite link.',
    stack: ['Angular', 'TypeScript', 'LangChain', 'Python', 'FastAPI'],
    images: [
      { src: '/projects/cookingintelligence/1.svg', caption: '' },
      { src: '/projects/cookingintelligence/2.svg', caption: '' },
      { src: '/projects/cookingintelligence/3.svg', caption: '' },
      { src: '/projects/cookingintelligence/4.svg', caption: '' },
      { src: '/projects/cookingintelligence/5.svg', caption: '' },
      { src: '/projects/cookingintelligence/6.svg', caption: '' },
      { src: '/projects/cookingintelligence/7.svg', caption: '' },
      { src: '/projects/cookingintelligence/8.svg', caption: '' },
    ],
  },
  botversehub: {
    title: 'BotverseHub',
    description:
      'A unified platform for managing, training, and interacting with AI bots. Users can spin up bots with custom personas, equip them with selectable tool sets (web search, code execution, file access, APIs), and chat with them in real time. Includes a bot registry, per-bot memory and context management, tool permission controls, conversation history, and an analytics dashboard tracking usage and performance across the entire bot fleet.',
    stack: ['Angular', 'TypeScript', 'Python', 'FastAPI', 'LangChain'],
    images: [
      { src: '/projects/botversehub/landing.svg', caption: '' },
      { src: '/projects/botversehub/2.svg', caption: '' },
      { src: '/projects/botversehub/3.svg', caption: '' },
      { src: '/projects/botversehub/4.svg', caption: '' },
      { src: '/projects/botversehub/5.svg', caption: '' },
      { src: '/projects/botversehub/6.svg', caption: '' },
      { src: '/projects/botversehub/7.svg', caption: '' },
      { src: '/projects/botversehub/8.svg', caption: '' },
      { src: '/projects/botversehub/9.svg', caption: '' },
      { src: '/projects/botversehub/10.svg', caption: '' },
      { src: '/projects/botversehub/11.svg', caption: '' },
    ],
  },
}
