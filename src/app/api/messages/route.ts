import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";


// GET - Fetch all messages
export async function GET() {
  try {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messages: messages.map((msg) => ({
        id: msg.id,
        from: msg.from_name, // Make sure this matches your database column
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        date: msg.created_at,
        read: msg.read,
      })),
    });
  } catch (error) {
    console.error("GET API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, _error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update message (mark as read)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .update({ read })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase PUT error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (_error) {
    console.error("PUT API error:", _error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
