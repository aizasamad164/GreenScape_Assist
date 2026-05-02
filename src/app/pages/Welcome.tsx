import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect } from "react";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      navigate("/home");
    }
  }, [navigate]);

  const handleGetStarted = () => {
    localStorage.setItem("hasVisited", "true");
    navigate("/home");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
            <Leaf className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div>
          <h1 className="text-4xl text-green-900 mb-3">
            GreenScape Assist
          </h1>
          <p className="text-xl text-green-700">
            Where gardens flourish
          </p>
        </div>

        <div className="pt-12">
          <Button
            onClick={handleGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
