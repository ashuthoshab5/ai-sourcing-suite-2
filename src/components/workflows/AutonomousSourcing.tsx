import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Bot, 
  Star, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  FileText,
  Zap,
  Brain,
  Target
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  certifications: string[];
  price: string;
  deliveryTime: string;
  riskScore: 'Low' | 'Medium' | 'High';
  aiScore: number;
  specialties: string[];
}

interface SourcingProject {
  id: string;
  title: string;
  category: string;
  budget: string;
  status: 'Discovery' | 'Evaluation' | 'Negotiation' | 'Awarded';
  progress: number;
  suppliersFound: number;
  dueDate: string;
}

export const AutonomousSourcing: React.FC = () => {
  const [activeProject, setActiveProject] = useState('PROJ-2024-001');

  const currentProject = {
    id: 'PROJ-2024-001',
    title: 'Marketing Campaign Management Software',
    category: 'Software & Technology',
    budget: '$50,000 - $75,000',
    description: 'Comprehensive marketing automation platform with email marketing, social media management, and analytics capabilities',
    status: 'Evaluation',
    progress: 65,
    dueDate: '2024-12-25',
    suppliersFound: 12,
    shortlisted: 5
  };

  const discoveredSuppliers: Supplier[] = [
    {
      id: 'SUP-001',
      name: 'HubSpot',
      location: 'Boston, MA',
      rating: 4.8,
      certifications: ['SOC 2', 'ISO 27001', 'GDPR'],
      price: '$72,000/year',
      deliveryTime: '2-3 weeks',
      riskScore: 'Low',
      aiScore: 95,
      specialties: ['Marketing Automation', 'CRM Integration', 'Analytics']
    },
    {
      id: 'SUP-002',
      name: 'Marketo',
      location: 'San Mateo, CA',
      rating: 4.6,
      certifications: ['SOC 2', 'ISO 27001'],
      price: '$68,500/year',
      deliveryTime: '3-4 weeks',
      riskScore: 'Low',
      aiScore: 92,
      specialties: ['Lead Management', 'Email Marketing', 'Attribution']
    },
    {
      id: 'SUP-003',
      name: 'Pardot',
      location: 'San Francisco, CA',
      rating: 4.5,
      certifications: ['SOC 2', 'FedRAMP'],
      price: '$65,000/year',
      deliveryTime: '2-3 weeks',
      riskScore: 'Low',
      aiScore: 89,
      specialties: ['B2B Marketing', 'Salesforce Integration', 'Lead Scoring']
    },
    {
      id: 'SUP-004',
      name: 'ActiveCampaign',
      location: 'Chicago, IL',
      rating: 4.7,
      certifications: ['SOC 2', 'GDPR'],
      price: '$45,000/year',
      deliveryTime: '1-2 weeks',
      riskScore: 'Medium',
      aiScore: 87,
      specialties: ['Email Automation', 'Customer Experience', 'SMS Marketing']
    },
    {
      id: 'SUP-005',
      name: 'Mailchimp',
      location: 'Atlanta, GA',
      rating: 4.4,
      certifications: ['SOC 2', 'GDPR'],
      price: '$42,000/year',
      deliveryTime: '1 week',
      riskScore: 'Low',
      aiScore: 82,
      specialties: ['Email Marketing', 'E-commerce', 'Social Media']
    }
  ];

  const sourcingProjects: SourcingProject[] = [
    {
      id: 'PROJ-2024-002',
      title: 'Cloud Infrastructure Services',
      category: 'IT Services',
      budget: '$150,000 - $200,000',
      status: 'Discovery',
      progress: 25,
      suppliersFound: 8,
      dueDate: '2025-01-15'
    },
    {
      id: 'PROJ-2024-003',
      title: 'Legal Services Retainer',
      category: 'Professional Services',
      budget: '$75,000 - $100,000',
      status: 'Negotiation',
      progress: 80,
      suppliersFound: 6,
      dueDate: '2024-12-30'
    },
    {
      id: 'PROJ-2024-004',
      title: 'Office Renovation Project',
      category: 'Construction',
      budget: '$500,000 - $750,000',
      status: 'Evaluation',
      progress: 55,
      suppliersFound: 15,
      dueDate: '2025-02-28'
    }
  ];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'status-approved';
      case 'Medium': return 'status-pending';
      case 'High': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Discovery': return 'status-pending';
      case 'Evaluation': return 'bg-primary/10 text-primary border-primary/20';
      case 'Negotiation': return 'status-pending';
      case 'Awarded': return 'status-approved';
      default: return 'status-pending';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Autonomous Sourcing Engine</h2>
          <p className="text-muted-foreground">AI-powered supplier discovery and evaluation</p>
        </div>
        <Button className="btn-ai">
          <Brain className="h-4 w-4 mr-2" />
          Launch AI Sourcing
        </Button>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Project</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Discovery</TabsTrigger>
          <TabsTrigger value="projects">All Projects</TabsTrigger>
          <TabsTrigger value="intelligence">Market Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Project Overview */}
          <Card className="metric-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{currentProject.title}</span>
                    <Badge className={getStatusColor(currentProject.status)}>
                      {currentProject.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{currentProject.description}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{currentProject.budget}</p>
                  <p className="text-sm text-muted-foreground">Budget Range</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{currentProject.suppliersFound}</p>
                  <p className="text-sm text-muted-foreground">Suppliers Found</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{currentProject.shortlisted}</p>
                  <p className="text-sm text-muted-foreground">Shortlisted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{currentProject.progress}%</p>
                  <p className="text-sm text-muted-foreground">Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">5</p>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">AI Sourcing Progress</h4>
                  <Progress value={currentProject.progress} className="w-32" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-accent/20 bg-accent/5">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Requirements Analysis</p>
                      <p className="text-xs text-muted-foreground">AI processed requirements</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-accent/20 bg-accent/5">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Supplier Discovery</p>
                      <p className="text-xs text-muted-foreground">12 suppliers identified</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
                    <Clock className="h-5 w-5 text-primary animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Bid Evaluation</p>
                      <p className="text-xs text-muted-foreground">In progress</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-muted/10">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Contract Negotiation</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card className="metric-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Discovered Suppliers</CardTitle>
                  <CardDescription>AI-powered supplier discovery and scoring</CardDescription>
                </div>
                <Badge className="bg-ai-primary/10 text-ai-primary border-ai-primary/20">
                  <Bot className="h-3 w-3 mr-1" />
                  AI Scored
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discoveredSuppliers.map((supplier, index) => (
                  <div key={supplier.id} className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {supplier.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-foreground">{supplier.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{supplier.location}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-current text-warning" />
                                <span>{supplier.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{supplier.price}</p>
                            <p className="text-xs text-muted-foreground">Annual Cost</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{supplier.deliveryTime}</p>
                            <p className="text-xs text-muted-foreground">Implementation</p>
                          </div>
                          <div>
                            <Badge className={getRiskBadgeColor(supplier.riskScore)}>
                              {supplier.riskScore} Risk
                            </Badge>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <Progress value={supplier.aiScore} className="w-16" />
                              <span className="text-sm font-medium text-ai-primary">{supplier.aiScore}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">AI Match Score</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {supplier.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {supplier.certifications.map((cert, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                              <Shield className="h-2 w-2 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" className="btn-primary">
                          <Target className="h-3 w-3 mr-1" />
                          Shortlist
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>All Sourcing Projects</CardTitle>
              <CardDescription>Active and completed sourcing initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourcingProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-foreground">{project.title}</h4>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Category: </span>
                          <span className="text-foreground">{project.category}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget: </span>
                          <span className="text-primary font-medium">{project.budget}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Suppliers: </span>
                          <span className="text-foreground">{project.suppliersFound}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due: </span>
                          <span className="text-foreground">{project.dueDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={project.progress} className="w-32" />
                        <span className="text-xs text-muted-foreground">{project.progress}%</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="metric-card-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Market Coverage</p>
                    <p className="text-2xl font-bold text-foreground">10.2M</p>
                    <p className="text-sm text-accent">Global suppliers</p>
                  </div>
                  <Search className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
                    <p className="text-2xl font-bold text-foreground">94.8%</p>
                    <p className="text-sm text-accent">Supplier matching</p>
                  </div>
                  <Bot className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card-warning">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Savings Generated</p>
                    <p className="text-2xl font-bold text-foreground">$2.1M</p>
                    <p className="text-sm text-accent">This quarter</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};