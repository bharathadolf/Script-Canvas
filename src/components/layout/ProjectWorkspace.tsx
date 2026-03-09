
"use client";

import React from 'react';
import { ContextPanel } from './ContextPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSettings } from '@/lib/settings-context';
import { cn } from '@/lib/utils';

/**
 * A layout wrapper for internal project views (Editor, Timeline, etc.).
 * It integrates the AI Muse and Details tools as a side panel.
 */
export function ProjectWorkspace({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  
  // Focus mode hides the right tool panel while in the editor
  const hideTools = settings.focusMode;

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          <div className={cn(
            "p-8 transition-all duration-700",
            hideTools ? "max-w-4xl mx-auto" : "max-w-5xl mx-auto"
          )}>
            {children}
          </div>
        </ScrollArea>
      </div>

      {/* Integrated Tools Panel */}
      <aside className={cn(
        "w-80 border-l bg-card/10 backdrop-blur-sm flex flex-col shrink-0 overflow-hidden transition-all duration-500",
        hideTools ? "-mr-80 opacity-0" : "mr-0 opacity-100"
      )}>
        <ContextPanel />
      </aside>
    </div>
  );
}
