<script lang="ts">
  import { db } from '../../lib/firebase/firebase.client';
  import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    increment,
  } from 'firebase/firestore';

  let pID: string = '';           // Product ID input by cashier
  let cart: { pID: string, name: string, srp: number, quantity: number, total: number }[] = []; // Cart items
  let totalAmount: number = 0;    // Total SRP for the cart

  // Total variables for checkout
  let totalCost: number = 0; // Total cost for the cart
  let totalSrp: number = 0;  // Total SRP for the cart
  let totalIncome: number = 0; // Total income (SRP - cost)

  // Fetch item details based on pID
  const fetchItemDetails = async (pID: string) => {
    const inventoryCollection = collection(db, 'Inventory');
    const itemQuery = query(inventoryCollection, where('pID', '==', pID));
  
    try {
      const snapshot = await getDocs(itemQuery);
      if (snapshot.empty) {
        alert('Item not found.');
        return null;
      }
  
      const item = snapshot.docs[0].data();
      return {
        name: item.name,
        srp: item.srp,
        cost: item.cost,
      };
    } catch (error) {
      console.error('Error fetching item details:', error);
      alert('There was an error fetching the item details.');
      return null;
    }
  };

  // Add item to cart
  const addToCart = async () => {
    if (!pID) {
      alert('Please enter a valid product ID.');
      return;
    }

    // Fetch item details based on pID
    const itemDetails = await fetchItemDetails(pID);
    if (!itemDetails) return;

    const { name, srp } = itemDetails;

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.pID === pID);

    if (existingItemIndex !== -1) {
      // If item exists, just update its quantity and total
      cart[existingItemIndex].quantity += 1;
      cart[existingItemIndex].total = cart[existingItemIndex].srp * cart[existingItemIndex].quantity;
    } else {
      // Otherwise, add the new item to the cart with quantity 1
      cart = [...cart, { pID, name, srp, quantity: 1, total: srp }];
    }

    // Reset the pID field after adding to cart
    pID = '';
  };

  // Adjust the quantity of the item in the cart
  const adjustQuantity = (index: number, change: number) => {
    const item = cart[index];
    item.quantity += change;

    // Ensure quantity does not go below 1
    if (item.quantity < 1) {
      item.quantity = 1;
    }

    // Update the total price for the item
    item.total = item.srp * item.quantity;

    // Force Svelte to update the cart by creating a new array reference
    cart = [...cart]; // This triggers reactivity
  };
  
  // Delete item from cart
  const deleteItem = (index: number) => {
    cart = cart.filter((_, i) => i !== index); // Remove item from the cart
  };

  // Recalculate the total amount whenever the cart changes
  $: totalAmount = cart.reduce((acc, item) => acc + item.total, 0);
  
  // Generate a system-generated ID (e.g., TID00000001)
  const generateTransactionID = async (): Promise<string> => {
    const transactionsRef = collection(db, 'Transactions');
    const snapshot = await getDocs(transactionsRef);

    const count = snapshot.size + 1; // Auto-increment based on the number of documents
    return `TID${String(count).padStart(8, '0')}`;
  };

  // Handle checkout/finalize process
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const transactionID = await generateTransactionID();

      // Calculate totals
      totalCost = 0;
      totalSrp = 0;
      totalIncome = 0;

      for (const item of cart) {
        const details = await fetchItemDetails(item.pID);
        if (!details) continue;

        totalCost += details.cost * item.quantity;
        totalSrp += item.srp * item.quantity;
      }

      totalIncome = totalSrp - totalCost;

      // Add to Transactions collection
      const transactionData = {
        DateTime: new Date().toISOString(),
        TotalCost: totalCost,
        TotalSrp: totalSrp,
        TotalIncome: totalIncome,
      };
      await addDoc(collection(db, 'Transactions'), {
        id: transactionID,
        ...transactionData,
      });

      // Add to TransactionItems collection with the same transaction ID
      for (const item of cart) {
        const details = await fetchItemDetails(item.pID);
        if (!details) continue;

        await addDoc(collection(db, 'TransactionItems'), {
          id: transactionID,               // Use the same transactionID for all items
          pID: item.pID,
          name: item.name,
          quantity: item.quantity,
          srp: item.srp,
          cost: details.cost,               // Ensure cost is fetched from the inventory
        });
      }

      // Update Inventory collection (update stocks instead of quantity)
      for (const item of cart) {
        const inventoryQuery = query(
          collection(db, 'Inventory'),
          where('pID', '==', item.pID)
        );
        const snapshot = await getDocs(inventoryQuery);
        if (!snapshot.empty) {
          const docRef = snapshot.docs[0].ref;
          await updateDoc(docRef, {
            stocks: increment(-item.quantity), // Update the 'stocks' field
          });
        }
      }

      alert('Transaction finalized successfully!');
      cart = []; // Clear cart
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error during the checkout process.');
    }
  };

  // Handle Enter key to add item to cart
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      addToCart();
    }
  };
</script>

<!-- Updated Container -->
<div class="flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg h-screen relative">
  <!-- Product ID Input -->
  <div class="mb-4">
    <input
      id="pID"
      type="text"
      bind:value={pID}
      class="w-1/3 px-4 py-2 text-sm border rounded-md"
      placeholder="Scan product ID here.."
      on:keydown={handleKeydown}
    />
  </div>

  <!-- Cart Label -->
  <h2 class="text-xl font-semibold mb-4 text-gray-800">Items List</h2>

  <!-- Cart Table (Scrollable) -->
  <div class="flex-grow overflow-auto max-h-[calc(100vh-200px)]">
    <table id="cartTable" class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 text-left">Product ID</th>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">SRP</th>
          <th class="px-4 py-2 text-left">Quantity</th>
          <th class="px-4 py-2 text-left">Total</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each cart as { pID, name, srp, quantity, total }, index}
          <tr class="border-b">
            <td class="px-4 py-2">{pID}</td>
            <td class="px-4 py-2">{name}</td>
            <td class="px-4 py-2">{srp ? `$${srp.toFixed(2)}` : '$0.00'}</td>
            <td class="px-4 py-2">
              <button
                class="bg-yellow-500 text-white px-4 py-2 rounded-md"
                on:click={() => adjustQuantity(index, -1)}
              >
                -
              </button>
              <span class="mx-2">{quantity}</span>
              <button
                class="bg-yellow-500 text-white px-4 py-2 rounded-md"
                on:click={() => adjustQuantity(index, 1)}
              >
                +
              </button>
            </td>
            <td class="px-4 py-2">{total ? `$${total.toFixed(2)}` : '$0.00'}</td>
            <td class="px-4 py-2">
              <button
                class="bg-red-500 text-white px-4 py-2 rounded-md"
                on:click={() => deleteItem(index)}
              >
                Delete
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Total Section (Fixed at Bottom Right) -->
  <div class="fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
    <span class="text-xl font-semibold">Total:</span>
    <span class="text-2xl text-gray-800">${totalAmount.toFixed(2)}</span>
    <button
      class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
      on:click={handleCheckout}
    >
      FINALIZE
    </button>
  </div>
</div>

<style>
  /* Styles for total amount positioning */
  .fixed {
    position: fixed;
  }

  .text-xl {
    font-size: 1.2rem;
  }

  .text-2xl {
    font-size: 2rem;
  }

  .bg-white {
    background-color: white;
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .hover\:bg-green-600:hover {
    background-color: #2f855a;
  }
</style>
