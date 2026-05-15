import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request
) {

  const body = await req.json();

  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .eq("username", body.username)
      .eq("password", body.password)
      .single();

  if (error || !data) {

    return NextResponse.json(
      {
        success: false,
        message: "Invalid credentials"
      },
      {
        status: 401
      }
    );
  }

  return NextResponse.json({
    success: true,
    user: data
  });
}

