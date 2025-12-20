import React, { useState } from 'react';
import { useOllama } from './OllamaProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, RefreshCw } from 'lucide-react';

export const ModelSelector: React.FC = () => {
  const { models, selectedModel, selectModel, downloadModel, fetchModels, isLoading } = useOllama();
  const [customModel, setCustomModel] = useState('');

  const handleDownload = async () => {
    if (customModel.trim()) {
      await downloadModel(customModel.trim());
      setCustomModel('');
    }
  };

  return (
    <div className="space-y-3 p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Select value={selectedModel || ''} onValueChange={selectModel}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.name} value={model.name}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size="icon"
          variant="outline"
          onClick={fetchModels}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="e.g., llama2, mistral"
          value={customModel}
          onChange={(e) => setCustomModel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
        />
        <Button
          size="icon"
          onClick={handleDownload}
          disabled={isLoading || !customModel.trim()}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
