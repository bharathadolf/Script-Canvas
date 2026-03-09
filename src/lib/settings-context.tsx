
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type WritingFont = 'sans' | 'serif' | 'mono';

interface Settings {
  focusMode: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
  writingFont: WritingFont;
  fontSize: number;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  focusMode: false,
  autoSave: true,
  autoSaveInterval: 30,
  writingFont: 'sans',
  fontSize: 16,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
