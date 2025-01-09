<script lang="ts">
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  import feather from 'feather-icons'; // Import Feather icons
  import { onMount } from 'svelte'; // Ensure icons load correctly after mount

  // Variables to store new item details
  let itemName = '', itemQuantity = '', itemPrice = '', pID = '', itemCost = '';
  let isLoading = false;

  // Ensure feather icons are replaced after component is mounted
  onMount(() => {
    feather.replace();
  });

  // Function to handle form submission and add new item to Firestore
  const handleSubmit = async () => {
    isLoading = true; // Start loading animation

    try {
      const db = getFirestore();
      const inventoryRef = collection(db, 'Inventory');

      // Add new item to Firestore with user-defined pID and additional cost field
      await addDoc(inventoryRef, {
        pID: pID,
        name: itemName,
        srp: parseFloat(itemPrice),
        stocks: parseInt(itemQuantity),
        cost: parseFloat(itemCost),  // Add cost field
      });

      // Clear the form fields
      itemName = itemQuantity = itemPrice = pID = itemCost = '';

      // Notify user of successful save
      alert('Item saved successfully!');
    } catch (error) {
      console.error('Error adding item:', error);

      // Notify user of the error
      alert('Save unsuccessful. Please try again.');
    } finally {
      isLoading = false; // Stop loading animation
    }
  };
</script>

<!-- Main container for the form -->
<div class="flex justify-center items-center h-screen bg-gray-100">
  <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
    <!-- Form header -->
    <h2 class="text-xl font-bold text-gray-700 text-center mb-6">ADD NEW ITEM</h2>
    <!-- Form element -->
    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
      <!-- Item ID input group -->
      <div class="flex items-center">
        <i data-feather="hash" class="mr-2 text-gray-400"></i>
        <input
          type="text"
          id="pID"
          bind:value={pID}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product ID"
          required
        />
      </div>

      <!-- Item name input group -->
      <div class="flex items-center">
        <i data-feather="tag" class="mr-2 text-gray-400"></i>
        <input
          type="text"
          id="itemName"
          bind:value={itemName}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter item name"
          required
        />
      </div>

      <!-- Item quantity input group -->
      <div class="flex items-center">
        <i data-feather="layers" class="mr-2 text-gray-400"></i>
        <input
          type="number"
          id="itemQuantity"
          bind:value={itemQuantity}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter quantity"
          required
        />
      </div>

      <!-- Item price input group -->
      <div class="flex items-center">
        <i data-feather="dollar-sign" class="mr-2 text-gray-400"></i>
        <input
          type="number"
          id="itemPrice"
          bind:value={itemPrice}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter price"
          required
        />
      </div>

      <!-- Item cost input group -->
      <div class="flex items-center">
        <i data-feather="dollar-sign" class="mr-2 text-gray-400"></i>
        <input
          type="number"
          id="itemCost"
          bind:value={itemCost}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter cost"
          required
        />
      </div>

      <!-- Submit button with loading animation -->
      <button
        type="submit"
        class="submit-button flex items-center justify-center"
      >
        {#if isLoading}
          <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        {:else}
          <i data-feather="save" class="mr-2"></i> <!-- Save icon for submission -->
        {/if}
        <span class="ml-2 text-center">{isLoading ? 'Saving...' : 'Save Item'}</span> <!-- Centered text -->
      </button>
    </form>
  </div>
</div>
