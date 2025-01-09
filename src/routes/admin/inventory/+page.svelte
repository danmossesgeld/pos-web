<script lang="ts">
  import { onMount } from 'svelte';
  import { getFirestore, collection, query, getDocs, deleteDoc, doc, where } from 'firebase/firestore';
  import { goto } from '$app/navigation';
  import feather from 'feather-icons';

  let searchQuery = '';
  let items: any[] = [];

  // Fetch items from Firestore
  const fetchItems = async (searchQuery = '') => {
    try {
      const db = getFirestore();
      let q = query(collection(db, 'Inventory'));
      if (searchQuery) {
        q = query(collection(db, 'Inventory'), where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
      }
      const querySnapshot = await getDocs(q);
      items = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id  // Include the Firestore document ID for deletion
      }));
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Navigation functions
  const addItem = () => goto('/admin/inventory/additem');
  const searchItems = () => fetchItems(searchQuery);
  const editItem = (pID: string) => goto(`/admin/inventory/updateitem?pID=${pID}`);

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
          await fetchItems(); // Refresh the item list
          alert('Item deleted successfully');
        } else {
          console.log('No item found with pID:', pID);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  // Fetch items on component mount
  onMount(() => {
    fetchItems();
    feather.replace(); // Ensure icons are replaced after component is mounted
  });
</script>

<!-- Search and Add Item Section -->
<div class="flex flex-col gap-4 p-4 h-full">
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2 flex-grow">
      <input
        type="text"
        class="border border-gray-300 rounded-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search items..."
        bind:value={searchQuery}
        on:input={searchItems}
      />
      <button
        class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200 flex items-center"
        on:click={searchItems}
      >
        <i data-feather="search" class="mr-1" aria-hidden="true"></i>
        Search
      </button>
    </div>
    <button
      class="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-200 ml-4 flex items-center"
      on:click={addItem}
    >
      <i data-feather="plus" class="mr-1" aria-hidden="true"></i>
      Add Item
    </button>
  </div>

  <!-- Inventory Table -->
  <div class="overflow-x-auto border border-gray-300 rounded-lg">
    <table class="min-w-full table-auto border-collapse">
      <thead class="bg-gradient-to-r from-blue-500 to-blue-500 text-white">
        <tr>
          <th class="px-2 py-1 text-left text-sm" style="width: 200px;">PRODUCT ID</th>
          <th class="px-2 py-1 text-left text-sm">ITEM NAME</th>
          <th class="px-2 py-1 text-center text-sm" style="width: 150px;">SRP</th>
          <th class="px-2 py-1 text-center text-sm" style="width: 150px;">STOCKS</th>
          <th class="px-2 py-1 text-center text-sm" style="width: 150px;">COST</th> <!-- New cost column -->
          <th class="px-2 py-1 text-center text-sm" style="width: 200px;">ACTIONS</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        {#each items as { pID, name, srp, stocks, cost }}
          <tr class="hover:bg-gray-200 transition duration-200 text-sm">
            <td class="border px-2 py-1">{pID}</td>
            <td class="border px-2 py-1">{name}</td>
            <td class="border px-2 py-1 text-center">{srp}</td>
            <td class="border px-2 py-1 text-center">{stocks}</td>
            <td class="border px-2 py-1 text-center">{cost}</td> <!-- Display the cost -->
            <td class="border px-2 py-1 text-center">
              <div class="flex justify-center gap-2">
                <button
                  class="bg-yellow-500 text-white rounded-md flex items-center justify-center px-2 py-1 hover:bg-yellow-600 transition duration-200"
                  on:click={() => editItem(pID)}
                  style="min-width: 40px;" 
                >
                  <i data-feather="edit" aria-hidden="true"></i>
                </button>
                <button
                  class="bg-red-500 text-white rounded-md flex items-center justify-center px-2 py-1 hover:bg-red-600 transition duration-200"
                  on:click={() => deleteItem(pID)}
                  style="min-width: 40px;" 
                >
                  <i data-feather="trash" aria-hidden="true"></i>
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
