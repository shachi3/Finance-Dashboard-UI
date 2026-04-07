import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiHome4Fill,
  RiWallet3Fill,
  RiBankCardFill,
  RiMoneyRupeeCircleFill,
  RiHandCoinFill,
  RiFundsBoxFill,
  RiBarChartFill,
  RiExchangeDollarFill,
  RiMenuLine,
} from "@remixicon/react";

const menuItems = [
  { name: "Dashboard", icon: RiHome4Fill, path: "/" },
  { name: "Accounts", icon: RiWallet3Fill, path: "/accounts" },
  { name: "Cards", icon: RiBankCardFill, path: "/cards" },
  { name: "Savings", icon: RiMoneyRupeeCircleFill, path: "/savings" },
  { name: "Loans", icon: RiHandCoinFill, path: "/loans" },
  { name: "Investing", icon: RiFundsBoxFill, path: "/investing" },
  { name: "Insights", path: "/insights", icon: RiBarChartFill },
  { name: "Transactions", path: "/transactions", icon: RiExchangeDollarFill },
];

const Menu = () => {
  const [open, setOpen] = useState(true); // menu open by default

  return (
    <div
      className={`bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Hamburger & Logo */}
      <div className="flex items-center justify-between mb-8">

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-zinc-800 transition"
        >
          <RiMenuLine size={24} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-zinc-700 text-white"
                    : "text-gray-400 hover:bg-zinc-800"
                }`
              }
            >
              <Icon size={24} />
              {open && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Menu;