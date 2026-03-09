"use client";

import React from 'react';
import { PenTool } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.2)] animate-pulse mb-8 relative">
          <PenTool className="w-10 h-10 text-primary-foreground" />
          {/* Subtle spinning ring */}
          <div className="absolute -inset-4 border-2 border-primary/10 rounded-[2.5rem] animate-[spin_4s_linear_infinite]" />
        </div>

        {/* Text and Progress Indicators */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-primary tracking-tighter uppercase font-headline">Script Canvas</h1>
          
          <div className="flex items-center gap-1.5 justify-center">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
          </div>
          
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.4em] mt-2 opacity-60">
            Initializing Studio
          </p>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
