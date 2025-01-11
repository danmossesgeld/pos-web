<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { db } from '../../../lib/firebase/firebase.client';
  import { collection, query, where, getDocs, addDoc, updateDoc, increment } from 'firebase/firestore';

  let pID: string = ''; // Product ID input by cashier
  let cart: { pID: string, name: string, srp: number, quantity: number, total: number }[] = [];
  let totalAmount: number = 0; // Total SRP for the cart
  let scannerOpen = false; // To track if the scanner is open
  let scannerWindow: Window | null = null; // Store reference to the scanner window
  let storageEventListener: (() => void) | null = null; // To store event listener cleanup function

  // Listen for localStorage changes to detect scanner barcode
  const checkScannerBarcode = () => {
    const scannedBarcode = localStorage.getItem('scannedBarcode');
    if (scannedBarcode) {
      pID = scannedBarcode; // Set the scanned barcode as the product ID
      addToCart(); // Automatically add the item to the cart
      localStorage.removeItem('scannedBarcode'); // Clear the scanned barcode after adding
    }
  };

  // Open or close the barcode scanner
  const toggleScanner = () => {
    if (scannerOpen) {
      if (scannerWindow && !scannerWindow.closed) {
        scannerWindow.close(); // Close the scanner if it's already open
      }
      scannerOpen = false; // Set scannerOpen to false after closing
      localStorage.removeItem('scannedBarcode'); // Clear scanned barcode when closing
      if (storageEventListener) {
        window.removeEventListener('storage', storageEventListener); // Remove the event listener
        storageEventListener = null; // Reset the listener reference
      }
    } else {
      // Open a new scanner window only if one is not already open
      if (!scannerWindow || scannerWindow.closed) {
        scannerWindow = window.open('/user/pos/scanner', 'scanner', 'width=800,height=600');
        scannerOpen = true;
        storageEventListener = () => checkScannerBarcode(); // Store the event listener function
        window.addEventListener('storage', storageEventListener); // Add the event listener for localStorage changes
      }
    }
  };

  // Fetch item details based on pID
  const fetchItemDetails = async (pID: string) => {
    const inventoryCollection = collection(db, 'Inventory');
    const itemQuery = query(inventoryCollection, where('pID', '==', pID));

    try {
      const snapshot = await getDocs(itemQuery);
      if (snapshot.empty) {
        alert('Item not found.');
        pID = ''; // Clear the input field if item is not found
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

    const itemDetails = await fetchItemDetails(pID);
    if (!itemDetails) return;

    const { name, srp } = itemDetails;

    const existingItemIndex = cart.findIndex(item => item.pID === pID);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
      cart[existingItemIndex].total = cart[existingItemIndex].srp * cart[existingItemIndex].quantity;
    } else {
      cart = [...cart, { pID, name, srp, quantity: 1, total: srp }];
    }

    pID = ''; // Clear product ID field
  };

  // Adjust item quantity
  const adjustQuantity = (index: number, change: number) => {
    const item = cart[index];
    item.quantity += change;

    if (item.quantity < 1) {
      item.quantity = 1;
    }

    item.total = item.srp * item.quantity;
    cart = [...cart];
  };

  // Delete item from cart
  const deleteItem = (index: number) => {
    cart = cart.filter((_, i) => i !== index);
  };

  // Calculate total amount
  $: totalAmount = cart.reduce((acc, item) => acc + item.total, 0);

  // Checkout function
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const transactionID = `TID${Date.now()}`;
      let totalCost = 0;
      let totalSrp = 0;

      for (const item of cart) {
        const details = await fetchItemDetails(item.pID);
        if (!details) continue;

        totalCost += details.cost * item.quantity;
        totalSrp += item.srp * item.quantity;
      }

      const totalIncome = totalSrp - totalCost;

      await addDoc(collection(db, 'Transactions'), {
        id: transactionID,
        DateTime: new Date().toISOString(),
        TotalCost: totalCost,
        TotalSrp: totalSrp,
        TotalIncome: totalIncome,
      });

      for (const item of cart) {
        await addDoc(collection(db, 'TransactionItems'), {
          id: transactionID,
          pID: item.pID,
          name: item.name,
          quantity: item.quantity,
          srp: item.srp,
          cost: totalCost / totalSrp,
        });

        const inventoryQuery = query(collection(db, 'Inventory'), where('pID', '==', item.pID));
        const snapshot = await getDocs(inventoryQuery);
        if (!snapshot.empty) {
          const docRef = snapshot.docs[0].ref;
          await updateDoc(docRef, { stocks: increment(-item.quantity) });
        }
      }

      alert('Transaction finalized successfully!');
      cart = [];
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error during the checkout process.');
    }
  };
</script>

<div class="flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg h-screen">
  <!-- Product ID Input and Start/Close Scanner Button -->
  <div class="flex items-center mb-4">
    <input
      id="pID"
      type="text"
      bind:value={pID}
      class="w-1/3 px-4 py-2 text-sm border rounded-md"
      placeholder="Scan product ID here.."
      on:keydown={(event) => { if (event.key === 'Enter') addToCart(); }}
    />
    <button
      on:click={toggleScanner}
      class="bg-blue-500 text-white px-6 py-2 rounded-md ml-4"
    >
      Open Camera Barcode Scanner
    </button>
  </div>

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

  <!-- Total and Checkout Button (Grand total bottom right) -->
  <div class="absolute bottom-6 right-6 flex items-center justify-between w-64">
    <span class="font-semibold text-lg">Grand Total: ${totalAmount.toFixed(2)}</span>
    <button
      on:click={handleCheckout}
      class="bg-green-500 text-white px-6 py-2 rounded-md"
    >
      Checkout
    </button>
  </div>
</div>
