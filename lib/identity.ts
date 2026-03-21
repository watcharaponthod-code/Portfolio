
/**
 * Core Identity Data for Watcharapon (Oat)
 * This data is used to ground the AI assistants (Playground and Live AI)
 */

export const CREATOR_IDENTITY = {
    name: "Watcharapon Thodraksa (Oat)",
    role: "Full-Stack Developer | AI Application | Mobile | UX/UI Design",
    location: "Bangkok, Thailand",
    email: "watcharapon.thod@gmail.com",
    phone: "094-453-2072",
    github: "github.com/watcharapon",
    portfolio: "profiledevai.vercel.app",
    education: "B.Sc. Computer Science (Co-op Program), Kasetsart University Chalermphrakiat, GPA 2.97 (2022–present)",
    philosophy: "Building production-grade systems, not just interfaces. Clarity over cleverness. Every technical decision must serve a clear user need.",
    specialties: [
        "Full-Stack Development: React, Next.js, NestJS, FastAPI, Python, TypeScript, Java Spring Boot",
        "AI & RAG Pipelines: LangChain, LangGraph, LlamaIndex, pgvector, Qdrant, Gemini API, Hugging Face",
        "Mobile Development: React Native + Gemini API (iOS/Android)",
        "DevOps & Infrastructure: Docker, Kubernetes, GitLab CI/CD, Apache Kafka, ELK Stack, Prometheus, Grafana",
        "Database: PostgreSQL, MySQL, MongoDB, Firebase, Redis",
        "UX/UI Design: Figma, JTBD, Business Model Canvas, Canva, Power BI, n8n"
    ],
    achievements: [
        "Built Sycapt AI Enterprise — Full-stack On-Premises RAG system (Next.js, NestJS, Python) with Hybrid Search + Re-ranking, deployed on Kubernetes.",
        "Solved GPU VRAM 16GB constraint: designed Model Swapping system cycling 4 LLMs using 120GB RAM as buffer.",
        "Built EDC Geo Map Dashboard visualizing 15,423 Bangkok Bank EDC machines nationwide with real-time filtering (Leaflet.js + FastAPI).",
        "Developed VHQ SOM Connector Microservice: Event-Driven Kafka integration in 3 phases (Java 21, Spring Boot, ELK Stack).",
        "Designed full GitLab CI/CD Pipeline: Build → Test → Docker Build → Staging → Production with Auto Rollback on Kubernetes.",
        "2nd Place Runner-Up — KUSE AI Hackathon 2025 (AI system built in 3 days using ML, Prompt Engineering, Design Thinking).",
        "Invited Lecturer at KU Chalermphrakiat: React Native + Gemini API workshop (7,500 THB) and Git/GitHub workshop (5,000 THB).",
        "Freelance: Delivered Donlaya Makeup portfolio website (Next.js, TypeScript, Tailwind CSS) on-time within 3,000 THB budget."
    ],
    awards: [
        "🥈 2nd Place Runner-Up — KUSE AI Hackathon 2025",
        "🏆 UI Design-athon 2025 (JTBD + Business Model Canvas)",
        "🔐 RERU Cyber Hackathon 2025 Open Level (Penetration Testing & Defensive Tools)"
    ],
    personality: "Technical yet approachable Thai developer who solves real constraints creatively (like squeezing 4 LLMs into 16GB VRAM). Passionate about AI systems, clean architecture, and teaching. Always ready to talk system design and build things that actually work.",
};

export const IDENTITY_CONTEXT_STRING = `
YOU ARE TALKING ABOUT THE CREATOR OF THIS PORTFOLIO:
Name: ${CREATOR_IDENTITY.name}
Role: ${CREATOR_IDENTITY.role}
Location: ${CREATOR_IDENTITY.location}
Philosophy: ${CREATOR_IDENTITY.philosophy}

KEY COMPETENCIES:
${CREATOR_IDENTITY.specialties.map(s => `- ${s}`).join('\n')}

NOTABLE PROJECTS:
${CREATOR_IDENTITY.achievements.map(a => `- ${a}`).join('\n')}

AI GUIDELINE:
- BE OBJECTIVE AND DIRECT. (ตรงไปตรงมา ไม่ต้องอวย)
- Speak from a neutral, technical perspective. 
- Avoid using superlatives or promotional language (e.g., "best", "amazing", "incredible").
- If asked about skills, focus on the technical implementation and architecture rather than praising the person.
- Keep the "Tech Bro" vibe but make it "Straight Talk" style.
- If the user refers to themselves as "พี่โอ๊ต" (P'Oat), recognize them as the creator, but maintain a realistic, peer-to-peer technical tone.
`;
