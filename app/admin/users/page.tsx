"use client";

import { useEffect, useState } from "react";

type UserItem = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export default function AdminUsersPage() {

  const [users, setUsers] =
    useState<UserItem[]>([]);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const fetchUsers = async () => {

    const response = await fetch(
      "/api/users"
    );

    const data = await response.json();

    setUsers(data);
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  const addUser = async () => {

    if (!username || !password) {

      alert("Complete all fields");

      return;
    }

    await fetch("/api/users", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username,
        password
      })

    });

    setUsername("");
    setPassword("");

    fetchUsers();

    alert("User added");
  };

  const deleteUser = async (id: number) => {

    await fetch("/api/users", {

      method: "DELETE",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        id
      })

    });

    fetchUsers();

    alert("User deleted");
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white p-6">

      <div className="max-w-4xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ADMIN USERS
          </h1>

          <p className="text-zinc-500 text-sm mt-2">
            Manage users and access
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Username"
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-sm"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Password"
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-sm"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            onClick={addUser}
            className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-2xl text-sm font-semibold"
          >
            Add User
          </button>

        </div>

        <div className="mt-8 space-y-4">

          {users.map((user) => (

            <div
              key={user.id}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 flex items-center justify-between"
            >

              <div>

                <p className="font-semibold">
                  {user.username}
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  {user.role}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteUser(user.id)
                }
                className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-xl text-sm"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}

