"use client";

import { motion } from "framer-motion";

interface PlanCardProps {
  day: string;
  workout: { name: string; sets: string; rest: string }[];
  nutrition: string;
  index: number;
}

export default function PlanCard({
  day,
  workout,
  nutrition,
  index,
}: PlanCardProps) {
  return (
    <motion.div
      className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <h2 className="text-xl font-semibold mb-2">{day}</h2>
      {workout.map((w, i) => (
        <motion.p
          key={i}
          whileHover={{ scale: 1.02, color: "#2563EB" }}
          transition={{ duration: 0.2 }}
        >
          • {w.name} – {w.sets} (Rest {w.rest})
        </motion.p>
      ))}
      <p className="mt-2 italic">🍽️ {nutrition}</p>
    </motion.div>
  );
}
