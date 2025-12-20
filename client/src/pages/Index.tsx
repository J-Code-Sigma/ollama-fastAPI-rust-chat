import { OllamaProvider, OllamaChatWidget } from '@/components/ollama';

const serverIp = import.meta.env.VITE_LLM_SERVER_IP || 'localhost';
const serverPort = import.meta.env.VITE_LLM_SERVER_PORT || '8000';

const Index = () => {
  return (
    <OllamaProvider config={{ baseUrl: `http://${serverIp}:${serverPort}` }}>
      <div className="min-h-screen bg-background" />
      <OllamaChatWidget />
    </OllamaProvider>
  );
};

export default Index;
