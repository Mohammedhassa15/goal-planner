import React, { useEffect, useState } from "react";
import GoalForm from "./Components/GoalForm";
import GoalList from "./Components/GoalList";
import Stats from "./Components/Stats";

const API_URL = "http://localhost:3000/goals";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Smart Goal Planner</h1>
      <GoalForm setGoals={setGoals} />
      <Stats goals={goals} />
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default App;
