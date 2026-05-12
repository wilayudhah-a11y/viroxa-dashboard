"use client";

import { useEffect, useState } from "react";

type LinkItem = {
  id: number;
  slug: string;
  title: string;
  offer: string;
};

type AnalyticsItem = {
  slug: string;
  clicks: number;
};

export default function LinksPage() {

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [offer, setOffer] = useState("");
  const [amount, setAmount] = useState(1);

  const [links, setLinks] =
    useState<LinkItem[]>([]);
	
  const [analytics, setAnalytics] =
	useState<AnalyticsItem[]>([]);

  const fetchLinks = async () => {

    const response = await fetch(
      "https://go.viroxa.pro/api/links"
    );

    const data = await response.json();

    setLinks(data);
  };
  
  const fetchAnalytics = async () => {

  const response = await fetch(
    "https://go.viroxa.pro/api/analytics"
  );

  const data = await response.json();

  setAnalytics(data);
	};

  useEffect(() => {

  fetchLinks();

  fetchAnalytics();

	}, []);

	const createLink = async () => {

  for (let i = 1; i <= amount; i++) {

    const randomSlug =
  Math.random()
    .toString(36)
    .substring(2, 8);

const generatedSlug =
  slug.trim() !== ""
    ? amount === 1
      ? slug
      : `${slug}-${i}`
    : randomSlug;

    await fetch(
      "https://go.viroxa.pro/api/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          slug: generatedSlug,
          title,
          description,
          image,
          offer
        })
      }
    );
  }

  alert("Links created");

  fetchLinks();
};

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">

      <h1 className="text-4xl font-bold">
        Create Link
      </h1>

      <div className="mt-10 max-w-xl space-y-4">

        <input
          type="text"
          placeholder="Slug"
          className="w-full bg-zinc-900 p-4 rounded-xl"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

       <textarea
			placeholder="Titles (1 per line)"
			className="w-full bg-zinc-900 p-4 rounded-xl"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		/>

        <textarea
          placeholder="Descriptions (1 per line)"
          className="w-full bg-zinc-900 p-4 rounded-xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
			placeholder="Images URLs (1 per line)"
			className="w-full bg-zinc-900 p-4 rounded-xl"
			value={image}
			onChange={(e) => setImage(e.target.value)}
		/>

        <input
          type="text"
          placeholder="Offer URL"
          className="w-full bg-zinc-900 p-4 rounded-xl"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
		
		<input
		  type="number"
		  placeholder="Amount"
		  className="w-full bg-zinc-900 p-4 rounded-xl"
		  value={amount}
		  onChange={(e) =>
			  setAmount(Number(e.target.value))
			}
		/>

        <button
          onClick={createLink}
          className="bg-white text-black px-6 py-3 rounded-xl font-bold"
        >
          Create Link
        </button>

      </div>

      <div className="mt-16">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-2xl font-bold">
      Your Links
    </h2>

    <div className="flex gap-4">

      <button
        onClick={() => {

          const allLinks = links
            .map(
              (link) =>
                `https://go.viroxa.pro/${link.slug}`
            )
            .join("\n");

          navigator.clipboard.writeText(allLinks);

          alert("All links copied");
        }}
        className="bg-white text-black px-4 py-2 rounded-lg font-bold"
      >
        Copy All
      </button>

      <button
        onClick={async () => {

          const confirmDelete =
            confirm("Delete all links?");

          if (!confirmDelete) return;

          await fetch(
            "https://go.viroxa.pro/api/links",
            {
              method: "DELETE"
            }
          );

          fetchLinks();

          alert("All links deleted");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold"
      >
        Delete All
      </button>

    </div>

  </div>

  <div className="space-y-4">

    {links.map((link) => (

      <div
        key={link.id}
        className="bg-zinc-900 p-6 rounded-2xl"
      >

        <h3 className="text-xl font-bold">
          {link.title}
        </h3>

        <p className="text-zinc-400 mt-2">
          /{link.slug}
        </p>

        <p className="text-sm text-zinc-500 mt-1">
          {link.offer}
        </p>
		
		<p className="text-sm text-green-400 mt-2">

			Clicks: {

			analytics.find(
			(a) => a.slug === link.slug
			)?.clicks || 0

			}

		</p>

        <button
          onClick={() => {

            navigator.clipboard.writeText(
              `https://go.viroxa.pro/${link.slug}`
            );

            alert("Link copied");
          }}
          className="mt-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold"
        >
          Copy Link
        </button>

      </div>

    ))}

  </div>

</div>

    </main>
  );
}