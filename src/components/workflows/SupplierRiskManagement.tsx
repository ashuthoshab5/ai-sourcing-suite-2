import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Globe, 
  DollarSign, 
  MapPin, 
  Calendar,
  Eye,
  Bell,
  Bot,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  FileText,
  Zap
} from 'lucide-react';

interface RiskAlert {
  id: string;
  supplierId: string;
  supplierName: string;
  type: 'financial' | 'operational' | 'compliance' | 'geographic' | 'reputation';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  date: string;
  status: 'new' | 'reviewing' | 'resolved';
}

interface SupplierRisk {
  id: string;
  name: string;
  category: string;
  riskScore: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  spend: string;
  location: string;
  lastAssessment: string;
  keyRisks: string[];
  trend: 'improving' | 'stable' | 'declining';
  contractValue: string;
  renewalDate: string;
}

export const SupplierRiskManagement: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const riskAlerts: RiskAlert[] = [
    {
      id: 'ALERT-001',
      supplierId: 'SUP-001',
      supplierName: 'GlobalTech Solutions',
      type: 'financial',
      severity: 'high',
      title: 'Credit Rating Downgrade',
      description: 'Supplier credit rating downgraded from A- to B+ by major rating agency',
      impact: 'Increased risk of service disruption, potential payment delays',
      recommendation: 'Review contract terms, consider backup suppliers',
      date: '2024-12-15',
      status: 'new'
    },
    {
      id: 'ALERT-002',
      supplierId: 'SUP-002',
      supplierName: 'Pacific Manufacturing',
      type: 'geographic',
      severity: 'critical',
      title: 'Natural Disaster Impact',
      description: 'Major supplier facility affected by regional flooding',
      impact: 'Production delays expected for 3-4 weeks, supply shortage likely',
      recommendation: 'Activate contingency plans, source alternative suppliers',
      date: '2024-12-14',
      status: 'reviewing'
    },
    {
      id: 'ALERT-003',
      supplierId: 'SUP-003',
      supplierName: 'EuroLogistics Ltd',
      type: 'compliance',
      severity: 'medium',
      title: 'Regulatory Change Impact',
      description: 'New EU regulations may affect supplier compliance status',
      impact: 'Potential compliance gaps, additional documentation required',
      recommendation: 'Schedule compliance review meeting',
      date: '2024-12-13',
      status: 'resolved'
    }
  ];

  const supplierRisks: SupplierRisk[] = [
    {
      id: 'SUP-001',
      name: 'GlobalTech Solutions',
      category: 'IT Services',
      riskScore: 75,
      riskLevel: 'High',
      spend: '$2.4M',
      location: 'Austin, TX',
      lastAssessment: '2024-12-10',
      keyRisks: ['Financial Stability', 'Key Person Risk', 'Market Competition'],
      trend: 'declining',
      contractValue: '$5.2M',
      renewalDate: '2025-03-15'
    },
    {
      id: 'SUP-002',
      name: 'Pacific Manufacturing',
      category: 'Manufacturing',
      riskScore: 85,
      riskLevel: 'Critical',
      spend: '$1.8M',
      location: 'Portland, OR',
      lastAssessment: '2024-12-14',
      keyRisks: ['Geographic Risk', 'Single Source', 'Environmental Impact'],
      trend: 'declining',
      contractValue: '$3.6M',
      renewalDate: '2025-01-30'
    },
    {
      id: 'SUP-003',
      name: 'EuroLogistics Ltd',
      category: 'Logistics',
      riskScore: 45,
      riskLevel: 'Medium',
      spend: '$890K',
      location: 'Amsterdam, NL',
      lastAssessment: '2024-12-12',
      keyRisks: ['Regulatory Changes', 'Currency Risk', 'Brexit Impact'],
      trend: 'stable',
      contractValue: '$1.8M',
      renewalDate: '2025-06-30'
    },
    {
      id: 'SUP-004',
      name: 'TechInnovate Corp',
      category: 'Software',
      riskScore: 25,
      riskLevel: 'Low',
      spend: '$650K',
      location: 'San Francisco, CA',
      lastAssessment: '2024-12-11',
      keyRisks: ['Technology Obsolescence', 'Talent Retention'],
      trend: 'improving',
      contractValue: '$1.2M',
      renewalDate: '2025-08-15'
    },
    {
      id: 'SUP-005',
      name: 'SecureData Inc',
      category: 'Cybersecurity',
      riskScore: 35,
      riskLevel: 'Low',
      spend: '$420K',
      location: 'Boston, MA',
      lastAssessment: '2024-12-09',
      keyRisks: ['Data Privacy', 'Compliance Updates'],
      trend: 'improving',
      contractValue: '$840K',
      renewalDate: '2025-04-20'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'status-rejected';
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'status-pending';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'status-pending';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'status-rejected';
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Medium': return 'status-pending';
      case 'Low': return 'status-approved';
      default: return 'status-pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'status-rejected';
      case 'reviewing': return 'status-pending';
      case 'resolved': return 'status-approved';
      default: return 'status-pending';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-accent" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-destructive" />;
      case 'stable': return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const criticalRisks = supplierRisks.filter(s => s.riskLevel === 'Critical').length;
  const highRisks = supplierRisks.filter(s => s.riskLevel === 'High').length;
  const newAlerts = riskAlerts.filter(a => a.status === 'new').length;
  const totalSpendAtRisk = supplierRisks
    .filter(s => s.riskLevel === 'Critical' || s.riskLevel === 'High')
    .reduce((sum, s) => sum + parseFloat(s.spend.replace('$', '').replace('M', '').replace('K', '')) * (s.spend.includes('M') ? 1000000 : 1000), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Supplier Risk Management</h2>
          <p className="text-muted-foreground">AI-powered risk monitoring and mitigation</p>
        </div>
        <Button className="btn-ai">
          <Shield className="h-4 w-4 mr-2" />
          Run Risk Scan
        </Button>
      </div>

      {/* Risk Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Risks</p>
                <p className="text-2xl font-bold text-foreground">{criticalRisks}</p>
                <p className="text-sm text-destructive">Immediate attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk Suppliers</p>
                <p className="text-2xl font-bold text-foreground">{highRisks}</p>
                <p className="text-sm text-warning">Requires monitoring</p>
              </div>
              <Shield className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Alerts</p>
                <p className="text-2xl font-bold text-foreground">{newAlerts}</p>
                <p className="text-sm text-accent">In last 24h</p>
              </div>
              <Bell className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Spend at Risk</p>
                <p className="text-2xl font-bold text-foreground">${(totalSpendAtRisk / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-destructive">High + Critical</p>
              </div>
              <DollarSign className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Portfolio</TabsTrigger>
          <TabsTrigger value="monitoring">Continuous Monitoring</TabsTrigger>
          <TabsTrigger value="mitigation">Risk Mitigation</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="metric-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Risk Alerts</CardTitle>
                  <CardDescription>Real-time risk notifications and recommendations</CardDescription>
                </div>
                <Badge className="bg-ai-primary/10 text-ai-primary border-ai-primary/20">
                  <Bot className="h-3 w-3 mr-1" />
                  AI Monitored
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-foreground">{alert.title}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-1">{alert.supplierName}</p>
                        <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">IMPACT</p>
                            <p className="text-sm text-foreground">{alert.impact}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">RECOMMENDATION</p>
                            <p className="text-sm text-foreground">{alert.recommendation}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Alert Date: {alert.date}</span>
                          <span>Type: {alert.type}</span>
                          <span>Supplier ID: {alert.supplierId}</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" className="btn-primary">
                          <Eye className="h-3 w-3 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Supplier Risk Portfolio</CardTitle>
              <CardDescription>Comprehensive risk assessment of all active suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierRisks.map((supplier) => (
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
                            <p className="text-sm text-muted-foreground">{supplier.category}</p>
                          </div>
                          <Badge className={getRiskLevelColor(supplier.riskLevel)}>
                            {supplier.riskLevel} Risk
                          </Badge>
                          {getTrendIcon(supplier.trend)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                          <div>
                            <p className="text-sm font-medium text-primary">{supplier.spend}</p>
                            <p className="text-xs text-muted-foreground">Annual Spend</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{supplier.contractValue}</p>
                            <p className="text-xs text-muted-foreground">Contract Value</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <p className="text-sm text-foreground">{supplier.location}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <p className="text-sm text-foreground">{supplier.renewalDate}</p>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <Progress value={supplier.riskScore} className="w-16" />
                              <span className="text-sm font-medium text-destructive">{supplier.riskScore}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Risk Score</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {supplier.keyRisks.map((risk, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {risk}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Last Assessment: {supplier.lastAssessment}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" className="btn-primary">
                          <Shield className="h-3 w-3 mr-1" />
                          Risk Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Assessment
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="metric-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-ai-primary" />
                  <span>AI Risk Monitoring</span>
                </CardTitle>
                <CardDescription>Automated continuous risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Financial Health</p>
                        <p className="text-xs text-muted-foreground">Daily credit monitoring</p>
                      </div>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/20">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Geographic Risk</p>
                        <p className="text-xs text-muted-foreground">Weather & political events</p>
                      </div>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/20">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Compliance Status</p>
                        <p className="text-xs text-muted-foreground">Regulatory updates</p>
                      </div>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/20">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Performance Metrics</p>
                        <p className="text-xs text-muted-foreground">SLA & quality tracking</p>
                      </div>
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/20">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardHeader>
                <CardTitle>Risk Trend Analysis</CardTitle>
                <CardDescription>Portfolio risk trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-accent">15%</p>
                      <p className="text-xs text-muted-foreground">Risk Reduction</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">94%</p>
                      <p className="text-xs text-muted-foreground">Coverage Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-warning">2.3h</p>
                      <p className="text-xs text-muted-foreground">Avg Response Time</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Financial Risk</span>
                        <span>↓ 12%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Operational Risk</span>
                        <span>↑ 5%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Compliance Risk</span>
                        <span>→ 0%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Geographic Risk</span>
                        <span>↓ 8%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Risk Mitigation Strategies</CardTitle>
              <CardDescription>AI-recommended actions and contingency plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">Diversification Strategy</h4>
                    <Badge className="bg-ai-primary/10 text-ai-primary border-ai-primary/20">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Recommended
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reduce single-source dependencies by identifying alternative suppliers for critical categories.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="btn-primary">
                      <Zap className="h-3 w-3 mr-1" />
                      Implement
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">Contract Restructuring</h4>
                    <Badge className="status-pending">In Progress</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Implement performance-based contracts with risk-sharing mechanisms and penalty clauses.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Progress value={65} className="w-32" />
                    <span className="text-sm text-muted-foreground">65% Complete</span>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">Enhanced Monitoring</h4>
                    <Badge className="status-approved">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Deploy advanced AI monitoring for early risk detection and automated alert systems.
                  </p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-accent">Successfully deployed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};