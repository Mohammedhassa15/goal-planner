import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + Number(g.savedAmount), 0);
  const completedGoals = goals.filter(g => Number(g.savedAmount) >= Number(g.targetAmount)).length;

  return (
  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-gray-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto space-y-4 mt-6">
    <h2 className="text-xl font-semibold text-indigo-700">Overview</h2>
    <p>Total Goals: <span className="font-bold">{totalGoals}</span></p>
    <p>Total Saved: <span className="font-bold text-green-700">ksh{totalSaved}</span></p>
    <p>Goals Completed: <span className="font-bold">{completedGoals}</span></p>
  </div>
);

}

export default Overview;
