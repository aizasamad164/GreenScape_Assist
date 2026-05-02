import { Outlet, useLocation, Link } from "react-router";
import { Sprout, CheckSquare, BookOpen, Home } from "lucide-react";
import { GardenProvider } from "../context/GardenContext";

export default function Root() {
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Garden" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/journal", icon: BookOpen, label: "Journal" },
  ];

  // Don't show header and nav on welcome screen
  const isWelcomeScreen = location.pathname === "/";

  if (isWelcomeScreen) {
    return (
      <GardenProvider>
        <Outlet />
      </GardenProvider>
    );
  }

  return (
    <GardenProvider>
      <div className="h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100 max-w-md mx-auto">
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-green-600 px-4 py-3 shadow-lg">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActive ? "text-white" : "text-green-100"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </GardenProvider>
  );
}