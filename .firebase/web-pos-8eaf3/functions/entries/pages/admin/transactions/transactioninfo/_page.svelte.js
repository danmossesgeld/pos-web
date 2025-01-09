import { c as create_ssr_component, b as subscribe, e as escape, d as each } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "firebase/firestore";
import "../../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let transactionDetails = [];
  let pID;
  let grandTotal = 0;
  pID = $page.url.searchParams.get("pID") || "";
  $$unsubscribe_page();
  return ` <div class="flex flex-col p-4"> <h2 class="text-2xl font-bold mb-4">Item List for transaction #[${escape(pID)}]</h2>  <div class="overflow-x-auto border border-gray-300 rounded-lg"><table class="min-w-full table-auto border-collapse"><thead class="bg-gradient-to-r from-blue-500 to-blue-500 text-white" data-svelte-h="svelte-1eu46do"><tr><th class="px-2 py-1 text-left text-sm">Product ID</th> <th class="px-2 py-1 text-left text-sm">Item Name</th> <th class="px-2 py-1 text-left text-sm">Qty</th> <th class="px-2 py-1 text-left text-sm">SRP</th> <th class="px-2 py-1 text-left text-sm">Total</th> </tr></thead> <tbody class="bg-white">${transactionDetails.length > 0 ? `${each(transactionDetails, ({ pID: pID2, name, quantity, srp }) => {
    return `<tr class="hover:bg-gray-200 transition duration-200 text-sm"><td class="border px-2 py-1">${escape(pID2)}</td> <td class="border px-2 py-1">${escape(name)}</td> <td class="border px-2 py-1">${escape(quantity)}</td> <td class="border px-2 py-1">${escape(srp)}</td> <td class="border px-2 py-1">${escape((quantity * srp).toFixed(2))}</td>  </tr>`;
  })}` : `<tr data-svelte-h="svelte-bqaxt3"><td colspan="5" class="text-center py-4">No details found for this transaction</td></tr>`}</tbody></table></div>  ${transactionDetails.length > 0 ? `<div class="flex justify-end mt-4 text-xl font-semibold"><span class="mr-4" data-svelte-h="svelte-1kq6qlt">Grand Total:</span> <span>${escape(grandTotal.toFixed(2))}</span></div>` : ``}  <div class="flex justify-center mt-4"><button class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" data-svelte-h="svelte-1hdvr1x">Back to Transactions</button></div></div>`;
});
export {
  Page as default
};
