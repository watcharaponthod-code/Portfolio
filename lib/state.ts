
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { Agent, ProfessionalAgent } from './presets/agents';

/**
 * User
 */
export type User = {
  name?: string;
  info?: string;
};

export const useUser = create<
  {
    setName: (name: string) => void;
    setInfo: (info: string) => void;
  } & User
>(set => ({
  name: 'Visitor',
  info: 'A professional evaluating the engineering portfolio.',
  setName: name => set({ name }),
  setInfo: info => set({ info }),
}));

/**
 * Navigation View State
 */
export type ViewType = 'landing' | 'system' | 'skills' | 'playground' | 'projects' | 'live-ai' | 'philosophy';

export const useUI = create<{
  currentView: ViewType;
  setView: (view: ViewType) => void;
  heroAnimationComplete: boolean;
  setHeroAnimationComplete: (complete: boolean) => void;
  // Deprecated but kept to prevent breaking imports temporarily
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
}>(set => ({
  currentView: 'landing',
  setView: (view) => set({ currentView: view }),
  heroAnimationComplete: false,
  setHeroAnimationComplete: (complete) => set({ heroAnimationComplete: complete }),
  showUserConfig: false,
  setShowUserConfig: (show) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show) => set({ showAgentEdit: show }),
}));

/**
 * Agents - Simplified for Portfolio
 */
export const useAgent = create<{
  current: Agent;
  setCurrent: (agent: Agent) => void;
}>(set => ({
  current: ProfessionalAgent,
  setCurrent: (agent: Agent) => set({ current: agent }),
}));
