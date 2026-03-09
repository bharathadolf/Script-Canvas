"use client";

import React, { useState } from 'react';
import { PenTool, Sparkles, ScrollText, Users, Globe, ArrowRight, UserCircle, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from '@/firebase';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function LandingPage() {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    try {
      if (isLogin) {
        initiateEmailSignIn(auth, email, password);
      } else {
        initiateEmailSignUp(auth, email, password);
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    initiateAnonymousSignIn(auth);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden font-body">
      {/* Dynamic Background Decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <PenTool className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-primary font-headline">Script Canvas</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            >
              {isLogin ? "Join the Studio" : "Existing Scribe?"}
            </button>
            <Button variant="outline" className="border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-bold" onClick={handleDemoLogin}>
              Quick Demo
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero & Auth Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                <Zap className="w-3 h-3" /> Now with GenAI Muse 2.0
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] font-headline">
                The Canvas for <br />
                <span className="text-primary italic relative">
                  Masterpieces.
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent/30 rounded-full" />
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed font-medium">
                Ditch the linear text file. Experience a multi-dimensional workspace 
                where characters breathe, worlds connect, and your script structures 
                itself automatically.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-white/5 pt-10">
              <Stat label="Active Writers" value="12k+" />
              <Stat label="Scripts Born" value="45k+" />
              <Stat label="Studio Uptime" value="99.9%" />
            </div>
          </div>

          {/* Auth Column */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
            <Card className="bg-card/30 border-white/10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <CardContent className="p-10">
                <div className="mb-10 text-center">
                  <h2 className="text-3xl font-bold tracking-tight mb-2">
                    {isLogin ? 'Studio Entrance' : 'New Contract'}
                  </h2>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                    {isLogin ? 'Welcome back, Architect' : 'Begin your legacy today'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Secure Email</label>
                    <Input 
                      type="email" 
                      placeholder="scribe@studio.com" 
                      className="h-12 bg-background/40 border-white/10 focus:border-primary/50 transition-all rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Access Key</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 bg-background/40 border-white/10 focus:border-primary/50 transition-all rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 bg-primary text-primary-foreground font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3" disabled={isLoading}>
                    {isLoading ? 'Processing...' : (isLogin ? 'Initialize Workspace' : 'Create Profile')}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/5" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]">
                    <span className="bg-[#1a1f2e] px-4 text-muted-foreground/60">Verification Layer</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    onClick={handleDemoLogin}
                    variant="ghost" 
                    className="w-full h-12 border border-white/5 bg-white/5 hover:bg-white/10 text-foreground font-bold rounded-xl gap-2"
                    disabled={isLoading}
                  >
                    <UserCircle className="w-4 h-4 text-primary" />
                    Instant Guest Access
                  </Button>
                </div>

                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[11px] text-primary font-bold uppercase tracking-widest hover:underline transition-all underline-offset-4"
                  >
                    {isLogin ? "Don't have an account? Sign Up" : "Already a member? Sign In"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/10 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter font-headline">Crafting Without Constraints</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every tool we build is designed to keep you in the "flow state" longer.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={ShieldCheck}
              title="Secure Script Vault"
              description="End-to-end encrypted story data. Your creative secrets remain strictly yours, always."
            />
            <FeatureCard 
              icon={Globe}
              title="Lore Wiki Integration"
              description="Instantly link locations and characters. Never lose track of your story's internal logic again."
            />
            <FeatureCard 
              icon={Sparkles}
              title="Contextual Muse"
              description="An AI assistant that understands your script's current tone and helps you push through blocks."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <PenTool className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg tracking-tight text-primary font-headline">Script Canvas</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
            © 2024 SCRIPT CANVAS INTERNATIONAL. FOR ARCHITECTS OF STORY.
          </p>
          <div className="flex gap-6">
            <footerLink label="Privacy" />
            <footerLink label="Terms" />
            <footerLink label="API" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function footerLink({ label }: { label: string }) {
  return (
    <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
      {label}
    </button>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-10 rounded-3xl bg-card/20 border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{description}</p>
    </div>
  );
}
