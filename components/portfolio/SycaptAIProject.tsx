import ProjectDetail from './ProjectDetail';
import pic1 from '../project/ai_RAG/Picture1.png';
import pic3 from '../project/ai_RAG/Picture3.png';
import pic4 from '../project/ai_RAG/Picture4.png';
import pic5 from '../project/ai_RAG/Picture5.png';
import pic8 from '../project/ai_RAG/Picture8.png';

export default function SycaptAIProject() {
  return (
    <ProjectDetail data={{
      id: 'ai-enterprise',
      title: 'AI Enterprise',
      role: 'FULL-STACK AI ENGINEER',
      year: '2024–2025',
      tagline: 'A 100% on-premises corporate knowledge management system. Ingest PDF, DOCX, and PPTX — query in natural language. No data leaves the building.',
      overview: 'Most enterprise AI deployments require sending confidential documents to external cloud APIs. This system was built to eliminate that tradeoff entirely. It runs on company infrastructure, uses a locally-hosted LLM via Ollama, and delivers Agentic RAG capabilities including Hybrid Search, query expansion, and semantic re-ranking — all within the corporate firewall.',
      keyFeatures: [
        'Supports PDF, DOCX, and PPTX ingestion. Documents are chunked, embedded via bge-m3, and stored in a pgvector database.',
        'Agentic RAG pipeline with intent classification — the system routes queries to document search, image retrieval, or SQL generation.',
        'Hybrid retrieval combines pgvector cosine similarity and PostgreSQL full-text search for both semantic and lexical matching.',
        'Cross-encoder re-ranking re-scores retrieved chunks to surface the most contextually relevant content.',
        'Multi-user session management with per-user chat history, role-based access, and citation tracking.',
        'Full Kubernetes deployment with GitLab CI/CD pipeline for automated build, test, and staging releases.',
      ],
      sections: [
        {
          title: 'System Overview',
          body: 'The platform is a modular system: React frontend → Node.js/Express API gateway → LangGraph orchestrator → Ollama LLM → pgvector storage. Each layer is independently deployable and testable. The LangGraph state machine manages the "Thought Process" — deciding whether to retrieve documents, query a database, or respond from context alone.',
          image: pic3,
          imageCaption: 'SYSTEM_OVERVIEW // AGENTIC RAG ARCHITECTURE',
        },
        {
          title: 'Document Ingestion Pipeline',
          body: 'Uploaded files are parsed, cleaned, and split into semantic chunks using a recursive text splitter with configurable overlap. Each chunk is embedded using bge-m3 (a multilingual embedding model with strong Thai language support) and stored with metadata in PostgreSQL + pgvector. Images within documents are extracted and embedded separately for image-aware retrieval.',
          image: pic1,
          imageCaption: 'DOCUMENT_PIPELINE // INGESTION TO VECTOR STORE',
        },
        {
          title: 'Hybrid Retrieval in Action',
          body: 'For each query, the system runs vector search and full-text search in parallel. Vector search finds semantically similar content even when keywords differ; FTS catches exact term matches that embeddings occasionally miss. Results are merged, deduplicated, and passed to the cross-encoder for final scoring.',
          image: pic4,
          imageCaption: 'HYBRID_RETRIEVAL // VECTOR + FTS FUSION',
        },
        {
          title: 'Deployment Infrastructure',
          body: 'The entire stack is containerized with optimized multi-stage Docker builds. Kubernetes handles orchestration, auto-scaling, and rolling updates. A fully automated GitLab CI/CD pipeline builds, tests, and deploys to staging on every merge request — production releases require a manual gate.',
          image: pic5,
          imageCaption: 'INFRA_DIAGRAM // KUBERNETES + GITLAB CI/CD',
        },
        {
          title: 'GPU Memory Optimization',
          body: 'Running multiple models (embedding model, re-ranker, LLM) concurrently on a 16GB VRAM server would cause OOM errors. The solution: a custom model swapping controller that loads the required model on demand and evicts the previous model to RAM. This enables 4 different models to share a single GPU without manual intervention.',
          image: pic8,
          imageCaption: 'VRAM_MGMT // DYNAMIC MODEL SWAPPING',
        },
      ],
      stack: ['Next.js', 'NestJS', 'Python', 'LangGraph', 'LangChain', 'LlamaIndex', 'Ollama', 'bge-m3', 'pgvector', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
      metrics: [
        { label: 'DEPLOYMENT', value: '100% ON-PREM' },
        { label: 'RETRIEVAL', value: 'HYBRID SEARCH' },
        { label: 'EMBEDDING', value: 'BGE-M3' },
        { label: 'RERANKING', value: 'CROSS-ENCODER' },
      ],
    }} />
  );
}
