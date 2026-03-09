
"use client";

import React, { useState } from 'react';
import { 
  PenTool, 
  ScrollText, 
  Users, 
  Globe, 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  ChevronRight, 
  Clock, 
  Sparkles,
  Layers,
  LogOut,
  User,
  Shield,
  Bell,
  Palette,
  Eye,
  EyeOff,
  Type
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useSettings, WritingFont } from '@/lib/settings-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'danger';
};

const SidebarItem = ({ icon: Icon, label, active, onClick, variant = 'default' }: SidebarItemProps) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick?.();
    }}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
      active 
        ? "bg-primary text-primary-foreground shadow-lg" 
        : variant === 'danger'
          ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          : "text-muted-foreground hover:bg-muted hover:text-primary"
    )}
  >
    <Icon className={cn("w-4 h-4", active ? "text-primary-foreground" : variant === 'danger' ? "text-destructive" : "text-primary group-hover:scale-110 transition-transform")} />
    <span>{label}</span>
  </button>
);

export function AppLayout({ 
  children, 
  activeSection, 
  setActiveSection, 
}: { 
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (s: string) => void;
}) {
  const auth = useAuth();
  const { user } = useUser();
  const { settings, updateSettings } = useSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  const isFocusActive = settings.focusMode && activeSection === 'editor';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Column 1: Navigation Sidebar */}
      <aside className={cn(
        "w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col shrink-0 transition-all duration-500",
        isFocusActive ? "-ml-64 opacity-0 pointer-events-none" : "ml-0 opacity-100"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary">Script Canvas</h1>
          </div>

          <nav className="space-y-1.5">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Projects" 
              active={activeSection === 'dashboard'} 
              onClick={() => setActiveSection('dashboard')} 
            />
            <div className="pt-4 pb-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground px-4 font-bold">Project Editor</span>
            </div>
            <SidebarItem 
              icon={ScrollText} 
              label="Script Editor" 
              active={activeSection === 'editor'} 
              onClick={() => setActiveSection('editor')} 
            />
            <SidebarItem 
              icon={Layers} 
              label="Scene Manager" 
              active={activeSection === 'scenes'} 
              onClick={() => setActiveSection('scenes')} 
            />
            <SidebarItem 
              icon={Clock} 
              label="Timeline" 
              active={activeSection === 'timeline'} 
              onClick={() => setActiveSection('timeline')} 
            />
            <div className="pt-4 pb-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground px-4 font-bold">Story Bible</span>
            </div>
            <SidebarItem 
              icon={Users} 
              label="Characters" 
              active={activeSection === 'characters'} 
              onClick={() => setActiveSection('characters')} 
            />
            <SidebarItem 
              icon={Globe} 
              label="World Building" 
              active={activeSection === 'world'} 
              onClick={() => setActiveSection('world')} 
            />
          </nav>
        </div>

        <div className="mt-auto p-4 space-y-4">
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 text-primary mb-2 px-4">
              <span className="text-[10px] font-bold uppercase tracking-wider truncate max-w-[120px]">
                {user?.isAnonymous ? 'Guest Architect' : (user?.email || 'Authenticated')}
              </span>
            </div>
            <div className="space-y-1">
              <SidebarItem 
                icon={SettingsIcon} 
                label="Settings" 
                onClick={() => setIsSettingsOpen(true)} 
              />
              <SidebarItem 
                icon={LogOut} 
                label="Sign Out" 
                variant="danger" 
                onClick={handleSignOut} 
              />
            </div>
          </div>
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Muse Ready</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">Contextual AI tools available in your workspace.</p>
          </div>
        </div>
      </aside>

      {/* Column 2: Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-background overflow-hidden">
        <header className={cn(
          "h-16 border-b flex items-center justify-between px-8 bg-card/20 sticky top-0 z-10 transition-all duration-500",
          isFocusActive ? "opacity-30 hover:opacity-100" : "opacity-100"
        )}>
          <div className="flex items-center gap-3">
            {isFocusActive && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 text-primary" 
                onClick={() => updateSettings({ focusMode: false })}
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            )}
            <span className="text-muted-foreground text-sm">Project</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="font-medium text-sm text-primary">The Midnight Heist</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-xs border-primary/50 text-primary hover:bg-primary/10">
              Save Draft
            </Button>
            <Button variant="default" size="sm" className="text-xs bg-accent hover:bg-accent/90">
              Export Script
            </Button>
          </div>
        </header>
        {/* Main Content Viewport */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-2xl bg-card border-border/40">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <SettingsIcon className="w-6 h-6" /> Studio Settings
            </DialogTitle>
            <DialogDescription>
              Configure your writing environment and account preferences.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-4 gap-6 mt-6">
            <aside className="col-span-1 space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-muted/50 text-primary">
                <User className="w-4 h-4" /> Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                <Palette className="w-4 h-4" /> Appearance
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                <Bell className="w-4 h-4" /> Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                <Shield className="w-4 h-4" /> Security
              </Button>
            </aside>

            <div className="col-span-3 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Workspace Profile</h3>
                <div className="grid gap-4 p-4 rounded-xl bg-muted/20 border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Account Type</p>
                      <p className="text-xs text-muted-foreground">{user?.isAnonymous ? 'Guest Scribe' : 'Professional Member'}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Identifier</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{user?.email || user?.uid}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Editor Preferences</h3>
                <div className="grid gap-4 p-4 rounded-xl bg-muted/20 border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Focus Mode</p>
                      <p className="text-[10px] text-muted-foreground italic">Hides sidebars while editing scripts.</p>
                    </div>
                    <Switch 
                      checked={settings.focusMode} 
                      onCheckedChange={(val) => updateSettings({ focusMode: val })} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">Writing Font</p>
                      <p className="text-[10px] text-muted-foreground italic">Choose your preferred script typeface.</p>
                    </div>
                    <Select 
                      value={settings.writingFont} 
                      onValueChange={(val: WritingFont) => updateSettings({ writingFont: val })}
                    >
                      <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="Select Font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sans">Modern Sans</SelectItem>
                        <SelectItem value="serif">Classic Serif</SelectItem>
                        <SelectItem value="mono">Typewriter Mono</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Auto-save</p>
                    <Switch 
                      checked={settings.autoSave} 
                      onCheckedChange={(val) => updateSettings({ autoSave: val })} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
