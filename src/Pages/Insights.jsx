import React from "react";
import { getInsights } from "../utils/insightUtils";
import useFinance from "../context/useFinance";

const Insights = () => {
  const { transactions } = useFinance();
  const insights = getInsights(transactions);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-6">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-800 p-4 rounded-xl">
          <h3 className="text-gray-400">Highest Spending Category</h3>
          <p className="text-xl font-bold mt-2">
            {insights.highestCategory}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">
          <h3 className="text-gray-400">Total Expense</h3>
          <p className="text-xl font-bold mt-2">
            ₹ {insights.totalExpense}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">
          <h3 className="text-gray-400">Total Income</h3>
          <p className="text-xl font-bold mt-2">
            ₹ {insights.totalIncome}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">
          <h3 className="text-gray-400">Average Expense</h3>
          <p className="text-xl font-bold mt-2">
            ₹ {insights.avgExpense.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;