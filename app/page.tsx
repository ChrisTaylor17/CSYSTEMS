'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Users, Coins, QrCode, Send, Upload, Plus, TrendingUp, CheckCircle, ArrowRight, Zap, Menu, X } from 'lucide-react';

interface User {
  alias: string;
  interests: string;
  skills: string;
  wallet_address: string;
  cs_balance: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  skillsNeeded: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface Match {
  projectId: string;
  projectName: string;
  task: string;
  reward: number;
}

const mockProjects: Project[] = [
  { id: '1', name: 'Space Apps DAO', description: 'Building apps for space exploration', skillsNeeded: 'React, Design, AI' },
  { id: '2', name: 'Art Collective', description: 'Digital art marketplace', skillsNeeded: 'Design, Marketing' },
  { id: '3', name: 'Climate Action', description: 'Environmental sustainability projects', skillsNeeded: 'Data Science, Research' },
  { id: '4', name: 'Education DAO', description: 'Decentralized learning platform', skillsNeeded: 'Teaching, Development' },
];

export default function ConsilienceDAO() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'signup' | 'dashboard' | 'chatbot' | 'chatroom' | 'qr'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [qrData, setQrData] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSignup = async (alias: string, interests: string, skills: string) => {
    setLoading(true);
    // In production, create Solana wallet here
    const newUser: User = {
      alias,
      interests,
      skills,
      wallet_address: `0x${Math.random().toString(36).substring(7)}`,
      cs_balance: 0,
    };
    setUser(newUser);
    setMessages([{
      id: '1',
      sender: 'AI Assistant',
      content: `Hey ${alias}, ready to join a DAO? I'll help you find the perfect project match!`,
      timestamp: new Date(),
    }]);
    setCurrentScreen('dashboard');
    setLoading(false);
  };

  const handleFindMatches = async () => {
    if (!user) return;
    setLoading(true);
    setCurrentScreen('chatbot');

    try {
      const response = await fetch('/api/ai-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'match',
          userAlias: user.alias,
          interests: user.interests,
          skills: user.skills,
          availableProjects: mockProjects,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const match = data.match;
        const aiMessage: Message = {
          id: Date.now().toString(),
          sender: 'AI Assistant',
          content: `🎯 Perfect match found!\n\n**${match.projectName}**\n\n${match.reasoning}\n\n**Your first task:** ${match.suggestedTask}\n\n**Reward:** ${match.estimatedReward} CS tokens\n\nReady to accept?`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setCurrentMatch({
          projectId: match.projectId,
          projectName: match.projectName,
          task: match.suggestedTask,
          reward: match.estimatedReward,
        });
      }
    } catch (error) {
      console.error('Match error:', error);
      alert('Error finding matches. Please check your API configuration.');
    }
    setLoading(false);
  };

  const handleAcceptMatch = () => {
    setCurrentScreen('chatroom');
    setMessages([{
      id: Date.now().toString(),
      sender: 'System',
      content: `Welcome to the ${currentMatch?.projectName} chat room! Share your progress here.`,
      timestamp: new Date(),
    }]);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user.alias,
      content: chatInput,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setChatInput('');

    // Get AI response
    try {
      const response = await fetch('/api/ai-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          conversationHistory: messages.map(m => ({ role: m.sender === 'AI Assistant' ? 'assistant' : 'user', content: m.content })),
          userMessage: chatInput,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const aiResponse: Message = {
          id: Date.now().toString(),
          sender: 'AI Assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  const handleSubmitProof = async (proofText: string) => {
    if (!user || !currentMatch) return;
    setLoading(true);

    try {
      // Mint NFT for milestone
      const nftResponse = await fetch('/api/mint-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientAddress: user.wallet_address,
          projectName: currentMatch.projectName,
          milestone: currentMatch.task,
          teamMembers: [user.alias],
        }),
      });

      const nftData = await nftResponse.json();
      
      if (nftData.success) {
        setUser({ ...user, cs_balance: user.cs_balance + currentMatch.reward });
        const successMessage: Message = {
          id: Date.now().toString(),
          sender: 'AI Verifier',
          content: `✅ Task verified! Minted ${currentMatch.reward} CS tokens and milestone NFT!\n\nView your NFT: ${nftData.explorerUrl}`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, successMessage]);
      }
    } catch (error) {
      console.error('Proof submission error:', error);
      alert('Error submitting proof. Please check your configuration.');
    }
    setLoading(false);
  };

