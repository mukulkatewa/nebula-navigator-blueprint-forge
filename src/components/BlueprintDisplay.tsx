
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import OpportunityRecommendation from './OpportunityRecommendation';
import ImplementationRoadmap from './ImplementationRoadmap';
import SwotAnalysis from './SwotAnalysis';
import CostBreakdown from './CostBreakdown';

const BlueprintDisplay = ({ blueprint }: { blueprint: any[] }) => {
  const handleDownload = () => {
    const blueprintObject = blueprint.reduce((acc, section, index) => {
      acc[`agent_${index + 1}`] = section;
      return acc;
    }, {} as Record<string, any>);

    const blueprintString = JSON.stringify(blueprintObject, null, 2);
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
      
      <Tabs defaultValue="opportunity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunity">Opportunity & Recommendation</TabsTrigger>
          <TabsTrigger value="roadmap">Implementation Roadmap</TabsTrigger>
          <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
          <TabsTrigger value="cost">Cost Breakdown</TabsTrigger>
        </TabsList>
        
        <TabsContent value="opportunity" className="mt-6">
          <OpportunityRecommendation data={blueprint[0]} />
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-6">
          <ImplementationRoadmap data={blueprint[1]} />
        </TabsContent>
        
        <TabsContent value="swot" className="mt-6">
          <SwotAnalysis data={blueprint[2]} />
        </TabsContent>
        
        <TabsContent value="cost" className="mt-6">
          <CostBreakdown data={blueprint[3]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlueprintDisplay;
