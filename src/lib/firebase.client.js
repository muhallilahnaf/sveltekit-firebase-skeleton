import { initializeApp, getApp, getApps, deleteApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import config from '$lib/firebase-config'
import { goto } from '$app/navigation';
import { browser } from '$app/environment';


let app

if (!getApps().length) {
    app = initializeApp(config)
} else {
    app = getApp()
    deleteApp(app)
    app = initializeApp(config)
}

export const auth = getAuth(app)
export const db = getFirestore(app)

console.log('firebase');

export const authPaths = [
    '/profile',
    '/admin',
];

export const unauthPaths = [
    '/register',
    '/login',
    '/account'
];

export const authTarget = '/profile'
export const unauthTarget = '/login'

export const checkAuth = (authStore, route) => {
    if (browser) {
        console.log('checkauth');
        if (authStore.currentUser && unauthPaths.includes(route)) {
            console.log(route + ' > ' + authTarget);
            goto(authTarget)
        }
        if (!authStore.currentUser && authPaths.includes(route)) {
            console.log(route + ' > ' + unauthTarget);
            goto(unauthTarget)
        }
    }
}