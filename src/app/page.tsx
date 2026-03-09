
"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectDashboard } from '@/components/projects/ProjectDashboard';
import { ScriptEditor } from '@/components/editor/ScriptEditor';
import { SceneManager } from '@/components/scenes/SceneManager';
import { TimelineView } from '@/components/scenes/TimelineView';
import { ProfileEditor } from '@/components/characters/ProfileEditor';
import { ContextPanel } from '@/components/layout/ContextPanel';
import { LandingPage } from '@/components/home/LandingPage';
import { Toaster } from '@/components/ui/toaster';
import Loading from './loading';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  
  // Local state to prevent "flash" of landing page during auth transition
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      // Add a tiny buffer to ensure the UI doesn't flip immediately before 
      // the layout is ready to catch the auth state
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isUserLoading]);

  // While we are loading auth or in the transition buffer, show the loading screen
  if (isUserLoading || isTransitioning) {
    return <Loading />;
  }

  // If we have finished loading and there's no user, show landing
  if (!user) {
    return (
      <>
        <LandingPage />
        <Toaster />
      </>
    );
  }

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
