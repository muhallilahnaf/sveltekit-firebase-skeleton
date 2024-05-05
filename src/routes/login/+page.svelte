<script>
	import { authStore } from '$lib/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { auth, checkAuth } from '$lib/firebase.client';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { page } from '$app/stores';

	const route = $page.url.pathname;

	let email = '';
	let password = '';

	$: checkAuth($authStore, route);

	onMount(() => {
		console.log('login');
	});

	const login = async () => {
		await signInWithEmailAndPassword(auth, email, password);
		goto('/profile');
	};
</script>

<h2>login</h2>

<label for="email">
	<input type="email" id="email" bind:value={email} required />
</label>

<label for="password">
	<input type="password" id="password" bind:value={password} required />
</label>

<button on:click={login}>login</button>
