"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WorkoutForm() {
  const router = useRouter();

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("fat_loss");
  const [level, setLevel] = useState("beginner");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [days, setDays] = useState(3);

  const toggleEquipment = (item: string) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      gender,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      goal,
      level,
      equipment,
      days,
    };
    localStorage.setItem("workoutInputs", JSON.stringify(formData));
    router.push("/plan");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* فرم کامل مثل مرحله قبل */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Gender:
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      {/* سن */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Age:
        </label>
        <input
          type="number"
          min="10"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-200 dark:bg-gray-700"
          required
        />
      </div>
      {/* قد */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Height (cm):
        </label>
        <input
          type="number"
          min="100"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-200 dark:bg-gray-700"
          required
        />
      </div>
      {/* وزن */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Weight (kg):
        </label>
        <input
          type="number"
          min="30"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-200 dark:bg-gray-700"
          required
        />
      </div>
      {/* هدف */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Goal:
        </label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          <option value="fat_loss">Fat Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="fitness">Fitness & Cut</option>
        </select>
      </div>
      {/* سطح */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Level:
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      {/* تجهیزات */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Equipment:
        </label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            "Bodyweight",
            "Dumbbells",
            "Resistance Bands",
            "Pull-up Bar",
            "Barbell",
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleEquipment(item)}
              className={`p-2 rounded border ${
                equipment.includes(item)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {/* روزها */}
      <div>
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Days per Week:
        </label>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full mt-1 p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          <option value={3}>3 days</option>
          <option value={4}>4 days</option>
          <option value={5}>5 days</option>
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
      >
        Generate Plan
      </motion.button>
    </form>
  );
}
