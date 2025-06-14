
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Building2, Briefcase, Users, CircleDollarSign, GanttChartSquare, ShieldCheck, Target, Replace, GitBranch, ShieldQuestion, BrainCircuit, UsersRound } from 'lucide-react';
import BudgetPieChart from './charts/BudgetPieChart';

const sectionIcons: { [key: string]: React.ElementType } = {
  organization_profile: Building2,
  executive_summary: Briefcase,
  team_structure: Users,
  budget: CircleDollarSign,
  timeline: GanttChartSquare,
  risk_register: ShieldCheck,
  success_metrics: Target,
  change_management: Replace,
  technology_roadmap: GitBranch,
  governance: ShieldQuestion,
  long_term_strategy: BrainCircuit,
};

const formatCurrency = (value: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
};

const BlueprintDisplay = ({ blueprint }: { blueprint: any }) => {
  const handleDownload = () => {
    const blueprintString = JSON.stringify(blueprint, null, 2);
    const blob = new Blob([blueprintString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aetherius-labs-blueprint.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderSectionContent = (key: string, content: any) => {
    if (key === 'budget' && typeof content === 'object' && content !== null) {
      return <BudgetPieChart data={content} />;
    }
    
    if (typeof content === 'object' && content !== null) {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {Object.entries(content).map(([subKey, subValue]) => (
            <li key={subKey}>
              <span className="font-semibold capitalize">{subKey.replace(/_/g, ' ')}:</span>{' '}
              {typeof subValue === 'number' && (subKey.includes('cost') || subKey.includes('investment') || subKey.includes('salary')) ? formatCurrency(subValue) : String(subValue)}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-neutral-300">{String(content)}</p>;
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold text-center md:text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Your AI Blueprint
        </h1>
        <Button onClick={handleDownload} className="bg-stellar/80 text-stellar-foreground hover:bg-stellar">
          <Download className="mr-2 h-4 w-4" />
          Download Blueprint
        </Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(blueprint).map(([key, value]) => {
          const Icon = sectionIcons[key] || UsersRound;
          return (
            <Card key={key} className="bg-card/70 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="capitalize">{key.replace(/_/g, ' ')}</CardTitle>
                <Icon className="h-6 w-6 text-stellar" />
              </CardHeader>
              <CardContent>
                {renderSectionContent(key, value)}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BlueprintDisplay;
