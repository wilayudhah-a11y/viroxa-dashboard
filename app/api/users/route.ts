import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET() {

  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .order("id", {
        ascending: false
      });

  if (error) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }

  return NextResponse.json(data);
}

export async function POST(
  req: Request
) {

  const body = await req.json();

  const { error } =
    await supabase
      .from("users")
      .insert([
        {
          username: body.username,
          password: body.password,
          role: "user"
        }
      ]);

  if (error) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }

  return NextResponse.json({
    success: true
  });
}

export async function DELETE(
  req: Request
) {

  const body = await req.json();

  const { error } =
    await supabase
      .from("users")
      .delete()
      .eq("id", body.id);

  if (error) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }

  return NextResponse.json({
    success: true
  });
}

