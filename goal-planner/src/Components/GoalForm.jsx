import React, { useState } from "react";

const API_URL = "https://json-server-deployment-1-rjqj.onrender.com/goals";

function GoalForm({ setGoals }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    savedAmount: 0,
    category: "",
    deadline: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().split("T")[0]
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(data => {
        setGoals(prev => [...prev, data]);
        setFormData({ name: "", targetAmount: "", savedAmount: 0, category: "", deadline: "" });
      });
  }

  return (
  <form onSubmit={handleSubmit} className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-gray-900 p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto mt-6">
    <h2 className="text-3xl font-bold text-emerald-700 mb-4 border-b-2 border-emerald-300 pb-2">Add New Goal</h2>
    <input
      name="name"
      placeholder="Goal Name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full border rounded p-2"
    />
    <input
      name="targetAmount"
      type="number"
      placeholder="Target Amount"
      value={formData.targetAmount}
      onChange={handleChange}
      required
      className="w-full border rounded p-2"
    />
    <input
      name="category"
      placeholder="Category"
      value={formData.category}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
    <input
      name="deadline"
      type="date"
      value={formData.deadline}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
    <button
      type="submit"
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded transition-all"
    >
      Add Goal
    </button>
  </form>
);


}

export default GoalForm;
