"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSmartTeammatesStore } from "../lib/store";
import type { ActionPlan, SimulationStep } from "../lib/types";

const statusGradient = (value: number) => {
  if (value >= 0.75) return "from-emerald-400/80 to-emerald-500/40";
  if (value >= 0.45) return "from-amber-400/60 to-amber-500/30";
  return "from-rose-500/70 to-rose-600/30";
};

const actionBadge = (type: ActionPlan["type"]) => {
  switch (type) {
    case "reposition":
      return "bg-skyline-500/20 text-skyline-100 border border-skyline-500/40";
    case "ability":
      return "bg-purple-500/20 text-purple-100 border border-purple-500/40";
    case "coverFire":
      return "bg-amber-500/20 text-amber-100 border border-amber-500/40";
    case "suppress":
      return "bg-orange-500/20 text-orange-100 border border-orange-500/40";
    case "stabilize":
      return "bg-emerald-500/20 text-emerald-100 border border-emerald-500/40";
    case "regroup":
      return "bg-slate-500/20 text-slate-100 border border-slate-500/40";
    default:
      return "bg-slate-500/20 text-slate-100 border border-slate-500/40";
  }
};

const scoreLabel = (value: number) =>
  `${(value * 100).toFixed(0)}%`;

export const CombatSimulation = () => {
  const { summary } = useSmartTeammatesStore();
  const latestStep = summary.timeline.at(-1);

  const aggregatedActions = useMemo(() => {
    return summary.timeline.reduce((acc, step) => acc + step.actions.length, 0);
  }, [summary.timeline]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Tactical Intelligence Telemetry
          </h2>
          <p className="text-sm text-slate-400">
            Real-time synthesis of Skyline SmartTeammates combat directives.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>
            Actions processed:{" "}
            <span className="text-slate-100">{aggregatedActions}</span>
          </span>
          <span>
            Timeline ticks:{" "}
            <span className="text-slate-100">{summary.timeline.length}</span>
          </span>
        </div>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Lethality"
          value={summary.lethalityScore}
          description="Projected elimination rate factoring damage amplification and target focus."
        />
        <MetricCard
          label="Survivability"
          value={summary.survivabilityScore}
          description="Sustainment index based on cover usage, morale, and reactive maneuvers."
        />
        <MetricCard
          label="Command Fidelity"
          value={summary.obedienceScore}
          description="Adherence to live player commands weighted by tactical priority."
        />
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Strategic Timeline
        </h3>
        <div className="mt-4 space-y-4">
          {summary.timeline.map((step) => (
            <TimelineStep key={step.tick} step={step} />
          ))}
        </div>
      </div>

      {latestStep && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-8 rounded-2xl border border-skyline-700/50 bg-skyline-500/10 p-5 text-sm text-skyline-100"
        >
          <p className="font-medium uppercase tracking-[0.3em] text-skyline-200/80">
            Skyline Verdict
          </p>
          <p className="mt-2 leading-relaxed text-skyline-50">
            Squad momentum remains{" "}
            <span className="font-semibold">
              {summary.lethalityScore > summary.survivabilityScore
                ? "offensive-forward"
                : "defense-priority"}
            </span>{" "}
            with coordinated suppression maintaining threat index at{" "}
            <span className="font-semibold">
              {latestStep.threatScore.toFixed(0)}
            </span>
            . Recommend sustaining cadence until uplink core is secured.
          </p>
        </motion.div>
      )}
    </section>
  );
};

const MetricCard = ({
  label,
  value,
  description
}: {
  label: string;
  value: number;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
  >
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <span className="text-sm text-slate-400">{scoreLabel(value)}</span>
    </div>
    <div
      className={`mt-3 rounded-xl bg-gradient-to-r ${statusGradient(
        value
      )} p-3 text-2xl font-semibold text-white`}
    >
      {value.toFixed(2)}
    </div>
    <p className="mt-3 text-xs text-slate-400">{description}</p>
  </motion.div>
);

const TimelineStep = ({ step }: { step: SimulationStep }) => (
  <motion.article
    initial={{ opacity: 0, x: -6 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
  >
    <header className="flex items-center justify-between text-xs text-slate-400">
      <span className="font-semibold uppercase tracking-widest text-slate-500">
        Tick {step.tick}
      </span>
      <span>
        Threat Index:{" "}
        <span className="text-slate-100">{step.threatScore.toFixed(0)}</span>
      </span>
    </header>
    <div className="mt-3 space-y-2">
      {step.actions.map((action) => (
        <div
          key={`${action.actorId}-${action.type}-${action.targetId ?? "none"}-${action.rationale}`}
          className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-slate-500">
            <span>{action.actorId}</span>
            <span
              className={`rounded-full px-2 py-1 text-[10px] ${actionBadge(action.type)}`}
            >
              {action.type}
            </span>
            <span className="text-slate-300">
              Impact {action.expectedImpact.toFixed(1)}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-200">{action.rationale}</p>
        </div>
      ))}
    </div>
  </motion.article>
);
