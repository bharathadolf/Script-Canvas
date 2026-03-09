
"use client";

import React from 'react';
import { useProjectStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, User, FileText, Target, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function ProfileEditor({ type }: { type: 'characters' | 'world' }) {
  const { activeProject } = useProjectStore();
  
  const items = type === 'characters' 
    ? activeProject?.characters || [] 
    : activeProject?.worldElements || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary mb-1">
            {type === 'characters' ? 'Character Profiles' : 'World Compendium'}
          </h2>
          <p className="text-muted-foreground">
            {type === 'characters' 
              ? 'Build detailed personas for your story cast.' 
              : 'Keep track of locations, lore, and significant items.'}
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 gap-2">
          <Plus className="w-4 h-4" /> Add New
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder={`Search ${type}...`} 
          className="pl-10 bg-muted/20 border-border/40 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item: any) => (
          <Card key={item.id} className="bg-card/30 border-border/40 overflow-hidden group hover:border-primary/30 transition-all">
            <CardContent className="p-0 flex h-48">
              <div className="w-48 shrink-0 bg-muted/20 relative overflow-hidden flex items-center justify-center">
                {type === 'characters' ? (
                  <User className="w-12 h-12 text-primary opacity-20" />
                ) : (
                  <MapPin className="w-12 h-12 text-primary opacity-20" />
                )}
                <img 
                  src={type === 'characters' ? 'https://picsum.photos/seed/char1/200/200' : 'https://picsum.photos/seed/loc1/200/200'}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex-1 p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">{item.name}</h3>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {item.role || item.type}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-7 border-primary/40 text-primary">Edit Profile</Button>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/80">
                    <FileText className="w-3.5 h-3.5" /> 840 Words
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/80">
                    <Target className="w-3.5 h-3.5" /> 4 Scenes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <p className="text-sm uppercase tracking-widest font-bold">Start Building your {type === 'characters' ? 'Cast' : 'World'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
