
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
        content: "Watcharapon (Oat) Thodraksa is an AI Engineer who builds computer vision and satellite ML that runs on real cameras and real fields. Most of his current work is for a Thai sugar mill: Agri-AI satellite field monitoring (CropScan, Yield Pro, SAR to NDVI gapfill) at TokinTech, and CaneGate / sugarcane-cv at the weighbridge. Earlier he worked as a Full-Stack Developer on AI applications, mobile and UX/UI. He holds a B.Sc. in Computer Science (Co-op Program) from Kasetsart University Chalermphrakiat Sakon Nakhon Campus, graduated 2025 with GPA 3.10, with hands-on enterprise experience from his co-op at Sycapt Co., Ltd. in Bangkok. He can be reached at watcharapon.thod@gmail.com or 094-453-2072.",
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
        id: "projects-agri-ai",
        title: "Project: Agri-AI — Satellite Sugarcane Field Monitoring (TokinTech, 2026)",
        content: "Agri-AI is a per-field sugarcane monitoring system built for a Thai sugar mill from Sentinel-2 optical, Sentinel-1 radar, DEM, CHIRPS rain, Open-Meteo weather and SoilGrids. It runs on Railway as a FastAPI service with a built-in scheduler, pulls every new scene from Planetary Computer, computes per-pixel and per-field signals, and pushes recommendations into the mill's own SQL Server backend. Two products: CropScan Harvest Monitoring (cut or standing, and cut percentage per field; two-colour NDVI rule plus a Sentinel-1 VH-drop gate; out-of-block on 8,924 fields season 68: precision 0.869, recall 0.897, F1 0.883) and Yield Pro (field health, cause labels such as drought/decline/recovery, and P10/P50/P90 tonnes per rai from LightGBM; in-sample Spearman 0.72, honest out-of-zone 0.25–0.31, so it ships deciles and ranking not a tonne figure). A SAR→NDVI gapfill model predicts the optical index under cloud: 95.7% of answered pixels within ±0.10 NDVI, MAE 0.034, on 129k held-out pixels from 448,986 out-of-block pixels, conformal intervals with a reject option at 28.8% coverage. MLOps: warehouse bucket, Kaggle/Modal GPU training, PROVENANCE.json per artifact, MLflow, Loki + Grafana + Prometheus. A related paper on unregistered cane field detection from AlphaEarth embeddings (recall 93.2%) was submitted to Precision Agriculture (Springer) in August 2026. Watcharapon is the AI/MLOps engineer on this at TokinTech.",
        keywords: ["agri", "agri-ai", "satellite", "sentinel", "sugarcane", "cane", "field", "cropscan", "yield pro", "yield", "harvest", "ndvi", "sar", "radar", "gapfill", "remote sensing", "tokintech", "mill", "railway", "mlflow", "precision agriculture", "paper"]
    },
    {
        id: "projects-sugarcane-cv",
        title: "Project: sugarcane-cv — Nine CV/Audio Detectors at a Thai Sugar Mill",
        content: "sugarcane-cv collects nine detection problems from one real sugar mill: dust opacity at the tipper (model + rules, synthetic test set), burnt vs fresh cane (trained on 8,612 real CCTV frames, camera-bound), mixed burnt cane in one load (colour rule, no model), dirt/leaf contamination (65 real images, inconclusive), sand/rock/metal from microphone audio (real sound from the tipping bay, sand solved), cane flow on the conveyor (self-training model at 70 fps on real video), Thai licence plate reading (two readers, one model-free, designed for zero wrong reads on a 60-image hard set), is-there-cane-on-the-truck (edge rule, 3.9 ms per frame, deployed), and cane stalk segmentation (31 hand labels, supporting work). The repo contains training code and algorithms only, no model files and no customer images, and every number states what evidence it stands on. Related production system: CaneGate, an all-in-one truck inspection at the weighbridge (side camera grades cane, front camera reads the Thai plate) shipped as Docker images khawoat07/canegate, canegate-web and canegate-lpr. GitHub: https://github.com/watcharaponthod-code/sugarcane-cv",
        keywords: ["sugarcane-cv", "sugarcane", "mill", "dust", "burnt", "cctv", "plate", "ocr", "licence", "license", "canegate", "truck", "weighbridge", "conveyor", "audio", "rock", "sand", "docker", "computer vision"]
    },
    {
        id: "projects-ekyc",
        title: "Project: eKYC — Liveness Capture and Face Identity",
        content: "ekyc is a React Native module plus a Python FastAPI decision server. The phone runs the interaction (turn, blink and active-flash liveness coaching with ML Kit) and stores no biometric data; the server re-derives everything from pixels using MediaPipe (478 landmarks, head pose, blendshapes) and DeepFace (ArcFace embeddings, MiniFASNet anti-spoofing ensemble). An ONNX-only backend (SCRFD + ArcFace + MiniFASNet) exists for deployments without TensorFlow/PyTorch, and a fully on-device variant uses ML Kit + MobileFaceNet. 187 server tests (42 on real models) and 105 module tests pass, including enrol, verify, identify and erase end-to-end. Includes a PAD evaluation harness for APCER/BPCER per attack species (ISO/IEC 30107-3). Documented gaps: not yet run on a physical phone; thresholds calibrated on Western press photos; only screen-replay attacks tested. GitHub: https://github.com/watcharaponthod-code/ekyc",
        keywords: ["ekyc", "kyc", "liveness", "face", "biometric", "anti-spoof", "mediapipe", "deepface", "arcface", "react native", "identity", "verification", "pad", "apcer"]
    },
    {
        id: "projects-shorts-automation",
        title: "Project: YouTube Shorts Automation — BudyStory / AlexASMR",
        content: "A closed-loop content pipeline: analyse yesterday's YouTube Analytics (views, retention, traffic sources via a REST proxy), decide the next theme, find ideas from competitor clips, generate 9:16 ten-second clips with meta.ai using a locked character spec, QC every frame (character outfit, no subtitles, correct aspect, title set), upload to two YouTube channels and Facebook Reels on schedule, then measure 48 hours later and update the strategy. As of 19 Sep 2026 the BudyStory channel had 5,510 subscribers, 3.34 million views and 189 clips, averaging about 211k views per day; traffic is 97% Shorts feed, 84% Thailand. Findings that became rules: retention leaks in seconds 1–2, silent food fails on the ASMR channel, 18 uploads in one day collapsed reach 100 times, big-object destruction is the top format, hit rate above 100k views is 7 of 129 clips. Nothing publishes without human confirmation. An earlier version used Gemini TTS Thai narration, synthetic SFX and ffmpeg effects.",
        keywords: ["youtube", "shorts", "automation", "content", "budystory", "asmr", "analytics", "retention", "meta.ai", "video", "pipeline", "growth", "facebook", "reels", "tts"]
    },
    {
        id: "projects-dragon-combat",
        title: "Project: Dragon Combat — Roblox Aerial PvP with Human-Passing Bot AI",
        content: "roblox-dragon-combat is a multiplayer dragon flight-combat game in Roblox. The bot AI is a behaviour-based flight brain, not a neural network: a three-state finite state machine (PATROL through boost rings with altitude changes capped at ±70 studs; ATTACK as a gun run aiming at target position plus a quarter second of velocity, then breaking off at 240 studs with a 75-degree bank; EVADE below 28% HP with a sinusoidal jink). Target selection adds a 240-stud penalty per bot already claiming a target so the squad spreads across the arena and bots fight each other. Whisker raycasts and wall-slide handle obstacles. Reinforcement learning was rejected because the budget is a few hundred microseconds per bot per frame in Luau, the goal is to lose convincingly rather than win, and every player complaint maps to one constant. GitHub: https://github.com/watcharaponthod-code/roblox-dragon-combat",
        keywords: ["roblox", "dragon", "game", "bot", "ai", "luau", "steering", "fsm", "pvp", "game ai", "behaviour"]
    },
    {
        id: "projects-rag-chat",
        title: "Project: RAG Chat — WebClient AI Workspace",
        content: "rag-chat (WebClient AI Workspace) was built at Sycapt Co., Ltd. in Bangkok during Watcharapon's co-op internship (January to May 2025), not for the sugar mill. It is an enterprise agentic RAG chat platform for document retrieval and bug tracking, powered by LangGraph and Ollama. It runs 100% on-premises — no data leaves the building. The system works in 3 stages: Pre-Retrieval (query intent analysis + HyDE query expansion), Hybrid Retrieval (pgvector cosine similarity + full-text search + dynamic SQL generation for Mantis bug tracker), and Post-Retrieval (cross-encoder re-ranking). LangGraph state-machine routes between document search, image retrieval, and live SQL depending on query intent. Multi-user session management with per-department document scoping. Dynamic GPU model swapping runs 4 LLMs concurrently on 16GB VRAM by cycling models between GPU and RAM. Every reasoning step streams to the client via SSE. Stack: LangGraph, LangChain, Ollama, React, Node.js, PostgreSQL + pgvector, GitLab CI/CD + Kubernetes. GitHub: https://github.com/watcharaponthod-code/rag-chat",
        keywords: ["sycapt", "co-op", "internship", "company", "organisation", "องค์กร", "บริษัท", "ฝึกงาน", "project", "rag", "chat", "rag-chat", "langgraph", "langchain", "ollama", "vector", "hybrid", "retrieval", "on-premises", "sql", "mantis", "bug tracker", "streaming", "sse", "agentic"]
    },
    {
        id: "projects-embedding-rag",
        title: "Project: embedding_rag — Vector Document Knowledge Base",
        content: "embedding_rag (Vector Docs) was built at Sycapt Co., Ltd. in Bangkok during Watcharapon's co-op internship (January to May 2025), not for the sugar mill. It is an enterprise document management and intelligent knowledge retrieval system for that company's internal documents. Documents (PDF, Word, images) are ingested through 3 pipelines: manual upload, automated email capture via n8n webhooks, and pre-processed data from an external embedding service. Each document is chunked and embedded using BGE-M3 (1024-dimensional, cross-lingual Thai/English). Images within documents are described by a vision model and embedded separately, enabling image-aware retrieval. At query time: vector cosine similarity (pgvector) and PostgreSQL full-text search run in parallel, merged by Reciprocal Rank Fusion (RRF), then re-scored by BGE-Reranker-v2-m3 cross-encoder. Final answer generated by self-hosted Llama3/Qwen via Ollama. Responses include source citations showing which file and section the information came from. All responses stream in real-time. Zero external API calls. Stack: TypeScript, PostgreSQL + pgvector, LlamaIndex, LangChain, React. GitHub: https://github.com/watcharaponthod-code/embedding_rag",
        keywords: ["sycapt", "co-op", "internship", "company", "organisation", "องค์กร", "บริษัท", "ฝึกงาน", "project", "embedding", "rag", "embedding_rag", "vector", "bge", "pgvector", "hybrid", "reranker", "rrf", "citation", "document", "knowledge base", "on-premises", "llamaindex", "ingestion"]
    },
    {
        id: "projects-bitcoin-ml",
        title: "Project: bitcoin-ml-prediction — Bitcoin Price Prediction",
        content: "bitcoin-ml-prediction is a machine learning project for Bitcoin price prediction using LSTM, XGBoost, and Random Forest ensemble trained on 12 years of BTC-USD OHLCV data (2013–2025, 4,200+ samples). LSTM handles continuous price regression with a 90-day lookback window; XGBoost and Random Forest handle directional classification. LSTM architecture: 3 stacked layers (128→64→32), Dropout(0.2), Huber loss for outlier robustness. Result: 87.81% accuracy (MAPE-based), MAE $2,847, RMSE $5,219 on held-out test data. 18 engineered technical indicators: trend (MA7/30/50, EMA12/26), momentum, volatility (Bollinger Bands), oscillators (RSI, MACD), and volume ratios. Top XGBoost features by importance: RSI, MACD Histogram, 7-day Volatility. GitHub: https://github.com/watcharaponthod-code/bitcoin-ml-prediction",
        keywords: ["project", "bitcoin", "ml", "machine learning", "lstm", "xgboost", "random forest", "prediction", "crypto", "trading", "deep learning", "time series", "technical indicators", "rsi", "macd"]
    },
    {
        id: "projects-ninja-fruit",
        title: "Project: Ninja Fruit — Body-Controlled Fruit Slash Game",
        content: "Ninja_fruit is a Fruit Ninja-style game controlled entirely by body movement using a webcam — no controller needed. YOLOv8 Pose (yolov8n-pose.pt) detects 17 keypoints and tracks up to 3 players simultaneously, assigning each by horizontal position. Hand History Buffer stores 6 frames of wrist keypoints per player. When wrist displacement exceeds 15px, a slash vector is emitted and checked against all active fruit/bomb hitboxes using line-segment to circle distance. Score: +1 per fruit, combo bonus every 3 cuts, -5 for bombs. Particle effects on every cut. 60-second countdown composited over live webcam feed at 30+ FPS via Pygame. Stack: Python, YOLOv8, OpenCV, Pygame. GitHub: https://github.com/watcharaponthod-code/Ninja_fruit",
        keywords: ["project", "ninja", "fruit", "ninja_fruit", "yolo", "yolov8", "pose", "detection", "game", "webcam", "computer vision", "pygame", "opencv", "body", "gesture"]
    },
    {
        id: "projects-subway-kids",
        title: "Project: Subway Kids — Body-Controlled Endless Runner",
        content: "subway-kids is a Subway Surfers-style endless runner controlled by body gestures via webcam. MediaPipe Pose Lite detects 33 landmarks at 60 FPS with less than 10ms CPU inference. Lane control: hip-centre x < 0.38 = Left, 0.38–0.62 = Centre, > 0.62 = Right. Jump: nose y < 0.30. Debounce 200ms prevents false positives. Two modes: Local Pygame at 60 FPS, or Web mode where the browser streams frames over WebSocket to a FastAPI server which returns lane/jump commands. Fully Dockerised with docker-compose. Stack: Python, MediaPipe, Pygame, FastAPI, Docker, TypeScript. GitHub: https://github.com/watcharaponthod-code/subway-kids",
        keywords: ["project", "subway", "kids", "subway-kids", "mediapipe", "pose", "game", "webcam", "endless runner", "pygame", "fastapi", "docker", "body", "gesture", "computer vision"]
    },
    {
        id: "projects-trading",
        title: "Project: AlgoTrade — AI Automated Trading Engine",
        content: "AlgoTrade is an AI-powered automated trading system, not just a dashboard. Every hour, a Vercel Cron Job triggers the AI trade engine: 100 hourly OHLCV bars are fetched from Alpaca Markets, RSI(14)/EMA9/EMA21/VWAP indicators are computed, and the full context is sent to Pathumma-ThaiLLM-Qwen3-8B (a Thai-developed LLM). The LLM returns a JSON decision — BUY or SELL — with take_profit_pct and stop_loss_pct, which the system executes as a real bracket order on Alpaca Markets. All AI signals and executed trades are logged to Neon PostgreSQL with the LLM's reasoning captured. Four rule-based strategies run in parallel: Momentum (EMA crossover + RSI), Mean Reversion (Bollinger Band Z-score), Statistical Arbitrage (cointegration-based spread trading), and Pairs Trading (correlation matrix). Market regime detection and adaptive position sizing based on ATR volatility. Risk management: portfolio heat limit, daily P&L cutoff, stale order cleanup. Telegram Bot alerts on every signal and execution. Real-time Next.js 16 dashboard shows portfolio equity chart, P&L history, open positions, order book. Stack: Next.js 16, TypeScript, ThaiLLM (Pathumma Qwen3-8B), Alpaca Markets API, Neon PostgreSQL, Vercel Cron, Telegram Bot, Tailwind CSS v4, Recharts, Docker. GitHub: https://github.com/watcharaponthod-code/trading",
        keywords: ["project", "trading", "algotrade", "ai trading", "thaillm", "llm trading", "alpaca", "automated trading", "algorithmic", "dashboard", "nextjs", "typescript", "bracket order", "momentum", "mean reversion", "stat arb", "pairs trading", "telegram", "cron", "vercel", "fintech", "backtesting"]
    },
    {
        id: "projects-elic",
        title: "Project: ELIC — AI English Learning Chatbot Mobile App",
        content: "ELIC (English Language Improvement Chatbot) is an AI-powered mobile application for Thai-speaking English learners. Users select a conversation role (hotel check-in, restaurant, job interview, medical consultation, meeting new people, taxi) and chat with a role-aware AI tutor powered by Google Gemini. Every Gemini response is parsed into 3 components: conversational reply, vocabulary table (English/Thai/example), and spelling/grammar correction with alternative phrasings. Text-to-speech via expo-speech or a Python FastAPI TTS server backed by Gemini's voice API. Three gamified exercises: Word Game (valid English word from random letter, validated by Gemini), Translation Game (Thai sentence scored by Gemini), Match Game (vocabulary pairing). Scores persisted to Firebase Realtime Database with a live leaderboard. Authentication via Firebase Auth with AsyncStorage offline caching. This was Watcharapon's capstone senior project at Kasetsart University — his first LLM-powered production app, which shaped his understanding of response latency, cost-per-request, and prompt engineering. Stack: React Native 0.76.9, Expo ~52.0, Google Gemini API (gemini-2.0-flash), Firebase (Auth + Firestore + Realtime DB), FastAPI TTS, GitHub Actions CI/CD + EAS Build. GitHub: https://github.com/watcharaponthod-code/elic",
        keywords: ["project", "elic", "english", "learning", "chatbot", "mobile", "react native", "expo", "gemini", "firebase", "tts", "capstone", "game", "translation", "grammar", "vocabulary", "thai"]
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
        id: "employer-tokintech",
        title: "Employer: TokinTech Co., Ltd.",
        content: "TokinTech Co., Ltd. is a Thai software and IT-systems development company headquartered in Sakon Nakhon (Chiang Khruea, Mueang Sakon Nakhon) with an office on South Sathorn Road in Bangkok. It builds mobile and web applications; its Google Play titles include QR Genius (QR code and document tracking) and CaneSlip (a sugarcane field and delivery-slip app), and it regularly hires junior web developers and testers. Watcharapon works there as the AI and MLOps engineer on the Agri-AI satellite monitoring pipeline (CropScan, Yield Pro, SAR to NDVI gapfill) and the CaneGate weighbridge system delivered to a Thai sugar mill. TokinTech is the employer; the sugar mill is the customer.",
        keywords: ["tokintech", "employer", "company", "what is tokintech", "sakon nakhon", "sathorn", "qr genius", "caneslip", "บริษัท", "นายจ้าง", "ทำงานที่ไหน", "สกลนคร", "องค์กร"]
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
        content: "Sycapt Co., Ltd. is a Thai fintech and payment-processing company in Bangkok (Phetchaburi Road, Ratchathewi), founded in 2001-2002 by a management team from the payment industry. Its business is transaction processing and transaction switching for banks, financial institutions, oil companies and fintechs: payment gateways, fleet-card systems, installment payment plans, recurring payments, Dynamic Currency Conversion, and Alipay/WeChat acquiring. It is not an AI company; the AI knowledge-management system was an internal project Watcharapon built there. Software Developer (Co-op Internship) at Sycapt Co., Ltd., Bangkok — January to May 2025. Developed full-stack Sycapt AI Enterprise on Kubernetes, built Agentic RAG Pipeline, solved GPU VRAM constraints, created EDC Geo Map, developed Kafka microservice connector, and designed CI/CD pipeline with auto rollback.",
        keywords: ["payment", "fintech", "transaction", "switching", "bank", "what does sycapt do", "บริษัทอะไร", "ทำอะไร", "การเงิน", "ธนาคาร", "experience", "work", "sycapt", "job", "internship", "co-op", "company"]
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
