/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { usePlan } from "../../context/PlanContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import PlanCard from "../../components/PlanCart";
import { motion } from "framer-motion";

export default function PlanPage() {
  const { plan, setPlan, clearPlan } = usePlan();
  const [loading, setLoading] = useState(!plan);
  const [error, setError] = useState("");

  useEffect(() => {
    async function generatePlan() {
      if (plan) {
        setLoading(false);
        return;
      }
      try {
        const raw = localStorage.getItem("workoutInputs");
        if (!raw) {
          setError("No input found.");
          setLoading(false);
          return;
        }
        const inputs = JSON.parse(raw);
        const res = await fetch("/api/generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputs),
        });
        const data = await res.json();
        if (!res.ok) {
          setError("Failed to generate plan.");
          setLoading(false);
          return;
        }
        setPlan(data);
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
    generatePlan();
  }, [plan, setPlan]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <main className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your AI Workout Plan 💪🤖
        </h1>

        {plan.days.map((d: any, i: number) => (
          <PlanCard
            key={i}
            day={d.day}
            workout={d.workout}
            nutrition={d.nutrition}
            index={i}
          />
        ))}

        <motion.div
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: plan.days.length * 0.1 }}
        >
          <h3 className="font-bold text-lg mb-2">Weekly Summary</h3>
          <p>{plan.weekly_summary}</p>
        </motion.div>

        <motion.div
          className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: plan.days.length * 0.1 + 0.1 }}
        >
          <h3 className="font-bold text-lg mb-2">Tips</h3>
          <p>{plan.general_tips}</p>
        </motion.div>

        <motion.div
          className="mt-6 flex gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Generate Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearPlan}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            Clear Plan
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
