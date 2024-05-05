<script>
	import { authStore } from '$lib/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { auth, checkAuth } from '$lib/firebase.client';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { page } from '$app/stores';

	const route = $page.url.pathname;

	let email = '';
	let password = '';

	$: checkAuth($authStore, route);

	onMount(() => {
		console.log('register');
	});

	const register = async () => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
	};
</script>

<h2>register</h2>

<label for="email">
	<input type="email" id="email" bind:value={email} required />
</label>

<label for="password">
	<input type="password" id="password" bind:value={password} required />
</label>

<button on:click={register}>register</button>
