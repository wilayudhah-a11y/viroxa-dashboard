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
  <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white flex items-center justify-center px-4 py-10 overflow-hidden">

    <div className="w-full max-w-4xl rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6 md:p-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            VIROXA LINKS
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Generate futuristic smart links
          </p>
        </div>

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

          <p className="text-xs text-zinc-400">
            LIVE
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Slug"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm outline-none focus:border-cyan-400 transition"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <input
          type="text"
          placeholder="Offer URL"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm outline-none focus:border-cyan-400 transition"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <textarea
          placeholder="Titles"
          className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:border-cyan-400 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Descriptions"
          className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:border-cyan-400 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </div>

      <textarea
        placeholder="Image URLs"
        className="w-full h-24 mt-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:border-cyan-400 transition"
);
}