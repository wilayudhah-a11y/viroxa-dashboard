"use client";

import {
  useEffect,
  useState
} from "react";

type DomainItem = {
  id: number;
  domain: string;
  status: string;
};

export default function DomainsPage() {

  const [domain, setDomain] =
    useState("");

  const [domains, setDomains] =
    useState<DomainItem[]>([]);

  const fetchDomains =
    async () => {

      const response =
        await fetch(
          "/api/domains"
        );

      const data =
        await response.json();

      setDomains(data);
  };

  useEffect(() => {

    fetchDomains();

  }, []);

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-black">
          DOMAINS
        </h1>

        <p className="text-zinc-500 mt-2">
          Domain manager
        </p>

        <div className="flex gap-4 mt-8">

          <input
            type="text"
            placeholder="viral.bestcook.click"
            value={domain}
            onChange={(e) =>
              setDomain(
                e.target.value
              )
            }
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none"
          />

          <button
            className="bg-cyan-500 hover:bg-cyan-400 transition px-6 rounded-2xl font-semibold"
          >
            Add Domain
          </button>

        </div>

        <div className="mt-10 space-y-4">

          {domains.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between"
            >

              <div>

                <p className="font-semibold">
                  {item.domain}
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  {item.status}
                </p>

              </div>

              <div
                className={`w-3 h-3 rounded-full ${
                  item.status ===
                  "active"

                    ? "bg-green-400"

                    : "bg-yellow-400"
                }`}
              />

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

