import React, { createContext, useState } from "react";

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [targetCalories, setTargetCalories] = useState("");
  const [recommendedDishes, setRecommendedDishes] = useState(null);

  // Daily goals
  const dailyGoals = {
    calories: targetCalories,
    protein: 150,
    carbs: 250,
    fat: 65,
  };

  // Calculate totals from selected meals
  const calculateTotals = () => {
    return selectedMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  };

  const totals = calculateTotals();

  const value = {
    selectedMeals,
    setSelectedMeals,
    targetCalories,
    setTargetCalories,
    recommendedDishes,
    setRecommendedDishes,
    dailyGoals,
    totals,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
