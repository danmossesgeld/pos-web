<script lang="ts">
    // Import the main CSS file for the application
    import "../app.css";
    // Import the onMount lifecycle function from Svelte
    import { onMount } from 'svelte';
    // Import the goto function for navigation
    import { goto } from '$app/navigation';
    // Import the Firebase authentication module
    import { auth } from '../lib/firebase/firebase.client'; 
    // Import the onAuthStateChanged function to listen for authentication state changes
    import { onAuthStateChanged } from 'firebase/auth';
    // Import Firestore functions to query the database
    import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
    // Import Feather icons library
    import feather from 'feather-icons'; 
  
    // Declare variables to store user email and type
    let userEmail: string | null = null;
    let userType: string | null = null;
    // Initialize Firestore database
    const db = getFirestore();
  
    // Use the onMount lifecycle function to run code when the component is mounted
    onMount(() => {
      // Replace Feather icons after the component is mounted
      feather.replace(); 
      
      // Listen for changes in authentication state
      onAuthStateChanged(auth, async (currentUser) => {
        // Get the current path of the window
        const currentPath = window.location.pathname;
  
        if (currentUser) {
          // If a user is logged in, get their email
          userEmail = currentUser.email;
          // Query the Firestore database for the user document with the matching email
          const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
          const querySnapshot = await getDocs(userQuery);
  
          if (!querySnapshot.empty) {
            // If a user document is found, get the user type
            const userDoc = querySnapshot.docs[0];
            userType = userDoc.data().type;
  
            // Redirect based on user type if on the login page
            if (currentPath === '/login') {
              userType === 'admin' ? goto('/admin') : goto('/user');
            }
          } else {
            // Log an error if no user record is found in Firestore
            console.error('No user record found in Firestore.');
          }
        } else if (currentPath !== '/login' && currentPath !== '/register') {
          // If no user is logged in and the current path is not login or register, redirect to login
          goto('/login');
        }
      });
    });
  </script>
  
  <style global>
    /* Import Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Montserrat:wght@300;700&display=swap');
  
    /* Global styles for the body element */
    :global(body) {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
      color: #363636;
      background-color: #dbdbdb;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  
    /* Global styles for action buttons */
    :global(.action-button) {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #3b82f6;
      color: white;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 8px;
      transition: background-color 0.3s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      font-size: 16px;
    }
  
    /* Hover styles for action buttons */
    :global(.action-button:hover) {
      background-color: #2563eb;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  
    /* Styles for icons inside action buttons */
    :global(.action-button i) {
      margin-right: 8px;
    }
  
    /* Specific styles for submit buttons */
    :global(.submit-button) {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #009e42;
      color: white;
      font-weight: 600;
      padding: 8px 12px;
      border-radius: 6px;
      width: 200px;
      margin: auto;
      transition: background-color 0.5s ease;
    }

    /* Hover styles for submit buttons */
    :global(.submit-button:hover) {
      background-color: #056434;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  
    /* Styles for logout buttons */
    :global(.logout-button) {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ef4444;
      color: white;
      font-weight: bold;
      padding: 8px 12px;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      transition: background 0.3s ease, box-shadow 0.2s ease;
      margin-top: auto;
      width: 100%;
      text-align: center;
    }
  
    /* Hover styles for logout buttons */
    :global(.logout-button:hover) {
      background: #b91c1c;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
  </style>
  
  <!-- Slot for child components -->
  <slot />
