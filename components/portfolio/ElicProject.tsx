import ProjectDetail from './ProjectDetail';

export default function ElicProject() {
  return (
    <ProjectDetail data={{
      id: 'elic',
      title: 'ELIC',
      role: 'SENIOR PROJECT · KU CHALERMPHRAKIAT',
      year: '2025',
      tagline: 'An AI-powered English learning mobile app focused on conversational practice for Thai university students. Your always-available language tutor.',
      overview: 'ELIC (English Language Improvement Chatbot) addresses a fundamental gap in language learning: the absence of a patient, judgment-free conversation partner available 24/7. Traditional apps use vocabulary drills and exercises; ELIC focuses on free-form conversation with real-time grammar correction, making practice feel natural rather than test-like. Developed as a Kasetsart University Computer Science co-op capstone project.',
      keyFeatures: [
        'Conversational AI tutor powered by LangChain — maintains context across the full conversation, not just single exchanges.',
        'Contextual grammar correction: errors are explained in the context of what the student was trying to say, not as abstract rules.',
        'Session-based progress tracking across multiple conversations, showing improvement trends over time.',
        'Designed specifically for Thai learners — common Thai-English interference patterns (tense confusion, article omission) are given special attention.',
        'React Native + Expo: a single codebase delivering a native-feeling experience on both iOS and Android.',
      ],
      sections: [
        {
          title: 'Conversational Architecture',
          body: 'The LangChain conversation chain maintains a rolling window of chat history, giving the AI context for multi-turn grammar corrections. A separate correction agent monitors the student\'s output and injects grammar notes as system messages, keeping them contextually relevant without interrupting the conversation flow.',
        },
        {
          title: 'The Latency Problem',
          body: 'The hardest UX challenge was latency. On desktop, a 1.5–2 second LLM response feels acceptable. On mobile, in a conversational context, it feels broken. The solution was aggressive streaming: the AI begins transmitting tokens as soon as generation starts, so the first word appears within 300ms. Combined with animated "typing" indicators, perceived latency drops dramatically.',
        },
        {
          title: 'Thai Learner Focus',
          body: 'Thai is an aspect-based language with no verb tenses, no articles, and subject-verb inversion patterns that differ from English. ELIC\'s system prompt and correction heuristics are tuned specifically for these interference patterns, producing more relevant corrections than a generic English tutor would generate.',
        },
      ],
      stack: ['React Native', 'Expo', 'TypeScript', 'LangChain', 'Node.js', 'REST API'],
      metrics: [
        { label: 'PLATFORM', value: 'IOS + ANDROID' },
        { label: 'CONTEXT', value: 'MULTI-TURN' },
        { label: 'TYPE', value: 'CAPSTONE 2025' },
        { label: 'UNIVERSITY', value: 'KU CHALERM.' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/elic',
    }} />
  );
}
