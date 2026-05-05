import ProjectDetail from './ProjectDetail';

const B = 'https://raw.githubusercontent.com/watcharaponthod-code/elic/main';

export default function ElicProject() {
  return (
    <ProjectDetail data={{
      id: 'elic',
      title: 'ELIC',
      role: 'SENIOR PROJECT · KU CHALERMPHRAKIAT',
      year: '2025',
      tagline: 'An AI-powered mobile English learning app for Thai university students — scenario-based conversation with real-time grammar correction, vocabulary breakdowns, and gamified exercises.',
      overview: 'ELIC (English Language Improvement Chatbot) places Thai learners inside realistic conversational scenarios — a hotel check-in, a job interview, a medical consultation — and guides them with a role-aware AI tutor powered by Google Gemini. Every AI response is structured into three components: a conversational reply, a vocabulary table (English/Thai/example), and real-time spelling and grammar corrections with alternative phrasings. Three gamified exercises reinforce skills outside the chat context. Scores are persisted to Firebase with a live leaderboard. Developed as Watcharapon\'s Kasetsart University capstone project — his first LLM-powered production app, which directly shaped his understanding of response latency, cost-per-request, and prompt engineering trade-offs.',
      mediaGallery: [
        { src: `${B}/architecture-diagram.svg`, caption: 'ELIC_ARCHITECTURE // 3-LAYER: REACT NATIVE CLIENT → FIREBASE BACKEND → GOOGLE GEMINI AI' },
        { src: `${B}/assets/elic2.jpg`, caption: 'ELIC_APP // CONVERSATION SCREEN — SCENARIO-BASED ROLE SELECTION' },
        { src: `${B}/assets/elic3.png`, caption: 'ELIC_APP // STRUCTURED RESPONSE: CHAT REPLY + VOCABULARY TABLE + GRAMMAR CORRECTION' },
        { src: `${B}/assets/elic.png`, caption: 'ELIC_APP // GAMIFIED EXERCISES — WORD GAME · TRANSLATION GAME · MATCH' },
      ],
      keyFeatures: [
        'Six conversation roles (hotel, restaurant, job interview, medical, social, taxi) — each injects a tailored system prompt into Gemini, ensuring domain-appropriate tutoring throughout the session.',
        'Structured AI response parsing: every Gemini response is decomposed into conversational reply, vocabulary table, and spelling/grammar correction — rendered as three separate UI components.',
        'Text-to-speech via two pathways: expo-speech for immediate on-device playback, or a Python FastAPI server backed by Gemini\'s voice API for higher-quality audio output.',
        'Three gamified exercises: Word Game (Gemini validates English words from random letters), Translation Game (Gemini scores Thai-to-English translations), Match Game (vocabulary pairing).',
        'Firebase Auth with AsyncStorage offline caching — session persists across app restarts without a network round-trip.',
        'Live leaderboard with per-user rank tracking across all game scores in Firebase Realtime Database.',
      ],
      sections: [
        {
          title: 'Architecture Overview',
          body: 'Three-layer design: Client (React Native 0.76.9 + Expo ~52.0, React Navigation 7), Backend (Firebase Auth, Cloud Firestore, Realtime Database, AsyncStorage), AI Services (Google Gemini API gemini-2.0-flash for conversation/scoring/validation, Python FastAPI TTS server for voice output). All AI calls go through the Gemini API — no self-hosted LLM required.',
        },
        {
          title: 'LLM Workflow',
          body: 'User selects a role → getRolePrompt.js generates a domain-specific system prompt → ChatScreen assembles payload (system prompt + conversation history + user message) → POST to Gemini API → structured JSON response parsed into reply, vocabulary, and correction components → rendered independently in the UI → optional TTS playback via expo-speech or FastAPI voice server.',
        },
        {
          title: 'The Latency Problem',
          body: 'On mobile, in a conversational context, a 1.5–2 second LLM response feels broken rather than just slow. The solution was aggressive streaming: the AI begins transmitting tokens immediately, so the first word appears within ~300ms. Combined with animated typing indicators, perceived latency drops significantly. This was the key UX lesson from this project that carried into all subsequent RAG work.',
        },
        {
          title: 'Thai Learner Focus',
          body: 'Thai is an aspect-based language with no verb tenses, no articles, and subject-verb inversion patterns that differ from English. ELIC\'s system prompt and correction heuristics are tuned specifically for these interference patterns — common Thai-English errors (tense confusion, article omission, word order) receive targeted correction rather than generic grammar feedback.',
        },
        {
          title: 'CI/CD & Build Pipeline',
          body: 'GitHub Actions workflow builds the APK through EAS (Expo Application Services) and uploads the artifact to Google Drive automatically. Two build profiles: preview and production. Requires EXPO_TOKEN and MATON_API_KEY as repository secrets.',
        },
      ],
      stack: ['React Native 0.76.9', 'Expo ~52.0', 'Google Gemini API', 'Firebase Auth', 'Cloud Firestore', 'Firebase Realtime DB', 'FastAPI TTS', 'AsyncStorage', 'GitHub Actions', 'EAS Build'],
      metrics: [
        { label: 'PLATFORM', value: 'IOS + ANDROID' },
        { label: 'AI MODEL', value: 'GEMINI 2.0 FLASH' },
        { label: 'ROLES', value: '6 SCENARIOS' },
        { label: 'TYPE', value: 'CAPSTONE 2025' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/elic',
    }} />
  );
}
