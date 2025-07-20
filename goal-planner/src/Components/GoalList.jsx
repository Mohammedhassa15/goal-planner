import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goals, setGoals }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4 border-emerald-300 hover:shadow-xl transition-all duration-300">MY GOALS</h2>
      <div className="flex flex-col gap-4">
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} setGoals={setGoals} />
        ))}
      </div>
    </div>
  );
}

export default GoalList;
