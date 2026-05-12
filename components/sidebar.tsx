export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white p-6">
      <h2 className="text-2xl font-bold">
        Viroxa
      </h2>

      <nav className="mt-10 space-y-4">
        <a href="/dashboard" className="block text-zinc-300 hover:text-white">
          Dashboard
        </a>

        <a href="/links" className="block text-zinc-300 hover:text-white">
          Links
        </a>

        <a href="/analytics" className="block text-zinc-300 hover:text-white">
          Analytics
        </a>

        <a href="/admin" className="block text-zinc-300 hover:text-white">
          Admin
        </a>
      </nav>
    </aside>
  );
}