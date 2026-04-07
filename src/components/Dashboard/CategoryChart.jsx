import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import useFinance from "../../context/useFinance";

const COLORS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f59e0b", // yellow
  "#ef4444", // red
  "#a855f7", // purple
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
  "#e11d48", // rose
  "#14b8a6", // teal
  "#8b5cf6", // violet
  "#0ea5e9", // sky
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 p-2 rounded shadow text-white border border-zinc-700">
        <p>{payload[0].name}</p>
        <p>₹ {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const CategoryChart = () => {
  const { transactions } = useFinance();

  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const categoryData = {};

  expenseTransactions.forEach((t) => {
    if (categoryData[t.category]) {
      categoryData[t.category] += Number(t.amount);
    } else {
      categoryData[t.category] = Number(t.amount);
    }
  });

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const total = data.reduce((acc, item) => acc + item.value, 0);

  
  return (
    <div className="bg-zinc-800 p-4 rounded-xl relative">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
          data={data}
          dataKey="value"
          innerRadius={80}
          outerRadius={110}
          paddingAngle={3}
          cornerRadius={2} 
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-gray-400">Total</p>
        <p className="text-xl font-bold text-white">₹ {total}</p>
      </div>
    </div>
  );
};

export default CategoryChart;