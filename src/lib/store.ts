
"use client";

import { useState, useEffect } from 'react';

export type Scene = {
  id: string;
  title: string;
  type: 'slugline' | 'action' | 'character' | 'dialogue' | 'parenthetical';
  content: string;
  order: number;
};

export type Character = {
  id: string;
  name: string;
  role: string;
  description: string;
  backstory: string;
};

export type WorldElement = {
  id: string;
  name: string;
  type: 'Location' | 'Item' | 'Lore';
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  lastEdited: string;
  image: string;
  scenes: Scene[];
  characters: Character[];
  worldElements: WorldElement[];
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'The Midnight Heist',
    description: 'A neo-noir thriller set in the neon-soaked streets of futuristic Tokyo.',
    lastEdited: '2 hours ago',
    image: 'https://picsum.photos/seed/script1/600/400',
    scenes: [
      { id: 's1', title: 'Int. Vault - Night', type: 'slugline', content: 'INT. HIGH TECH VAULT - NIGHT', order: 1 },
      { id: 's2', title: 'Action: Darkness', type: 'action', content: 'Darkness. The only sound is a rhythmic electronic pulse.', order: 2 },
      { id: 's3', title: 'Character: Kaito', type: 'character', content: 'KAITO', order: 3 },
      { id: 's4', title: 'Dialogue: Almost there', type: 'dialogue', content: 'Almost... just a few more seconds.', order: 4 },
    ],
    characters: [
      { id: 'c1', name: 'Kaito', role: 'Protagonist', description: 'Expert hacker with a secret past.', backstory: 'Raised in the slums of Shinjuku...' }
    ],
    worldElements: [
      { id: 'w1', name: 'The Obsidian Tower', type: 'Location', description: 'The most secure building in the city.' }
    ]
  },
  {
    id: '2',
    name: 'Chronicles of Aetheria',
    description: 'An epic fantasy saga about the last floating island in a world of endless clouds.',
    lastEdited: '1 day ago',
    image: 'https://picsum.photos/seed/script3/600/400',
    scenes: [],
    characters: [],
    worldElements: []
  }
];

export function useProjectStore() {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  const selectProject = (id: string) => setActiveProjectId(id);

  const updateActiveProject = (updated: Partial<Project>) => {
    if (!activeProjectId) return;
    setProjects(prev => prev.map(p => p.id === activeProjectId ? { ...p, ...updated } : p));
  };

  const addScene = (scene: Scene) => {
    if (!activeProject) return;
    updateActiveProject({ scenes: [...activeProject.scenes, scene] });
  };

  return {
    projects,
    activeProject,
    selectProject,
    updateActiveProject,
    addScene
  };
}
