import React, { useState } from "react";

const API_URL = "http://localhost:3000/goals";

function GoalForm({ setGoals }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    deadline: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...formData,
      amount: Number(formData.amount),
      saved: 0,
      completed: false,
    };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => setGoals((prev) => [...prev, data]));

    setFormData({ title: "", amount: "", deadline: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-3">
      <h2 className="text-xl font-semibold">Add New Goal</h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Goal Title"
        className="w-full border p-2"
        required
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Target Amount"
        className="w-full border p-2"
        required
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Goal
      </button>
    </form>
  );
}

export default GoalForm;
