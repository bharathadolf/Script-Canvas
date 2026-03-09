
"use client";

import React from 'react';
import { ContextPanel } from './ContextPanel';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * A layout wrapper for internal project views (Editor, Timeline, etc.).
 * It integrates the AI Muse and Details tools as a side panel.
 */
export function ProjectWorkspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-8 max-w-5xl mx-auto w-full">
            {children}
          </div>
        </ScrollArea>
      </div>

      {/* Integrated Tools Panel */}
      <aside className="w-80 border-l bg-card/10 backdrop-blur-sm flex flex-col shrink-0 overflow-hidden">
        <ContextPanel />
      </aside>
    </div>
  );
}
