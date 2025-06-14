
import { Link } from "react-router-dom";
import Starfield from "@/components/Starfield";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
       <Starfield starCount={1500} />
      <div className="relative z-10">
        <h1 className="text-9xl font-bold text-stellar">404</h1>
        <p className="text-2xl text-neutral-300 mt-4 mb-8">Oops! You've drifted into an unknown quadrant.</p>
        <Link to="/" className="text-stellar hover:underline">
          Return to Mission Control
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
