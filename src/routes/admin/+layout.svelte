<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import { auth } from '../../lib/firebase/firebase.client';
    import { onAuthStateChanged, signOut } from 'firebase/auth';
    import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
    import feather from 'feather-icons';
  import { goto } from '$app/navigation';

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
        <div class="company-banner flex items-center justify-start my-4 border-b border-gray-300 pb-3 h-8"> <!-- Added height for vertical centering -->
            <div class="flex items-center">
                <i data-feather="codesandbox" class="mr-2"></i>
                <span class="font-bold">COMPANY ONE</span>
            </div>
        </div>
        <nav class="flex flex-col flex-grow">
            {#each [
              { name: 'Inventory', text: 'Inventory List', icon: 'archive' },
              { name: 'Users', text: 'System Users', icon: 'users' },
              { name: 'Transactions', text: 'Transaction List', icon: 'file-text' }
            ] as route}
              <button
                on:click={() => goto(`/admin/${route.name.toLowerCase()}`)}
                class="sidebar-button flex items-center text-left p-2 mt-2 hover:bg-gray-200 rounded-md"
              >
                <i data-feather={route.icon} class="mr-2"></i>
                {route.text}
              </button>
            {/each}
          </nav>
        <!-- Logout Button -->
        <div class="flex justify-end mt-auto mr-auto ml-auto">
            <button on:click={handleLogout} class="logout-button flex items-center">
                <i data-feather="log-out" class="mr-2"></i>
                Logout
            </button>
        </div>
    </aside>

    <!-- Main content area -->
    <main class="flex-grow ml-60 overflow-y-auto">
        <!-- Top Panel -->
        <div class="top-panel flex items-center justify-between bg-white fixed shadow-md p-2" style="z-index: 100; height: 55px; left: 240px; right: 0;"> <!-- Adjusted styles -->
            <div class="flex items-center"></div>
            <div class="user-info text-gray-700 ml-auto">
                Welcome, Admin {user ? user.email : 'Unknown'}
            </div>
        </div>

        <!-- Content Area -->
        <div class="content-area p-6 bg-gray-100" style="margin-top: 50px;">
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

    .top-panel {
        height: 51px;
        border-bottom: 1px solid #e5e7eb;
        padding-left: 16px;
        padding-right: 16px;
    }

    .sidebar-button {
        display: flex;
        align-items: center;
        background: transparent;
        color: #1e3a8a;
        font-weight: 600;
        padding: 8px 12px;
        border-radius: 6px;
        transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
        margin: 5px 0;
        width: 100%;
    }

    .sidebar-button:hover {
        background: rgba(59, 130, 246, 0.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .logout-button {
        margin-top: auto;
        color: white;
        background-color: #e53e3e;
        padding: 8px 7px;
        border-radius: 6px;
        width: 200px;
    }

    .content-area {
        height: calc(100vh - 50px);
        overflow-y: auto;
    }
</style>
