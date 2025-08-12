// components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import projects from "@/app/data/projects";

export default function ProjectCard() {
  return (
    <div className="flex flex-col mt-12 px-4" id="projects">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
        My Projects
      </h1>

      <div className="flex flex-wrap justify-around gap-10 lg:gap-y-10 ">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group overflow-hidden shadow-lg hover:shadow-xl rounded-lg project"
          >
            {/* Project Image */}
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={400}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-in-out"
            />

            {/* Overlay */}
            <div className="mobile absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-blue-500 to-blue-500 text-white transform lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-in-out p-4 flex flex-col justify-end">
              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-white/80 mb-3 leading-snug line-clamp-3">
                {project.description}
              </p>

              <div className="flex gap-2 justify-between">
                <Link
                  href={`/projects/${project.id}`}
                  className="px-4 py-1.5 bg-gray-200 text-black text-sm font-medium rounded-full hover:bg-green-500 hover:text-white transition"
                >
                  Details
                </Link>
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition"
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
