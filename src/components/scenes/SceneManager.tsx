
"use client";

import React from 'react';
import { useProjectStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Clock, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SceneManager() {
  const { activeProject } = useProjectStore();
  
  const sceneList = activeProject?.scenes.filter(s => s.type === 'slugline') || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">Scene Manager</h2>
        <p className="text-muted-foreground">Structure and reorganize your story beats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sceneList.map((scene, idx) => (
          <Card key={scene.id} className="bg-card/40 border-border/40 hover:border-primary/40 transition-all cursor-move group relative">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">SCENE {idx + 1}</Badge>
                <GripVertical className="w-4 h-4 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardTitle className="text-sm font-bold uppercase mt-2 tracking-wide line-clamp-1">{scene.content}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                The scene details go here... Brief description of what happens in this narrative beat.
              </p>
              <div className="flex gap-3 pt-3 border-t border-border/20">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" /> 2m
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <MapPin className="w-3 h-3" /> Location A
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <MessageSquare className="w-3 h-3" /> 4
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <button className="border-2 border-dashed border-muted/30 rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group">
          <div className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider">New Scene Card</span>
        </button>
      </div>
    </div>
  );
}

const Plus = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
