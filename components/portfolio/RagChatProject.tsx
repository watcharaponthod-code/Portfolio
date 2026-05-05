import ProjectDetail from './ProjectDetail';

const RAG_DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';

export default function RagChatProject() {
  return (
    <ProjectDetail data={{
      id: 'rag-chat',
      title: 'WebClient AI Workspace',
      role: 'FULL-STACK AI ENGINEER',
      year: '2025',
      tagline: 'Enterprise-grade agentic RAG chat platform for document retrieval and bug tracking. Runs 100% on-premises — no data ever leaves your infrastructure.',
      overview: 'Most corporate RAG solutions require sending sensitive documents to external cloud APIs. WebClient AI Workspace solves this by building a complete, locally-hosted AI system. It combines an Agentic RAG pipeline with direct Mantis Bug Tracker integration, allowing engineers to query both documents and bug databases in natural language — all within the company firewall.',
      keyFeatures: [
        'Agentic intent analysis before retrieval — the system decides which tool to use based on the query type (document search, image retrieval, or SQL).',
        'Hybrid retrieval combines pgvector cosine similarity search with PostgreSQL full-text search (FTS) for both precision and recall.',
        'Dynamic SQL generation against Mantis Bug Tracker — ask "what are the open critical bugs in Project X?" and get an answer.',
        'Cross-encoder semantic re-ranking elevates the most relevant results before synthesis.',
        'Dynamic GPU model swapping runs 4 different LLMs on 16GB VRAM without OOM errors.',
        'Real-time thought-process streaming via SSE — users see reasoning steps as they happen.',
      ],
      sections: [
        {
          title: 'System Architecture',
          body: 'The architecture separates the React frontend from a Node.js/Express API gateway, which orchestrates LangGraph state machines that manage the Agentic RAG workflow. Ollama serves local LLMs while PostgreSQL with pgvector handles all vector operations. A separate MySQL instance connects directly to the Mantis Bug Tracker for real-time SQL-based queries.',
          image: RAG_DIAGRAM,
          imageCaption: 'SYSTEM_ARCHITECTURE // FULL AGENTIC RAG PIPELINE',
          fullWidth: true,
        },
        {
          title: '3-Stage RAG Pipeline',
          body: 'Stage 1 (Pre-Retrieval): Query intent classification and HyDE expansion generate hypothetical document embeddings to improve recall. Stage 2 (Hybrid Retrieval): Vector similarity + full-text lexical search run in parallel, with dynamic SQL for structured database queries. Stage 3 (Post-Retrieval): A cross-encoder re-ranks all candidates before the LLM synthesizes the final answer with citations.',
        },
        {
          title: 'Performance Under Constraints',
          body: 'The system is designed for constrained hardware. A custom model swapping controller loads and unloads embedding models, re-rankers, and LLMs from GPU memory on demand, using RAM as a buffer pool. This makes it feasible to run a full production-grade RAG stack on a single workstation GPU.',
        },
      ],
      stack: ['LangGraph', 'LangChain', 'LlamaIndex', 'Ollama', 'pgvector', 'PostgreSQL', 'MySQL', 'React', 'Node.js', 'Express', 'TypeScript', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
      metrics: [
        { label: 'DEPLOYMENT', value: '100% ON-PREM' },
        { label: 'RETRIEVAL', value: 'HYBRID SEARCH' },
        { label: 'RERANKING', value: 'CROSS-ENCODER' },
        { label: 'INFERENCE', value: '16GB VRAM' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/rag-chat',
    }} />
  );
}
