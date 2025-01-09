import { c as create_ssr_component, f as add_attribute, d as each, e as escape } from "../../../../chunks/ssr.js";
import "firebase/firestore";
import "../../../../chunks/client.js";
import "feather-icons";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchQuery = "";
  let items = [];
  return ` <div class="flex flex-col gap-4 p-4 h-full"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-2 flex-grow"><input type="text" class="border border-gray-300 rounded-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search items..."${add_attribute("value", searchQuery, 0)}> <button class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200 flex items-center" data-svelte-h="svelte-14ogfwh"><i data-feather="search" class="mr-1" aria-hidden="true"></i>
        Search</button></div> <button class="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-200 ml-4 flex items-center" data-svelte-h="svelte-1vp1r5n"><i data-feather="plus" class="mr-1" aria-hidden="true"></i>
      Add Item</button></div>  <div class="overflow-x-auto border border-gray-300 rounded-lg"><table class="min-w-full table-auto border-collapse"><thead class="bg-gradient-to-r from-blue-500 to-blue-500 text-white" data-svelte-h="svelte-b908mi"><tr><th class="px-2 py-1 text-left text-sm" style="width: 200px;">PRODUCT ID</th> <th class="px-2 py-1 text-left text-sm">ITEM NAME</th> <th class="px-2 py-1 text-center text-sm" style="width: 150px;">SRP</th> <th class="px-2 py-1 text-center text-sm" style="width: 150px;">STOCKS</th> <th class="px-2 py-1 text-center text-sm" style="width: 150px;">COST</th>  <th class="px-2 py-1 text-center text-sm" style="width: 200px;">ACTIONS</th></tr></thead> <tbody class="bg-white">${each(items, ({ pID, name, srp, stocks, cost }) => {
    return `<tr class="hover:bg-gray-200 transition duration-200 text-sm"><td class="border px-2 py-1">${escape(pID)}</td> <td class="border px-2 py-1">${escape(name)}</td> <td class="border px-2 py-1 text-center">${escape(srp)}</td> <td class="border px-2 py-1 text-center">${escape(stocks)}</td> <td class="border px-2 py-1 text-center">${escape(cost)}</td>  <td class="border px-2 py-1 text-center"><div class="flex justify-center gap-2"><button class="bg-yellow-500 text-white rounded-md flex items-center justify-center px-2 py-1 hover:bg-yellow-600 transition duration-200" style="min-width: 40px;" data-svelte-h="svelte-1udin69"><i data-feather="edit" aria-hidden="true"></i></button> <button class="bg-red-500 text-white rounded-md flex items-center justify-center px-2 py-1 hover:bg-red-600 transition duration-200" style="min-width: 40px;" data-svelte-h="svelte-1dlrsqq"><i data-feather="trash" aria-hidden="true"></i></button> </div></td> </tr>`;
  })}</tbody></table></div></div>`;
});
export {
  Page as default
};
