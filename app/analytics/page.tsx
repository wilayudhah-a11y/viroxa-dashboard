"use client";

import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";

type AnalyticsItem = {
  id: number;
  slug: string;
  tracking: string;
  created_at: string;
  device: string; 
  country: string;
};

export default function AnalyticsPage() {

  const [analytics, setAnalytics] =
    useState<AnalyticsItem[]>([]);

  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "viroxa_user"
          ) || "{}"
        )
      : {};

  const fetchAnalytics =
    async () => {

      const response =
        await fetch(
          `/api/analytics?user_id=${currentUser.id}`
        );

      const data =
        await response.json();

      setAnalytics(data);
    };

  useEffect(() => {

    fetchAnalytics();

  }, []);

const todayClicks =
  analytics.filter((item) => {

    const today =
      new Date()
        .toDateString();

    const itemDate =
      new Date(
        item.created_at
      ).toDateString();

    return today === itemDate;

  }).length;

  return (

    <AdminLayout>

      <main className="w-full px-6 py-8">

        <div className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6 md:p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ANALYTICS
              </h1>

              <p className="text-zinc-500 text-sm mt-2">
                Track your clicks
              </p>

            </div>

            <div className="text-right">

              <p className="text-3xl font-black">
                {analytics.length}
              </p>

              <p className="text-zinc-500 text-sm">
                Total Clicks
              </p>

            </div>

          </div>
		  
			<div className="grid md:grid-cols-4 gap-4 mb-8">
			
			
			<div className="rounded-3xl border border-white/10 bg-black/20 p-6">
			
			<p className="text-zinc-500 text-sm">
				Daily Clicks
			</p>
			
			<h2 className="text-4xl font-black mt-2">
				{todayClicks}
			</h2>
			
			</div>

			
			<div className="rounded-3xl border border-white/10 bg-black/20 p-6">
			
				<p className="text-zinc-500 text-sm">
				Total Clicks
				</p>
			
				<h2 className="text-4xl font-black mt-2">
				{analytics.length}
				</h2>
			
			</div>
			
			<div className="rounded-3xl border border-white/10 bg-black/20 p-6">
			
				<p className="text-zinc-500 text-sm">
				Top Device
				</p>
			
				<h2 className="text-4xl font-black mt-2">
				{
					analytics[0]?.device ||
					"None"
				}
				</h2>
			
			</div>
			
			<div className="rounded-3xl border border-white/10 bg-black/20 p-6">
			
				<p className="text-zinc-500 text-sm">
				Top Country
				</p>
			
				<h2 className="text-4xl font-black mt-2">
				{
					analytics[0]?.country ||
					"None"
				}
				</h2>
			
			</div>
			
			</div>


          <div className="space-y-3">

            {analytics.map((item) => (

              <div
                key={item.id}
                className="bg-black/20 border border-white/10 rounded-2xl px-4 py-4 flex items-center justify-between"
              >

                <div>

                  <p className="font-semibold">
                    {item.slug}
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    {item.tracking}
                  </p>

                </div>

                <p className="text-xs text-zinc-500">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        </div>

      </main>

    </AdminLayout>
  );
}

