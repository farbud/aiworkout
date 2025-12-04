"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-16 h-16 border-4 border-t-blue-600 border-gray-300 rounded-full"
      ></motion.div>
    </div>
  );
}
