import React from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./Pages/Transactions";
import Insights from "./Pages/Insights";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      
      {/* Sidebar */}
      <Menu />

      {/* Right Section */}
      <div className="flex-1 flex flex-col ">
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6 overflow-y-auto space-y-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>

      </div>
    </div>
  );
};

export default App;