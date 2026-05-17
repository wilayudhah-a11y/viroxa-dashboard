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
	  
const vercelResponse =
  await fetch(

    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,

    {
      method: "POST",

      headers: {

        Authorization:
          `Bearer ${process.env.VERCEL_API_TOKEN}`,

        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        name: domain
      })
    }
);

const vercelData =
  await vercelResponse.json();

console.log(
  "VERCEL:",
  vercelData
);




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

export async function DELETE(
  req: Request
) {

  const { searchParams } =
    new URL(req.url);

  const id =
    searchParams.get("id");

  const { error } =
    await supabase
      .from("domains")
      .delete()
      .eq("id", id);

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



