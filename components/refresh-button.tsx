"use client";

import { motion } from "framer-motion";
import { useSmartTeammatesStore } from "../lib/store";

export const RefreshButton = () => {
  const refreshScenario = useSmartTeammatesStore((state) => state.refreshScenario);

  return (
    <motion.button
      type="button"
      onClick={refreshScenario}
      className="group w-full rounded-2xl border border-skyline-600/40 bg-skyline-500/10 px-4 py-3 text-sm font-semibold text-skyline-100 transition hover:border-skyline-400 hover:bg-skyline-500/20"
      whileTap={{ scale: 0.97 }}
    >
      Recompute Tactical Forecast
      <span className="ml-2 inline-flex items-center justify-center rounded-full border border-skyline-400/50 bg-skyline-500/20 px-2 py-0.5 text-[11px] uppercase tracking-widest text-skyline-200 transition group-hover:border-skyline-200 group-hover:text-white">
        Skyline AI
      </span>
    </motion.button>
  );
};
