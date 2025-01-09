<script lang="ts">
    import { onMount } from 'svelte';
    import { auth } from '../../lib/firebase/firebase.client';
    import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
    import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
    import { goto } from '$app/navigation';
    import feather from 'feather-icons';

    let email = '';
    let password = '';
    let errorMessage = '';
    let isLoading = false;

    const db = getFirestore();

    const handleLogin = async () => {
        isLoading = true;
        errorMessage = '';
        try {
            const loggedInUser = localStorage.getItem('loggedInUser') || '';
            if (loggedInUser) {
                errorMessage = 'Another user is already logged in. Please log out first.';
                isLoading = false;
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('loggedInUser', user.email || '');

            const userQuery = query(collection(db, 'users'), where('email', '==', email));
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                if (userData.type) {
                    if (userData.type === 'admin') {
                        goto('/admin');
                    } else if (userData.type === 'user') {
                        goto('/user');
                    }
                } else {
                    await signOut(auth);
                    localStorage.removeItem('loggedInUser');
                    alert('Account type is not yet assigned');
                    goto('/login');
                    location.reload();
                }
            } else {
                errorMessage = 'No user record found in Firestore.';
            }
        } catch (error: any) {
            console.error("Login Error:", error);
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    };

    onMount(() => {
        feather.replace(); // Replace Feather Icons on mount
    });
</script>

<style>
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

    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
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
        left: 12px;
        transform: translateY(-50%);
        pointer-events: none;
        color: #6B7280;
    }

    /* Input fields with padding for the icon */
    .input-with-icon {
        padding-left: 40px;
        height: 48px;
    }

    /* Button styling */
    button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .register-button {
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem; /* Gap between icon and text */
        font-size: 16px;
        font-weight: 600;
        height: 48px; /* Adjust to control the button height */
    }
</style>

<div class="flex items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-indigo-300">
    <form 
      on:submit|preventDefault={handleLogin} 
      class={`bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-96 transition-opacity duration-500 fade-in`}
    >
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Welcome back!</h2>
      
      <div class="relative mb-4">
        <label for="email" class="block text-gray-600 font-medium">Email:</label>
        <i data-feather="mail" class="input-icon"></i> <!-- Feather email icon -->
        <input type="email" id="email" bind:value={email} required class="input-with-icon border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      
      <div class="relative mb-4">
        <label for="password" class="block text-gray-600 font-medium">Password:</label>
        <i data-feather="lock" class="input-icon"></i> <!-- Feather password icon -->
        <input type="password" id="password" bind:value={password} required class="input-with-icon border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      
      <button 
        type="submit" 
        class={`bg-gradient-to-b from-blue-400 to-indigo-600 text-white p-3 rounded-lg font-semibold transition-transform duration-300 w-full flex items-center justify-center space-x-2 
                ${isLoading ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
      >
        {#if isLoading}
          <div class="spinner"></div> <!-- Spinner shown when loading -->
        {:else}
          <i data-feather="log-in"></i> <!-- Feather login icon -->
          <span>Login</span>
        {/if}
      </button>
      
      {#if errorMessage}
        <p class="text-red-500 mt-2 text-sm text-center">{errorMessage}</p>
      {/if}
      
      <p class="mt-4 text-center text-gray-600">Don't have an account? 
        <a href="/register" class="text-blue-500 hover:underline register-button">
          <i data-feather="user-plus"></i> <!-- Feather register icon -->
          Register here
        </a>
      </p>
    </form>
</div>
