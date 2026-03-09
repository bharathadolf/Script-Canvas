
"use client";

import React from 'react';
import { PenTool } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center animate-in fade-in duration-300">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg mb-4">
          <PenTool className="w-6 h-6 text-primary-foreground animate-pulse" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xs font-bold text-primary uppercase tracking-[0.3em] font-headline">Script Canvas</h1>
          <div className="flex items-center gap-1 justify-center">
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
