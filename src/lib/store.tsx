"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Data types for the Script Canvas store.
 */
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
  genre: string;
  description: string;
  lastEdited: string;
  image: string;
  progress: number;
  scenes: Scene[];
  characters: Character[];
  worldElements: WorldElement[];
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'The Midnight Heist',
    genre: 'Neo-Noir',
    description: 'A neo-noir thriller set in the neon-soaked streets of futuristic Tokyo.',
    lastEdited: '2 hours ago',
    image: 'https://picsum.photos/seed/script1/600/400',
    progress: 45,
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
    genre: 'Fantasy',
    description: 'An epic fantasy saga about the last floating island in a world of endless clouds.',
    lastEdited: '1 day ago',
    image: 'https://picsum.photos/seed/script3/600/400',
    progress: 12,
    scenes: [],
    characters: [],
    worldElements: []
  },
  {
    id: '3',
    name: 'Neon Pulse',
    genre: 'Cyberpunk',
    description: 'A fast-paced journey through a virtual reality that has become too real.',
    lastEdited: '3 days ago',
    image: 'https://picsum.photos/seed/script2/600/400',
    progress: 89,
    scenes: [],
    characters: [],
    worldElements: []
  }
];

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  selectProject: (id: string | null) => void;
  updateActiveProject: (updated: Partial<Project>) => void;
  addScene: (scene: Scene) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  const selectProject = (id: string | null) => setActiveProjectId(id);

  const updateActiveProject = (updated: Partial<Project>) => {
    if (!activeProjectId) return;
    setProjects(prev => prev.map(p => p.id === activeProjectId ? { ...p, ...updated } : p));
  };

  const addScene = (scene: Scene) => {
    if (!activeProject) return;
    updateActiveProject({ scenes: [...activeProject.scenes, scene] });
  };

  return (
    <ProjectContext.Provider value={{ projects, activeProject, selectProject, updateActiveProject, addScene }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectStore() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectStore must be used within a ProjectProvider');
  }
  return context;
}
