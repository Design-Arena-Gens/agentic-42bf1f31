import { Metadata } from "next";
import { CombatSimulation } from "../components/combat-simulation";
import { ModOptionsPanel } from "../components/mod-options-panel";
import { RefreshButton } from "../components/refresh-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SmartTeammates by Skyline",
  description:
    "Command Skyline's SmartTeammates: adaptive squadmates with configurable lethality and mobility profiles."
};

export default function Page() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(76,95,255,0.18),_transparent_55%)]" />

      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs uppercase tracking-[0.4em] text-slate-400">
          Skyline
          <span className="h-1 w-1 rounded-full bg-skyline-400" />
          SmartTeammates
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          SmartTeammates Mod Console
        </h1>
        <p className="max-w-2xl text-base text-slate-300">
          Deploy Skyline&apos;s autonomous allies with configurable aggression
          and speed. These operators navigate cover, prioritize targets, and
          amplify your tactical direction using adaptive AI heuristics.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div className="space-y-6">
          <ModOptionsPanel />
          <RefreshButton />
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-sm text-slate-300">
            <p className="font-semibold text-slate-100">
              AI Directive Portfolio
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Multi-vector pathfinding tuned for cover-first ingress.</li>
              <li>Dynamic threat matrices re-evaluated each combat tick.</li>
              <li>
                Command parser honoring highest priority battlefield directives.
              </li>
              <li>Ability orchestration with cooldown-aware burst windows.</li>
            </ul>
          </div>
        </div>
        <CombatSimulation />
      </section>
    </main>
  );
}
