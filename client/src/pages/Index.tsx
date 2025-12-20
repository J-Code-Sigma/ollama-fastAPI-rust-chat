import { LlamaProvider, LlamaCppChatWidget } from '@/components/llamachat';

const serverIp = import.meta.env.VITE_LLM_SERVER_IP || 'localhost';
const serverPort = import.meta.env.VITE_LLM_SERVER_PORT || '8000';

const Index = () => {
  return (
    <LlamaProvider config={{ baseUrl: `http://${serverIp}:${serverPort}` }}>
      <div className="min-h-screen bg-background" />
      <LlamaCppChatWidget />
    </LlamaProvider>
  );
};

export default Index;
