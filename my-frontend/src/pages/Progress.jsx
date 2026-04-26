import React, { useContext } from "react";
import { context } from "../hooks/context";
import ProgressRing from "../components/ProgressRing";

const Progress = () => {
  const { selectedMeals, dailyGoals, totals } = useContext(context);

  if (selectedMeals.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold">No meals logged today</h1>
        <p className="text-gray-600 mt-2">
          Add meals from the Home page to track your progress
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Today's Progress</h1>
      <p className="text-gray-600 mb-6">
        You've logged {selectedMeals.length} meal(s) today
      </p>

      {/* Calorie Summary Card */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Calorie Intake
        </h2>
        <div className="flex justify-center">
          <ProgressRing
            value={totals.calories}
            max={dailyGoals.calories}
            color="#3b82f6"
            label="Calories"
            unit="cal"
          />
        </div>
      </div>

      {/* Macronutrients Grid */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Macronutrients
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <ProgressRing
            value={totals.protein}
            // max={dailyGoals.protein}
            color="#ef4444"
            label="Protein"
          />
          <ProgressRing
            value={totals.carbs}
            // max={dailyGoals.carbs}
            color="#22c55e"
            label="Carbs"
          />
          <ProgressRing
            value={totals.fat}
            // max={dailyGoals.fat}
            color="#eab308"
            label="Fat"
          />
        </div>
      </div>
    </div>
  );
};

export default Progress;
