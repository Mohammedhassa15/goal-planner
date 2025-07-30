import React, { useEffect, useState } from "react";
import GoalList from "./Components/GoalList";
import GoalForm from "./Components/GoalForm";
import Overview from "./Components/Overview";

const API_URL = "https://goal-planner-ln77.onrender.com/goals";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 text-gray-900 text-gray-800 p-6 py-8 px-4">
    <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">Smart Goal Planner</h1>
    <div className="max-w-5xl mx-auto space-y-8">
      <GoalForm setGoals={setGoals} />
      <Overview goals={goals} />
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  </div>
);

}

export default App;
