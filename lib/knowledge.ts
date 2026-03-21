
export interface KnowledgeSection {
    id: string;
    title: string;
    content: string;
    keywords: string[];
}

export const KNOWLEDGE_BASE: KnowledgeSection[] = [
    {
        id: "about",
        title: "About Watcharapon",
        content: "Watcharapon (Oat) Thodraksa is a Full-Stack Developer specializing in AI Applications, Mobile Development, and UX/UI Design. He is a Computer Science student (Co-op Program) at Kasetsart University Chalermphrakiat Sakon Nakhon Campus (GPA 2.97), with hands-on enterprise experience from his co-op at Sycapt Co., Ltd. in Bangkok. He can be reached at watcharapon.thod@gmail.com or 094-453-2072.",
        keywords: ["who", "biography", "background", "location", "bangkok", "contact", "email", "phone", "education", "university"]
    },
    {
        id: "philosophy",
        title: "Engineering Philosophy",
        content: "Watcharapon's core philosophy: 1. Clarity over Cleverness — readable, maintainable code over obscure abstractions; a system is only as good as its weakest link. 2. Impact-Driven Engineering — every technical decision (database schema, infrastructure) must serve a clear user need and advance business goals. 3. Constraint-Driven Innovation — his best work often came from hard constraints, like fitting 4 LLMs into 16GB VRAM.",
        keywords: ["philosophy", "coding style", "principles", "thinking", "approach"]
    },
    {
        id: "skills-core",
        title: "Core Technical Skills",
        content: "Full-Stack: React, Next.js, NestJS, FastAPI, Python, TypeScript, Java Spring Boot, Node.js, PHP. Mobile: React Native + Gemini API. AI/RAG: LangChain, LangGraph, LlamaIndex, pgvector, Qdrant, Gemini API, Hugging Face, n8n, Prompt Engineering. Database: PostgreSQL, MySQL, MongoDB, Firebase, Redis. DevOps: Docker, Kubernetes, GitLab CI/CD, Apache Kafka, ELK Stack, Prometheus, Grafana. Design: Figma, Canva, Power BI. Security: Penetration Testing, Vulnerability Analysis, Defensive Tool Development.",
        keywords: ["skills", "languages", "tools", "stack", "tech", "react", "python", "langchain", "kubernetes", "docker"]
    },
    {
        id: "projects-sycapt-ai",
        title: "Project: Sycapt AI Enterprise (Co-op)",
        content: "Built Sycapt AI Enterprise — a 100% on-premises corporate knowledge management system at Sycapt Co., Ltd. Accepts PDF/DOCX/PPTX, converts to vectors using bge-m3 model, then allows natural language queries. Features Agentic RAG Pipeline (LangChain, LangGraph, LlamaIndex) with Hybrid Search (Vector + Full-Text) and Re-ranking. Deployed on Kubernetes. Tech: Next.js, NestJS, Python, pgvector, LangGraph, Kubernetes. (2025)",
        keywords: ["project", "rag", "enterprise", "sycapt", "vector", "ai", "llm", "knowledge", "management", "on-premises"]
    },
    {
        id: "projects-gpu-vram",
        title: "Project: GPU VRAM Optimization (Model Swapping)",
        content: "Solved a critical GPU VRAM constraint at Sycapt: only 16GB VRAM available but needed to run 4 different LLMs. Designed a Model Swapping system that cycles models in/out of VRAM, using 120GB RAM as a buffer pool. This allowed running multiple specialized models without hardware upgrades.",
        keywords: ["gpu", "vram", "optimization", "model swapping", "llm", "memory", "hardware"]
    },
    {
        id: "projects-edc-map",
        title: "Project: EDC Geo Map Dashboard (Co-op)",
        content: "Built a web application visualizing 15,423 Bangkok Bank EDC (Electronic Data Capture) machines nationwide on an interactive map. Features real-time filtering by province, region, machine type, and status. Supports CSV export. Tech: FastAPI, SQLAlchemy, Leaflet.js, Chart.js, PostgreSQL. (Sycapt, 2025)",
        keywords: ["project", "edc", "map", "geo", "dashboard", "leaflet", "visualization", "bangkok bank", "geospatial"]
    },
    {
        id: "projects-kafka-connector",
        title: "Project: VHQ SOM Connector Microservice (Co-op)",
        content: "Developed a microservice connecting Kafka message queues to VHQ API using Event-Driven Architecture. 3-phase flow: receive job → send batch → return result. Uses ELK Stack for centralized logging. Tech: Java 21, Spring Boot, Apache Kafka, PostgreSQL, Docker. (Sycapt, 2025)",
        keywords: ["project", "kafka", "microservice", "event-driven", "java", "spring boot", "connector", "vhq"]
    },
    {
        id: "projects-cicd",
        title: "Project: GitLab CI/CD Pipeline Design (Co-op)",
        content: "Designed a complete CI/CD Pipeline on GitLab CI: Build → Test → Docker Build → Deploy Staging → Deploy Production with Auto Rollback on Kubernetes. Ensures zero-downtime deployments and fast rollback on failures. (Sycapt, 2025)",
        keywords: ["cicd", "gitlab", "pipeline", "kubernetes", "docker", "devops", "deployment", "automation"]
    },
    {
        id: "projects-mobile-workshop",
        title: "Project: React Native AI App (Workshop)",
        content: "Built a mobile application connecting to Gemini API for AI features on iOS/Android, developed as educational material for a university workshop at Kasetsart University Chalermphrakiat. Received 7,500 THB speaking fee. Also taught Git/GitHub workshop (5,000 THB). Tech: React Native, Gemini API, JavaScript.",
        keywords: ["project", "mobile", "react native", "gemini", "workshop", "teaching", "lecture", "university"]
    },
    {
        id: "projects-freelance",
        title: "Project: Donlaya Makeup Portfolio Website (Freelance)",
        content: "Freelance project: built a portfolio website for a makeup artist (Donlaya Makeup) via Fastwork platform. Fully responsive design, delivered on-time within 3,000 THB budget. Tech: Next.js, React, TypeScript, Tailwind CSS. (2024)",
        keywords: ["project", "freelance", "website", "portfolio", "makeup", "nextjs", "tailwind"]
    },
    {
        id: "awards",
        title: "Awards & Competitions",
        content: "🥈 2nd Place Runner-Up — KUSE AI Hackathon 2025: Built AI system in 3 days using Machine Learning, Prompt Engineering, and Design Thinking. 🏆 UI Design-athon 2025: UI design competition using JTBD and Business Model Canvas. 🔐 RERU Cyber Hackathon 2025 (Open Level): Penetration testing, vulnerability analysis, and defensive tool development.",
        keywords: ["award", "hackathon", "competition", "prize", "achievement", "kuse", "reru", "design"]
    },
    {
        id: "experience-sycapt",
        title: "Work Experience: Sycapt Co., Ltd.",
        content: "Software Developer (Co-op Internship) at Sycapt Co., Ltd., Bangkok — January to May 2025. Developed full-stack Sycapt AI Enterprise on Kubernetes, built Agentic RAG Pipeline, solved GPU VRAM constraints, created EDC Geo Map, developed Kafka microservice connector, and designed CI/CD pipeline with auto rollback.",
        keywords: ["experience", "work", "sycapt", "job", "internship", "co-op", "company"]
    }
];

/**
 * Simple Retrieval Function
 * In a real app, this would use Vector Search. 
 * Here we use keyword matching as a lightweight alternative.
 */
export function getRelevantContext(query: string): string {
    const lowercaseQuery = query.toLowerCase();

    // Search for the most relevant sections based on keywords
    const relevantSections = KNOWLEDGE_BASE.filter(section =>
        section.keywords.some(keyword => lowercaseQuery.includes(keyword)) ||
        section.title.toLowerCase().includes(lowercaseQuery)
    );

    if (relevantSections.length === 0) {
        // Return a general overview if no specific match is found
        return KNOWLEDGE_BASE.find(s => s.id === "about")?.content || "";
    }

    return relevantSections.map(s => s.content).join("\n\n");
}
