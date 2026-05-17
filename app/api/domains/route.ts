import { NextResponse }
from "next/server";

import { supabase }
from "@/lib/supabase";

export async function GET() {

  const { data, error } =
    await supabase
      .from("domains")
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

  const body =
    await req.json();

  const { domain } = body;

  const { data, error } =
    await supabase
      .from("domains")
      .insert([
        {
          domain,
          status: "pending"
        }
      ])
      .select()
      .single();

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

