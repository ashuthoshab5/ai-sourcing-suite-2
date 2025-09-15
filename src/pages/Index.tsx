import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dashboard } from '@/components/Dashboard';
import { 
  Brain, 
  Users, 
  BarChart3, 
  DollarSign,
  Target,
  Shield,
  Zap,
  Bot,
  ArrowRight,
  FileText
} from 'lucide-react';
import heroImage from '@/assets/hero-dashboard.jpg';
import workflowImage from '@/assets/procurement-workflow.jpg';

type UserRole = 'cpo' | 'procurement' | 'operations' | 'finance';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const userRoles = [
    {
      id: 'cpo' as UserRole,
      title: 'Chief Procurement Officer',
      description: 'Strategic oversight, supplier portfolio management, cost optimization',
      icon: BarChart3,
      color: 'primary',
      persona: 'Sarah Chen - CPO'
    },
    {
      id: 'procurement' as UserRole,
      title: 'Strategic Procurement Manager',
      description: 'Sourcing projects, supplier evaluation, contract negotiations',
      icon: Target,
      color: 'accent',
      persona: 'Mike Rodriguez - Procurement'
    },
    {
      id: 'operations' as UserRole,
      title: 'Operations Manager',
      description: 'Purchase orders, invoice processing, delivery management',
      icon: Zap,
      color: 'warning',
      persona: 'Lisa Wang - Operations'
    },
    {
      id: 'finance' as UserRole,
      title: 'Finance Manager',
      description: 'Spend analytics, budget monitoring, financial reporting',
      icon: DollarSign,
      color: 'success',
      persona: 'David Kumar - Finance'
    }
  ];

  const keyFeatures = [
    {
      title: 'Conversational AI Interface',
      description: 'Natural language processing for requirement capture and spend analytics',
      icon: Bot
    },
    {
      title: 'Multi-Agent AI System',
      description: '6 specialized AI agents working collaboratively on complex procurement tasks',
      icon: Brain
    },
    {
      title: 'Autonomous Sourcing Engine',
      description: 'AI-powered supplier discovery, evaluation, and contract negotiation',
      icon: Target
    },
    {
      title: 'Real-time Risk Management',
      description: 'Continuous supplier monitoring with predictive risk assessment',
      icon: Shield
    }
  ];

  if (showDemo && selectedRole) {
    return <Dashboard userRole={selectedRole} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI Procurement Platform" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/50 to-accent/20" />
        </div>
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-ai-primary/10 text-ai-primary border-ai-primary/20 px-4 py-2 text-sm">
                <Brain className="h-4 w-4 mr-2" />
                Enterprise AI-Powered Procurement Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              ProcureAI
              <span className="block text-3xl md:text-4xl text-primary mt-2">
                Unified S2P • P2P • I2P Platform
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your procurement operations with intelligent automation. Reduce cycle times by 70%, 
              improve cost savings by 15%, and achieve 95% user adoption through our conversational AI interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-ai text-lg px-8 py-4"
                onClick={() => setShowDemo(true)}
              >
                <Zap className="h-5 w-5 mr-2" />
                Launch Interactive Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4"
              >
                <FileText className="h-5 w-5 mr-2" />
                View Documentation
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">70%</p>
                <p className="text-sm text-muted-foreground">Cycle Time Reduction</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">15%</p>
                <p className="text-sm text-muted-foreground">Cost Savings</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">95%</p>
                <p className="text-sm text-muted-foreground">User Adoption</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">300%</p>
                <p className="text-sm text-muted-foreground">ROI in 18 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Experience ProcureAI from Your Perspective
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your role to see personalized workflows, dashboards, and AI interactions tailored to your specific needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userRoles.map((role) => {
                const Icon = role.icon;
                return (
                  <Card 
                    key={role.id}
                    className={`metric-card cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                      selectedRole === role.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          role.color === 'primary' ? 'bg-primary/10' :
                          role.color === 'accent' ? 'bg-accent/10' :
                          role.color === 'warning' ? 'bg-warning/10' : 'bg-accent/10'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            role.color === 'primary' ? 'text-primary' :
                            role.color === 'accent' ? 'text-accent' :
                            role.color === 'warning' ? 'text-warning' : 'text-accent'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{role.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {role.persona}
                          </Badge>
                        </div>
                        {selectedRole === role.id && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <ArrowRight className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {selectedRole && (
              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="btn-primary text-lg px-8 py-4"
                  onClick={() => setShowDemo(true)}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Launch {userRoles.find(r => r.id === selectedRole)?.title} Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Revolutionary AI-First Procurement Platform
              </h2>
              <p className="text-lg text-muted-foreground">
                Built on cutting-edge multi-agent AI architecture with enterprise-grade security and scalability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="metric-card">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-ai-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-ai-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-16 text-center">
              <img 
                src={workflowImage} 
                alt="Procurement Workflow" 
                className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-ai-primary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Procurement Operations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of procurement with our interactive prototype. 
            See how AI agents can revolutionize your sourcing, risk management, and spend optimization.
          </p>
          <Button 
            size="lg" 
            className="btn-ai text-lg px-8 py-4"
            onClick={() => setShowDemo(true)}
          >
            <Brain className="h-5 w-5 mr-2" />
            Start Interactive Prototype
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
