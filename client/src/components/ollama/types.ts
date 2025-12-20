export interface OllamaModel {
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

export interface OllamaConfig {
  baseUrl?: string;
  onNavigate?: (path: string) => void;
}

export interface OllamaContextType {
  messages: ChatMessage[];
  models: OllamaModel[];
  selectedModel: string | null;
  isLoading: boolean;
  isOpen: boolean;
  isFullScreen: boolean;
  config: OllamaConfig;
  sendMessage: (content: string) => Promise<void>;
  selectModel: (modelName: string) => void;
  downloadModel: (modelName: string) => Promise<void>;
  fetchModels: () => Promise<void>;
  toggleChat: () => void;
  toggleFullScreen: () => void;
  clearMessages: () => void;
}
