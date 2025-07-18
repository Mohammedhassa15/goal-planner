import React, { useState } from "react";

const API_URL = "http://localhost:3000/goals";

function DepositForm({ goals, onDeposit }) {
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  const handleDeposit = (e) => {
    e.preventDefault();
    const goal = goals.find((g) => g.id === parseInt(selectedId));
    if (!goal) return;

    const updated = {
      ...goal,
      saved: goal.saved + parseFloat(amount),
    };

    fetch(`${API_URL}/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saved: updated.saved }),
    })
      .then((res) => res.json())
      .then(() => {
        setAmount("");
        onDeposit(); // refetch
      });
  };

  return (
    <form onSubmit={handleDeposit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Make a Deposit</h2>
      <select
        className="border p-2 w-full mb-2"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        required
      >
        <option value="">Select Goal</option>
        {goals.map((g) => (
          <option key={g.id} value={g.id}>
            {g.title}
          </option>
        ))}
      </select>
      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button className="bg-purple-500 text-white px-4 py-2 rounded" type="submit">
        Deposit
      </button>
    </form>
  );
}

export default DepositForm;
