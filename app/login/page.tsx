"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    const response = await fetch(
      "/api/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    if (!data.success) {

      alert("Invalid credentials");

      return;
    }

    localStorage.setItem(
      "viroxa_user",
      JSON.stringify(data.user)
    );

    router.push("/links");
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            VIROXA
          </h1>

          <p className="text-zinc-500 text-sm mt-2">
            Login to dashboard
          </p>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-sm"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-sm"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-2xl text-sm font-semibold"
          >
            Login
          </button>

        </div>

      </div>

    </main>

  );
}

