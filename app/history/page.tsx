/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePlan } from "../../context/PlanContext";
import PlanCard from "../../components/PlanCart";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const { plan, clearPlan } = usePlan();

  if (!plan)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No saved plan.
      </div>
    );

  return (
    <motion.main
      className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Saved Plan 💾</h1>
        {plan.days.map((d: any, i: number) => (
          <PlanCard
            key={i}
            day={d.day}
            workout={d.workout}
            nutrition={d.nutrition}
            index={i}
          />
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearPlan}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Clear Saved Plan
        </motion.button>
      </div>
    </motion.main>
  );
}
