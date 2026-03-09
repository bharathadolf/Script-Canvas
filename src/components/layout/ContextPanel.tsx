
"use client";

import React from 'react';
import { PromptTool } from '../ai/PromptTool';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Sparkles, BookOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ContextPanel() {
  return (
    <Tabs defaultValue="ai" className="h-full flex flex-col">
      <TabsList className="grid grid-cols-2 w-full bg-muted/20 h-12 p-0 rounded-none border-b border-border/40">
        <TabsTrigger 
          value="ai" 
          className="rounded-none h-full data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all text-xs font-bold uppercase tracking-wider gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" /> Muse AI
        </TabsTrigger>
        <TabsTrigger 
          value="bible" 
          className="rounded-none h-full data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all text-xs font-bold uppercase tracking-wider gap-2"
        >
          <BookOpen className="w-3.5 h-3.5" /> Details
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ai" className="flex-1 m-0 overflow-hidden">
        <PromptTool />
      </TabsContent>

      <TabsContent value="bible" className="flex-1 m-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Context Details</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/20 border rounded-xl p-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Active Scene</span>
                <p className="text-sm text-foreground/90 font-medium">INT. VAULT - NIGHT</p>
                <p className="text-xs text-muted-foreground mt-1">Focus: High tension heist introduction.</p>
              </div>

              <div className="bg-muted/20 border rounded-xl p-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Character Tags</span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">Kaito</span>
                  <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-1 rounded">Vault</span>
                </div>
              </div>

              <div className="bg-muted/20 border rounded-xl p-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Writing Notes</span>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  "Remember to emphasize the cold blue lighting and the constant hum of fans."
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
