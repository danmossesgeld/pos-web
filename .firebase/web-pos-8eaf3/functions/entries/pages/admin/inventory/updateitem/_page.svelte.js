import { c as create_ssr_component, f as add_attribute, e as escape } from "../../../../../chunks/ssr.js";
import "firebase/firestore";
import "../../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let itemName = "";
  let itemQuantity = "";
  let itemPrice = "";
  let itemCost = "";
  return ` <div class="flex justify-center items-center h-screen bg-gray-100"><div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"> <h2 class="text-xl font-bold text-gray-700 text-center mb-6" data-svelte-h="svelte-z93ck2">UPDATE ITEM</h2>  <form class="space-y-4"> <div class="flex items-center"><i data-feather="tag" class="mr-2 text-gray-400"></i> <input type="text" id="itemName" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter item name" required${add_attribute("value", itemName, 0)}></div>  <div class="flex items-center"><i data-feather="layers" class="mr-2 text-gray-400"></i> <input type="number" id="itemQuantity" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter quantity" required${add_attribute("value", itemQuantity, 0)}></div>  <div class="flex items-center"><i data-feather="dollar-sign" class="mr-2 text-gray-400"></i> <input type="number" id="itemPrice" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter price" required${add_attribute("value", itemPrice, 0)}></div>  <div class="flex items-center"><i data-feather="dollar-sign" class="mr-2 text-gray-400"></i> <input type="number" id="itemCost" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter cost" required${add_attribute("value", itemCost, 0)}></div>  <button type="submit" class="submit-button flex items-center justify-center">${`<i data-feather="edit" class="mr-2"></i> `} <span class="ml-2 text-center">${escape("UPDATE")}</span> </button></form></div></div>`;
});
export {
  Page as default
};
