
"use client";

import React from 'react';
import { useProjectStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Flag, Star } from 'lucide-react';

export function TimelineView() {
  const { activeProject } = useProjectStore();
  const scenes = activeProject?.scenes.filter(s => s.type === 'slugline') || [];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">Plot Timeline</h2>
        <p className="text-muted-foreground">Visualize the narrative arc of your story.</p>
      </div>

      <div className="relative pt-8 pb-12">
        {/* The Timeline Track */}
        <div className="absolute top-[102px] left-0 right-0 h-1.5 bg-muted-foreground/10 rounded-full" />
        
        <div className="flex gap-8 overflow-x-auto pb-8 relative snap-x">
          {scenes.map((scene, idx) => (
            <div key={scene.id} className="shrink-0 w-64 snap-start relative pt-12">
              {/* Connector Dot */}
              <div className="absolute top-[46px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background bg-primary z-10" />
              
              <Card className="bg-card/40 border-border/40 hover:border-primary/50 transition-all p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-primary tracking-tighter uppercase">ACT I</span>
                  {idx === 0 && <Star className="w-3 h-3 text-accent fill-accent" />}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wide truncate">{scene.content}</h4>
                <div className="h-12 text-[10px] text-muted-foreground line-clamp-2 leading-normal">
                  Kaito successfully infiltrates the tower, but finds something unexpected.
                </div>
                <div className="pt-2 flex justify-between items-center text-[9px] font-bold text-muted-foreground/60 border-t border-border/20">
                  <span>PAGE {idx * 5 + 1}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Card>
            </div>
          ))}

          <div className="shrink-0 w-64 snap-start relative pt-12 flex items-center justify-center">
            <div className="absolute top-[46px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background bg-muted z-10" />
            <button className="border-2 border-dashed border-muted/30 rounded-xl w-full h-full p-8 text-muted-foreground hover:text-primary transition-colors flex flex-col items-center justify-center gap-2">
              <Flag className="w-5 h-5 opacity-40" />
              <span className="text-[10px] font-bold uppercase tracking-widest">End of Script</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card/30 border border-primary/20 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-primary uppercase mb-4 flex items-center gap-2">
            <Flag className="w-4 h-4" /> Inciting Incident
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Scene 3: Kaito receives a mysterious call that changes everything about the job.
          </p>
        </div>
        <div className="bg-card/30 border border-border/40 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">Midpoint</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Undetermined: The stakes should escalate here.
          </p>
        </div>
        <div className="bg-card/30 border border-border/40 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">Climax</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Undetermined: Final confrontation.
          </p>
        </div>
      </div>
    </div>
  );
}
