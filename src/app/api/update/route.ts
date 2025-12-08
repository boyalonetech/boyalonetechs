// app/api/projects/update/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, demoLink, imageUrl, pinned } = body;

    console.log("Update PATCH request received:", {
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

    // Build update object
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (demoLink !== undefined) updateData.demo_link = demoLink;
    if (imageUrl !== undefined) updateData.image_url = imageUrl;

    if (pinned !== undefined) {
      // Pin validation
      if (pinned === true) {
        const { count, error: countError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("pinned", true);

        if (countError) throw countError;
        if (count && count >= 6) {
          return NextResponse.json(
            { success: false, error: "Maximum of 6 projects can be pinned" },
            { status: 400 }
          );
        }
      }
      updateData.pinned = pinned;
    }

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;

    const updatedProject = data[0];
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
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
