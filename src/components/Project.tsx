"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Fallback from "./Fallback";
import { ExternalLink, Eye, RefreshCw, Heart } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  demoLink: string;
  image?: string;
  pinned: boolean;
  createdAt: string;
  position: number;
  likeCount?: number;
}

interface LikeStatus {
  liked: boolean;
  likeCount: number;
}

export default function ProjectCard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liking, setLiking] = useState<string | null>(null);
  const [likeStatus, setLikeStatus] = useState<Record<string, LikeStatus>>({});

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/projects");

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error(
          "Non-JSON response from public API:",
          text.substring(0, 200)
        );
        setError(
          "Server returned an unexpected response. Please try again later."
        );
        return;
      }

      const data = await res.json();

      if (data.success) {
        // Sort projects by position
        const sortedProjects = data.projects.sort((a: Project, b: Project) => {
          return a.position - b.position;
        });

        setProjects(sortedProjects);

        // Initialize like status for each project
        const initialLikeStatus: Record<string, LikeStatus> = {};
        sortedProjects.forEach((project: Project) => {
          initialLikeStatus[project.id] = {
            liked: false,
            likeCount: project.likeCount || 0,
          };
        });
        setLikeStatus(initialLikeStatus);

        // Fetch actual like status for each project
        sortedProjects.forEach((project: Project) => {
          fetchLikeStatus(project.id);
        });
      } else {
        setError(data.error || "Failed to load projects");
      }
    } catch (error: unknown) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLikeStatus = async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/like`);

      // Check if endpoint exists
      if (res.status === 404) {
        console.warn(`Like API endpoint not found for project ${projectId}`);
        return;
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error(
          "Non-JSON response from like API:",
          text.substring(0, 200)
        );
        return;
      }

      const data = await res.json();

      if (data.success) {
        setLikeStatus((prev) => ({
          ...prev,
          [projectId]: {
            liked: data.liked,
            likeCount: data.likeCount,
          },
        }));
      } else {
        console.error("Like API returned error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  const handleLike = async (projectId: string) => {
    if (liking) return;

    try {
      setLiking(projectId);

      const currentStatus = likeStatus[projectId];
      const newLiked = !currentStatus?.liked;
      const newLikeCount = currentStatus?.likeCount || 0;

      // Optimistic update
      setLikeStatus((prev) => ({
        ...prev,
        [projectId]: {
          liked: newLiked,
          likeCount: newLiked
            ? newLikeCount + 1
            : Math.max(0, newLikeCount - 1),
        },
      }));

      const res = await fetch(`/api/projects/${projectId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: newLiked ? "like" : "unlike",
        }),
      });

      // Check if endpoint exists
      if (res.status === 404) {
        throw new Error("Like API endpoint not found");
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text.substring(0, 200));
        throw new Error("Server returned HTML instead of JSON");
      }

      const data = await res.json();

      if (!data.success) {
        // Revert on error
        setLikeStatus((prev) => ({
          ...prev,
          [projectId]: currentStatus || {
            liked: false,
            likeCount: newLikeCount,
          },
        }));
        console.error("Like API error:", data.error);
      } else {
        // Update with actual data
        setLikeStatus((prev) => ({
          ...prev,
          [projectId]: {
            liked: data.liked,
            likeCount: data.likeCount,
          },
        }));
      }
    } catch (error) {
      console.error("Error liking project:", error);
      // Revert on error
      const currentStatus = likeStatus[projectId];
      setLikeStatus((prev) => ({
        ...prev,
        [projectId]: currentStatus || { liked: false, likeCount: 0 },
      }));
    } finally {
      setLiking(null);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading state (unchanged)
  if (loading) {
    return (
      <div
        className="flex flex-col mt-10"
        id="projects lg:ml-[290px] xl:ml-[360px]"
      >
        {/* Header */}
        <div className="text-3xl flex flex-col mt-10 lg:mt-0 gap-2 font-bold lg:text-left text-center px-6 mb-12 w-full text-blue-500">
          <h1>Projects</h1>
          <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
        </div>

        {/* Loading Grid */}
        <div className="px-4 py-8 min-h-screen" id="projects">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl shadow-md hover:shadow-lg lg:hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col animate-pulse"
                  style={{ minHeight: "150px" }}
                >
                  {/* Image Section Skeleton */}
                  <div className="relative w-full h-68 bg-gray-300"></div>

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

  // Error state (unchanged)
  if (error) {
    return (
      <div
        className="flex flex-col mt-10 lg:ml-[290px] xl:ml-[360px]"
        id="projects"
      >
        {/* Header */}
        <div className="text-3xl flex flex-col mt-10 lg:mt-0 gap-2 font-bold lg:text-left text-center px-6 mb-12 w-full text-blue-500">
          <h1>Projects</h1>
          <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
        </div>
        <Fallback />

        {/* Error Message */}
        <div className="px-4 py-10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col mt-10"
      id="projects lg:ml-[290px] xl:ml-[360px]"
    >
      {/* Header */}
      <div className="text-3xl flex flex-col mt-10 lg:mt-0 gap-2 font-bold lg:text-left text-center px-6 mb-12 w-full text-blue-500">
        <h1>Projects</h1>
        <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
      </div>

      {/* Grid */}
      <div className="px-4 py-8 min-h-screen" id="projects">
        <div className="max-w-6xl 4xl:max-w-max mx-auto">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found</p>
              <p className="text-gray-400">Check back later for new projects</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl shadow-md hover:shadow-lg sk lg:hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col relative group"
                  style={{ minHeight: "150px" }}
                >
                  {/* Image Section */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="relative w-full h-68 cursor-pointer"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between flex-1 p-5">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-blue-500">
                          {project.title}
                        </h2>
                        <button
                          onClick={() => handleLike(project.id)}
                          disabled={liking === project.id}
                          className="flex items-center gap-1 text-gray-500 cursor-pointer transition-colors disabled:opacity-100"
                          title={
                            likeStatus[project.id]?.liked
                              ? "Unlike project"
                              : "Like project"
                          }
                        >
                          <Heart
                            size={25}
                            className={`transition-colors ${
                              likeStatus[project.id]?.liked
                                ? "fill-green-500 text-green-500"
                                : ""
                            }`}
                          />
                          <span className="text-sm font-medium">
                            {likeStatus[project.id]?.likeCount || ""}
                          </span>
                        </button>
                      </div>
                      <p className="mb-4 text-sm line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Button Section */}
                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 text-sm md:text-base transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                      <Link
                        href={project.demoLink}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3  text-blue-600 font-medium border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
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
