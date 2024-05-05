<script>
	import { onMount } from 'svelte';
	import { authStore } from '$lib/store';
	import { goto } from '$app/navigation';
	import { auth, checkAuth } from '$lib/firebase.client';
	import { page } from '$app/stores';
	import { signOut, sendEmailVerification } from 'firebase/auth';

	const route = $page.url.pathname;

	$: checkAuth($authStore, route);

	const logout = async () => {
		await signOut(auth);
		goto('/');
	};

	const verify = async () => {
		await sendEmailVerification($authStore.currentUser);
	};

	onMount(() => {
		console.log('profile');
	});
</script>

<h2>profile</h2>

<p>Email: {$authStore.currentUser?.email}</p>
<button on:click={logout}>logout</button>

<div>
	{#if $authStore.currentUser?.emailVerified}
		<p>information to show after verification</p>
	{:else}
		<button on:click={verify}>verify email</button>
	{/if}
</div>
