
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Briefcase, Users, CircleDollarSign, GanttChartSquare, ShieldCheck, Target, Replace, GitBranch, ShieldQuestion, BrainCircuit, UsersRound } from 'lucide-react';
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
            {typeof subValue === 'number' && (subKey.includes('cost') || subKey.includes('investment') || subKey.includes('salary')) ? formatCurrency(subValue as number) : String(subValue)}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="text-neutral-300">{String(content)}</p>;
};

export interface BlueprintSection {
    id: string;
    title: string;
    content: any;
}

const BlueprintSectionCard = ({ section }: { section: BlueprintSection }) => {
  const Icon = sectionIcons[section.id] || UsersRound;
  return (
    <Card className="bg-card/70 backdrop-blur-sm border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="capitalize">{section.title}</CardTitle>
        <Icon className="h-6 w-6 text-stellar" />
      </CardHeader>
      <CardContent>
        {renderSectionContent(section.id, section.content)}
      </CardContent>
    </Card>
  );
};

export default BlueprintSectionCard;
