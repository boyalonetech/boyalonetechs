import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch all projects with pinned projects first
export async function GET() {
  try {
    const { data: projects, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .order("pinned", { ascending: false }) // Pinned projects first
      .order("created_at", { ascending: false }); // Then by creation date

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError);
      return NextResponse.json(
        { success: false, error: fetchError.message },
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
    console.error("Error in GET handler:", error);
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

    const { data, error: insertError } = await supabase
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

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { success: false, error: insertError.message },
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
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Define a proper interface for update data
interface UpdateData {
  updated_at: string;
  title?: string;
  description?: string;
  demo_link?: string;
  image_url?: string | null;
  pinned?: boolean;
}

// PATCH - Update project (full update support)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, demoLink, imageUrl, pinned } = body;

    console.log("PATCH request received:", {
      id,
      title,
      description,
      demoLink,
      imageUrl,
      pinned,
    });

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Build update object with only provided fields
    const updateData: UpdateData = {
      updated_at: new Date().toISOString(),
    };

    // Only include fields that are provided (not undefined)
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (demoLink !== undefined) updateData.demo_link = demoLink;

    // Handle imageUrl specifically - only update if provided (could be null or string)
    if (imageUrl !== undefined) {
      updateData.image_url = imageUrl; // This can be null to remove image, or a new URL
    }

    // Handle pinned status with validation
    if (pinned !== undefined) {
      // Check if we're trying to pin more than 6 projects
      if (pinned === true) {
        const { count, error: countError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("pinned", true);

        if (countError) {
          console.error("Count error:", countError);
          return NextResponse.json(
            { success: false, error: countError.message },
            { status: 500 }
          );
        }

        // Don't count the current project if it's already pinned
        const { data: currentProject, error: currentProjectError } =
          await supabase
            .from("projects")
            .select("pinned")
            .eq("id", id)
            .single();

        if (currentProjectError) {
          console.error("Current project fetch error:", currentProjectError);
          return NextResponse.json(
            { success: false, error: currentProjectError.message },
            { status: 500 }
          );
        }

        const safeCount = count ?? 0;
        const currentPinnedCount = currentProject?.pinned
          ? safeCount - 1
          : safeCount;

        if (currentPinnedCount >= 6) {
          return NextResponse.json(
            { success: false, error: "Maximum of 6 projects can be pinned" },
            { status: 400 }
          );
        }
      }
      updateData.pinned = pinned;
    }

    console.log("Updating project with data:", updateData);

    const { data, error: updateError } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select();

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const updatedProject = data[0];
    console.log("Project updated successfully:", updatedProject);

    return NextResponse.json({
      success: true,
      project: {
        id: updatedProject.id,
        title: updatedProject.title,
        description: updatedProject.description,
        demoLink: updatedProject.demo_link,
        image: updatedProject.image_url,
        pinned: updatedProject.pinned || false,
        createdAt: updatedProject.created_at,
        updatedAt: updatedProject.updated_at,
      },
    });
  } catch (error) {
    console.error("Error in PATCH handler:", error);
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

    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
