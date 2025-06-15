
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface OpportunityRecommendationProps {
  data: any;
}

const OpportunityRecommendation = ({ data }: OpportunityRecommendationProps) => {
  const renderContent = (content: any) => {
    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="border-l-4 border-stellar/50 pl-4">
              <h4 className="font-semibold capitalize text-stellar mb-2">
                {key.replace(/_/g, ' ')}
              </h4>
              <p className="text-neutral-300">{String(value)}</p>
            </div>
          ))}
        </div>
      );
    }
    return <p className="text-neutral-300">{String(content)}</p>;
  };

  return (
    <Card className="bg-card/70 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-6 w-6 text-stellar" />
          Opportunity & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent(data)}
      </CardContent>
    </Card>
  );
};

export default OpportunityRecommendation;
