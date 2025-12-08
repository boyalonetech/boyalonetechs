// components/NotFound.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Search,
  RefreshCw,
  ArrowRight,
  Globe,
  FileText,
  User,
  Briefcase,
  Mail,
  Folder,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define your app's routes for auto-navigation
const appRoutes = [
  { path: "/", name: "Home", icon: <Home className="w-4 h-4" /> },
  { path: "/about", name: "About", icon: <User className="w-4 h-4" /> },
  { path: "/projects", name: "Projects", icon: <Folder className="w-4 h-4" /> },
  {
    path: "/experience",
    name: "Experience",
    icon: <Briefcase className="w-4 h-4" />,
  },
  { path: "/contact", name: "Contact", icon: <Mail className="w-4 h-4" /> },
  { path: "/blog", name: "Blog", icon: <FileText className="w-4 h-4" /> },
  {
    path: "/portfolio",
    name: "Portfolio",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    path: "/services",
    name: "Services",
    icon: <Briefcase className="w-4 h-4" />,
  },
  { path: "/skills", name: "Skills", icon: <Briefcase className="w-4 h-4" /> },
  { path: "/resume", name: "Resume", icon: <FileText className="w-4 h-4" /> },
  { path: "/cv", name: "CV", icon: <FileText className="w-4 h-4" /> },
];

// Alternative names/slugs for routes
const routeAliases: Record<string, string[]> = {
  "/": ["home", "main", "index", "landing", "welcome"],
  "/about": ["about", "about me", "about us", "profile", "bio", "biography"],
  "/projects": ["projects", "work", "portfolio", "showcase", "gallery"],
  "/experience": [
    "experience",
    "work experience",
    "employment",
    "career",
    "jobs",
  ],
  "/contact": ["contact", "contact me", "get in touch", "email", "message"],
  "/blog": ["blog", "articles", "posts", "writing", "news"],
  "/portfolio": ["portfolio", "works", "projects", "showcase"],
  "/services": ["services", "offerings", "what i do", "expertise"],
  "/skills": ["skills", "abilities", "technologies", "expertise"],
  "/resume": ["resume", "cv", "curriculum vitae", "résumé"],
  "/cv": ["cv", "resume", "curriculum vitae", "résumé"],
};

export default function NotFound() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ path: string; name: string; icon: React.ReactNode }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Function to check if query matches a route
  const findMatchingRoute = (query: string): string | null => {
    const normalizedQuery = query.toLowerCase().trim();

    // Check exact path matches
    const exactMatch = appRoutes.find(
      (route) =>
        route.path.toLowerCase() === normalizedQuery ||
        route.path.toLowerCase() === `/${normalizedQuery}`
    );
    if (exactMatch) return exactMatch.path;

    // Check route name matches
    const nameMatch = appRoutes.find(
      (route) => route.name.toLowerCase() === normalizedQuery
    );
    if (nameMatch) return nameMatch.path;

    // Check aliases
    for (const [path, aliases] of Object.entries(routeAliases)) {
      if (aliases.includes(normalizedQuery)) {
        return path;
      }
    }

    // Check partial matches
    const partialMatch = appRoutes.find(
      (route) =>
        route.name.toLowerCase().includes(normalizedQuery) ||
        normalizedQuery.includes(route.name.toLowerCase())
    );
    if (partialMatch) return partialMatch.path;

    return null;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Try to find matching route
    const matchedRoute = findMatchingRoute(searchQuery);

    if (matchedRoute) {
      // Show loading state briefly before navigation
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(matchedRoute);
    } else {
      // If no route matches, do a general search
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }

    setIsSearching(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const normalizedValue = value.toLowerCase().trim();
      const matches = appRoutes
        .filter(
          (route) =>
            route.name.toLowerCase().includes(normalizedValue) ||
            route.path.toLowerCase().includes(normalizedValue) ||
            routeAliases[route.path]?.some((alias) =>
              alias.includes(normalizedValue)
            )
        )
        .slice(0, 5); // Show max 5 suggestions

      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (path: string) => {
    setSearchQuery("");
    setSuggestions([]);
    router.push(path);
  };

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center p-4 z-50 overflow-auto"
      data-404="true"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-200 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 opacity-20 blur-3xl"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "all 0.3s ease-out",
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 opacity-10 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 opacity-10 blur-2xl" />

        {/* Geometric Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-blue-200 rounded-3xl animate-spin-slow opacity-10" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-8 border-blue-300 rounded-full animate-ping opacity-5" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border-t-4 border-r-4 border-blue-400 rounded-lg animate-bounce opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center my-auto">
        {/* Animated 404 Text */}
        <div className="relative mb-8">
          <div className="text-[180px] sm:text-[240px] font-black text-blue-500/10 tracking-tighter leading-none">
            404
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <h1 className="text-[120px] sm:text-[180px] font-black text-blue-600 leading-none">
                4<span className="inline-block animate-pulse">0</span>4
              </h1>

              {/* Floating Zero */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 border-8 border-blue-500 rounded-full animate-spin-slow" />
                  <div className="absolute inset-8 border-4 border-blue-300 rounded-full animate-spin-slow-reverse" />
                  <div className="absolute inset-16 border-2 border-blue-200 rounded-full animate-spin" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            It seems like you&apos;ve ventured into the digital unknown. The
            page you&apos;re looking for has either moved, been deleted, or
            never existed.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 animate-fade-in-up animation-delay-400 relative">
          <form onSubmit={handleSearch}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-blue-100">
                <Search className="w-5 h-5 text-blue-500 ml-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search for pages (home, about, projects...)"
                  className="w-full px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="m-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      Search
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden z-20 animate-fade-in">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.path}
                  onClick={() => handleSuggestionClick(suggestion.path)}
                  className="w-full text-left p-3 flex items-center gap-3 hover:bg-blue-50 transition-colors border-b border-blue-50 last:border-b-0"
                >
                  <div className="text-blue-500">{suggestion.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-800">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {suggestion.path}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mb-8 animate-fade-in-up animation-delay-500">
          <p className="text-gray-600 mb-4">Quick navigation:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {appRoutes.slice(0, 6).map((route) => (
              <button
                key={route.path}
                onClick={() => router.push(route.path)}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center gap-2"
              >
                {route.icon}
                {route.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
          <Link
            href="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Home className="w-5 h-5 relative z-10" />
            <span className="font-semibold relative z-10">Back to Home</span>

            {/* Button particles */}
            {isHovering && (
              <>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-300 rounded-full animate-ping animation-delay-300" />
              </>
            )}
          </Link>

          <button
            onClick={() => router.refresh()}
            className="group px-8 py-4 bg-white text-blue-600 rounded-xl shadow-lg hover:shadow-xl border-2 border-blue-100 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
          >
            <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
            <span className="font-semibold">Refresh Page</span>
          </button>
        </div>

        {/* Help Text */}
        {/* <div className="mt-12 pt-8 border-t border-blue-100 animate-fade-in-up animation-delay-800">
          <p className="text-gray-500 mb-4">Need help finding your way?</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="/contact"
              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/sitemap"
              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
            >
              View Sitemap
            </a>
            <a
              href="/docs"
              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Documentation
            </a>
          </div>
        </div> */}
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute -bottom-16 left-0 right-0 h-32 bg-gradient-to-t from-blue-100 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-48 h-6 bg-blue-200 rounded-t-full opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-32 h-4 bg-blue-300 rounded-t-full opacity-30 animate-pulse animation-delay-500" />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .animate-ripple {
          animation: ripple 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
