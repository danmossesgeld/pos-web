<script lang="ts">
  import { getFirestore, doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Variables to store item details
  let itemName: string = '';
  let itemQuantity: string = '';
  let itemPrice: string = '';
  let itemCost: string = ''; // New variable for cost
  let isLoading: boolean = false;
  let pID: string = ''; // pID is used to identify the item

  // Fetch item details when the component is mounted
  onMount(() => {
    const unsubscribe = page.subscribe(({ url }) => {
      pID = url.searchParams.get('pID') || '';

      if (pID) {
        fetchItem(pID);
      } else {
        alert('Invalid item ID');
        goto('/admin/inventory');
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  });

  // Function to fetch item details from Firestore
  const fetchItem = async (pID: string) => {
    try {
      const db = getFirestore();
      const inventoryRef = collection(db, 'Inventory');
      const q = query(inventoryRef, where('pID', '==', pID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // Assuming pID is unique, take the first result
        const data = docSnap.data();
        itemName = data.name || '';
        itemQuantity = data.stocks?.toString() || '';
        itemPrice = data.srp?.toString() || '';
        itemCost = data.cost?.toString() || ''; // Fetch cost from Firestore
      } else {
        alert('No such item found');
        goto('/admin/inventory');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      alert('Error fetching item details');
      goto('/admin/inventory');
    }
  };

  // Function to handle form submission and update item details
  const handleSubmit = async () => {
    isLoading = true; // Start loading animation

    try {
      const db = getFirestore();
      const inventoryRef = collection(db, 'Inventory');
      const q = query(inventoryRef, where('pID', '==', pID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, 'Inventory', querySnapshot.docs[0].id); // Use document ID from query result

        await updateDoc(docRef, {
          name: itemName,
          srp: parseFloat(itemPrice),
          stocks: parseInt(itemQuantity),
          cost: parseFloat(itemCost) // Include cost in the update
        });

        alert('Item updated successfully!');
        goto('/admin/inventory'); // Navigate back to the inventory list
      } else {
        alert('No such item found for update');
        goto('/admin/inventory');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Update unsuccessful. Please try again.');
    } finally {
      isLoading = false; // Stop loading animation
    }
  };

  // Function to delete an item from Firestore
  const deleteItem = async (pID: string) => {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      try {
        const db = getFirestore();
        const inventoryRef = collection(db, 'Inventory');
        const q = query(inventoryRef, where('pID', '==', pID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docRef = doc(db, 'Inventory', querySnapshot.docs[0].id);
          await deleteDoc(docRef);
          console.log('Item deleted:', pID);
          alert('Item deleted successfully');
          goto('/admin/inventory'); // Navigate back to inventory after deletion
        } else {
          console.log('No item found with pID:', pID);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };
</script>

<!-- Main container for the form -->
<div class="flex justify-center items-center h-screen bg-gray-100">
  <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
    <!-- Form header -->
    <h2 class="text-xl font-bold text-gray-700 text-center mb-6">UPDATE ITEM</h2>
    <!-- Form element -->
    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
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

      <!-- Item cost input group (new field) -->
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
          <i data-feather="edit" class="mr-2"></i> <!-- Save icon for submission -->
        {/if}
        <span class="ml-2 text-center">{isLoading ? 'Saving...' : 'UPDATE'}</span> <!-- Centered text -->
      </button>
    </form>
  </div>
</div>
