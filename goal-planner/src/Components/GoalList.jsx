import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goals, setGoals }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Your Goals</h2>
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} setGoals={setGoals} />
      ))}
    </div>
  );
}

export default GoalList;
