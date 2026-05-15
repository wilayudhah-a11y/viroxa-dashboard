import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request
) {

  const body = await req.json();

  const { error } =
    await supabase
      .from("links")
      .insert([
        {
          slug: body.slug,
          title: body.title,
          description: body.description,
          image: body.image,
          offer: body.offer,
          tracking: body.tracking,
          user_id: body.user_id
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

