// components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import projects from "@/app/data/projects";

export default function ProjectCard() {
  return (
    <div
      className="flex flex-col mt-10 bg-gradient-to-br from-blue-400/5 via-purple-300/5 to-pink-200/5 backdrop-blur-xl"
      id="projects"
    >
      {/* Header */}
      <div className="text-3xl flex flex-col gap-2 font-bold text-left p-6 mb-12 w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        <h1>Projects</h1>
        <span className="h-[5px] rounded-full w-24 bg-gradient-to-r from-blue-500 to-purple-500"></span>
      </div>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group w-[320px] rounded-2xl overflow-hidden shadow-lg h-none lg:h-[50vh] bg-white/5 backdrop-blur-md sk hover:border-blue-400/50 transition-all duration-500"
          >
            {/* Project Image */}
            <div className="overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={400}
                className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-700 ease-out"
              />
            </div>

            {/* Overlay / Content */}
            <div className="p-5 flex flex-col gap-3 relative ">
              <h3 className="text-xl font-semibold text-blue-500 transition">
                {project.title}
              </h3>
              <p className="text-sm text--600 dark:text--300 leading-snug line-clamp-3 mb-4">
                {project.description}
              </p>

              {/* Buttons */}
              <div className="flex items-center absolute bottom-0 z-20 gap-3 my-4 pt-10 top-24 w-[280px]">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex-1 text-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  Details
                </Link>
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 rounded-xl border border--300 dark:border--600 text-sm font-medium text--700 dark:text--200 hover:bg--100 dark:hover:bg--700 transition"
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
