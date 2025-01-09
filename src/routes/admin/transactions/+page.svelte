<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
  import { goto } from '$app/navigation';

  let searchQuery: string = '';  // To store search query input
  let startDate: string = ''; // Start date for filtering
  let endDate: string = '';   // End date for filtering
  let transactions: any[] = [];  // Store the fetched transactions
  let isLoading = false;

  // Function to fetch transactions from Firestore with real-time updates
  const fetchTransactions = () => {
    isLoading = true;
    try {
      const db = getFirestore();
      let q = query(collection(db, 'Transactions'));

      // If there's a search query (ID-based search)
      if (searchQuery) {
        q = query(q, where('id', '>=', searchQuery), where('id', '<=', searchQuery + '\uf8ff'));
      }

      // Apply date filter if start and end dates are provided
      if (startDate && endDate) {
        q = query(q, where('DateTime', '>=', new Date(startDate).toISOString()), where('DateTime', '<=', new Date(endDate).toISOString()));
      }

      // Listen to changes in the 'Transactions' collection in real time
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        transactions = querySnapshot.docs.map(doc => doc.data());
        isLoading = false;
      });

      // Unsubscribe when the component is destroyed
      onDestroy(() => {
        unsubscribe();
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      isLoading = false;
    }
  };

  // Fetch transactions when the component is mounted
  onMount(() => {
    fetchTransactions();
  });

  // Function to handle search input change
  const handleSearch = () => {
    fetchTransactions();
  };

  // Function to handle date filter change
  const handleDateFilter = () => {
    fetchTransactions();
  };

  // Function to format DateTime
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();  // Format to a readable string
  };

  // Navigate to transaction details page and pass pID as a query parameter
  const viewDetails = (transactionId: string) => {
    goto(`/admin/transactions/transactioninfo?pID=${transactionId}`);
  };

  // Calculate the grand total for Total Sales (Total SRP) and Total Income
  const calculateGrandTotals = () => {
    return transactions.reduce((totals, transaction) => {
      totals.totalSrp += transaction.TotalSrp || 0;
      totals.totalIncome += transaction.TotalIncome || 0;
      return totals;
    }, { totalSrp: 0, totalIncome: 0 });
  };
</script>

<!-- Table Header with Search and Date Filters -->
<div class="flex items-center justify-between mb-1">
  <!-- Search Bar -->
  <input
    type="text"
    bind:value={searchQuery}
    on:input={handleSearch}
    placeholder="Search by ID..."
    class="border border-gray-300 p-2 rounded-md w-1/3"
  />
  <!-- Date Filters -->
  <div class="flex gap-2">
    <input
      type="date"
      bind:value={startDate}
      on:change={handleDateFilter}
      class="border border-gray-300 p-2"
    />
    <span>~</span>
    <input
      type="date"
      bind:value={endDate}
      on:change={handleDateFilter}
      class="border border-gray-300 p-2"
    />
  </div>
</div>

<!-- Table and Grand Total Container -->
<div class="relative flex flex-col h-[calc(100vh-150px)]">
  <!-- Table Container -->
  <div class="overflow-x-auto flex-1 pb-20"> <!-- Table takes up most of the space -->
    <table class="min-w-full table-auto border-collapse">
      <thead class="bg-gradient-to-r from-blue-500 to-blue-500 text-white">
        <tr>
          <th class="px-2 py-1 text-left text-sm">ID</th>
          <th class="px-2 py-1 text-left text-sm">DateTime</th>
          <th class="px-2 py-1 text-left text-sm">Total SRP</th>
          <th class="px-2 py-1 text-left text-sm">Total Income</th>
          <th class="px-2 py-1 text-left text-sm">Actions</th> <!-- New Actions column -->
        </tr>
      </thead>
      <tbody class="bg-white">
        {#if isLoading}
          <tr>
            <td colspan="5" class="text-center py-4">Loading...</td>
          </tr>
        {:else if transactions.length > 0}
          {#each transactions as { DateTime, TotalSrp, TotalIncome, id }}
            <tr class="hover:bg-gray-200 transition duration-200 text-sm">
              <td class="border px-2 py-1">{id}</td>
              <td class="border px-2 py-1">{formatDate(DateTime)}</td>
              <td class="border px-2 py-1">{TotalSrp}</td>
              <td class="border px-2 py-1">{TotalIncome}</td>
              <td class="border px-2 py-1 text-center">
                <button 
                  on:click={() => viewDetails(id)} 
                  class="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600"
                >
                  Details
                </button>
              </td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan="5" class="text-center py-4">No transactions found</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Fixed Grand Total Container -->
  {#if transactions.length > 0}
    <div class="absolute bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-8">
      <div class="flex gap-8 text-lg font-semibold">
        <span>Total Sales: {calculateGrandTotals().totalSrp.toFixed(2)}</span>
        <span>Total Income: {calculateGrandTotals().totalIncome.toFixed(2)}</span>
      </div>
    </div>
  {/if}
</div>
