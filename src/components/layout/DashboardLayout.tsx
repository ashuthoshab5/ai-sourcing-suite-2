import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Bot,
  Building,
  FileText,
  DollarSign
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'cpo' | 'procurement' | 'operations' | 'finance';
  onChatToggle: () => void;
  isChatOpen: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userRole,
  onChatToggle,
  isChatOpen
}) => {
  const [activeAgents, setActiveAgents] = useState(['intake', 'sourcing', 'analytics']);

  const userProfiles = {
    cpo: { name: 'Sarah Chen', title: 'Chief Procurement Officer', avatar: 'SC' },
    procurement: { name: 'Mike Rodriguez', title: 'Strategic Procurement Manager', avatar: 'MR' },
    operations: { name: 'Lisa Wang', title: 'Operations Manager', avatar: 'LW' },
    finance: { name: 'David Kumar', title: 'Finance Manager', avatar: 'DK' }
  };

  const currentUser = userProfiles[userRole];

  const agentStatus = {
    intake: { name: 'Intake Agent', status: 'active', tasks: 3 },
    sourcing: { name: 'Sourcing Agent', status: 'active', tasks: 7 },
    negotiation: { name: 'Negotiation Agent', status: 'idle', tasks: 0 },
    analytics: { name: 'Analytics Agent', status: 'active', tasks: 12 },
    compliance: { name: 'Compliance Agent', status: 'idle', tasks: 1 },
    invoice: { name: 'Invoice Agent', status: 'processing', tasks: 5 }
  };

  const quickStats = {
    cpo: [
      { title: 'Total Savings', value: '$2.4M', change: '+15%', icon: DollarSign, color: 'success' },
      { title: 'Active Contracts', value: '147', change: '+8%', icon: FileText, color: 'primary' },
      { title: 'Supplier Performance', value: '94%', change: '+2%', icon: TrendingUp, color: 'success' },
      { title: 'Process Efficiency', value: '87%', change: '+12%', icon: Zap, color: 'warning' }
    ],
    procurement: [
      { title: 'Active RFQs', value: '23', change: '+5', icon: ShoppingCart, color: 'primary' },
      { title: 'Pending Approvals', value: '12', change: '-3', icon: Clock, color: 'warning' },
      { title: 'New Suppliers', value: '8', change: '+8', icon: Building, color: 'success' },
      { title: 'Cycle Time', value: '4.2d', change: '-1.8d', icon: TrendingUp, color: 'success' }
    ],
    operations: [
      { title: 'Open Orders', value: '156', change: '+12', icon: ShoppingCart, color: 'primary' },
      { title: 'Deliveries Today', value: '34', change: '+8', icon: CheckCircle, color: 'success' },
      { title: 'Exceptions', value: '5', change: '-2', icon: AlertTriangle, color: 'warning' },
      { title: 'SLA Compliance', value: '96%', change: '+1%', icon: TrendingUp, color: 'success' }
    ],
    finance: [
      { title: 'Monthly Spend', value: '$1.8M', change: '+3%', icon: DollarSign, color: 'primary' },
      { title: 'Invoice Processing', value: '98%', change: '+5%', icon: FileText, color: 'success' },
      { title: 'Cost Avoidance', value: '$340K', change: '+18%', icon: TrendingUp, color: 'success' },
      { title: 'Budget Variance', value: '2.1%', change: '-0.8%', icon: BarChart3, color: 'warning' }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">ProcureAI</span>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Enterprise
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* AI Agents Status */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">AI Agents:</span>
              <div className="flex space-x-1">
                {Object.entries(agentStatus).map(([key, agent]) => (
                  <div
                    key={key}
                    className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-accent animate-pulse' :
                      agent.status === 'processing' ? 'bg-warning animate-pulse' : 'bg-muted'
                    }`}
                    title={`${agent.name}: ${agent.status}`}
                  />
                ))}
              </div>
            </div>

            {/* Chat Toggle */}
            <Button
              onClick={onChatToggle}
              variant={isChatOpen ? "default" : "outline"}
              className="relative"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Assistant
              {activeAgents.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-accent text-accent-foreground">
                  {activeAgents.length}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.title}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-96' : ''}`}>
          {/* Quick Stats */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats[userRole].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className={`metric-card ${stat.color === 'primary' ? 'metric-card-primary' : stat.color === 'success' ? 'metric-card-success' : 'metric-card-warning'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className={`text-sm ${stat.change.startsWith('+') ? 'text-accent' : 'text-muted-foreground'}`}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <Icon className={`h-8 w-8 ${stat.color === 'primary' ? 'text-primary' : stat.color === 'success' ? 'text-accent' : 'text-warning'}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* AI Agents Overview */}
            <Card className="metric-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-ai-primary" />
                  <span>Multi-Agent AI Status</span>
                </CardTitle>
                <CardDescription>
                  Real-time status of all AI agents working on your procurement processes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(agentStatus).map(([key, agent]) => (
                    <div key={key} className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                        agent.status === 'active' ? 'agent-active' :
                        agent.status === 'processing' ? 'bg-warning/20 text-warning border border-warning/20' : 'agent-idle'
                      }`}>
                        <Brain className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium text-foreground">{agent.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{agent.status}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {agent.tasks} tasks
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Content Area */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};