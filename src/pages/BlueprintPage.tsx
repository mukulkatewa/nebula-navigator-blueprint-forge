
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { generateBlueprint } from '@/lib/lyzrApi';
import Starfield from '@/components/Starfield';
import BlueprintDisplay from '@/components/BlueprintDisplay';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const BlueprintPage = () => {
  const location = useLocation();
  const answers = location.state?.answers;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blueprint', answers],
    queryFn: () => generateBlueprint(answers),
    enabled: !!answers, // Only run the query if answers exist
  });

  const renderContent = () => {
    if (!answers) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No questionnaire data found. Please start from the beginning.
          </AlertDescription>
        </Alert>
      );
    }

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <Loader2 className="h-16 w-16 animate-spin text-stellar" />
          <h2 className="mt-4 text-2xl font-semibold text-neutral-200">
            Generating Your AI Blueprint...
          </h2>
          <p className="mt-2 text-neutral-400">
            Our AI agents are charting your cosmic journey. This may take a moment.
          </p>
        </div>
      );
    }

    if (isError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Cosmic Anomaly Detected!</AlertTitle>
          <AlertDescription>
            There was an error generating your blueprint. Please try again later.
            <br />
            <pre className="mt-2 text-sm">{error instanceof Error ? error.message : 'An unknown error occurred'}</pre>
          </AlertDescription>
        </Alert>
      );
    }

    if (data) {
      return <BlueprintDisplay blueprint={data} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen w-full relative">
      <Starfield starCount={500} />
      <main className="container mx-auto py-12 px-4 relative z-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default BlueprintPage;
