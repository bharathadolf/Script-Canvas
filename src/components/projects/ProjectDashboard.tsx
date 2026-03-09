
"use client";

import React from 'react';
import { Plus, MoreVertical, Calendar, ScrollText } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useProjectStore } from '@/lib/store';

export function ProjectDashboard({ onSelectProject }: { onSelectProject: (id: string) => void }) {
  const { projects } = useProjectStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">Your Story Library</h2>
          <p className="text-muted-foreground">Manage and develop your creative projects.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 gap-2">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="group hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden border-border/40 bg-card/40"
            onClick={() => onSelectProject(project.id)}
          >
            <div className="relative h-48 w-full">
              <Image 
                src={project.image} 
                alt={project.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="cinematic scenery"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold">
                {project.genre}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Modified {project.lastEdited}</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${project.progress}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                  <span>Drafting</span>
                  <span>{project.progress}% Complete</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t border-border/20 bg-muted/20 flex justify-between items-center px-6 py-3">
              <div className="flex items-center gap-1.5 text-xs text-primary/80">
                <ScrollText className="w-3.5 h-3.5" />
                <span>{project.scenes.length} Scenes</span>
              </div>
              <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold">
                Open Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
