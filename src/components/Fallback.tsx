import projects from "@/app/data/projects";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Fallback = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
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
              <p className="mb-4 text-sm line-clamp-4">{project.description}</p>
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
  );
};

export default Fallback;
