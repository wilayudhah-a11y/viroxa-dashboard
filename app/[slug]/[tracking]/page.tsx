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

  await supabase
    .from("analytics")
    .insert([
      {
        slug,
        tracking,
        user_id: link.user_id,
        device: "unknown",
        country: "unknown"
      }
    ]);

  redirect(link.offer);
}






