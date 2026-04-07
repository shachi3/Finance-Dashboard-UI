import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useFinance from "../../context/useFinance";

const BalanceChart = () => {
  const { transactions } = useFinance();

  // Group by month
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    if (t.type === "income") {
      monthlyData[month] += Number(t.amount);
    } else {
      monthlyData[month] -= Number(t.amount);
    }
  });

  const data = Object.keys(monthlyData).sort(
  (a, b) =>
    new Date(`1 ${a} 2024`) - new Date(`1 ${b} 2024`)
).map((month) => ({
    month,
    balance: monthlyData[month],
  }));

  return (
    <div className="bg-zinc-800 p-4 rounded-xl">
      {/* <h2 className="text-white mb-4">Balance Trend</h2> */}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#4ade80" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;