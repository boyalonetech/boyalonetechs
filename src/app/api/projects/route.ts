import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch all projects with pinned projects first
export async function GET() {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("pinned", { ascending: false }) // Pinned projects first
      .order("created_at", { ascending: false }); // Then by creation date

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      projects: projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        demoLink: project.demo_link,
        image: project.image_url,
        pinned: project.pinned || false,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, demoLink, imageUrl, pinned = false } = body;

    if (!title || !description || !demoLink) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, description, and demo link are required",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          demo_link: demoLink,
          image_url: imageUrl || null,
          pinned: pinned,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        demoLink: data[0].demo_link,
        image: data[0].image_url,
        pinned: data[0].pinned || false,
        createdAt: data[0].created_at,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update project pin status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, pinned } = body;

    if (!id || typeof pinned !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Project ID and pinned status are required" },
        { status: 400 }
      );
    }

    // Check if we're trying to pin more than 6 projects
    if (pinned === true) {
      const { count, error: countError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("pinned", true);

      if (countError) {
        return NextResponse.json(
          { success: false, error: countError.message },
          { status: 500 }
        );
      }

      if (count && count >= 6) {
        return NextResponse.json(
          { success: false, error: "Maximum of 6 projects can be pinned" },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase
      .from("projects")
      .update({ pinned, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: {
        id: data[0].id,
        pinned: data[0].pinned,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
