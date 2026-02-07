
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
        content: "Watcharapon is a Senior Full Stack Systems Engineer based in Bangkok. He specializes in building robust, scalable applications that bridge the gap between complex backend logic and seamless user experiences.",
        keywords: ["who", "biography", "background", "location", "bangkok"]
    },
    {
        id: "philosophy",
        title: "Engineering Philosophy",
        content: "Watcharapon's core philosophy includes: 1. Clarity over Cleverness (prioritizing readable and maintainable code). 2. Impact-Driven Engineering (ensuring technical decisions serve user needs and business goals).",
        keywords: ["philosophy", "coding style", "principles", "thinking"]
    },
    {
        id: "skills-core",
        title: "Core Technical Skills",
        content: "Expertise in React, TypeScript, Node.js, Kubernetes, Google Cloud, Python, LangChain, Pinecone, Next.js, and Gemini API.",
        keywords: ["skills", "languages", "tools", "stack", "tech"]
    },
    {
        id: "projects-rag",
        title: "Project: Enterprise RAG Platform",
        content: "Watcharapon architected a retrieval-augmented generation system for legal discovery. He engineered a custom vector processing pipeline that achieved a 94% reduction in document retrieval time. Tech: Python, LangChain, Pinecone, Next.js.",
        keywords: ["project", "rag", "enterprise", "legal", "vector"]
    },
    {
        id: "projects-trading",
        title: "Project: High-Latency Trading UI",
        content: "Senior UI Engineer for a high-frequency trading interface. Optimized sub-50ms data visualization latency using WebSockets and custom V8-optimized rendering. Tech: React, D3.js, Rust.",
        keywords: ["trading", "hft", "websocket", "latency", "performance"]
    },
    {
        id: "projects-orchestrator",
        title: "Project: AI Agent Orchestrator",
        content: "Developed a distributed framework for autonomous multi-agent task collaboration with self-healing agent routines. Tech: TypeScript, Docker, Gemini API.",
        keywords: ["agent", "ai", "orchestrator", "automation", "multi-agent"]
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
