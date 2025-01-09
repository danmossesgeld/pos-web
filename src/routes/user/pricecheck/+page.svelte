<script lang="ts">
    import { db } from '../../../lib/firebase/firebase.client';
    import { collection, query, where, getDocs } from 'firebase/firestore';
    import { goto } from '$app/navigation';  // Import goto for redirection
  
    let pID: string = '';           // Product ID input by cashier
    let itemDetails: { name: string, srp: number } | null = null;  // Item details
  
    // Fetch item details based on pID
    const fetchItemDetails = async (pID: string) => {
      const inventoryCollection = collection(db, 'Inventory');
      const itemQuery = query(inventoryCollection, where('pID', '==', pID));
  
      try {
        const snapshot = await getDocs(itemQuery);
        if (snapshot.empty) {
          alert('Item not found.');
          itemDetails = null;
          return;
        }
  
        const item = snapshot.docs[0].data();
        itemDetails = {
          name: item.name,
          srp: item.srp,
        };
      } catch (error) {
        console.error('Error fetching item details:', error);
        alert('There was an error fetching the item details.');
        itemDetails = null;
      }
    };
  
    // Trigger fetch on Enter key press
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        fetchItemDetails(pID);
      }
    };
  
    // Add item to the cart and redirect to the cart page
    const addToCart = () => {
      if (itemDetails) {
        // Assuming a global or session store exists to manage the cart in your app
        const cartItem = {
          pID,
          name: itemDetails.name,
          srp: itemDetails.srp,
          quantity: 1,  // Default quantity is 1
          total: itemDetails.srp,
        };
  
        // Add the item to the cart (this part would depend on your app's store or global state management)
        // Example: app.cart.push(cartItem);
  
        // Redirect to the user page (where cart is managed)
        goto('/user');
      }
    };
  </script>
  
  <!-- Centered Card with Price Check Form -->
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800 text-center">Price Check</h2>
  
      <!-- Form for entering Product ID -->
      <div class="mb-6">
        <input
          id="pID"
          type="text"
          bind:value={pID}
          class="w-full px-4 py-3 text-sm border rounded-md"
          placeholder="Enter product ID"
          on:keydown={handleKeydown}
        />
      </div>
  
      <!-- Item Details -->
      {#if itemDetails}
        <div class="text-center mb-6">
          <p class="text-lg font-semibold mb-2">Item Name: {itemDetails.name}</p>
          <p class="text-lg font-semibold">SRP: ${itemDetails.srp.toFixed(2)}</p>
        </div>
      {/if}
  
      <!-- Add to Cart Button -->
      <div class="flex justify-center">
        <button
          on:click={addToCart}
          class="bg-green-500 text-white px-6 py-3 rounded-lg text-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  
  <style>
    input {
      transition: all 0.3s ease;
    }
  
    input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
    }
  
    .bg-gray-100 {
      background-color: #f7fafc;
    }
  
    .text-gray-800 {
      color: #2d3748;
    }
  
    .text-center {
      text-align: center;
    }
  
    .max-w-lg {
      max-width: 600px; /* Adjust the maximum width for the container */
    }
  
    .bg-white {
      background-color: white;
    }
  
    .bg-green-500 {
      background-color: #10b981;
    }
  </style>
  