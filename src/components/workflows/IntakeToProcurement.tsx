import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  User, 
  FileText, 
  DollarSign, 
  Calendar,
  MessageSquare,
  Bot,
  Zap
} from 'lucide-react';

interface RequestStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  assignee?: string;
  dueDate?: string;
  aiAgent?: string;
}

export const IntakeToProcurement: React.FC = () => {
  const [activeRequest, setActiveRequest] = useState('REQ-2024-001');

  const currentRequest = {
    id: 'REQ-2024-001',
    title: 'Marketing Campaign Management Software',
    requester: 'Lisa Wang - Marketing Director',
    department: 'Marketing',
    estimatedValue: '$75,000',
    urgency: 'Medium',
    status: 'In Progress',
    description: 'Need comprehensive marketing automation platform for Q1 2025 campaigns including email marketing, social media management, and analytics dashboard.',
    createdDate: '2024-12-15',
    targetDate: '2025-01-15'
  };

  const workflowSteps: RequestStep[] = [
    {
      id: 'intake',
      title: 'Requirement Capture',
      description: 'AI agent processed natural language request and extracted structured requirements',
      status: 'completed',
      assignee: 'Intake Agent',
      aiAgent: 'Intake Agent'
    },
    {
      id: 'validation',
      title: 'Budget & Compliance Check',
      description: 'Automated validation of budget availability and compliance requirements',
      status: 'completed',
      assignee: 'Compliance Agent',
      aiAgent: 'Compliance Agent'
    },
    {
      id: 'approval',
      title: 'Approval Workflow',
      description: 'Routing through department head and procurement team for approval',
      status: 'active',
      assignee: 'Mike Rodriguez',
      dueDate: '2024-12-18'
    },
    {
      id: 'sourcing',
      title: 'Supplier Discovery',
      description: 'AI-powered market research and supplier identification',
      status: 'pending',
      aiAgent: 'Sourcing Agent'
    },
    {
      id: 'evaluation',
      title: 'Vendor Evaluation',
      description: 'Automated RFQ generation and bid evaluation',
      status: 'pending',
      aiAgent: 'Sourcing Agent'
    },
    {
      id: 'selection',
      title: 'Supplier Selection',
      description: 'Final selection and contract negotiation',
      status: 'pending',
      assignee: 'Sarah Chen'
    }
  ];

  const recentRequests = [
    { id: 'REQ-2024-002', title: 'Office Furniture Upgrade', status: 'Approved', value: '$25,000', progress: 100 },
    { id: 'REQ-2024-003', title: 'IT Security Audit Services', status: 'In Review', value: '$15,000', progress: 45 },
    { id: 'REQ-2024-004', title: 'Training & Development Platform', status: 'Sourcing', value: '$40,000', progress: 70 },
    { id: 'REQ-2024-005', title: 'Legal Services Retainer', status: 'Pending', value: '$60,000', progress: 20 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-accent" />;
      case 'active': return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'status-approved';
      case 'In Review': case 'In Progress': return 'status-pending';
      case 'Sourcing': return 'status-approved';
      default: return 'status-pending';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Intake-to-Procurement (I2P)</h2>
          <p className="text-muted-foreground">AI-powered requirement capture and processing</p>
        </div>
        <Button className="btn-primary">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Request via AI Chat
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Request</TabsTrigger>
          <TabsTrigger value="pipeline">Request Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">I2P Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Active Request Details */}
          <Card className="metric-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{currentRequest.title}</span>
                    <Badge className={getStatusColor(currentRequest.status)}>
                      {currentRequest.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{currentRequest.description}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{currentRequest.estimatedValue}</p>
                  <p className="text-sm text-muted-foreground">Estimated Value</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Requester</p>
                    <p className="text-xs text-muted-foreground">{currentRequest.requester}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Target Date</p>
                    <p className="text-xs text-muted-foreground">{currentRequest.targetDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-xs text-muted-foreground">{currentRequest.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <p className="text-xs text-muted-foreground">{currentRequest.urgency}</p>
                  </div>
                </div>
              </div>

              {/* Workflow Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">Workflow Progress</h4>
                  <Progress value={50} className="w-32" />
                </div>
                
                <div className="space-y-3">
                  {workflowSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-4 p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        step.status === 'completed' ? 'workflow-step-completed' :
                        step.status === 'active' ? 'workflow-step-active' : 'workflow-step-pending'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-foreground">{step.title}</h5>
                          {step.aiAgent && (
                            <Badge variant="outline" className="bg-ai-primary/10 text-ai-primary border-ai-primary/20">
                              <Bot className="h-3 w-3 mr-1" />
                              {step.aiAgent}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        {step.assignee && !step.aiAgent && (
                          <p className="text-xs text-muted-foreground mt-1">Assigned to: {step.assignee}</p>
                        )}
                        {step.dueDate && (
                          <p className="text-xs text-warning mt-1">Due: {step.dueDate}</p>
                        )}
                      </div>

                      {step.status === 'active' && (
                        <Button size="sm" variant="outline">
                          <Zap className="h-3 w-3 mr-1" />
                          Take Action
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Request Pipeline</CardTitle>
              <CardDescription>All active procurement requests across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-foreground">{request.title}</h4>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-muted-foreground">ID: {request.id}</span>
                        <span className="text-sm font-medium text-primary">{request.value}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={request.progress} className="w-24" />
                          <span className="text-xs text-muted-foreground">{request.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="metric-card-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
                    <p className="text-2xl font-bold text-foreground">4.2 days</p>
                    <p className="text-sm text-accent">-32% from last month</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">AI Automation Rate</p>
                    <p className="text-2xl font-bold text-foreground">87%</p>
                    <p className="text-sm text-accent">+15% from last month</p>
                  </div>
                  <Bot className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card-warning">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Requests</p>
                    <p className="text-2xl font-bold text-foreground">23</p>
                    <p className="text-sm text-muted-foreground">5 due this week</p>
                  </div>
                  <FileText className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};