
"use client";

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectDashboard } from '@/components/projects/ProjectDashboard';
import { ScriptEditor } from '@/components/editor/ScriptEditor';
import { SceneManager } from '@/components/scenes/SceneManager';
import { TimelineView } from '@/components/scenes/TimelineView';
import { ProfileEditor } from '@/components/characters/ProfileEditor';
import { ContextPanel } from '@/components/layout/ContextPanel';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const handleSelectProject = (id: string) => {
    setCurrentProjectId(id);
    setActiveSection('editor');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <ProjectDashboard onSelectProject={handleSelectProject} />;
      case 'editor':
        return <ScriptEditor />;
      case 'scenes':
        return <SceneManager />;
      case 'timeline':
        return <TimelineView />;
      case 'characters':
        return <ProfileEditor type="characters" />;
      case 'world':
        return <ProfileEditor type="world" />;
      default:
        return <ProjectDashboard onSelectProject={handleSelectProject} />;
    }
  };

  return (
    <>
      <AppLayout 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        contextPanel={<ContextPanel />}
      >
        {renderContent()}
      </AppLayout>
      <Toaster />
    </>
  );
}
