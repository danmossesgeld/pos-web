<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { auth } from '../../lib/firebase/firebase.client';
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
  import feather from 'feather-icons';

  let user: any = null;
  let userType: string | null = null; // To store user type
  const db = getFirestore();

  // Function to handle logout
  const handleLogout = async () => {
      try {
          await signOut(auth); // Sign out the user
          localStorage.removeItem('loggedInUser'); // Clear logged-in status
          window.location.href = '/login'; // Redirect to login after logout
      } catch (error) {
          console.error("Logout Error:", error);
      }
  };

  onMount(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
          if (!currentUser) {
              window.location.href = '/login'; // Redirect to login if user is not authenticated
              return;
          }
          user = currentUser; // Set user data if authenticated

          // Fetch user type from Firestore using the authenticated email
          const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
          const querySnapshot = await getDocs(userQuery);

          if (querySnapshot.empty) {
              console.error('No user record found in Firestore.');
              window.location.href = '/login'; // Redirect to login if no user is found
              return;
          }

          userType = querySnapshot.docs[0].data().type; // Store user type

          // Redirect to user route if the type is not 'admin'
          if (userType !== 'admin' && window.location.pathname === '/admin') {
              window.location.href = '/user'; // Redirect to user route only from the main admin route
          }

          // Replace icons after component is mounted
          feather.replace();
      });
  });

  // Call feather.replace after each update to ensure icons load correctly
  afterUpdate(() => {
      feather.replace();
  });
</script>

<div class="flex h-screen overflow-hidden"> <!-- Prevent overflow -->
  <!-- Sidebar -->
  <aside class="flex flex-col sidebar bg-white w-60 p-1.5 fixed h-full shadow-lg" style="top: 0;">
      <!-- Sidebar Navigation -->
      <div class="company-banner flex items-center justify-start my-4 border-b border-gray-300 pb-3 h-16">
          <div class="flex items-center">
              <i data-feather="codesandbox" class="mr-2"></i>
              <span class="font-bold text-lg">COMPANY ONE</span>
          </div>
      </div>
      <nav class="flex flex-col flex-grow">
        {#each [
            { name: '', text: 'POS', icon: 'dollar-sign' },
            { name: 'pricecheck', text: 'Price Check', icon: 'search' }
        ] as route}
            <button on:click={() => window.location.href = `/user/${route.name}`} class="sidebar-button">
                <i data-feather={route.icon} class="mr-2"></i>
                {route.text}
            </button>
        {/each}
    </nav>
    
      <!-- Logout Button and Welcome Message -->
      <div class="flex flex-col mt-auto justify-center items-center">
          <div class="welcome-message mb-2 text-sm text-gray-700">
              Welcome, {user ? user.email : 'Unknown'}
          </div>
          <button on:click={handleLogout} class="logout-button flex items-center">
              <i data-feather="log-out" class="mr-2"></i>
              Logout
          </button>
      </div>
  </aside>

  <!-- Main content area -->
  <main class="flex-grow ml-60 overflow-y-auto h-screen">
      <!-- Content Area -->
      <div class="content-area bg-gray-100 h-full v-full">
          <slot />
      </div>
  </main>
</div>

<style>
  :global(body) {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

  .sidebar {
      transition: background 0.3s ease, width 0.3s ease;
      border-right: 1px solid #e5e7eb;
  }

  .sidebar-button {
      display: flex;
      align-items: center;
      background: transparent;
      color: #1e3a8a;
      font-weight: 600;
      padding: 10px 16px; /* Adjust padding for consistent sizing */
      border-radius: 6px;
      transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
      margin: 5px 0;
      width: 100%;
      text-align: left;
  }

  .sidebar-button:hover {
      background: rgba(59, 130, 246, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .logout-button {
      margin-top: 16px;
      color: white;
      background-color: #e53e3e;
      padding: 10px 16px;
      border-radius: 6px;
      width: 100%;
      text-align: left;
  }

 .content-area {
      padding-right: 16px; /* Padding for content area */
  }
</style>
