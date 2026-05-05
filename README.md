# 🤖 AI-Powered Interactive Portfolio

<div align="center">
  <h3>Next-Generation Portfolio Experience</h3>
  <p><i>Powered by Google Gemini Multimodal Live API</i></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Gemini_AI-Live-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini">
    <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  </p>
</div>

---

## 🌟 Overview

ยินดีต้อนรับสู่ **Interactive AI Portfolio**! โปรเจกต์นี้ไม่ใช่แค่ Resume ทั่วไป แต่เป็นระบบที่ "มีชีวิต" ซึ่งคุณสามารถสนทนาผ่านเสียงและข้อความกับ AI Agent ได้แบบ Real-time เพื่อสอบถามข้อมูลเกี่ยวกับทักษะ ประสบการณ์ และแนวคิดเบื้องหลังการพัฒนาโปรเจกต์นี้

### 🚀 Key Highlights
- **🎙️ Real-time Multi-modal**: รองรับการโต้ตอบผ่านเสียงและข้อความด้วย Gemini Live API
- **🧠 System Brain visualization**: แสดงโครงสร้างทางตรรกะและการเชื่อมต่อของระบบ AI
- **🎨 Elite Aesthetics**: ดีไซน์ทันสมัยสไตล์ Glassmorphism พร้อม Micro-animations ที่ลื่นไหล
- **🕹️ AI Playground**: พื้นที่สำหรับทดลองเล่นกับ Prompt และพฤติกรรมของ AI ในโหมดต่างๆ

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Foundation** | React 19, Vite, TypeScript |
| **AI Integration** | Google Generative AI (Gemini Live API) |
| **State Management** | Zustand (Persistent & Reactive Store) |
| **Styling** | Vanilla CSS (Modern Custom Properties / Glassmorphism) |
| **Icons** | React Icons |
| **Deployment** | Vercel (Continuous Deployment) |

---

## 🏗️ Project Architecture

```bash
portfolio/
├── components/          # UI Components (Landing, LiveAIDemo, etc.)
├── contexts/            # Global context handling
├── lib/                 # Gemini API helpers & logic
├── hooks/               # Custom React hooks (useAudio, useGemini)
├── imge/                # Static image assets
└── index.css            # Core design system & animations
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js**: แนะนำเวอร์ชันล่าสุด (LTS)
- **Gemini API Key**: รับได้ที่ [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/watcharaponthod-code/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   สร้างไฟล์ `.env.local` และเพิ่ม API Key ของคุณ:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```

---

## 📦 Deployment

โปรเจกต์นี้รองรับการ Deploy บน **Vercel** อย่างสมบูรณ์:
1. เชื่อมต่อ Repository กับ Vercel
2. ตั้งค่า Environment Variable `GEMINI_API_KEY` ใน Vercel Dashboard
3. Vercel จะจัดการ Build และ Deploy ให้โดยอัตโนมัติ

---

## 🤝 Contact

Created by **Watcharapon** - สอบถามข้อมูลเพิ่มเติมหรือติดตามผลงานได้ที่:

<p>
  <a href="https://github.com/watcharaponthod-code">
    <img src="https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

---

<div align="center">
  <sub>&copy; 2025 Watcharapon. Licensed under Apache-2.0.</sub>
</div>
