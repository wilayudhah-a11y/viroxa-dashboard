import { headers } from "next/headers";

import { redirect } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default async function RedirectPage({
  params
}: {
  params: Promise<{
    slug: string;
    tracking: string;
  }>;
}) {

  const {
    slug,
    tracking
  } = await params;

  console.log(
    "PARAMS:",
    slug,
    tracking
  );

  const { data: link, error } =
    await supabase
      .from("links")
      .select("*")
      .eq("slug", slug)
      .single();

  console.log(
    "LINK:",
    link,
    error
  );

  if (!link) {

    return (
      <div>
        Link not found
      </div>
    );
  }

const headersList =
  headers();

const country =
  (await headersList)
    .get(
      "x-vercel-ip-country"
    ) || "Unknown";


const userAgent =
  (await headersList)
    .get("user-agent") || "";

let device = "Desktop";

if (
  userAgent.includes("Android")
) {

  device = "Android";
}

if (
  userAgent.includes("iPhone")
) {

  device = "iPhone";
}

  await supabase
    .from("analytics")
    .insert([
      {
        slug,
        tracking,
        user_id: link.user_id,
        device,
        country
      }
    ]);

  redirect(link.offer);
}






