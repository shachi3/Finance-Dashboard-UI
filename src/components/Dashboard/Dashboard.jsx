import React from "react";
import SummaryCard from "../Cards/SummaryCards";
import BalanceChart from "./BalanceChart";
import CategoryChart from "./CategoryChart";
import useFinance from "../../context/useFinance";

const Dashboard = () => {
  const { transactions } = useFinance();

console.log("Transactions:", transactions);
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-1 ">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={balance} color="text-blue-400" />
        <SummaryCard title="Income" amount={income} color="text-green-400" />
        <SummaryCard title="Expenses" amount={expense} color="text-red-400" />
      </div>

  <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6 ">
    
  <div className="bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
    <h2 className="mb-3 text-lg font-semibold">Balance Trend</h2>
    <BalanceChart />
  </div>
  <div className="bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
    <h2 className="mb-3 text-lg font-semibold">Spending Breakdown</h2>
    <CategoryChart />
  </div>
</div>
    </div>
  );
};

export default Dashboard;