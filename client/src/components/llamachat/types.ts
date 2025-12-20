export interface LlamacppModel {
  name: string;
  size: string;
  digest: string;
  modified_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface LlamacppConfig {
  baseUrl?: string;
  onNavigate?: (path: string) => void;
}

export interface LlamacppContextType {
  messages: ChatMessage[];
  models: LlamacppModel[];
  selectedModel: string | null;
  isLoading: boolean;
  isOpen: boolean;
  isFullScreen: boolean;
  config: LlamacppConfig;
  sendMessage: (content: string) => Promise<void>;
  selectModel: (modelName: string) => void;
  downloadModel: (modelName: string) => Promise<void>;
  fetchModels: () => Promise<void>;
  toggleChat: () => void;
  toggleFullScreen: () => void;
  clearMessages: () => void;
}
