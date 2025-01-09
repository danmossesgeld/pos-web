<script lang="ts">
  import { auth } from '../../lib/firebase/firebase.client';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { getFirestore, setDoc, doc } from 'firebase/firestore';
  import { goto } from '$app/navigation';
  import feather from 'feather-icons'; // Import Feather Icons
  import { onMount } from 'svelte';

  let email = '';
  let password = '';
  let userType = '';
  let errorMessage = '';
  let isLoading = false; // State to manage button loading
  const db = getFirestore(); // Initialize Firestore

  const handleRegister = async () => {
      isLoading = true; // Set loading state when registration starts
      errorMessage = ''; // Reset any previous error messages
      try {
          // Create user with email and password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Prepare user data to add to Firestore
          const userData = {
              email: user.email,
              type: userType || null,
          };

          // Add user data to Firestore in the 'users' collection
          await setDoc(doc(db, 'users', user.uid), userData);

          // Redirect to login after successful registration
          goto('/login');
      } catch (error: any) {
          console.error("Registration Error:", error);
          errorMessage = error.message; // Display error message
      } finally {
          isLoading = false; // Reset loading state after operation
      }
  };

  onMount(() => {
      feather.replace(); // Initialize Feather icons
  });
</script>

<style>
  /* Fade-in animation */
  .fade-in {
      animation: fadeIn 0.5s ease-in-out forwards;
  }

  @keyframes fadeIn {
      from {
          opacity: 0;
          transform: translateY(-20px);
      }
      to {
          opacity: 1;
          transform: translateY(0);
      }
  }

  /* Spinner animation */
  .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
      margin: 0 auto; /* Center the spinner */
  }

  @keyframes spin {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }

  /* Position the icon properly */
  .input-icon {
      position: absolute;
      top: 70%;
      left: 12px; /* Distance from the left */
      transform: translateY(-50%);
      pointer-events: none; /* So the icon doesn't interfere with input clicks */
      color: #6B7280; /* Gray color for icons */
  }

  /* Input fields with padding for the icon */
  .input-with-icon {
      padding-left: 40px; /* Adjust to create space for the icon */
      height: 48px; /* Ensures a consistent height */
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px; /* Adjusts padding for a consistent height */
    height: 48px; /* Ensures button height is consistent */
}

button span {
    margin-left: 8px; /* Adds some space between the icon and the text */
}

</style>

<div class="flex items-center justify-center h-screen bg-gradient-to-r from-red-400 to-amber-400">
  <form 
    on:submit|preventDefault={handleRegister} 
    class={`bg-white p-10 rounded-lg shadow-lg w-96 transition-opacity duration-500 fade-in`}
  >
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Register Account</h2>
    
    <div class="relative mb-4">
      <label for="email" class="block text-gray-600 font-medium">Email:</label>
      <i data-feather="mail" class="input-icon"></i> <!-- Feather email icon -->
      <input type="email" id="email" bind:value={email} required class="input-with-icon border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500" />
    </div>
    
    <div class="relative mb-4">
      <label for="password" class="block text-gray-600 font-medium">Password:</label>
      <i data-feather="lock" class="input-icon"></i> <!-- Feather password icon -->
      <input type="password" id="password" bind:value={password} required class="input-with-icon border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500" />
    </div>
    
    <div class="mb-4">
      <label for="userType" class="block text-gray-600 font-medium">User Type:</label>
      <select id="userType" bind:value={userType} required class="border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="" disabled>Select User Type</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
      </select>
    </div>
    
    <button 
    type="submit" 
    class={`bg-gradient-to-t from-red-400 to-amber-400 text-white rounded-lg font-semibold transition-transform duration-300 w-full flex items-center justify-center 
            ${isLoading ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
  >
    {#if isLoading}
      <div class="spinner"></div> <!-- Spinner shown when loading -->
    {:else}
      <i data-feather="user-plus"></i> <!-- Feather login icon -->
      <span>Register</span>
    {/if}
  </button>
  
    
    {#if errorMessage}
      <p class="text-red-500 mt-2 text-sm text-center">{errorMessage}</p>
    {/if}
    
    <p class="mt-4 text-center text-gray-600">Already have an account? <a href="/login" class="text-purple-500 hover:underline">Login here</a></p>
  </form>
</div>
