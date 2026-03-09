
"use client";

import React from 'react';
import { 
  PenTool, 
  ScrollText, 
  Users, 
  Globe, 
  LayoutDashboard, 
  Settings, 
  ChevronRight, 
  Clock, 
  Sparkles,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
      active 
        ? "bg-primary text-primary-foreground shadow-lg" 
        : "text-muted-foreground hover:bg-muted hover:text-primary"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-primary-foreground" : "text-primary group-hover:scale-110 transition-transform")} />
    <span>{label}</span>
  </button>
);

export function AppLayout({ 
  children, 
  activeSection, 
  setActiveSection, 
  contextPanel 
}: { 
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (s: string) => void;
  contextPanel?: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Column 1: Navigation Sidebar */}
      <aside className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary">Script Canvas</h1>
          </div>

          <nav className="space-y-1.5">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Projects" 
              active={activeSection === 'dashboard'} 
              onClick={() => setActiveSection('dashboard')} 
            />
            <div className="pt-4 pb-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground px-4 font-bold">Project Editor</span>
            </div>
            <SidebarItem 
              icon={ScrollText} 
              label="Script Editor" 
              active={activeSection === 'editor'} 
              onClick={() => setActiveSection('editor')} 
            />
            <SidebarItem 
              icon={Layers} 
              label="Scene Manager" 
              active={activeSection === 'scenes'} 
              onClick={() => setActiveSection('scenes')} 
            />
            <SidebarItem 
              icon={Clock} 
              label="Timeline" 
              active={activeSection === 'timeline'} 
              onClick={() => setActiveSection('timeline')} 
            />
            <div className="pt-4 pb-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground px-4 font-bold">Story Bible</span>
            </div>
            <SidebarItem 
              icon={Users} 
              label="Characters" 
              active={activeSection === 'characters'} 
              onClick={() => setActiveSection('characters')} 
            />
            <SidebarItem 
              icon={Globe} 
              label="World Building" 
              active={activeSection === 'world'} 
              onClick={() => setActiveSection('world')} 
            />
          </nav>
        </div>

        <div className="mt-auto p-4 space-y-4">
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Assistant Ready</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">Need a twist? Ask the Muse in the context panel.</p>
          </div>
          <SidebarItem icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Column 2: Main Content / Editor Area */}
      <main className="flex-1 flex flex-col relative bg-background">
        <header className="h-16 border-b flex items-center justify-between px-8 bg-card/20 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">Project</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="font-medium text-sm text-primary">The Midnight Heist</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-xs border-primary/50 text-primary hover:bg-primary/10">
              Save Draft
            </Button>
            <Button variant="default" size="sm" className="text-xs bg-accent hover:bg-accent/90">
              Export Script
            </Button>
          </div>
        </header>
        <ScrollArea className="flex-1">
          <div className="p-8 max-w-5xl mx-auto w-full">
            {children}
          </div>
        </ScrollArea>
      </main>

      {/* Column 3: Contextual Info Panel */}
      <aside className="w-80 border-l bg-card/30 backdrop-blur-md flex flex-col shrink-0 overflow-hidden">
        {contextPanel}
      </aside>
    </div>
  );
}
