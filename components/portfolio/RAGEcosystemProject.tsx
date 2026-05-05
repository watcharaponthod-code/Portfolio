import ProjectDetail from './ProjectDetail';
import pic3 from '../project/ai_RAG/Picture3.png';
import pic1 from '../project/ai_RAG/Picture1.png';
import pic4 from '../project/ai_RAG/Picture4.png';
import pic5 from '../project/ai_RAG/Picture5.png';
import pic8 from '../project/ai_RAG/Picture8.png';

const EMB_DIAGRAM  = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';
const CHAT_DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';

export default function RAGEcosystemProject() {
  return (
    <ProjectDetail data={{
      id: 'rag-ecosystem',
      title: 'Enterprise RAG Ecosystem',
      role: 'FULL-STACK AI ENGINEER',
      year: '2024–2025',
      tagline: 'Two complementary RAG systems built for enterprises that cannot send internal data to external cloud APIs. Vector Docs handles document ingestion and hybrid retrieval. WebClient AI Workspace adds agentic orchestration, real-time bug tracker queries, and multi-user chat sessions on top.',
      overview: 'The RAG Ecosystem consists of two layered systems. Vector Docs (embedding_rag) is the core retrieval engine: it ingests documents through three pipelines, embeds content using BGE-M3, and serves hybrid vector + full-text search with RRF fusion and cross-encoder re-ranking. WebClient AI Workspace (rag-chat) extends this with a LangGraph agentic layer that routes queries to the right tool — document search, image retrieval, or live SQL against Mantis Bug Tracker — before synthesising a cited answer via a locally-hosted Ollama LLM.',
      keyFeatures: [
        'Vector Docs: Three ingestion pipelines (manual upload, automated email via n8n, external processed data). BGE-M3 1024-dimensional embeddings with cross-lingual Thai/English support.',
        'Vector Docs: Vision-enhanced retrieval — images within documents are extracted, described by a vision model, and independently embedded.',
        'Vector Docs: Hybrid RRF retrieval merges pgvector cosine similarity + PostgreSQL full-text search before cross-encoder re-ranking (BGE-Reranker-v2-m3).',
        'WebClient AI: LangGraph state machine routes each query to the optimal tool: document search, image search, or dynamic SQL generation against Mantis Bug Tracker.',
        'WebClient AI: HyDE (Hypothetical Document Embeddings) query expansion and multi-query rewriting improve recall on ambiguous queries.',
        'Shared infrastructure: both systems run entirely on self-hosted Ollama (Llama3, Qwen) with PostgreSQL + pgvector. Zero external AI API calls. Fully containerised on Kubernetes.',
      ],
      sections: [
        {
          title: 'Vector Docs — System Architecture',
          body: 'Three data ingestion pathways feed into a unified PostgreSQL + pgvector store. The dual-layer database design separates a Relational/Vector Layer (document chunks, extracted images, user sessions) from a Graph Layer (content_nodes + content_relationships) that enables cross-source relationship queries across email, file, and image content.',
          image: EMB_DIAGRAM,
          imageCaption: 'VECTOR_DOCS // THREE INGESTION PIPELINES → HYBRID RETRIEVAL',
          fullWidth: true,
        },
        {
          title: 'WebClient AI — Agentic Pipeline',
          body: 'WebClient AI adds a LangGraph orchestrator on top of the same retrieval stack. The agent first classifies query intent (document, image, or structured data), then selects and executes the appropriate tool. For bug tracker queries, it generates and runs SQL against a live Mantis MySQL instance. Thought-process steps stream to the client in real-time via SSE, giving users visibility into how the answer was assembled.',
          image: CHAT_DIAGRAM,
          imageCaption: 'RAG_CHAT // AGENTIC LANGRAPH PIPELINE',
          fullWidth: true,
        },
        {
          title: 'Production-Grade Enterprise Features',
          body: 'Both systems share the same production infrastructure: multi-user session management with role-based access control, per-department document scoping, citation tracking that surfaces the exact source document and page for every claim, and dynamic GPU model swapping that runs 4 LLMs concurrently on 16GB VRAM by cycling models in/out of GPU memory using RAM as a buffer.',
          image: pic3,
          imageCaption: 'ENTERPRISE_UI // MULTI-USER KNOWLEDGE INTERFACE',
        },
        {
          title: 'GPU Memory Optimisation',
          body: 'Running embedding model + re-ranker + LLM simultaneously on a 16GB VRAM server causes OOM errors. The model swapping controller loads the active model on demand, writes the previous model to RAM, and evicts it from VRAM. This allows 4 different models to share a single enterprise GPU without manual operator intervention.',
          image: pic8,
          imageCaption: 'VRAM_MGMT // DYNAMIC MODEL SWAPPING',
        },
        {
          title: 'Infrastructure & Deployment',
          body: 'React + TypeScript frontend. Node.js + Express API gateway. Python services for document parsing and ML inference. PostgreSQL 15 + pgvector for all storage. Ollama for local LLM serving. Multi-stage Docker builds minimise image size. Kubernetes deployment manifests support horizontal scaling of API and ML services independently. GitLab CI/CD automates build, test, and staging deployment.',
          image: pic5,
          imageCaption: 'INFRA // KUBERNETES + GITLAB CI/CD PIPELINE',
        },
      ],
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'LangGraph', 'LangChain', 'LlamaIndex', 'Ollama', 'BGE-M3', 'BGE-Reranker-v2-m3', 'pgvector', 'PostgreSQL', 'MySQL', 'n8n', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
      metrics: [
        { label: 'DEPLOYMENT', value: '100% ON-PREM' },
        { label: 'EMBEDDINGS', value: 'BGE-M3 1024D' },
        { label: 'RETRIEVAL', value: 'HYBRID + RRF' },
        { label: 'MODELS', value: '4 / 16GB VRAM' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/rag-chat',
    }} />
  );
}
