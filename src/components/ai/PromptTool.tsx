
"use client";

import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { aiCharacterWorldSuggester } from '@/ai/flows/ai-character-world-suggester';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function PromptTool() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await aiCharacterWorldSuggester({ prompt });
      setSuggestion(result.suggestion);
    } catch (error) {
      toast({
        title: "Muse Blocked",
        description: "The AI assistant is temporarily unavailable.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!suggestion) return;
    navigator.clipboard.writeText(suggestion);
    toast({
      title: "Copied!",
      description: "Suggestion copied to your clipboard.",
    });
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">The Muse</h3>
          <p className="text-[10px] text-muted-foreground font-medium">AI Creative Assistant</p>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea 
          placeholder="Describe a character trait, a mysterious room, or a cryptic motivation..."
          className="bg-muted/30 border-border/40 text-sm focus:ring-primary/20 min-h-[100px] leading-relaxed"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2 text-xs"
          onClick={handleGenerate}
          disabled={loading || !prompt}
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          {loading ? 'Consulting the Muse...' : 'Generate Suggestions'}
        </Button>
      </div>

      <Separator className="my-6 opacity-20" />

      <ScrollArea className="flex-1 -mx-2 px-2">
        {suggestion ? (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-500 relative group">
            <button 
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10 rounded-md"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap italic">
              "{suggestion}"
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center opacity-30 px-4">
            <Sparkles className="w-8 h-8 mb-3 text-primary" />
            <p className="text-[11px] font-medium leading-relaxed uppercase tracking-widest">Awaiting your creative spark...</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
