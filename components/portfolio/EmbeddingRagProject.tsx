import ProjectDetail from './ProjectDetail';

const DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';

export default function EmbeddingRagProject() {
  return (
    <ProjectDetail data={{
      id: 'embedding-rag',
      title: 'Vector Docs',
      role: 'ENTERPRISE RAG SYSTEM',
      year: '2024–2025',
      tagline: 'Comprehensive document management and intelligent knowledge retrieval system. Ask your company\'s internal documents anything — in natural language, with citations. 100% on-premises.',
      overview: 'Vector Docs solves the enterprise document search problem: thousands of PDFs, PPTX, and DOCX files that are invisible to keyword search. The system ingests them through three pipelines (manual upload, automated email, external services), embeds them using BGE-M3, and stores everything in a hybrid PostgreSQL + pgvector database. Users query in natural language and receive precise, cited answers — without any data leaving the company\'s infrastructure.',
      keyFeatures: [
        'Three ingestion pipelines: manual file upload (PDF/PPTX/DOCX), automated email capture via n8n webhooks, and external processed data from the Mantis Embedding & Conversion service.',
        'BGE-M3 embedding model — multilingual, 1024-dimension vectors with strong cross-lingual support for Thai and English content.',
        'Vision-enhanced RAG: images within documents are extracted, described by a vision model, and independently embedded — enabling image-aware retrieval.',
        'Hybrid retrieval with Reciprocal Rank Fusion (RRF) merges vector cosine similarity and PostgreSQL full-text search results before re-ranking.',
        'BGE-Reranker-v2-m3 cross-encoder re-scores top-k results to surface the highest-precision context for answer generation.',
        'Multi-tenant isolation via project and client filtering — each department\'s documents remain scoped to authorised users only.',
        'Llama3 and Qwen LLMs served via self-hosted Ollama. No external AI API calls at any stage.',
      ],
      sections: [
        {
          title: 'System Architecture',
          body: 'Three distinct data ingestion pathways feed into a unified vector store. Manual uploads go through Python-based parsers (PyMuPDF, python-pptx, mammoth) for text and image extraction. Email integration uses n8n workflows to push inbound messages and attachments through a secure webhook. External services push pre-processed embeddings directly. All content lands in the same PostgreSQL + pgvector database, queryable through a unified API.',
          image: DIAGRAM,
          imageCaption: 'SYSTEM_ARCHITECTURE // THREE INGESTION PIPELINES → HYBRID RETRIEVAL',
          fullWidth: true,
        },
        {
          title: 'Database Schema: Dual-Layer Design',
          body: 'The schema has two layers. The Relational/Vector Layer handles document chunks (text + embedding + FTS), extracted images (image_data BLOB + description + embedding), and user/session management. The Graph Layer (content_nodes + content_relationships) provides a unified node system across email, file, and image content types — enabling cross-source relationship queries that the flat document model cannot support.',
        },
        {
          title: 'Hybrid Retrieval with RRF',
          body: 'For each user query, the system runs vector similarity search (cosine distance via pgvector) and lexical full-text search (PostgreSQL tsvector) in parallel. Reciprocal Rank Fusion merges the ranked lists by summing the reciprocal ranks, giving a combined relevance score that outperforms either method alone. The top merged results are then passed to the cross-encoder for final precision scoring.',
        },
        {
          title: 'Vision-Enhanced Retrieval',
          body: 'Documents often contain critical information in charts, diagrams, and tables that plain text extraction misses entirely. Vector Docs uses a vision model to generate natural language descriptions of each extracted image, then embeds those descriptions alongside the text content. A query about "the Q3 revenue chart" will surface the relevant image even if the surrounding text does not mention Q3 explicitly.',
        },
        {
          title: 'Deployment & Infrastructure',
          body: 'React + Vite + TypeScript frontend. Node.js + Express backend for business logic and AI orchestration. PostgreSQL 15 with pgvector for all storage. Fully containerised with Docker Compose for local development and Kubernetes YAML for production. CI/CD via GitLab pipelines with automated build, test, and staging deployment on every merge request.',
        },
      ],
      stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Python', 'PostgreSQL', 'pgvector', 'BGE-M3', 'BGE-Reranker-v2-m3', 'Llama3', 'Qwen', 'Ollama', 'n8n', 'Docker', 'Kubernetes'],
      metrics: [
        { label: 'EMBEDDINGS', value: 'BGE-M3 1024D' },
        { label: 'RETRIEVAL', value: 'HYBRID + RRF' },
        { label: 'RERANKING', value: 'CROSS-ENCODER' },
        { label: 'DEPLOYMENT', value: '100% ON-PREM' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/embedding_rag',
    }} />
  );
}
