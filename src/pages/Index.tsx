
import Starfield from '@/components/Starfield';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Index = () => {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
      <Starfield starCount={1500} />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-2">
          Aetherius Labs
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-300 max-w-2xl">
          Mapping Your Business Galaxy with AI Brilliance
        </p>
        <Link to="/questionnaire">
          <Button
            size="lg"
            className="mt-8 bg-stellar/80 text-stellar-foreground hover:bg-stellar active:scale-95 transition-all duration-300 animate-pulse-glow"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Launch Your AI Journey
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Index;
