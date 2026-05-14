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
          setAmount(Number(e.target.value))
        }
      />

      <div className="flex flex-wrap gap-3 pt-2">

        <button
          onClick={createLink}
          className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-semibold"
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
          className="bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
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
          className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
        >
          Delete All
        </button>

      </div>

    </div>

    <div className="mt-8">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">

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
          className="w-full h-[320px] bg-transparent outline-none resize-none text-sm text-zinc-300"
        />

      </div>

    </div>

  </main>
);
}