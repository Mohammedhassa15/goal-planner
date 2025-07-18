function Stats({ goals }) {
  const totalGoals = goals.length;

  const totalTarget = goals.reduce((sum, goal) => {
    const target =
      Number(goal.targetAmount) ||
      Number(goal.amount) ||
      Number(goal.target) ||
      0;
    return sum + target;
  }, 0);

  const totalSaved = goals.reduce((sum, goal) => {
    const saved =
      Number(goal.saved) ||
      Number(goal.savedAmount) ||
      Number(goal.currentAmount) ||
      0;
    return sum + saved;
  }, 0);

  const overallProgress = totalTarget
    ? Math.round((totalSaved / totalTarget) * 100)
    : 0;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Overview</h2>
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Target:</strong> KES {totalTarget.toLocaleString()}</p>
      <p><strong>Total Saved:</strong> KES {totalSaved.toLocaleString()}</p>
      <p><strong>Overall Progress:</strong> {overallProgress}%</p>
    </div>
  );
}

export default Stats;
