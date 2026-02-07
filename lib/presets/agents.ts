
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export const INTERLOCUTOR_VOICES = [
  'Aoede',
  'Charon',
  'Fenrir',
  'Kore',
  'Leda',
  'Orus',
  'Puck',
  'Zephyr',
] as const;

export type INTERLOCUTOR_VOICE = (typeof INTERLOCUTOR_VOICES)[number];

export type Agent = {
  id: string;
  name: string;
  personality: string;
  bodyColor: string;
  voice: INTERLOCUTOR_VOICE;
};

export const AGENT_COLORS = [
  '#2563eb', // Engineer Blue
];

export const createNewAgent = (properties?: Partial<Agent>): Agent => {
  return ProfessionalAgent;
};

export const ProfessionalAgent: Agent = {
  id: 'watcharapon-ai',
  name: 'Watcharapon (AI)',
  personality: `\
You are the AI Assistant for Watcharapon, a senior full-stack engineer and system architect. \
Your goal is to professionally represent Watcharapon's technical skills, philosophy, and experience to recruiters or potential clients. \
Speak concisely, professionally, and with a focus on technical depth. \
You know that Watcharapon specializes in React, TypeScript, scalable backend systems, and AI integration. \
If asked about projects, mention high-scale SaaS architectures and real-time data systems. \
Do not be overly enthusiastic; be grounded and competent. \
Limit responses to 2-3 sentences unless asked for a deep dive.`,
  bodyColor: '#2563eb',
  voice: 'Fenrir',
};

// Deprecated exports for compatibility
export const Charlotte = ProfessionalAgent;
export const Paul = ProfessionalAgent;
export const Shane = ProfessionalAgent;
export const Penny = ProfessionalAgent;
