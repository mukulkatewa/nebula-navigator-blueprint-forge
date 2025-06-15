
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import BlueprintSectionCard, { BlueprintSection } from './BlueprintSectionCard';

const BlueprintDisplay = ({ blueprint }: { blueprint: BlueprintSection[] }) => {
  const handleDownload = () => {
    const blueprintObject = blueprint.reduce((acc, section) => {
      acc[section.id] = section.content;
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blueprint.map((section) => (
            <BlueprintSectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default BlueprintDisplay;
