import React, { useState } from "react";

const API_URL = "https://goal-planner-ln77.onrender.com/goals";

function DepositForm({ goal, setGoals }) {
  const [amount, setAmount] = useState("");

  function handleDeposit(e) {
    e.preventDefault();
    const updatedAmount = parseFloat(goal.savedAmount) + parseFloat(amount);

    fetch(`${API_URL}/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount })
    })
      .then(res => res.json())
      .then(updatedGoal => {
        setGoals(prev => prev.map(g => (g.id === goal.id ? updatedGoal : g)));
        setAmount("");
      });
  }

 return (
  <form onSubmit={handleDeposit} className="flex gap-2 mt-2">
    <input
      type="number"
      min="1"
      value={amount}
      onChange={e => setAmount(e.target.value)}
      placeholder="Deposit"
      required
      className="flex-1 border rounded p-1"
    />
    <button
      type="submit"
      className="bg-green-600 text-white px-3 rounded hover:bg-green-700 transition text-sm"
    >
      Deposit
    </button>
  </form>
);

}

export default DepositForm;
