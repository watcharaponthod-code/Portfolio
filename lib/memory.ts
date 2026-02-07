
export interface MemoryEntry {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

const MEMORY_KEY = 'ai_short_term_memory';
const MAX_MEMORY = 10;

export const saveToMemory = (role: 'user' | 'model', text: string) => {
    try {
        const existingRaw = localStorage.getItem(MEMORY_KEY);
        const memory: MemoryEntry[] = existingRaw ? JSON.parse(existingRaw) : [];

        memory.push({ role, text, timestamp: Date.now() });

        // Keep only last N entries
        const limitedMemory = memory.slice(-MAX_MEMORY);
        localStorage.setItem(MEMORY_KEY, JSON.stringify(limitedMemory));
    } catch (e) {
        console.error('Failed to save to memory', e);
    }
};

export const getMemoryString = (): string => {
    try {
        const existingRaw = localStorage.getItem(MEMORY_KEY);
        if (!existingRaw) return "";

        const memory: MemoryEntry[] = JSON.parse(existingRaw);
        if (memory.length === 0) return "";

        return memory.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
    } catch (e) {
        return "";
    }
};

export const clearMemory = () => {
    localStorage.removeItem(MEMORY_KEY);
};
