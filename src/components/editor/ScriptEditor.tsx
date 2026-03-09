
"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useProjectStore, Scene } from '@/lib/store';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Cloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/lib/settings-context';

export function ScriptEditor() {
  const { activeProject, updateActiveProject } = useProjectStore();
  const { settings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  
  // Effect for Auto-save simulation
  useEffect(() => {
    if (!settings.autoSave) return;
    
    const timer = setInterval(() => {
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 800);
    }, settings.autoSaveInterval * 1000);
    
    return () => clearInterval(timer);
  }, [settings.autoSave, settings.autoSaveInterval]);

  if (!activeProject) return <div>Please select a project</div>;

  const scenes = activeProject.scenes;

  const handleUpdateScene = (id: string, content: string) => {
    const newScenes = scenes.map(s => s.id === id ? { ...s, content } : s);
    updateActiveProject({ scenes: newScenes });
  };

  const handleDeleteScene = (id: string) => {
    updateActiveProject({ scenes: scenes.filter(s => s.id !== id) });
  };

  const getStyleForType = (type: Scene['type']) => {
    switch (type) {
      case 'slugline': return 'script-slugline';
      case 'action': return 'script-action';
      case 'character': return 'script-character';
      case 'dialogue': return 'script-dialogue';
      case 'parenthetical': return 'script-parenthetical';
      default: return '';
    }
  };

  const getFontFamily = () => {
    switch (settings.writingFont) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      default: return 'font-body';
    }
  };

  return (
    <div className={cn(
      "bg-card/30 rounded-2xl p-12 min-h-[1000px] border border-border/40 shadow-2xl relative animate-in fade-in zoom-in-95 duration-500",
      getFontFamily(),
      settings.writingFont === 'mono' && "font-['Courier_Prime']"
    )}>
      {/* Auto-save Indicator */}
      {settings.autoSave && (
        <div className="absolute top-4 right-6 flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          {isSaving ? (
            <Loader2 className="w-3 h-3 animate-spin text-primary" />
          ) : (
            <Cloud className="w-3 h-3 text-emerald-500" />
          )}
          {isSaving ? 'Syncing...' : 'Synced'}
        </div>
      )}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="space-y-6">
        {scenes.map((scene, idx) => (
          <div key={scene.id} className="group relative">
            <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteScene(scene.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className={cn("relative transition-all duration-300", getStyleForType(scene.type))}>
              <Textarea
                className={cn(
                  "border-none bg-transparent focus-visible:ring-1 focus-visible:ring-primary/20 resize-none min-h-[2rem] p-0 overflow-hidden leading-relaxed",
                  settings.writingFont === 'mono' ? "font-['Courier_Prime']" : ""
                )}
                value={scene.content}
                onChange={(e) => handleUpdateScene(scene.id, e.target.value)}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'inherit';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            </div>
          </div>
        ))}
        
        <div className="mt-12 flex justify-center opacity-40 hover:opacity-100 transition-opacity">
          <Button variant="outline" className="border-dashed border-2 px-12 py-8 rounded-xl bg-transparent border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-primary/50 gap-3 group">
            <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
            <span>Insert New Scene Component</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
