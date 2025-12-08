// app/projects/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import ProjectClientContent from "./ProjectClientContent";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static paths at build time (Server Component only)
export async function generateStaticParams() {
  const { data: projects } = await supabase
    .from("projects")
    .select("id");
  
  return projects?.map((project) => ({
    id: project.id,
  })) || [];
}

// This is a Server Component
export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-blue-500 mb-6">Project not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Construct the full URL for sharing
  // const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  // const projectUrl = `${baseUrl}/projects/${id}`;
  
  // Default share text
  // const shareText = `Check out "${project.title}" - ${project.description.substring(0, 100)}...`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 lg:ml-[290px] xl:ml-[360px] my-10 mt-20 lg:mt-0">
      {/* Use the client component for interactive parts */}
      <ProjectClientContent 
        project={project}
        // projectUrl={projectUrl}
        // shareText={shareText}
      />
    </div>
  );
}