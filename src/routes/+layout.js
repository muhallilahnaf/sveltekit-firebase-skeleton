console.log('layout js');
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase.client';
import { authStore } from '$lib/store';

export const load = () => {
    console.log('load');
    onAuthStateChanged(auth, (user) => {
        console.log('state change');
        console.log(user);
        authStore.update((curr) => ({ ...curr, currentUser: user, isLoading: false }));
    });
}

export const prerender = true;