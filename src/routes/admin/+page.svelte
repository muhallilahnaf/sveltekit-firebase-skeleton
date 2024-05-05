<script>
	import Dashboard from '$lib/components/Dashboard.svelte';
	import { db } from '$lib/firebase.client';
	import { getDocs, collection } from 'firebase/firestore/lite';
	import { authStore } from '$lib/store';

	let verified = false;
	let adminName = '';
	let msg = '';

	const verifyAdmin = async () => {
		const adminRef = collection(db, 'admin');
		const adminSnapshot = await getDocs(adminRef);
		const adminDoc = adminSnapshot.docs.filter((doc) => doc.id === $authStore.currentUser.uid);
		if (adminDoc.length) {
			adminName = adminDoc[0].get('name');
			verified = true;
			msg = '';
		} else {
			msg = 'youre not an admin';
		}
	};
</script>

<h1>admin</h1>

{#if verified}
	<Dashboard {adminName} />
{:else}
	<button on:click={verifyAdmin}>verify admin</button>
{/if}

{#if msg !== ''}
	<p>{msg}</p>
{/if}
