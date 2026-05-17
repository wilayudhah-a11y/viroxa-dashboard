import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request
) {

  const { searchParams } =
    new URL(req.url);

  const user_id =
    searchParams.get("user_id");

  let query =
    supabase
      .from("analytics")
      .select("*")
      .order("id", {
        ascending: false
      });

  if (user_id) {

    query =
      query.eq(
        "user_id",
        user_id
      );
  }

  const { data, error } =
    await query;

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

