export interface Service {
  num: string
  slug: string
  title: string
  timeline: string
  desc: string
  checks: string[]
  stack: string[]
  note?: string
  /** Blueprint illustration shown on the /services page */
  image: string
  imageAlt: string
  imageCaption: string
}

export const SERVICES: Service[] = [
  {
    num: '01',
    slug: 'ai-integration',
    title: 'AI Integration',
    timeline: '1 – 30 days',
    desc: 'LLM pipelines, RAG systems, and intelligent features embedded directly into your product. From proof-of-concept to production-grade infrastructure.',
    checks: [
      'Custom RAG pipeline with vector search including chunking, embedding caching, async ingestion, and hybrid BM25 + vector retrieval',
      'LLM selection, prompt engineering & evaluation',
      'Streaming API with cost & latency optimisation',
      'Observability: tracing, logging, evals dashboard',
      'Handoff documentation & team walkthrough',
    ],
    stack: ['LangChain', 'OpenAI', 'Claude', 'Qdrant', 'Pinecone', 'FastAPI', 'AWS'],
    note: 'Typical engagement: 1–8 weeks depending on scope. Includes one round of revisions post-launch.',
    image: '/services/ai-integration.svg',
    imageAlt: 'Blueprint of a retrieval-augmented generation pipeline from documents to a cited answer',
    imageCaption: 'The pipeline I build: your documents → hybrid retrieval → grounded, cited answers',
  },
  {
    num: '02',
    slug: 'ai-agents',
    title: 'AI Agents & Automation',
    timeline: '1 – 30 days',
    desc: 'Autonomous, multi-step agents that take real actions — tool-calling, stateful workflows, and MCP integrations into your existing systems, with humans in the loop where it matters.',
    checks: [
      'Agent design with LangGraph — planning, tool-calling, memory & bounded loops',
      'MCP servers connecting agents to your databases, APIs, files & ticketing',
      'Human-in-the-loop approvals for high-risk actions',
      'Retries, guardrails & graceful failure handling',
      'Deployment, monitoring & handoff documentation',
    ],
    stack: ['LangGraph', 'LangChain', 'MCP', 'OpenAI', 'Claude', 'FastAPI', 'PostgreSQL'],
    note: 'Great fit for support, ops, and back-office automation. Includes one round of revisions post-launch.',
    image: '/services/ai-agents.svg',
    imageAlt: 'Blueprint of an agent loop — plan, act through tools, observe — with a human approval gate',
    imageCaption: 'Bounded agent loops with real tools — and a human gate on every risky action',
  },
  {
    num: '03',
    slug: 'fine-tuning',
    title: 'Fine-Tuning & Self-Hosted Models',
    timeline: '1 – 30 days',
    desc: 'Own your models — fine-tune or distill open-weight LLMs for your domain and run them in your own VPC or on-prem, for lower cost, data privacy, and compliance.',
    checks: [
      'Dataset curation, fine-tuning & LoRA / QLoRA adapters',
      'Distillation to smaller, faster task-specific models',
      'Self-hosted inference (vLLM / Ollama) with GPU autoscaling',
      'Benchmarking vs. hosted APIs — quality, latency & cost',
      'Private VPC / on-prem deployment & handoff',
    ],
    stack: ['PyTorch', 'Hugging Face', 'LoRA', 'vLLM', 'Ollama', 'Docker', 'AWS'],
    note: 'Best when API cost, latency, or data-residency rules push you off hosted models. Includes one round of revisions.',
    image: '/services/fine-tuning.svg',
    imageAlt: 'Blueprint of an open-weight model with LoRA adapters distilled and deployed inside a private VPC',
    imageCaption: 'Your domain, your weights, your VPC — tuned models that answer to nobody else',
  },
  {
    num: '04',
    slug: 'llmops',
    title: 'LLMOps & Evaluation',
    timeline: '1 – 30 days',
    desc: 'Make the AI you already shipped trustworthy in production — evaluation, tracing, guardrails, and cost/latency control so quality stops being a guess.',
    checks: [
      'Automated eval suites & regression tracking (LLM-as-judge + datasets)',
      'Tracing & observability across chains, agents and tools',
      'Guardrails: PII redaction, output validation, spend & rate limits',
      'Prompt-injection defence & red-team testing',
      'Cost & latency optimisation with a live metrics dashboard',
    ],
    stack: ['LangSmith', 'LangChain', 'Claude', 'OpenAI', 'Qdrant', 'Redis', 'Grafana'],
    note: 'Ideal once AI is live and you need reliability, safety & cost control. Includes one round of revisions.',
    image: '/services/llmops.svg',
    imageAlt: 'Blueprint of an evaluation dashboard with pass rates, traces, guardrails and cost tracking',
    imageCaption: 'Evals, traces, and guardrails — production AI you can actually measure',
  },
  {
    num: '05',
    slug: 'full-stack',
    title: 'Full-Stack Development',
    timeline: '1 – 30 days',
    desc: 'End-to-end web applications — schema design, API architecture, and polished interfaces built to hold up under real traffic and real users.',
    checks: [
      'Frontend development with Angular, React, Next.js, Tailwind UI or custom designs',
      'Backend development with Python (Django/FastAPI), Java (Spring Boot), or Node.js',
      'Database design, migrations & query optimisation',
      'CI/CD pipeline with automated testing',
      'Performance audit, Monitoring & Core Web Vitals pass',
    ],
    stack: ['Next.js', 'Angular', 'React', 'Python', 'Java', 'TypeScript', 'MySQL', 'MongoDB', 'Jenkins, GitHub Actions or GitLab CI'],
    image: '/services/full-stack.svg',
    imageAlt: 'Blueprint of a full application stack — interface, API layer, services and database — with a CI/CD line',
    imageCaption: 'Interface to database, one coherent system — shipped through CI/CD from day one',
  },
  {
    num: '06',
    slug: 'devops',
    title: 'DevOps & Infrastructure',
    timeline: '1 – 30 days',
    desc: 'CI/CD pipelines, containerisation, and cloud deployments. Infrastructure that scales silently and fails gracefully.',
    checks: [
      'Docker + Kubernetes cluster setup',
      'GitHub Actions or GitLab CI pipeline',
      'Cloud infrastructure on AWS or GCP (IaC)',
      'Monitoring, alerting & on-call runbooks',
      'Security audit & secrets management',
    ],
    stack: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Jenkins', 'AWS', 'GCP'],
    image: '/services/devops.svg',
    imageAlt: 'Blueprint of a Kubernetes cluster behind a load balancer with a CI/CD pipeline and monitoring pulse',
    imageCaption: 'Clusters, pipelines, and monitoring — infrastructure that pages you before your users do',
  },
  {
    num: '07',
    slug: 'data-pipelines',
    title: 'Data Pipelines',
    timeline: '1 – 30 days',
    desc: 'ETL workflows, vector databases, and real-time analytics. Raw, messy data transformed into fast, reliable decisions.',
    checks: [
      'ETL / ELT pipeline design & implementation',
      'Vector store setup & embedding strategy',
      'Real-time streaming with Kafka or Pub/Sub',
      'Analytics dashboard (Metabase or custom)',
      'Data quality monitoring & alerting',
    ],
    stack: ['Python', 'Airflow', 'Kafka', 'BigQuery', 'Pinecone'],
    image: '/services/data-pipelines.svg',
    imageAlt: 'Blueprint of a data pipeline — sources streaming through transforms into a warehouse, vector store and dashboard',
    imageCaption: 'From raw events to live dashboards — streams, transforms, and stores that stay in sync',
  },
]
