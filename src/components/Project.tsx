// components/ProjectCard.tsx (for your main website)
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pin } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  demoLink: string;
  image?: string;
  pinned: boolean;
  createdAt: string;
}

export default function ProjectCard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        setError(data.error || "Failed to load projects");
      }
    } catch (error) {
      setError("Error fetching projects");
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col mt-10" id="projects">
        {/* Header */}
        <div className="text-3xl flex flex-col mt-10 lg:mt-0 gap-2 font-bold lg:text-left text-center px-6 mb-12 w-full text-blue-500">
          <h1>Projects</h1>
          <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
        </div>

        {/* Loading Grid */}
        <div className="px-4 py-8 min-h-screen" id="projects">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl shadow-md sk hover:shadow-lg lg:hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col animate-pulse"
                  style={{ minHeight: "150px" }}
                >
                  {/* Image Section Skeleton */}
                  <div className="relative w-full sk h-68 bg-gray-300"></div>

                  {/* Content Section Skeleton */}
                  <div className="flex flex-col justify-between flex-1 p-5">
                    <div>
                      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>

                    {/* Button Section Skeleton */}
                    <div className="mt-4 flex justify-between">
                      <div className="h-10 bg-gray-300 rounded-xl w-20"></div>
                      <div className="h-10 bg-gray-300 rounded-xl w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col mt-10" id="projects">
        {/* Header */}
        <div className="text-3xl flex flex-col mt-10 lg:mt-0 gap-2 font-bold lg:text-left text-center px-6 mb-12 w-full text-blue-500">
          <h1>Projects</h1>
          <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
        </div>

        {/* Error Message */}
        <div className="px-4 py-8 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-10" id="projects">
      {/* Header */}
      <div className="text-3xl flex flex-col mt-10 lg:mt-0 gap-2 font-bold lg:text-left text-center px-6 mb-12 w-full text-blue-500">
        <h1>Projects</h1>
        <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
      </div>

      {/* Grid */}
      <div className="px-4 py-8 min-h-screen" id="projects">
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found</p>
              <p className="text-gray-400">Check back later for new projects</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl shadow-md sk hover:shadow-lg lg:hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col"
                  style={{ minHeight: "150px" }}
                >
                  {/* Image Section */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="relative w-full sk h-68 cursor-grab"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {project.title.charAt(0)}
                        </span>
                        <span>Like</span>
                      </div>
                    )}
                  </Link>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between flex-1 p-5">
                    <div>
                      <h2 className="text-xl font-bold text-blue-500 mb-2">
                        {project.title}
                      </h2>
                      <p className="mb-4 text-sm line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Button Section */}
                    <div className="mt-4 flex justify-between">
                      <Link
                        href={`/projects/${project.id}`}
                        className="p-2 px-6 bg-blue-500 rounded-xl text-white hover:bg-blue-600 transition"
                      >
                        Details
                      </Link>
                      <Link
                        href={project.demoLink}
                        className="inline-block border text-blue-500 border-blue-500 p-2 px-6 hover:bg-blue-500 hover:text-white rounded-xl transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
