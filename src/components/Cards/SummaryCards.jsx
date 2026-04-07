const SummaryCard = ({ title, amount, color }) => {
  return (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow hover:shadow-lg hover:scale-[1.02] transition duration-300">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        ₹ {amount}
      </h2>
    </div>
  );
};

export default SummaryCard; 