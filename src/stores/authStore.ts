import { writable } from 'svelte/store';
import { getAuth, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth } from '../lib/firebase/firebase.client'; // Import initialized Firebase auth

interface AuthStore {
  currentUser: User | null;
  error: string;
}

export const authStore = writable<AuthStore>({
  currentUser: null,
  error: ''
});

// Login function
export const loginUser = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    authStore.update((store) => ({
      ...store,
      currentUser: userCredential.user,
      error: ''
    }));
  } catch (error: any) {
    authStore.update((store) => ({
      ...store,
      error: error.message
    }));
  }
};

// Logout function
export const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    authStore.update((store) => ({
      ...store,
      currentUser: null,
      error: ''
    }));
  } catch (error: any) {
    authStore.update((store) => ({
      ...store,
      error: error.message
    }));
  }
};

// Export a collection of auth handlers
export const authHandlers = {
  login: loginUser,
  logout: logoutUser
};
