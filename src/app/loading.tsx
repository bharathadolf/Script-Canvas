
"use client";

import React from 'react';
import { PenTool } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse mb-6 relative">
          <PenTool className="w-8 h-8 text-primary-foreground" />
          <div className="absolute -inset-2 border border-primary/20 rounded-3xl animate-[spin_3s_linear_infinite]" />
        </div>

        {/* Text and Progress Indicators */}
        <div className="text-center space-y-3">
          <h1 className="text-lg font-bold text-primary tracking-tighter uppercase font-headline">Script Canvas</h1>
          
          <div className="flex items-center gap-1.5 justify-center">
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-1 bg-accent rounded-full animate-bounce" />
          </div>
          
          <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.4em] mt-1 opacity-50">
            Studio Loading
          </p>
        </div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent rounded-full blur-[80px]" />
      </div>
    </div>
  );
}
