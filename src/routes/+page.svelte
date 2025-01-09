<script lang="ts">
  import "../app.css";
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { auth } from '../lib/firebase/firebase.client'; 
  import { onAuthStateChanged, type User } from 'firebase/auth';
  import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';

  // Variables to track user state
  let userEmail: string | null = null;
  let userType: string | null = null;
  let errorMessage: string = '';
  let successMessage: string = '';

  const db = getFirestore();

  // Function to handle user authentication and redirection
  const handleAuthStateChange = async (currentUser: User | null) => {
    const currentPath = window.location.pathname;

    if (currentUser) {
      // Get user email
      userEmail = currentUser.email;

      try {
        // Query Firestore for the user document
        const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          // Retrieve user type
          const userDoc = querySnapshot.docs[0];
          userType = userDoc.data().type;

          // Redirect based on user type if on the login page
          if (currentPath === '/login') {
            userType === 'admin' ? goto('/admin') : goto('/user');
          }

          // Set success message
          successMessage = `Logged in as: ${userType}`;
        } else {
          // Handle case where no user document is found
          console.error('No user record found in Firestore.');
          errorMessage = 'User record not found. Please contact support.';
        }
      } catch (error) {
        // Handle Firestore query errors
        console.error('Error querying Firestore:', error);
        errorMessage = 'An error occurred while fetching user data.';
      }
    } else if (currentPath !== '/login' && currentPath !== '/register') {
      // Redirect to login if no user is authenticated and the path is restricted
      goto('/login');
    }
  };

  // Lifecycle function to handle authentication state changes
  onMount(() => {
    onAuthStateChanged(auth, handleAuthStateChange);
  });
</script>

<div class="p-4">
  <input
    type="email"
    placeholder="Email"
    bind:value={userEmail}
    class="block w-full mb-2 p-2 border"
    disabled
  />
  {#if successMessage}
    <p class="text-green-500 mt-2">{successMessage}</p>
  {/if}
  {#if errorMessage}
    <p class="text-red-500 mt-2">{errorMessage}</p>
  {/if}
</div>