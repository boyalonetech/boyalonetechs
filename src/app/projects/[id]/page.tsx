// app/projects/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import projects from "@/app/data/projects";

interface ProjectPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-red-500">
        Project not found.
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 lg:ml-[350px] my-10">
      {/* Project Image */}
      <div className="w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={600}
          className="w-full h-auto object-cover aspect-video"
        />
      </div>

      {/* Project Title */}
      <h1 className="text-3xl font-bold text-blue-600 mt-6">{project.title}</h1>

      {/* Project Description */}
      <p className="mt-4 leading-relaxed">{project.description}</p>

      {/* Tech Stack */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(project.techstack) &&
            project.techstack.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>

      {/* Links */}
      <div className="mt-8 flex gap-4">
        {project.demoLink && (
          <Link
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition"
          >
            View Live Demo
          </Link>
        )}
        {/* Uncomment if you want "View Code" */}
        {/* {project.codeLink && (
          <Link
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition"
          >
            View Code
          </Link>
        )} */}
      </div>
    </div>
  );
}
