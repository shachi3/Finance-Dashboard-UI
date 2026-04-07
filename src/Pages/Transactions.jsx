import React, { useState } from "react";
import { categories } from "../data/categories";
import useFinance from "../context/useFinance";

const Transactions = () => {
  const { transactions, deleteTransaction, addTransaction, editTransaction } =
    useFinance();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "viewer";
  });

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // Filter
  const filteredTransactions = transactions.filter((t) => {
    return (
      t.category.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "all" || t.type === filterType)
    );
  });

  // Add / Edit Submit
  const handleSubmit = () => {
    if (!formData.date || !formData.amount || !formData.category) {
      alert("Please fill all fields");
      return;
    }

    if (editMode) {
      editTransaction({
        ...formData,
        id: selectedTransaction.id,
        amount: Number(formData.amount),
      });
    } else {
      addTransaction({
        ...formData,
        amount: Number(formData.amount),
      });
    }

    setShowModal(false);
    setEditMode(false);
    setSelectedTransaction(null);

    setFormData({
      date: "",
      amount: "",
      category: "",
      type: "expense",
    });
  };

  // Edit
  const handleEdit = (transaction) => {
    setEditMode(true);
    setSelectedTransaction(transaction);
    setFormData({
      date: transaction.date,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
    });
    setShowModal(true);
  };

  // Delete
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="p-6 text-white bg-zinc-950 min-h-screen">
      <h2 className="text-2xl mb-4 font-semibold">Transactions</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search category..."
          className="p-2 rounded bg-zinc-800 border border-zinc-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 rounded bg-zinc-800 border border-zinc-700"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="p-2 rounded bg-zinc-800 border border-zinc-700"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            localStorage.setItem("role", e.target.value);
          }}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {role === "admin" && (
          <button
            className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-zinc-800">
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No transactions found
                </td>
              </tr>
            )}

            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-zinc-800 hover:bg-zinc-800/60 transition"
              >
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.category}</td>

                <td className="p-3 font-semibold">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      t.type === "income"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"} ₹{t.amount}
                  </span>
                </td>

                <td className="p-3 capitalize">{t.type}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-rose-500 hover:bg-rose-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-6 rounded-2xl w-96 shadow-2xl border border-zinc-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editMode ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <input
              type="date"
              className="w-full p-2 mb-3 bg-zinc-800 text-white rounded-lg"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 mb-3 bg-zinc-800 text-white rounded-lg"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            <select
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 mb-3 bg-zinc-800 text-white rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 mb-4 bg-zinc-800 text-white rounded-lg"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <div className="flex justify-between gap-3">
              <button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
                onClick={handleSubmit}
              >
                {editMode ? "Update" : "Add"}
              </button>

              <button
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;