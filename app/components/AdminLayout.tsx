"use client";

import Link from "next/link";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {

const currentUser =
  typeof window !== "undefined"
    ? JSON.parse(
        localStorage.getItem(
          "viroxa_user"
        ) || "{}"
      )
    : {};

  return (

    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex">

      <aside className="w-[260px] border-r border-white/10 bg-white/5 backdrop-blur-2xl p-6 hidden md:flex flex-col">

        <div>

          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            VIROXA
          </h1>

          <p className="text-zinc-500 text-sm mt-1">
            Smart Dashboard
          </p>

        </div>

        <nav className="mt-10 flex flex-col gap-3">

          <Link
            href="/links"
            className="bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-2xl text-sm"
          >
            Links
          </Link>

          {currentUser.role === "admin" && (

			<Link
				href="/admin/users"
				className="bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-2xl text-sm"
			>
				Users
			</Link>
			
			)}

          <Link
            href="/analytics"
            className="bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-2xl text-sm"
          >
            Analytics
          </Link>

          <Link
            href="/domains"
            className="bg-white/5 hover:bg-white/10 transition px-4 py-3 rounded-2xl text-sm"
          >
            Domains
          </Link>

        </nav>

        <button
          onClick={() => {

            localStorage.removeItem(
              "viroxa_user"
            );

            window.location.href =
              "/login";
          }}
          className="mt-auto bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl text-sm"
        >
          Logout
        </button>

      </aside>

      <section className="flex-1 p-6">

  <div className="mb-6 flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl px-6 py-4">

    <div>

      <h2 className="text-xl font-bold">
        Dashboard
      </h2>

      <p className="text-zinc-500 text-sm mt-1">
        Welcome back to Viroxa
      </p>

    </div>

    <div className="flex items-center gap-4">

      <div className="text-right">

        <p className="text-sm font-semibold">
		   {currentUser.username || "Guest"}
        </p>

        <p className="text-xs text-zinc-500">
          Online
        </p>

      </div>

      <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
        {currentUser.username
  ?.charAt(0)
  ?.toUpperCase() || "V"}
      </div>

    </div>

  </div>

  {children}

</section>

 </main>

  );
}

