import React, { useState, useRef, useEffect } from 'react';
import { useOllama } from './OllamaProvider';
import { ChatMessage } from './ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const OllamaChatWidget: React.FC = () => {
  const { 
    messages, 
    isLoading, 
    isOpen, 
    isFullScreen,
    toggleChat, 
    toggleFullScreen,
    sendMessage, 
    clearMessages
  } = useOllama();
  
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      await sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Toggle Button - hidden when full screen */}
      {!isFullScreen && (
        <Button
          onClick={toggleChat}
          className={cn(
            'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50',
            'transition-transform hover:scale-110'
          )}
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className={cn(
          'bg-card border border-border shadow-2xl z-50 flex flex-col',
          isFullScreen 
            ? 'fixed inset-0 rounded-none' 
            : 'fixed bottom-24 right-6 w-96 h-[600px] rounded-lg'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border">
            <h3 className="font-semibold text-card-foreground">Chat</h3>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleFullScreen}
                title={isFullScreen ? 'Minimize' : 'Full screen'}
              >
                {isFullScreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={clearMessages}
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {isFullScreen && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleChat}
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm text-center">
                <p>Start a conversation</p>
              </div>
            ) : (
              <div className={cn(
                isFullScreen && 'max-w-3xl mx-auto'
              )}>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            )}
            {isLoading && (
              <div className={cn(
                'flex justify-start mb-4',
                isFullScreen && 'max-w-3xl mx-auto'
              )}>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm">
                      {import.meta.env.VITE_LOADING_MESSAGE || 'Thinking'}
                    </span>
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce delay-100">●</span>
                      <span className="animate-bounce delay-200">●</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className={cn(
            'p-4 border-t border-border',
            isFullScreen && 'max-w-3xl mx-auto w-full'
          )}>
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
