<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
  import { goto } from '$app/navigation';

  let transactionDetails: any[] = [];  // Store the fetched transaction details
  let pID: string;  // Store the pID from the query parameter
  let grandTotal = 0;  // Store the calculated grand total

  // Reactive statement to extract pID from query parameters
  $: pID = $page.url.searchParams.get('pID') || '';

  // Fetch transaction details from Firestore based on pID
  onMount(async () => {
    if (pID) {
      try {
        const db = getFirestore();
        // Use 'id' field in the TransactionItems collection for filtering
        const q = query(collection(db, 'TransactionItems'), where('id', '==', pID));
        const querySnapshot = await getDocs(q);

        // Map the data to an array of transaction details
        transactionDetails = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id  // Include the Firestore document ID (just for reference, not in table)
        }));

        // Calculate the grand total
        grandTotal = transactionDetails.reduce((total, item) => total + (item.quantity * item.srp), 0);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    }
  });

  // Back button handler
  const goBack = () => {
    goto('/admin/transactions');  // Navigate back to the transactions list page
  };
</script>

<!-- Main container for the transaction details -->
<div class="flex flex-col p-4">
  <!-- Title for the transaction -->
  <h2 class="text-2xl font-bold mb-4">Item List for transaction #[{pID}]</h2>

  <!-- Transaction Details Table -->
  <div class="overflow-x-auto border border-gray-300 rounded-lg">
    <table class="min-w-full table-auto border-collapse">
      <thead class="bg-gradient-to-r from-blue-500 to-blue-500 text-white">
        <tr>
          <th class="px-2 py-1 text-left text-sm">Product ID</th>
          <th class="px-2 py-1 text-left text-sm">Item Name</th>
          <th class="px-2 py-1 text-left text-sm">Qty</th>
          <th class="px-2 py-1 text-left text-sm">SRP</th>
          <th class="px-2 py-1 text-left text-sm">Total</th> <!-- New Total column -->
        </tr>
      </thead>
      <tbody class="bg-white">
        {#if transactionDetails.length > 0}
          {#each transactionDetails as { pID, name, quantity, srp }}
            <tr class="hover:bg-gray-200 transition duration-200 text-sm">
              <td class="border px-2 py-1">{pID}</td>
              <td class="border px-2 py-1">{name}</td>
              <td class="border px-2 py-1">{quantity}</td>
              <td class="border px-2 py-1">{srp}</td>
              <td class="border px-2 py-1">{(quantity * srp).toFixed(2)}</td> <!-- Calculating the Total -->
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan="5" class="text-center py-4">No details found for this transaction</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Grand Total -->
  {#if transactionDetails.length > 0}
    <div class="flex justify-end mt-4 text-xl font-semibold">
      <span class="mr-4">Grand Total: </span>
      <span>{grandTotal.toFixed(2)}</span>
    </div>
  {/if}

  <!-- Back Button -->
  <div class="flex justify-center mt-4">
    <button
      on:click={goBack}
      class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
    >
      Back to Transactions
    </button>
  </div>
</div>
