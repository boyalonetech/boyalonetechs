// components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import projects from "@/app/data/projects";

export default function ProjectCard() {
  return (
    <div className="flex flex-col mt-10" id="projects">
      {/* Header */}
      <div className="text-3xl flex flex-col mt-10 lg:mt-0  gap-2 font-bold lg:text-left text-center p-6 mb-12 w-full text-blue-500">
        <h1>Projects</h1>
        <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group w-[350px] lg:w-[350px] sm:w-[370px] rounded-2xl overflow-hidden sk
              shadow-[0_6px_20px_rgba(0,0,0,0.08)] 
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] 
              transition-all duration-500 ease-out 
              hover:-translate-y-2 flex flex-col"
          >
            {/* Project Image */}
            <div className="overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={400}
                className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-700 ease-out"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-lg font-semibold text-blue-500 group-hover:text-blue-600 transition">
                {project.title}
              </h3>
              <p className="text-sm  leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>

              {/* Buttons pinned to bottom */}
              <div className="mt-auto flex items-center gap-3 pt-4">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex-1 text-center px-4 py-2 rounded-lg 
                    bg-blue-600 text-white text-sm font-medium 
                    shadow-md hover:shadow-lg hover:bg-blue-700 
                    transition"
                >
                  Details
                </Link>
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 rounded-lg 
                    border border-gray-300 
                    text-sm font-medium
                    hover:bg-blue-500/70 hover:border-none transition"
                >
                  Demo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
