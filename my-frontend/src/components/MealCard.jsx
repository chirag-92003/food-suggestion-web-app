import React from "react";
import Cards from "./Cards.jsx";
const MealCard = ({ meals, setSelectedMeals, targetCalories }) => {
  return (
    <>
      {meals.map((meal) => (
        <Cards
          key={meal.id}
          meal={meal}
          setSelectedMeals={setSelectedMeals}
          targetCalories={targetCalories}
        />
      ))}
    </>
  );
};

export default MealCard;
