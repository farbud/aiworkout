/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface WorkoutPlanContextProps {
  plan: any;
  setPlan: (data: any) => void;
  clearPlan: () => void;
}

const PlanContext = createContext<WorkoutPlanContextProps | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlanState] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aiWorkoutPlan");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    if (plan) localStorage.setItem("aiWorkoutPlan", JSON.stringify(plan));
  }, [plan]);

  const setPlan = (data: any) => setPlanState(data);
  const clearPlan = () => {
    localStorage.removeItem("aiWorkoutPlan");
    setPlanState(null);
  };

  return (
    <PlanContext.Provider value={{ plan, setPlan, clearPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
