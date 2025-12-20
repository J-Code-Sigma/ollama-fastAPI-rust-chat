import React, { createContext, useContext, useState, useCallback } from 'react';
import { LlamacppContextType, ChatMessage, LlamacppModel, LlamacppConfig } from './types';
import { toast } from '@/hooks/use-toast';

const LlamacppContext = createContext<LlamacppContextType | undefined>(undefined);

export const useLlamacpp = () => {
  const context = useContext(LlamacppContext);
  if (!context) {
    throw new Error('useLlamacpp must be used within LlamaProvider');
  }
  return context;
};

interface LlamaProviderProps {
  children: React.ReactNode;
  config?: LlamacppConfig;
}

export const LlamaProvider: React.FC<LlamaProviderProps> = ({ children, config = {} }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [models, setModels] = useState<LlamacppModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const baseUrl = config.baseUrl || 'http://localhost:11434';

  const fetchModels = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/api/tags`);
      if (!response.ok) throw new Error('Failed to fetch models');
      const data = await response.json();
      setModels(data.models || []);
      if (data.models?.length > 0 && !selectedModel) {
        setSelectedModel(data.models[0].name);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect to Llamacpp. Make sure Llamacpp is running.',
        variant: 'destructive',
      });
    }
  }, [baseUrl, selectedModel]);

  const downloadModel = useCallback(async (modelName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: modelName }),
      });

      if (!response.ok) throw new Error('Failed to download model');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          console.log('Download progress:', text);
        }
      }

      toast({
        title: 'Success',
        description: `Model ${modelName} downloaded successfully`,
      });

      await fetchModels();
      setSelectedModel(modelName);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download model',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, fetchModels]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Send conversation history to backend
      const history = updatedMessages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: content,
          messages: history,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      // Handle response - try common response formats
      const responseText = data.response || data.text || data.content || data.message || JSON.stringify(data);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Is your LLM server running?',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, messages]);

  const selectModel = useCallback((modelName: string) => {
    setSelectedModel(modelName);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(prev => !prev);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value: LlamacppContextType = {
    messages,
    models,
    selectedModel,
    isLoading,
    isOpen,
    isFullScreen,
    config,
    sendMessage,
    selectModel,
    downloadModel,
    fetchModels,
    toggleChat,
    toggleFullScreen,
    clearMessages,
  };

  return <LlamacppContext.Provider value={value}>{children}</LlamacppContext.Provider>;
};
