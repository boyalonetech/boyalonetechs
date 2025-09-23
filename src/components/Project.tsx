// components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import projects from "@/app/data/projects";

export default function ProjectCard() {
  return (
    <div className="flex flex-col mt-10" id="projects">
      {/* Header */}
      <div className="text-3xl flex flex-col mt-10 lg:mt-0  gap-2 font-bold lg:text-left text-center px-6 mb-12 w-full text-blue-500">
        <h1>Projects</h1>
        <span className="h-[4px] hidden lg:block rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
      </div>

      {/* Grid */}
      <div className="px-4 py-8 min-h-screen" id="projects">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className=" rounded-xl shadow-md sk hover:shadow-lg lg:hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col"
                style={{ minHeight: "150px" }}
              >
                {/* Image Section */}
                <Link
                  href={`/projects/${project.id}`}
                  className="relative w-full sk h-68 cursor-grab"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
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
                    {/* <p className="text-white text-sm">{project.subtotal}</p> */}
                  </div>

                  {/* Button Section */}
                  <div className="mt-4 flex justify-between">
                    <Link
                      href={`/projects/${project.id}`}
                      className="p-2 px-6 bg-blue-500 rounded-xl text-white "
                    >
                      Details
                    </Link>
                    <Link
                      href={project.demoLink}
                      className="inline-block border text-blue-500 border-blue-500 p-2 px-6  hover:bg-blue-500 hover:text-white rounded-xl transition"
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
        </div>
      </div>
    </div>
  );
}
