import React from "react";

const Cards = ({ meal, setSelectedMeals, targetCalories }) => {
  const handleClick = () => {
    if (targetCalories === "") {
      alert("enter the target calories");
      return;
    }
    setSelectedMeals((prev) => [...prev, meal]);
  };

  return (
    <div
      className="bg-white shadow-md rounded-xl p-4 w-64 cursor-pointer hover:shadow-lg hover:bg-gray-300 transition-shadow duration-200"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold">{meal.meal}</h2>
      <p className="text-gray-600">{meal.calories} cal</p>
    </div>
  );
};

export default Cards;
