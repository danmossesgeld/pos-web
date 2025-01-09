import { c as create_ssr_component, f as add_attribute, d as each, e as escape } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.client.js";
import "firebase/firestore";
const css = {
  code: ".fixed.svelte-1hk5ht{position:fixed}.text-xl.svelte-1hk5ht{font-size:1.2rem}.text-2xl.svelte-1hk5ht{font-size:2rem}.bg-white.svelte-1hk5ht{background-color:white}.rounded-lg.svelte-1hk5ht{border-radius:0.5rem}.shadow-lg.svelte-1hk5ht{box-shadow:0 4px 6px rgba(0, 0, 0, 0.1)}.hover\\:bg-green-600.svelte-1hk5ht:hover{background-color:#2f855a}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { db } from \\"../../lib/firebase/firebase.client\\";\\nimport {\\n  collection,\\n  query,\\n  where,\\n  getDocs,\\n  addDoc,\\n  doc,\\n  updateDoc,\\n  increment\\n} from \\"firebase/firestore\\";\\nlet pID = \\"\\";\\nlet cart = [];\\nlet totalAmount = 0;\\nlet totalCost = 0;\\nlet totalSrp = 0;\\nlet totalIncome = 0;\\nconst fetchItemDetails = async (pID2) => {\\n  const inventoryCollection = collection(db, \\"Inventory\\");\\n  const itemQuery = query(inventoryCollection, where(\\"pID\\", \\"==\\", pID2));\\n  try {\\n    const snapshot = await getDocs(itemQuery);\\n    if (snapshot.empty) {\\n      alert(\\"Item not found.\\");\\n      return null;\\n    }\\n    const item = snapshot.docs[0].data();\\n    return {\\n      name: item.name,\\n      srp: item.srp,\\n      cost: item.cost\\n    };\\n  } catch (error) {\\n    console.error(\\"Error fetching item details:\\", error);\\n    alert(\\"There was an error fetching the item details.\\");\\n    return null;\\n  }\\n};\\nconst addToCart = async () => {\\n  if (!pID) {\\n    alert(\\"Please enter a valid product ID.\\");\\n    return;\\n  }\\n  const itemDetails = await fetchItemDetails(pID);\\n  if (!itemDetails) return;\\n  const { name, srp } = itemDetails;\\n  const existingItemIndex = cart.findIndex((item) => item.pID === pID);\\n  if (existingItemIndex !== -1) {\\n    cart[existingItemIndex].quantity += 1;\\n    cart[existingItemIndex].total = cart[existingItemIndex].srp * cart[existingItemIndex].quantity;\\n  } else {\\n    cart = [...cart, { pID, name, srp, quantity: 1, total: srp }];\\n  }\\n  pID = \\"\\";\\n};\\nconst adjustQuantity = (index, change) => {\\n  const item = cart[index];\\n  item.quantity += change;\\n  if (item.quantity < 1) {\\n    item.quantity = 1;\\n  }\\n  item.total = item.srp * item.quantity;\\n  cart = [...cart];\\n};\\nconst deleteItem = (index) => {\\n  cart = cart.filter((_, i) => i !== index);\\n};\\n$: totalAmount = cart.reduce((acc, item) => acc + item.total, 0);\\nconst generateTransactionID = async () => {\\n  const transactionsRef = collection(db, \\"Transactions\\");\\n  const snapshot = await getDocs(transactionsRef);\\n  const count = snapshot.size + 1;\\n  return `TID${String(count).padStart(8, \\"0\\")}`;\\n};\\nconst handleCheckout = async () => {\\n  if (cart.length === 0) {\\n    alert(\\"Your cart is empty!\\");\\n    return;\\n  }\\n  try {\\n    const transactionID = await generateTransactionID();\\n    totalCost = 0;\\n    totalSrp = 0;\\n    totalIncome = 0;\\n    for (const item of cart) {\\n      const details = await fetchItemDetails(item.pID);\\n      if (!details) continue;\\n      totalCost += details.cost * item.quantity;\\n      totalSrp += item.srp * item.quantity;\\n    }\\n    totalIncome = totalSrp - totalCost;\\n    const transactionData = {\\n      DateTime: (/* @__PURE__ */ new Date()).toISOString(),\\n      TotalCost: totalCost,\\n      TotalSrp: totalSrp,\\n      TotalIncome: totalIncome\\n    };\\n    await addDoc(collection(db, \\"Transactions\\"), {\\n      id: transactionID,\\n      ...transactionData\\n    });\\n    for (const item of cart) {\\n      const details = await fetchItemDetails(item.pID);\\n      if (!details) continue;\\n      await addDoc(collection(db, \\"TransactionItems\\"), {\\n        id: transactionID,\\n        // Use the same transactionID for all items\\n        pID: item.pID,\\n        name: item.name,\\n        quantity: item.quantity,\\n        srp: item.srp,\\n        cost: details.cost\\n        // Ensure cost is fetched from the inventory\\n      });\\n    }\\n    for (const item of cart) {\\n      const inventoryQuery = query(\\n        collection(db, \\"Inventory\\"),\\n        where(\\"pID\\", \\"==\\", item.pID)\\n      );\\n      const snapshot = await getDocs(inventoryQuery);\\n      if (!snapshot.empty) {\\n        const docRef = snapshot.docs[0].ref;\\n        await updateDoc(docRef, {\\n          stocks: increment(-item.quantity)\\n          // Update the \'stocks\' field\\n        });\\n      }\\n    }\\n    alert(\\"Transaction finalized successfully!\\");\\n    cart = [];\\n  } catch (error) {\\n    console.error(\\"Error during checkout:\\", error);\\n    alert(\\"There was an error during the checkout process.\\");\\n  }\\n};\\nconst handleKeydown = (event) => {\\n  if (event.key === \\"Enter\\") {\\n    addToCart();\\n  }\\n};\\n<\/script>\\r\\n\\r\\n<!-- Updated Container -->\\r\\n<div class=\\"flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg h-screen relative\\">\\r\\n  <!-- Product ID Input -->\\r\\n  <div class=\\"mb-4\\">\\r\\n    <input\\r\\n      id=\\"pID\\"\\r\\n      type=\\"text\\"\\r\\n      bind:value={pID}\\r\\n      class=\\"w-1/3 px-4 py-2 text-sm border rounded-md\\"\\r\\n      placeholder=\\"Scan product ID here..\\"\\r\\n      on:keydown={handleKeydown}\\r\\n    />\\r\\n  </div>\\r\\n\\r\\n  <!-- Cart Label -->\\r\\n  <h2 class=\\"text-xl font-semibold mb-4 text-gray-800\\">Items List</h2>\\r\\n\\r\\n  <!-- Cart Table (Scrollable) -->\\r\\n  <div class=\\"flex-grow overflow-auto max-h-[calc(100vh-200px)]\\">\\r\\n    <table id=\\"cartTable\\" class=\\"min-w-full table-auto\\">\\r\\n      <thead>\\r\\n        <tr class=\\"bg-gray-200\\">\\r\\n          <th class=\\"px-4 py-2 text-left\\">Product ID</th>\\r\\n          <th class=\\"px-4 py-2 text-left\\">Name</th>\\r\\n          <th class=\\"px-4 py-2 text-left\\">SRP</th>\\r\\n          <th class=\\"px-4 py-2 text-left\\">Quantity</th>\\r\\n          <th class=\\"px-4 py-2 text-left\\">Total</th>\\r\\n          <th class=\\"px-4 py-2 text-left\\">Actions</th>\\r\\n        </tr>\\r\\n      </thead>\\r\\n      <tbody>\\r\\n        {#each cart as { pID, name, srp, quantity, total }, index}\\r\\n          <tr class=\\"border-b\\">\\r\\n            <td class=\\"px-4 py-2\\">{pID}</td>\\r\\n            <td class=\\"px-4 py-2\\">{name}</td>\\r\\n            <td class=\\"px-4 py-2\\">{srp ? `$${srp.toFixed(2)}` : \'$0.00\'}</td>\\r\\n            <td class=\\"px-4 py-2\\">\\r\\n              <button\\r\\n                class=\\"bg-yellow-500 text-white px-4 py-2 rounded-md\\"\\r\\n                on:click={() => adjustQuantity(index, -1)}\\r\\n              >\\r\\n                -\\r\\n              </button>\\r\\n              <span class=\\"mx-2\\">{quantity}</span>\\r\\n              <button\\r\\n                class=\\"bg-yellow-500 text-white px-4 py-2 rounded-md\\"\\r\\n                on:click={() => adjustQuantity(index, 1)}\\r\\n              >\\r\\n                +\\r\\n              </button>\\r\\n            </td>\\r\\n            <td class=\\"px-4 py-2\\">{total ? `$${total.toFixed(2)}` : \'$0.00\'}</td>\\r\\n            <td class=\\"px-4 py-2\\">\\r\\n              <button\\r\\n                class=\\"bg-red-500 text-white px-4 py-2 rounded-md\\"\\r\\n                on:click={() => deleteItem(index)}\\r\\n              >\\r\\n                Delete\\r\\n              </button>\\r\\n            </td>\\r\\n          </tr>\\r\\n        {/each}\\r\\n      </tbody>\\r\\n    </table>\\r\\n  </div>\\r\\n\\r\\n  <!-- Total Section (Fixed at Bottom Right) -->\\r\\n  <div class=\\"fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4\\">\\r\\n    <span class=\\"text-xl font-semibold\\">Total:</span>\\r\\n    <span class=\\"text-2xl text-gray-800\\">${totalAmount.toFixed(2)}</span>\\r\\n    <button\\r\\n      class=\\"bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition\\"\\r\\n      on:click={handleCheckout}\\r\\n    >\\r\\n      FINALIZE\\r\\n    </button>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  /* Styles for total amount positioning */\\r\\n  .fixed {\\r\\n    position: fixed;\\r\\n  }\\r\\n\\r\\n  .text-xl {\\r\\n    font-size: 1.2rem;\\r\\n  }\\r\\n\\r\\n  .text-2xl {\\r\\n    font-size: 2rem;\\r\\n  }\\r\\n\\r\\n  .bg-white {\\r\\n    background-color: white;\\r\\n  }\\r\\n\\r\\n  .rounded-lg {\\r\\n    border-radius: 0.5rem;\\r\\n  }\\r\\n\\r\\n  .shadow-lg {\\r\\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\\r\\n  }\\r\\n\\r\\n  .hover\\\\:bg-green-600:hover {\\r\\n    background-color: #2f855a;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAgOE,oBAAO,CACL,QAAQ,CAAE,KACZ,CAEA,sBAAS,CACP,SAAS,CAAE,MACb,CAEA,uBAAU,CACR,SAAS,CAAE,IACb,CAEA,uBAAU,CACR,gBAAgB,CAAE,KACpB,CAEA,yBAAY,CACV,aAAa,CAAE,MACjB,CAEA,wBAAW,CACT,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACzC,CAEA,kCAAoB,MAAO,CACzB,gBAAgB,CAAE,OACpB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pID = "";
  let cart = [];
  let totalAmount = 0;
  $$result.css.add(css);
  totalAmount = cart.reduce((acc, item) => acc + item.total, 0);
  return ` <div class="flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg h-screen relative svelte-1hk5ht"> <div class="mb-4"><input id="pID" type="text" class="w-1/3 px-4 py-2 text-sm border rounded-md" placeholder="Scan product ID here.."${add_attribute("value", pID, 0)}></div>  <h2 class="text-xl font-semibold mb-4 text-gray-800 svelte-1hk5ht" data-svelte-h="svelte-1o58hdg">Items List</h2>  <div class="flex-grow overflow-auto max-h-[calc(100vh-200px)]"><table id="cartTable" class="min-w-full table-auto"><thead data-svelte-h="svelte-iziud6"><tr class="bg-gray-200"><th class="px-4 py-2 text-left">Product ID</th> <th class="px-4 py-2 text-left">Name</th> <th class="px-4 py-2 text-left">SRP</th> <th class="px-4 py-2 text-left">Quantity</th> <th class="px-4 py-2 text-left">Total</th> <th class="px-4 py-2 text-left">Actions</th></tr></thead> <tbody>${each(cart, ({ pID: pID2, name, srp, quantity, total }, index) => {
    return `<tr class="border-b"><td class="px-4 py-2">${escape(pID2)}</td> <td class="px-4 py-2">${escape(name)}</td> <td class="px-4 py-2">${escape(srp ? `$${srp.toFixed(2)}` : "$0.00")}</td> <td class="px-4 py-2"><button class="bg-yellow-500 text-white px-4 py-2 rounded-md" data-svelte-h="svelte-z88q22">-</button> <span class="mx-2">${escape(quantity)}</span> <button class="bg-yellow-500 text-white px-4 py-2 rounded-md" data-svelte-h="svelte-wkoovt">+
              </button></td> <td class="px-4 py-2">${escape(total ? `$${total.toFixed(2)}` : "$0.00")}</td> <td class="px-4 py-2"><button class="bg-red-500 text-white px-4 py-2 rounded-md" data-svelte-h="svelte-zki8u3">Delete
              </button></td> </tr>`;
  })}</tbody></table></div>  <div class="fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 svelte-1hk5ht"><span class="text-xl font-semibold svelte-1hk5ht" data-svelte-h="svelte-1b482hq">Total:</span> <span class="text-2xl text-gray-800 svelte-1hk5ht">$${escape(totalAmount.toFixed(2))}</span> <button class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition svelte-1hk5ht" data-svelte-h="svelte-z5ahfu">FINALIZE</button></div> </div>`;
});
export {
  Page as default
};
