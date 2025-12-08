import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET - Fetch all messages
export async function GET() {
  try {
    const { data: messages, error: fetchError } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Supabase GET error:", fetchError);
      return NextResponse.json(
        { success: false, error: fetchError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messages: messages.map((msg) => ({
        id: msg.id,
        from: msg.from_name, // adjust if DB column is different
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

// DELETE - Delete a message
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

    const { error: deleteError } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase DELETE error:", deleteError);
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("DELETE API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update message (mark as read/unread)
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

    const { data, error: updateError } = await supabase
      .from("messages")
      .update({ read })
      .eq("id", id)
      .select();

    if (updateError) {
      console.error("Supabase PUT error:", updateError);
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("PUT API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
