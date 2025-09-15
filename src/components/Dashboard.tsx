import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AIChat } from '@/components/chat/AIChat';
import { IntakeToProcurement } from '@/components/workflows/IntakeToProcurement';
import { AutonomousSourcing } from '@/components/workflows/AutonomousSourcing';
import { SupplierRiskManagement } from '@/components/workflows/SupplierRiskManagement';
import { 
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  FileText,
  AlertTriangle,
  Bot,
  Zap,
  Target,
  Shield,
  Brain,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-dashboard.jpg';
import aiAgentsImage from '@/assets/ai-agents-network.jpg';
import workflowImage from '@/assets/procurement-workflow.jpg';

interface DashboardProps {
  userRole: 'cpo' | 'procurement' | 'operations' | 'finance';
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  const workflowData = {
    cpo: {
      title: 'Strategic Overview',
      subtitle: 'Executive dashboard for procurement leadership',
      keyMetrics: [
        { title: 'Total Procurement Spend', value: '$24.7M', trend: '+8%', icon: DollarSign },
        { title: 'Cost Savings Generated', value: '$3.2M', trend: '+15%', icon: TrendingUp },
        { title: 'Supplier Performance', value: '94.2%', trend: '+2%', icon: Users },
        { title: 'Process Efficiency', value: '87%', trend: '+12%', icon: Activity }
      ],
      insights: [
        'AI agents have automated 78% of routine procurement tasks this quarter',
        'Supplier diversification strategy reduced risk exposure by 23%',
        'Contract renewals due in Q1 2025: 12 major suppliers worth $5.4M'
      ]
    },
    procurement: {
      title: 'Procurement Operations',
      subtitle: 'Strategic sourcing and supplier management hub',
      keyMetrics: [
        { title: 'Active RFQs', value: '23', trend: '+5', icon: FileText },
        { title: 'Supplier Evaluations', value: '8', trend: '+3', icon: Users },
        { title: 'Negotiation Success', value: '92%', trend: '+5%', icon: Target },
        { title: 'Time to Award', value: '12d', trend: '-4d', icon: Clock }
      ],
      insights: [
        'AI sourcing agent discovered 15 new qualified suppliers this month',
        'Automated bid evaluation reduced processing time by 65%',
        'Smart contract templates accelerated negotiation cycles'
      ]
    },
    operations: {
      title: 'Operations Management',
      subtitle: 'Purchase order and transaction processing center',
      keyMetrics: [
        { title: 'Active Orders', value: '156', trend: '+12', icon: ShoppingCart },
        { title: 'Delivery Performance', value: '96%', trend: '+1%', icon: CheckCircle },
        { title: 'Invoice Accuracy', value: '98.5%', trend: '+2%', icon: FileText },
        { title: 'Exception Rate', value: '3.2%', trend: '-1.1%', icon: AlertTriangle }
      ],
      insights: [
        'AI-powered 3-way matching achieved 98.5% accuracy rate',
        'Automated receipt processing reduced manual work by 82%',
        'Mobile app usage for approvals increased by 45%'
      ]
    },
    finance: {
      title: 'Financial Control',
      subtitle: 'Spend analytics and budget management dashboard',
      keyMetrics: [
        { title: 'Monthly Spend', value: '$2.1M', trend: '+3%', icon: DollarSign },
        { title: 'Budget Utilization', value: '76%', trend: '+5%', icon: BarChart3 },
        { title: 'Payment Accuracy', value: '99.2%', trend: '+0.5%', icon: CheckCircle },
        { title: 'Cost Avoidance', value: '$185K', trend: '+18%', icon: TrendingUp }
      ],
      insights: [
        'Predictive analytics identified $340K in potential savings',
        'Automated invoice processing reduced processing time by 67%',
        'Real-time spend visibility improved budget compliance by 23%'
      ]
    }
  };

  const currentData = workflowData[userRole];

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const renderWorkflowContent = () => {
    switch (activeWorkflow) {
      case 'i2p':
        return <IntakeToProcurement />;
      case 'sourcing':
        return <AutonomousSourcing />;
      case 'risk':
        return <SupplierRiskManagement />;
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="metric-card overflow-hidden">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="AI Procurement Dashboard" 
                  className="w-full h-64 object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center p-8">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{currentData.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{currentData.subtitle}</p>
                    <div className="flex space-x-3">
                      <Button 
                        className="btn-ai"
                        onClick={() => setActiveWorkflow('i2p')}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Start AI Request
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleChatToggle}
                      >
                        <Bot className="h-4 w-4 mr-2" />
                        Chat with AI
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Key Insights */}
            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-ai-primary" />
                  <span>AI-Generated Insights</span>
                </CardTitle>
                <CardDescription>Personalized recommendations for your role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentData.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-ai-primary/5 border border-ai-primary/10">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Brain className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-sm text-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workflow Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => setActiveWorkflow('i2p')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className="status-pending">Active</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Intake-to-Procurement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered requirement capture and automated workflow processing
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">23 active requests</span>
                    <Button size="sm" variant="ghost" className="p-0 h-auto">
                      View Details →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => setActiveWorkflow('sourcing')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <Badge className="status-approved">Optimized</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Autonomous Sourcing</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-driven supplier discovery, evaluation, and contract negotiation
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">4 projects active</span>
                    <Button size="sm" variant="ghost" className="p-0 h-auto">
                      Launch Sourcing →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="metric-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => setActiveWorkflow('risk')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-warning" />
                    </div>
                    <Badge className="status-pending">2 alerts</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Risk Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Continuous supplier risk monitoring and mitigation strategies
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">147 suppliers</span>
                    <Button size="sm" variant="ghost" className="p-0 h-auto">
                      Risk Dashboard →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Multi-Agent AI Visualization */}
            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-ai-primary" />
                  <span>Multi-Agent AI System</span>
                </CardTitle>
                <CardDescription>Real-time collaboration between specialized AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={aiAgentsImage} 
                      alt="AI Agents Network" 
                      className="w-full h-48 object-cover rounded-lg opacity-80"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="agent-active text-center p-3 rounded-lg">
                        <Bot className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Intake Agent</p>
                        <p className="text-xs opacity-90">Processing 3 requests</p>
                      </div>
                      <div className="agent-active text-center p-3 rounded-lg">
                        <Target className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Sourcing Agent</p>
                        <p className="text-xs opacity-90">Evaluating 7 suppliers</p>
                      </div>
                      <div className="agent-idle text-center p-3 rounded-lg">
                        <FileText className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Negotiation Agent</p>
                        <p className="text-xs">Standby</p>
                      </div>
                      <div className="agent-active text-center p-3 rounded-lg">
                        <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Analytics Agent</p>
                        <p className="text-xs opacity-90">Generating insights</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button className="btn-ai" onClick={handleChatToggle}>
                        <Brain className="h-4 w-4 mr-2" />
                        Interact with AI System
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout 
      userRole={userRole} 
      onChatToggle={handleChatToggle} 
      isChatOpen={isChatOpen}
    >
      {activeWorkflow ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveWorkflow(null)}
            >
              ← Back to Dashboard
            </Button>
            <h2 className="text-xl font-semibold text-foreground">
              {activeWorkflow === 'i2p' && 'Intake-to-Procurement Workflow'}
              {activeWorkflow === 'sourcing' && 'Autonomous Sourcing Engine'}
              {activeWorkflow === 'risk' && 'Supplier Risk Management'}
            </h2>
          </div>
          {renderWorkflowContent()}
        </div>
      ) : (
        renderWorkflowContent()
      )}
      
      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        userRole={userRole} 
      />
    </DashboardLayout>
  );
};