import React, { useContext, useState } from "react";
import { context } from "../hooks/context";

const Meals = () => {
  const { selectedMeals, setSelectedMeals } = useContext(context);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (selectedMeals.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold">No meals selected yet</h1>
        <p className="text-gray-600 mt-2">
          Go to Home and click on meal cards to add meals
        </p>
      </div>
    );
  }

  const currentMeal = selectedMeals[currentIndex];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        These are the meals you had today
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-md">
        <h2 className="text-lg text-gray-500">MEAL {currentIndex + 1}</h2>
        <h3 className="text-2xl font-semibold mt-2">{currentMeal.meal}</h3>
        <p className="text-gray-600 mt-1">{currentMeal.calories} cal</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              Math.min(selectedMeals.length - 1, prev + 1),
            )
          }
          disabled={currentIndex === selectedMeals.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
        <button
          onClick={() => {
            setSelectedMeals(
              selectedMeals.filter((_, idx) => idx !== currentIndex),
            );
            setCurrentIndex((prev) => Math.min(prev, selectedMeals.length - 2));
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Meal {currentIndex + 1} of {selectedMeals.length}
      </p>
    </div>
  );
};

export default Meals;
