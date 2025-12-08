import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: "Supabase credentials not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await request.json();
    const { projects } = body;

    if (!projects || !Array.isArray(projects)) {
      return NextResponse.json(
        { success: false, error: "Invalid projects data" },
        { status: 400 }
      );
    }

    console.log("Updating positions for projects:", projects);

    // Update each project's position and pinned status
    const updatePromises = projects.map(async ({ id, position, pinned }) => {
      console.log(
        `Updating project ${id}: position=${position}, pinned=${pinned}`
      );

      type UpdateData = {
        position: string;
        pinned?: boolean;
      };

      const updateData: UpdateData = { position };

      if (pinned !== undefined) {
        updateData.pinned = pinned;
      }

      return supabase.from("projects").update(updateData).eq("id", id);
    });

    const results = await Promise.all(updatePromises);

    // Check for errors
    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      console.error("Errors updating positions:", errors);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to update some projects: ${errors
            .map((e) => e.error?.message)
            .join(", ")}`,
        },
        { status: 500 }
      );
    }

    console.log("Positions updated successfully");
    return NextResponse.json({
      success: true,
      message: `Updated positions for ${results.length} projects`,
    });
  } catch (error: unknown) {
    console.error("Error updating positions:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to verify positions
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: "Supabase credentials not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, title, position, pinned")
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching positions:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        position: p.position || 0,
        pinned: p.pinned || false,
      })),
    });
  } catch (error: unknown) {
    console.error("Error in GET positions handler:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
