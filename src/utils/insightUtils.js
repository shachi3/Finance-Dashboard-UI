export const getInsights = (transactions) => {
 let totalExpense = 0;
 let totalIncome = 0;
 let categoryTotals = {};

 transactions.forEach((t) => {
  if (t.type === "expense") {
   totalExpense += t.amount;
   categoryTotals[t.category] =
    (categoryTotals[t.category] || 0) + t.amount;
  } else {
   totalIncome += t.amount;
  }
 });

 // Highest spending category
 let highestCategory = "";
 let max = 0;

 for (let cat in categoryTotals) {
  if (categoryTotals[cat] > max) {
   max = categoryTotals[cat];
   highestCategory = cat;
  }
 }

 return {
  totalExpense,
  totalIncome,
  highestCategory,
  avgExpense: totalExpense / transactions.length || 0,
 };
};