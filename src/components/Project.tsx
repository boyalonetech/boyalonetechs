// components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import projects from "@/app/data/projects";

export default function ProjectCard() {
  return (
    <div
      className="flex flex-col mt-2 bg-gradient-to-br from-blue-400/10 to-purple-300/10 backdrop-blur-lg "
      id="projects"
    >
      <div className="text-3xl flex flex-col gap-2 relative top-0 z-10  font-bold text-left p-[15px] px-6 mb-20 w-full text-blue-500">
        <h1>Projects</h1>
        <span className="h-[6px] rounded-2xl w-20 bg-blue-500"></span>
      </div>

      <div className="flex flex-wrap justify-around gap-y-30  backdrop:blur-2xl sm:gap-x-4 lg:gap-y-10 ">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group overflow-hidden shadow-md  scale-120 sm:scale-115 lg:scale-[1] hover:shadow-xl rounded-lg project"
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
            <div className="mobile absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-b from-blue-500 to-[#36a3e7c5] text-white transform lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-in-out p-4 flex flex-col justify-end">
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
