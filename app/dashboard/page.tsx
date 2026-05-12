import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex bg-zinc-950 text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <Topbar />

        <div className="mt-10 grid grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400 text-sm">
              Total Links
            </h2>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400 text-sm">
              Total Clicks
            </h2>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h2 className="text-zinc-400 text-sm">
              Active Domains
            </h2>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}