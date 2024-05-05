<script>
	import { onMount } from 'svelte';
	import { authStore } from '$lib/store';
	import { beforeNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import { authPaths, unauthPaths, authTarget, unauthTarget } from '$lib/firebase.client';

	onMount(() => {
		console.log('layout');
	});

	beforeNavigate((navigation) => {
		console.log('before navigation');
		const toRoute = navigation.to.route.id;
		if (toRoute === '/') return;
		if ($authStore.currentUser && unauthPaths.includes(toRoute)) {
			console.log('to');
			navigation.cancel();
			goto(authTarget);
		}
		if (!$authStore.currentUser && authPaths.includes(toRoute)) {
			console.log('to');
			navigation.cancel();
			goto(unauthTarget);
		}
	});
</script>

<h1>layout</h1>

<ul>
	<li><a href="/">home</a></li>
	<li><a href="/account">account</a></li>
	<li><a href="/register">register</a></li>
	<li><a href="/login">login</a></li>
	<li><a href="/logout">logout</a></li>
	<li><a href="/profile">profile</a></li>
	<li><a href="/admin">admin</a></li>
</ul>

<div>{JSON.stringify($authStore)}</div>

{#if $authStore.isLoading}
	<div>Loading...</div>
{:else}
	<slot />
{/if}
