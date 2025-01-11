import { c as create_ssr_component, f as add_attribute, d as each, e as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/firebase.client.js";
import "firebase/firestore";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pID = "";
  let cart = [];
  let totalAmount = 0;
  totalAmount = cart.reduce((acc, item) => acc + item.total, 0);
  return `<div class="flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg h-screen"> <div class="flex items-center mb-4"><input id="pID" type="text" class="w-1/3 px-4 py-2 text-sm border rounded-md" placeholder="Scan product ID here.."${add_attribute("value", pID, 0)}> <button class="bg-blue-500 text-white px-6 py-2 rounded-md ml-4" data-svelte-h="svelte-koiqqx">Open Camera Barcode Scanner</button></div>  <div class="flex-grow overflow-auto max-h-[calc(100vh-200px)]"><table id="cartTable" class="min-w-full table-auto"><thead data-svelte-h="svelte-iziud6"><tr class="bg-gray-200"><th class="px-4 py-2 text-left">Product ID</th> <th class="px-4 py-2 text-left">Name</th> <th class="px-4 py-2 text-left">SRP</th> <th class="px-4 py-2 text-left">Quantity</th> <th class="px-4 py-2 text-left">Total</th> <th class="px-4 py-2 text-left">Actions</th></tr></thead> <tbody>${each(cart, ({ pID: pID2, name, srp, quantity, total }, index) => {
    return `<tr class="border-b"><td class="px-4 py-2">${escape(pID2)}</td> <td class="px-4 py-2">${escape(name)}</td> <td class="px-4 py-2">${escape(srp ? `$${srp.toFixed(2)}` : "$0.00")}</td> <td class="px-4 py-2"><button class="bg-yellow-500 text-white px-4 py-2 rounded-md" data-svelte-h="svelte-z88q22">-</button> <span class="mx-2">${escape(quantity)}</span> <button class="bg-yellow-500 text-white px-4 py-2 rounded-md" data-svelte-h="svelte-wkoovt">+
              </button></td> <td class="px-4 py-2">${escape(total ? `$${total.toFixed(2)}` : "$0.00")}</td> <td class="px-4 py-2"><button class="bg-red-500 text-white px-4 py-2 rounded-md" data-svelte-h="svelte-zki8u3">Delete
              </button></td> </tr>`;
  })}</tbody></table></div>  <div class="absolute bottom-6 right-6 flex items-center justify-between w-64"><span class="font-semibold text-lg">Grand Total: $${escape(totalAmount.toFixed(2))}</span> <button class="bg-green-500 text-white px-6 py-2 rounded-md" data-svelte-h="svelte-11bb1v3">Checkout</button></div></div>`;
});
export {
  Page as default
};
