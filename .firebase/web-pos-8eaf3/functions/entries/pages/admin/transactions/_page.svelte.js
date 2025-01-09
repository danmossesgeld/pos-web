import { c as create_ssr_component, f as add_attribute, d as each, e as escape } from "../../../../chunks/ssr.js";
import "firebase/firestore";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchQuery = "";
  let startDate = "";
  let endDate = "";
  let transactions = [];
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };
  const calculateGrandTotals = () => {
    return transactions.reduce(
      (totals, transaction) => {
        totals.totalSrp += transaction.TotalSrp || 0;
        totals.totalIncome += transaction.TotalIncome || 0;
        return totals;
      },
      { totalSrp: 0, totalIncome: 0 }
    );
  };
  return ` <div class="flex items-center justify-between mb-1"> <input type="text" placeholder="Search by ID..." class="border border-gray-300 p-2 rounded-md w-1/3"${add_attribute("value", searchQuery, 0)}>  <div class="flex gap-2"><input type="date" class="border border-gray-300 p-2"${add_attribute("value", startDate, 0)}> <span data-svelte-h="svelte-wmyx4s">~</span> <input type="date" class="border border-gray-300 p-2"${add_attribute("value", endDate, 0)}></div></div>  <div class="relative flex flex-col h-[calc(100vh-150px)]"> <div class="overflow-x-auto flex-1 pb-20"> <table class="min-w-full table-auto border-collapse"><thead class="bg-gradient-to-r from-blue-500 to-blue-500 text-white" data-svelte-h="svelte-10qvbah"><tr><th class="px-2 py-1 text-left text-sm">ID</th> <th class="px-2 py-1 text-left text-sm">DateTime</th> <th class="px-2 py-1 text-left text-sm">Total SRP</th> <th class="px-2 py-1 text-left text-sm">Total Income</th> <th class="px-2 py-1 text-left text-sm">Actions</th> </tr></thead> <tbody class="bg-white">${`${transactions.length > 0 ? `${each(transactions, ({ DateTime, TotalSrp, TotalIncome, id }) => {
    return `<tr class="hover:bg-gray-200 transition duration-200 text-sm"><td class="border px-2 py-1">${escape(id)}</td> <td class="border px-2 py-1">${escape(formatDate(DateTime))}</td> <td class="border px-2 py-1">${escape(TotalSrp)}</td> <td class="border px-2 py-1">${escape(TotalIncome)}</td> <td class="border px-2 py-1 text-center"><button class="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600" data-svelte-h="svelte-cmrij7">Details
                </button></td> </tr>`;
  })}` : `<tr data-svelte-h="svelte-1rr6of5"><td colspan="5" class="text-center py-4">No transactions found</td></tr>`}`}</tbody></table></div>  ${transactions.length > 0 ? `<div class="absolute bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-8"><div class="flex gap-8 text-lg font-semibold"><span>Total Sales: ${escape(calculateGrandTotals().totalSrp.toFixed(2))}</span> <span>Total Income: ${escape(calculateGrandTotals().totalIncome.toFixed(2))}</span></div></div>` : ``}</div>`;
});
export {
  Page as default
};