  const handleQRCheckIn = () => {
    const qrString = `${user?.alias}-${Date.now()}`;
    setQrData(qrString);
    setCurrentScreen('qr');
  };

  const handleSimulateScan = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress: user.wallet_address,
          projectId: currentMatch?.projectId || '1',
          qrData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setUser({ ...user, cs_balance: user.cs_balance + data.tokensEarned });
        alert(`Checked in! +${data.tokensEarned} CS tokens earned!`);
      }
    } catch (error) {
      console.error('Check-in error:', error);
      alert('Error checking in. Please check your configuration.');
    }
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Landing Page
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white">
        <nav className="border-b border-gray-900 bg-black/50 backdrop-blur-sm fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6" />
                <span className="text-xl font-bold">Consilience</span>
              </div>
              <Button onClick={() => setCurrentScreen('signup')} className="bg-white text-black hover:bg-gray-200">
                Get Started
              </Button>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Build Any DAO
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              AI-powered collaboration platform. Match with contributors, complete tasks, earn tokens, and mint NFTs for milestones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setCurrentScreen('signup')} size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8">
                Start Building <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Signup Page
  if (currentScreen === 'signup') {
    const [alias, setAlias] = useState('');
    const [interests, setInterests] = useState('');
    const [skills, setSkills] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Join Consilience DAO</CardTitle>
            <CardDescription>Create your profile to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Alias</Label>
              <Input placeholder="your.name" value={alias} onChange={(e) => setAlias(e.target.value)} />
            </div>
            <div>
              <Label>Interests</Label>
              <Input placeholder="AI, Design, Music" value={interests} onChange={(e) => setInterests(e.target.value)} />
            </div>
            <div>
              <Label>Skills</Label>
              <Input placeholder="React, Python, Marketing" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
            <Button className="w-full" onClick={() => handleSignup(alias, interests, skills)} disabled={!alias || !interests || !skills || loading}>
              {loading ? 'Creating...' : 'Create Profile'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Coins className="w-5 h-5 mr-2" />
              {user?.cs_balance} CS
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user?.alias}!</CardTitle>
              <CardDescription>Interests: {user?.interests} | Skills: {user?.skills}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleFindMatches} className="w-full" disabled={loading}>
                <Users className="mr-2" />
                {loading ? 'Finding Matches...' : 'Find Project Matches'}
              </Button>
              <Button onClick={handleQRCheckIn} variant="outline" className="w-full">
                <QrCode className="mr-2" />
                Generate Check-in QR
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockProjects.map(project => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="mt-2">
                      <Badge variant="outline">{project.skillsNeeded}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Chatbot Screen
  if (currentScreen === 'chatbot') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="h-[80vh] flex flex-col">
            <CardHeader>
              <CardTitle>AI Matchmaker</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                {messages.map(msg => (
                  <div key={msg.id} className="mb-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{msg.sender}</p>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              {currentMatch && (
                <div className="mt-4 flex gap-2">
                  <Button onClick={handleAcceptMatch} className="flex-1">
                    <CheckCircle className="mr-2" />
                    Accept Match
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentScreen('dashboard')}>
                    Decline
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Chatroom Screen
  if (currentScreen === 'chatroom') {
    const [proofText, setProofText] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentMatch?.projectName}</CardTitle>
              <CardDescription>Task: {currentMatch?.task}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-[50vh] flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4">
              <ScrollArea className="flex-1 pr-4">
                {messages.map(msg => (
                  <div key={msg.id} className="mb-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{msg.sender}</p>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submit Task Proof</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe what you completed..."
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
              />
              <Button onClick={() => handleSubmitProof(proofText)} className="w-full" disabled={!proofText || loading}>
                <Upload className="mr-2" />
                {loading ? 'Submitting...' : 'Submit Proof & Mint NFT'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // QR Screen
  if (currentScreen === 'qr') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Check-in QR Code</CardTitle>
            <CardDescription>Scan this at your workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-8 rounded-lg">
              <div className="text-center font-mono text-xs break-all">{qrData}</div>
            </div>
            <Button onClick={handleSimulateScan} className="w-full" disabled={loading}>
              {loading ? 'Processing...' : 'Simulate Scan (Demo)'}
            </Button>
            <Button variant="outline" onClick={() => setCurrentScreen('dashboard')} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
