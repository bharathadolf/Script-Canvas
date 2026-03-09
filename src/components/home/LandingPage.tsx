
"use client";

import React, { useState } from 'react';
import { PenTool, Sparkles, ScrollText, Users, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth, initiateEmailSignIn, initiateEmailSignUp } from '@/firebase';
import { toast } from '@/hooks/use-toast';

export function LandingPage() {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">Script Canvas</span>
          </div>
          <Button variant="ghost" className="text-sm font-medium" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need an account?" : "Already have an account?"}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                Your Story, <br />
                <span className="text-primary italic">Perfectly Structured.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                The professional workspace for screenwriters and novelists. 
                Organize your story bible, manage complex timelines, and write 
                with AI-powered inspiration.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="w-3.5 h-3.5" /> AI Muse Integrated
              </div>
              <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider text-accent">
                <ScrollText className="w-3.5 h-3.5" /> Industry Standard Formatting
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <Card className="bg-card/40 border-border/40 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {isLogin ? 'Welcome Back' : 'Create Your Studio'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="scribe@writer.com" 
                      className="bg-background/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-background/50"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button className="w-full h-12 bg-primary text-primary-foreground font-bold text-md gap-2" disabled={isLoading}>
                    {isLoading ? 'Processing...' : (isLogin ? 'Enter Workspace' : 'Get Started Free')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground italic">
                    By entering, you agree to our Terms of Service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Users}
            title="Character Bios"
            description="Deep dive into your cast's psyche with structured personality profiles and backstories."
          />
          <FeatureCard 
            icon={Globe}
            title="World Compendium"
            description="Map out locations, lore, and items in an interactive encyclopedia of your story's universe."
          />
          <FeatureCard 
            icon={Sparkles}
            title="AI Co-Writer"
            description="Beat writer's block with context-aware suggestions for dialogue and plot twists."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <PenTool className="w-4 h-4 text-primary" />
            <span className="font-bold tracking-tight text-primary">Script Canvas</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Script Canvas Studio. Built for the modern storyteller.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card/20 border border-border/40 hover:border-primary/30 transition-all group">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
