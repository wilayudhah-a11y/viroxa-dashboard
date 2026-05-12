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
	
  const [analytics] =
	useState<AnalyticsItem[]>([]);

  const fetchLinks = async () => {

    const response = await fetch(
      "https://go.viroxa.pro/api/links"
    );

    const data = await response.json();

    setLinks(data);
  };

	const createLink = async () => {

  const requests = [];

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

    requests.push(

      fetch(
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
      )

    );
  }

  await Promise.all(requests);

  alert("Links created");

  fetchLinks();
};

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10 max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold">
        Create Link
      </h1>

      <div className="mt-10 space-y-4">

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

<div className="flex gap-4">

  <button
    onClick={createLink}
    className="bg-white text-black px-6 py-3 rounded-xl font-bold"
  >
    Create Link
  </button>

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
    className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold"
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
    className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
  >
    Delete All
  </button>

</div>

</div>

<div className="mt-10">

  <textarea
    readOnly
    value={
      links
        .map(
          (link) =>
            `https://go.viroxa.pro/${link.slug}`
        )
        .join("\n")
    }
    className="
      w-full
      h-[500px]
      bg-zinc-900
      p-6
      rounded-2xl
      text-sm
      text-zinc-300
      outline-none
      resize-none
    "
  />

</div>

    </main>
  );
}