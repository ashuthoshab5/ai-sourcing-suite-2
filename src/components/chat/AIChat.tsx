import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  FileText, 
  ShoppingCart, 
  BarChart3,
  X,
  Maximize2,
  Minimize2,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  agent?: string;
  actions?: Array<{
    label: string;
    type: 'primary' | 'secondary';
    onClick: () => void;
  }>;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'cpo' | 'procurement' | 'operations' | 'finance';
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, userRole }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI Procurement Assistant. I can help you with intake requests, spend analysis, supplier insights, and workflow automation. What would you like to accomplish today?`,
      timestamp: new Date(),
      agent: 'Intake Agent'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, userRole);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string, role: string): ChatMessage => {
    const lowerInput = input.toLowerCase();
    
    // Intake Request Flow
    if (lowerInput.includes('request') || lowerInput.includes('purchase') || lowerInput.includes('buy')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `I'll help you create a new procurement request. Let me gather some details:\n\n• What type of goods or services do you need?\n• What's your estimated budget?\n• When do you need this by?\n• Are there any specific requirements or preferences?`,
        timestamp: new Date(),
        agent: 'Intake Agent',
        actions: [
          {
            label: 'Start Intake Wizard',
            type: 'primary',
            onClick: () => console.log('Starting intake wizard')
          },
          {
            label: 'Upload Requirements Doc',
            type: 'secondary',
            onClick: () => console.log('Upload document')
          }
        ]
      };
    }

    // Spend Analysis Flow
    if (lowerInput.includes('spend') || lowerInput.includes('analytics') || lowerInput.includes('report')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `I can provide detailed spend analytics. Based on your role as ${role === 'cpo' ? 'CPO' : role === 'finance' ? 'Finance Manager' : 'Procurement Professional'}, here are some insights:\n\n• Total spend this month: $1.8M (3% increase)\n• Top spending categories: IT Services (32%), Office Supplies (18%)\n• Savings opportunities identified: $125K potential\n• 5 contracts expiring in next 30 days`,
        timestamp: new Date(),
        agent: 'Analytics Agent',
        actions: [
          {
            label: 'View Full Dashboard',
            type: 'primary',
            onClick: () => console.log('Opening analytics dashboard')
          },
          {
            label: 'Export Report',
            type: 'secondary',
            onClick: () => console.log('Exporting report')
          }
        ]
      };
    }

    // Supplier Management
    if (lowerInput.includes('supplier') || lowerInput.includes('vendor')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `I can help with supplier management. Here's what I found:\n\n• 147 active suppliers in your network\n• 3 suppliers with performance issues requiring attention\n• 8 new supplier applications pending review\n• Average supplier rating: 4.2/5\n\nWould you like me to show details for any specific supplier?`,
        timestamp: new Date(),
        agent: 'Sourcing Agent',
        actions: [
          {
            label: 'View Supplier Scorecards',
            type: 'primary',
            onClick: () => console.log('Opening supplier scorecards')
          },
          {
            label: 'Risk Assessment',
            type: 'secondary',
            onClick: () => console.log('Running risk assessment')
          }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: `I understand you're asking about "${input}". I can help you with:\n\n• Creating new procurement requests\n• Analyzing spend and generating reports\n• Managing suppliers and contracts\n• Automating approval workflows\n• Tracking orders and deliveries\n\nWhat specific task would you like to accomplish?`,
      timestamp: new Date(),
      agent: 'General Assistant'
    };
  };

  const suggestedActions = {
    cpo: [
      { label: 'Show Strategic Dashboard', icon: BarChart3, action: 'analytics dashboard' },
      { label: 'Supplier Performance Review', icon: BarChart3, action: 'supplier analytics' },
      { label: 'Contract Renewals Due', icon: FileText, action: 'contract renewals' }
    ],
    procurement: [
      { label: 'Create RFQ', icon: FileText, action: 'create rfq' },
      { label: 'Review Pending Bids', icon: ShoppingCart, action: 'pending bids' },
      { label: 'Supplier Discovery', icon: BarChart3, action: 'find suppliers' }
    ],
    operations: [
      { label: 'Track Open Orders', icon: ShoppingCart, action: 'order status' },
      { label: 'Process Receipts', icon: FileText, action: 'process receipts' },
      { label: 'Exception Handling', icon: BarChart3, action: 'handle exceptions' }
    ],
    finance: [
      { label: 'Spend Analysis', icon: BarChart3, action: 'spend analytics' },
      { label: 'Budget Variance Report', icon: FileText, action: 'budget variance' },
      { label: 'Invoice Processing', icon: ShoppingCart, action: 'invoice status' }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-16 bottom-0 bg-card border-l border-border shadow-2xl transition-all duration-300 z-40 ${
      isExpanded ? 'w-full md:w-2/3 lg:w-1/2' : 'w-96'
    }`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary flex items-center justify-center animate-ai-pulse">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Procurement Assistant</h3>
            <p className="text-xs text-muted-foreground">Multi-agent system active</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {message.agent}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  {message.actions && (
                    <div className="flex space-x-2 mt-3">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={action.type === 'primary' ? 'default' : 'outline'}
                          onClick={action.onClick}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {message.type === 'user' && (
                  <div className="flex items-center justify-end space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    <User className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary flex items-center justify-center animate-pulse">
                  <Bot className="h-3 w-3 text-white" />
                </div>
                <div className="chat-bubble-ai p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border bg-muted/20">
        <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
        <div className="flex flex-wrap gap-1">
          {suggestedActions[userRole].map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-xs h-8"
                onClick={() => setInputValue(action.action)}
              >
                <Icon className="h-3 w-3 mr-1" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about procurement, suppliers, analytics..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};