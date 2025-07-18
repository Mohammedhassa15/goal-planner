import React, { useState } from "react";

const API_URL = "http://localhost:3000";

function GoalItem({ goal, setGoals }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [editData, setEditData] = useState({
    title: goal.title,
    amount: goal.amount,
    deadline: goal.deadline,
  });
  const [depositAmount, setDepositAmount] = useState("");

  const handleDelete = async () => {
    await fetch(`${API_URL}/goals/${goal.id}`, { method: "DELETE" });
    setGoals((prev) => prev.filter((g) => g.id !== goal.id));
  };

  const handleToggleComplete = async () => {
    const updatedGoal = { ...goal, completed: !goal.completed };
    await fetch(`${API_URL}/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: updatedGoal.completed }),
    });
    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? updatedGoal : g))
    );
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedGoal = {
      ...goal,
      title: editData.title,
      amount: Number(editData.amount),
      deadline: editData.deadline,
    };
    await fetch(`${API_URL}/goals/${goal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    });
    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? updatedGoal : g))
    );
    setShowEditForm(false);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    const deposit = Number(depositAmount);
    if (!deposit || deposit <= 0) return;

    const newSaved = (goal.saved || 0) + deposit;
    const updatedGoal = { ...goal, saved: newSaved };

    await fetch(`${API_URL}/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saved: newSaved }),
    });

    await fetch(`${API_URL}/deposits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goalId: goal.id,
        amount: deposit,
        date: new Date().toISOString(),
      }),
    });

    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? updatedGoal : g))
    );
    setDepositAmount("");
    setShowDepositForm(false);
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">
        {goal.title} {goal.completed && "(Done)"}
      </h3>
      <p>Target: KES {Number(goal.amount || 0).toLocaleString()}</p>
      <p>Saved: KES {Number(goal.saved || 0).toLocaleString()}</p>
      <p>Deadline: {goal.deadline}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleToggleComplete}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          {goal.completed ? "Undo" : "Mark Done"}
        </button>
        <button
          onClick={() => setShowEditForm(!showEditForm)}
          className="bg-teal-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => setShowDepositForm(!showDepositForm)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Deposit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <form onSubmit={handleEditSubmit} className="mt-3 space-y-2">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="Title"
            required
          />
          <input
            type="number"
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
            className="border p-2 rounded w-full"
            placeholder="Target Amount"
            min={1}
            required
          />
          <input
            type="date"
            value={editData.deadline}
            onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowEditForm(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Deposit Form */}
      {showDepositForm && (
        <form onSubmit={handleDeposit} className="mt-3 space-y-2">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Deposit Amount"
            className="border p-2 rounded w-full"
            min={1}
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-yellow-600 text-white px-3 py-1 rounded">
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowDepositForm(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default GoalItem;
