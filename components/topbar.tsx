export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
      
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-400 text-sm">
          Welcome back to Viroxa
        </p>
      </div>

      <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">
        Create Link
      </button>

    </header>
  );
}