<script>
	import { authStore } from '$lib/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { auth, checkAuth } from '$lib/firebase.client';
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		sendPasswordResetEmail
	} from 'firebase/auth';
	import { page } from '$app/stores';

	const route = $page.url.pathname;

	let email = '';
	let password = '';
	let action = 'login';

	$: checkAuth($authStore, route);

	onMount(() => {
		console.log('account');
	});

	const signup = async () => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
	};

	const login = async () => {
		await signInWithEmailAndPassword(auth, email, password);
		goto('/profile');
	};

	const reset = async () => {
		await sendPasswordResetEmail(auth, email);
		// goto('/profile');
	};

	const doAction = async () => {
		if (action === 'login') await login();
		if (action === 'signup') await signup();
		if (action === 'reset') await reset();
	};
</script>

<h2>{action}</h2>

<button on:click={() => (action = 'login')}>login screen</button>
<button on:click={() => (action = 'signup')}>signup screen</button>
<button on:click={() => (action = 'reset')}>reset screen</button>

<label for="email">
	<input type="email" id="email" bind:value={email} required />
</label>

{#if action !== 'reset'}
	<label for="password">
		<input type="password" id="password" bind:value={password} required />
	</label>
{/if}

<button on:click={doAction}>{action}</button>
