// app/projects/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import projects from "@/app/data/projects";

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

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
      <h1 className="text-3xl font-bold text-blue-500 mt-6">{project.title}</h1>

      {/* Project Description */}
      <p className="mt-4 leading-relaxed">{project.description}</p>


      {/* Links */}
      <div className="mt-8 flex gap-4">
        {project.demoLink && (
          <Link
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            View Live Demo
          </Link>
        )}
      </div>
    </div>
  );
}
