import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Hash IP address for anonymous tracking
function hashIP(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "default-salt-for-development";
  return crypto
    .createHash("sha256")
    .update(ip + salt)
    .digest("hex");
}

// Get client IP address
function getClientIP(req: NextRequest): string {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfConnectingIp = req.headers.get("cf-connecting-ip");

    // Try different headers in order
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }
    if (cfConnectingIp) {
      return cfConnectingIp.trim();
    }
    if (realIp) {
      return realIp.trim();
    }

    // For local development
    return "127.0.0.1";
  } catch (error) {
    console.error("Error getting IP:", error);
    return "127.0.0.1";
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const projectId = params.id;

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    const { action } = await req.json(); // 'like' or 'unlike'

    if (!["like", "unlike"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    const ip = getClientIP(req);
    const ipHash = hashIP(ip);

    if (action === "like") {
      // Try to insert the like
      const { error: insertError } = await supabase
        .from("project_likes")
        .insert({
          project_id: projectId,
          user_ip_hash: ipHash,
        });

      // If there's a unique constraint violation, user already liked it
      if (insertError) {
        if (insertError.code === "23505") {
          // Unique violation
          // User already liked this project, do nothing
          console.log("User already liked project:", projectId);
        } else {
          throw insertError;
        }
      } else {
        // Successfully inserted, increment count
        const { error: rpcError } = await supabase.rpc("increment_like_count", {
          project_id: projectId,
        });

        if (rpcError) {
          console.error("Error incrementing like count:", rpcError);
          // Rollback the like insert if count update fails
          await supabase
            .from("project_likes")
            .delete()
            .eq("project_id", projectId)
            .eq("user_ip_hash", ipHash);
          throw rpcError;
        }
      }
    } else if (action === "unlike") {
      // Delete the like
      const { error: deleteError } = await supabase
        .from("project_likes")
        .delete()
        .eq("project_id", projectId)
        .eq("user_ip_hash", ipHash);

      if (deleteError) {
        console.error("Error deleting like:", deleteError);
        throw deleteError;
      }

      // Decrement count
      const { error: rpcError } = await supabase.rpc("decrement_like_count", {
        project_id: projectId,
      });

      if (rpcError) {
        console.error("Error decrementing like count:", rpcError);
        throw rpcError;
      }
    }

    // Get updated like count
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("like_count")
      .eq("id", projectId)
      .single();

    if (projectError) {
      console.error("Error fetching project:", projectError);
    }

    return NextResponse.json({
      success: true,
      likeCount: project?.like_count || 0,
      liked: action === "like",
    });
  } catch (error) {
    console.error("Error processing like:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process like",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const projectId = params.id;

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    const ip = getClientIP(req);
    const ipHash = hashIP(ip);

    // Check if user has liked this project
    // Check if user has liked this project
    const { data: existingLike, error: likeError } = await supabase
      .from("project_likes")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_ip_hash", ipHash)
      .maybeSingle();

    // Log or handle the error if it exists
    if (likeError && likeError.code !== "PGRST116") {
      console.error("Error checking like status:", likeError);
      // You could also return an error response here if needed
    }
    // Get like count
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("like_count")
      .eq("id", projectId)
      .single();

    if (projectError) {
      console.error("Error fetching project:", projectError);
    }

    return NextResponse.json({
      success: true,
      liked: !!existingLike,
      likeCount: project?.like_count || 0,
    });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check like status",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
