
"use client";

import React, { useState } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectWorkspace } from '@/components/layout/ProjectWorkspace';
import { ProjectDashboard } from '@/components/projects/ProjectDashboard';
import { ScriptEditor } from '@/components/editor/ScriptEditor';
import { SceneManager } from '@/components/scenes/SceneManager';
import { TimelineView } from '@/components/scenes/TimelineView';
import { ProfileEditor } from '@/components/characters/ProfileEditor';
import { LandingPage } from '@/components/home/LandingPage';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProjectStore } from '@/lib/store';
import Loading from './loading';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const { selectProject } = useProjectStore();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Determine auth state as fast as possible
  if (isUserLoading) {
    return <Loading />;
  }

  // If no user is authenticated, show the Landing Page
  if (!user) {
    return (
      <>
        <LandingPage />
        <Toaster />
      </>
    );
  }

  const handleSelectProject = (id: string) => {
    selectProject(id);
    setActiveSection('editor');
  };

  const renderContent = () => {
    // Helper to wrap project-specific views with the side panel tools (Muse AI & Details)
    const wrapInWorkspace = (content: React.ReactNode) => (
      <ProjectWorkspace>{content}</ProjectWorkspace>
    );

    switch (activeSection) {
      case 'dashboard':
        return (
          <ScrollArea className="h-full">
            <div className="p-8 max-w-7xl mx-auto w-full">
              <ProjectDashboard onSelectProject={handleSelectProject} />
            </div>
          </ScrollArea>
        );
      case 'editor':
        return wrapInWorkspace(<ScriptEditor />);
      case 'scenes':
        return wrapInWorkspace(<SceneManager />);
      case 'timeline':
        return wrapInWorkspace(<TimelineView />);
      case 'characters':
        return wrapInWorkspace(<ProfileEditor type="characters" />);
      case 'world':
        return wrapInWorkspace(<ProfileEditor type="world" />);
      default:
        return (
          <ScrollArea className="h-full">
            <div className="p-8 max-w-7xl mx-auto w-full">
              <ProjectDashboard onSelectProject={handleSelectProject} />
            </div>
          </ScrollArea>
        );
    }
  };

  return (
    <>
      <AppLayout 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
      >
        {renderContent()}
      </AppLayout>
      <Toaster />
    </>
  );
}
