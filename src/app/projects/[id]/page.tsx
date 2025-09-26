// app/projects/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface PageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: PageProps) {
  // Fetch project by ID from Supabase
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-blue-500">
        Project not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 lg:ml-[360px] my-10 mt-20 lg:mt-0">
      <div className="lg:w-[72vw]">
        {/* Project Image */}
        <div className="w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={project.image_url}
            alt={project.title}
            width={800}
            height={800}
            quality={100}
            className="w-full h-full object-cover aspect-video"
          />
        </div>

        {/* Project Title */}
        <h1 className="text-3xl font-bold text-blue-500 mt-6">
          {project.title}
        </h1>

        {/* Project Description */}
        <p className="mt-4 leading-relaxed">{project.description}</p>

        {/* Links */}
        <div className="mt-8 flex gap-4">
          {project.demo_link && (
            <Link
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            >
              View Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
