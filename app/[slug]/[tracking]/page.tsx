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

const lowerUserAgent =
  userAgent.toLowerCase();
  
const isBot =

  lowerUserAgent.includes(
    "facebook"
  ) ||

  lowerUserAgent.includes(
    "telegram"
  ) ||

  lowerUserAgent.includes(
    "whatsapp"
  ) ||

  lowerUserAgent.includes(
    "twitter"
  ) ||

  lowerUserAgent.includes(
    "bot"
  ) ||

  lowerUserAgent.includes(
    "crawler"
  );


if (isBot) {

  return (

    <html>

      <head>
	  
	  <meta
  name="twitter:card"
  content="summary_large_image"
/>

<meta
  name="twitter:title"
  content={link.title}
/>

<meta
  name="twitter:description"
  content={link.description}
/>

<meta
  name="twitter:image"
  content={link.image}
/>

        <title>
          {link.title}
        </title>

        <meta
          property="og:title"
          content={link.title}
        />

        <meta
          property="og:description"
          content={link.description}
        />

        <meta
          property="og:image"
          content={link.image}
        />

        <meta
          property="og:type"
          content="website"
        />

      </head>

      <body>

        <script
  dangerouslySetInnerHTML={{
    __html: `
      window.location.href =
      "${link.offer}";
    `
  }}
/>


      </body>

    </html>
  );
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






