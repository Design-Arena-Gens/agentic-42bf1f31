"use client";

import { motion } from "framer-motion";
import { useSmartTeammatesStore } from "../lib/store";
import type { MovementSpeedTier } from "../lib/types";

const speedLabels: Record<MovementSpeedTier, string> = {
  standard: "Standard",
  fast: "Fast",
  veryFast: "Very Fast"
};

const speedDescriptions: Record<MovementSpeedTier, string> = {
  standard: "Baseline tactical cadence balanced for most missions.",
  fast: "Aggressive flanking speed for pressure and sweeps.",
  veryFast: "Maximum acceleration for rapid breach and rescue ops."
};

export const ModOptionsPanel = () => {
  const { config, setDamageMultiplier, setSpeedTier } =
    useSmartTeammatesStore();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-glow backdrop-blur-sm"
    >
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-skyline-200">
            SmartTeammates Mod Options
          </h2>
          <p className="text-sm text-slate-400">
            Skyline-certified AI control parameters. Adjust responsibly.
          </p>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs uppercase tracking-widest text-slate-300">
          v1.0
        </span>
      </header>

      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="damage-multiplier"
              className="text-sm font-medium text-slate-200"
            >
              Damage Multiplier
            </label>
            <span className="text-sm text-slate-400">
              {config.damageMultiplier.toFixed(1)}x
            </span>
          </div>
          <input
            id="damage-multiplier"
            type="range"
            min={1}
            max={5}
            step={0.5}
            value={config.damageMultiplier}
            onChange={(event) => setDamageMultiplier(Number(event.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-skyline-500"
          />
          <p className="mt-2 text-xs text-slate-400">
            Scales teammate lethality. Values above 3.5x recommended only for
            high-threat incursions.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <span className="text-sm font-medium text-slate-200">
            Movement Speed Profile
          </span>
          <div className="mt-3 grid gap-3">
            {(Object.keys(speedLabels) as MovementSpeedTier[]).map((tier) => {
              const isActive = config.speedTier === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSpeedTier(tier)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-skyline-500 bg-skyline-500/10 text-skyline-100 shadow-glow"
                      : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60 hover:text-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold uppercase tracking-wide">
                      {speedLabels[tier]}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="speedDot"
                        className="h-2 w-2 rounded-full bg-skyline-400"
                      />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {speedDescriptions[tier]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
