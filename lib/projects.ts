export interface ProjectDetail {
  title: string
  description: string
  preview?: string
  portrait?: boolean
  interval?: number
  stack: string[]
  images: { src: string; caption: string }[]
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  rag: {
    title: 'GPT Document Intelligence',
    description:
      'Upload entire PDF libraries and query them with natural language. Built on LangChain, OpenAI embeddings, and Pinecone. Features hybrid BM25 + dense retrieval, citation tracking, and a streaming chat UI. Handles 10k-page corpora with sub-200ms retrieval.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
    images: [
      { src: '/projects/rag/upload.svg', caption: 'PDF library upload & indexing pipeline' },
      { src: '/projects/rag/chat.svg', caption: 'Streaming natural language chat with citations' },
      { src: '/projects/rag/retrieval.svg', caption: 'Hybrid BM25 + dense retrieval results' },
    ],
  },
  agent: {
    title: 'Autonomous Incident Commander',
    description:
      'A multi-agent SRE command center that detects incidents, builds causal graphs from telemetry, executes guarded runbooks, and drafts postmortems automatically. Reduced mean time to resolution by 63% in staging chaos drills while keeping human approval in the loop for every high-risk action.',
    stack: ['Python', 'LangChain', 'Prometheus', 'Kubernetes', 'Grafana'],
    images: [
      { src: '/projects/agent/dashboard.svg', caption: 'Live incident detection dashboard' },
      { src: '/projects/agent/graph.svg', caption: 'Causal graph built from telemetry' },
      { src: '/projects/agent/runbook.svg', caption: 'Guarded runbook execution timeline' },
    ],
  },
  devops: {
    title: 'FinOps Autopilot',
    description:
      'An AI platform for cloud cost optimization that forecasts spend, detects anomalies in real time, opens infrastructure right-sizing pull requests, and recommends commitment plans. It combines retrieval over IaC history with policy constraints to avoid unsafe savings recommendations.',
    stack: ['Python', 'AWS', 'Terraform', 'LangChain', 'PostgreSQL'],
    images: [
      { src: '/projects/devops/forecast.svg', caption: 'Cloud spend forecasting chart' },
      { src: '/projects/devops/anomaly.svg', caption: 'Real-time anomaly detection alerts' },
      { src: '/projects/devops/rightsizing.svg', caption: 'Right-sizing PR recommendations' },
    ],
  },
  saas: {
    title: 'Voice Revenue Copilot',
    description:
      'A real-time assistant for sales teams that transcribes calls live, surfaces objection-handling playbooks, scores deal health, and syncs structured notes into CRM automatically. The system supports multilingual conversations with latency under 400ms for in-call recommendations.',
    stack: ['Python', 'OpenAI', 'React', 'TypeScript', 'WebSocket'],
    images: [
      { src: '/projects/saas/transcription.svg', caption: 'Live call transcription view' },
      { src: '/projects/saas/playbook.svg', caption: 'Objection-handling playbook surface' },
      { src: '/projects/saas/dealhealth.svg', caption: 'Deal health score & CRM sync' },
    ],
  },
  resume: {
    title: 'Talent Intelligence Graph',
    description:
      'A recruiting intelligence system that converts resumes, portfolios, and job descriptions into a living skills graph. It generates explainable candidate-role matches, interview briefs, and market trend analytics while preserving strict data governance and access controls.',
    stack: ['Python', 'Neo4j', 'LangChain', 'FastAPI', 'PostgreSQL'],
    images: [
      { src: '/projects/resume/graph.svg', caption: 'Live skills graph visualization' },
      { src: '/projects/resume/match.svg', caption: 'Candidate-role match matrix' },
      { src: '/projects/resume/trends.svg', caption: 'Market trend analytics dashboard' },
    ],
  },
  style: {
    title: 'Generative Brand Studio',
    description:
      'A multimodal creative suite that turns a brand brief into on-brand hero visuals, landing page variants, tokenized design systems, and accessibility reports in minutes. It blends diffusion models, retrieval over brand guidelines, and deterministic export pipelines for production handoff.',
    stack: ['Python', 'Stable Diffusion', 'LangChain', 'React', 'TypeScript'],
    images: [
      { src: '/projects/style/brief.svg', caption: 'Brand brief input & style extraction' },
      { src: '/projects/style/visuals.svg', caption: 'Generated hero visuals grid' },
      { src: '/projects/style/tokens.svg', caption: 'Tokenized design system export' },
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
  'android-freelance': {
    title: 'Freelance Android Development',
    portrait: true,
    preview: 'https://play.google.com/store/apps/developer?id=Grayscaler&hl=en_US',
    description:
      'Delivered 15+ Android apps for clients across retail, health, and logistics — all built with Jetpack Compose for fully declarative UIs. Stack includes Hilt for DI, Room for local persistence, Retrofit + OkHttp for networking, Coil for image loading, DataStore for preferences, WorkManager for background tasks, and Navigation Compose for deep-linked multi-screen flows. Applied MVVM with StateFlow, coroutines, and clean architecture across every engagement.',
    stack: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Room', 'Retrofit'],
    images: [
      { src: '/projects/android-freelance/1.svg', caption: '' },
      { src: '/projects/android-freelance/2.svg', caption: '' },
      { src: '/projects/android-freelance/3.svg', caption: '' },
      { src: '/projects/android-freelance/4.svg', caption: '' },
      { src: '/projects/android-freelance/5.svg', caption: '' },
      { src: '/projects/android-freelance/6.svg', caption: '' },
      { src: '/projects/android-freelance/7.svg', caption: '' },
      { src: '/projects/android-freelance/8.svg', caption: '' },
      { src: '/projects/android-freelance/9.svg', caption: '' },
      { src: '/projects/android-freelance/10.svg', caption: '' },
      { src: '/projects/android-freelance/11.svg', caption: '' },
      { src: '/projects/android-freelance/12.svg', caption: '' },
    ],
  },
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
}
