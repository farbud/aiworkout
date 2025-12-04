"use client";

import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          AI Workout Planner 💪🤖
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Fill in your information and let AI build your weekly plan!
        </p>
        <WorkoutForm />
      </div>
    </main>
  );
}
