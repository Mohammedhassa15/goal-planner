import React, { useState } from "react";
import DepositForm from "./DepositForm";

const API_URL = "https://goal-planner-ln77.onrender.com/goals";

function GoalItem({ goal, setGoals }) {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name,
    targetAmount,
    category,
    deadline,
  });

  const progress = Math.min(100, (savedAmount / targetAmount) * 100).toFixed(1);

  function handleDelete() {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setGoals((prev) => prev.filter((g) => g.id !== id))
    );
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const updatedGoal = { ...goal, ...editForm, targetAmount: Number(editForm.targetAmount) };

    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals((prev) => prev.map((g) => (g.id === id ? data : g)));
        setIsEditing(false);
      });
  }

  return (
    <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-gray-900 shadow-md p-4 rounded-2xl space-y-3 border border-emerald-300 mb-6 hover:shadow-xl transition-all duration-300">
      {!isEditing ? (
        <>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">
            Saved: <span className="font-medium">ksh{savedAmount}</span> / ksh{targetAmount}
          </p>
          <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">Category: {category}</p>
          <p className="text-sm text-gray-500">Deadline: {deadline}</p>
          <DepositForm goal={goal} setGoals={setGoals} />

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEditSubmit} className="space-y-2">
          <input
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            className="w-full border rounded p-1"
          />
          <input
            name="targetAmount"
            type="number"
            value={editForm.targetAmount}
            onChange={handleEditChange}
            className="w-full border rounded p-1"
          />
          <input
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
            className="w-full border rounded p-1"
          />
          <input
            name="deadline"
            type="date"
            value={editForm.deadline}
            onChange={handleEditChange}
            className="w-full border rounded p-1"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-600 text-sm hover:underline"
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
