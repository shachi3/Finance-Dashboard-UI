import React, { useState, useEffect } from "react";
import FinanceContext from "./FinanceContext";
import { mockTransactions } from "../data/mockTransactions";

const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const parsed = saved ? JSON.parse(saved) : [];
    
    // If localStorage empty → use mock data
    return parsed.length > 0 ? parsed : mockTransactions;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };
  
  const editTransaction = (updatedTransaction) => {
  setTransactions((prev) =>
    prev.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    )
  );
};

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, editTransaction }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceProvider;