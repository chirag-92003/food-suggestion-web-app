import React, { useContext, useState } from "react";
import foodImage from "../assets/food2.jpg";
import MealCard from "../components/MealCard";
import { context } from "../hooks/context";

const Home = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setSelectedMeals, targetCalories, setTargetCalories, recommendedDishes, setRecommendedDishes } =
    useContext(context);

  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      alert("select the file to upload");
      return;
    } else {
      alert("file uploaded");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/analyse", {
        method: "POST",
        body: formData,
      });

      if (!res) {
        console.log("data not found");
        return;
      }

      const response = await res.json();
      console.log(response);

      setRecommendedDishes(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="text-center p-8 ">
        <h1 className="text-4xl font-semibold mb-5 font-Montserrat">
          Welcome to Diet App
        </h1>

        <div className="max-w-md mx-auto mb-6">
          <label className="block text-left text-lg font-medium mb-2">
            Daily Target Calories
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={targetCalories}
              onChange={(e) => setTargetCalories(e.target.value)}
              placeholder="e.g., 2000"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => alert(`Target set to ${targetCalories} calories`)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Set
            </button>
          </div>
          {targetCalories && (
            <p className="text-left mt-2 text-sm text-gray-600">
              Your daily goal:{" "}
              <span className="font-semibold">{targetCalories}</span> calories
            </p>
          )}
        </div>

        <img
          src={foodImage}
          alt="Healthy food"
          className="w-full h-125 object-cover rounded-lg "
        />
      </div>

      {!recommendedDishes && (
        <div className="p-4">
          <h1 className="text-xl">
            Upload the image of the menu for meal suggestions
          </h1>
          <div className="mt-4">
            <label className="flex flex-col items-center justify-center w-full max-w-xs mx-auto px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
              <svg
                className="w-10 h-10 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-600">
                {file ? file.name : "Click to upload or drag and drop"}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                PNG, JPG, JPEG (MAX 5MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 w-64 h-64 object-cover mx-auto rounded-lg"
            />
          )}
          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Upload
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {recommendedDishes && <MealCard setSelectedMeals={setSelectedMeals} meals={recommendedDishes} />}

      {/* Sample meals for testing - remove when backend is connected */}
      {/* {!data && (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">Sample Meals (Demo)</h2>
          <MealCard
            setSelectedMeals={setSelectedMeals}
            targetCalories={targetCalories}
            meals={[
              {
                id: 1,
                name: "Oatmeal with Berries",
                calories: 350,
                protein: 12,
                carbs: 58,
                fat: 8,
              },
              {
                id: 2,
                name: "Grilled Chicken Salad",
                calories: 450,
                protein: 42,
                carbs: 18,
                fat: 22,
              },
              {
                id: 3,
                name: "Salmon with Rice",
                calories: 550,
                protein: 38,
                carbs: 52,
                fat: 18,
              },
              {
                id: 4,
                name: "Greek Yogurt Bowl",
                calories: 280,
                protein: 24,
                carbs: 32,
                fat: 6,
              },
              {
                id: 5,
                name: "Pasta Primavera",
                calories: 520,
                protein: 16,
                carbs: 72,
                fat: 14,
              },
            ]}
          />
        </div>
      )} */}
    </>
  );
};

export default Home;
