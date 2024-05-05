<script>
	import { db } from '$lib/firebase.client';
	import { getDocs, collection, doc, setDoc } from 'firebase/firestore/lite';

	export let adminName;
	let id = '';
	let name = '';
	let category = '';
	let brand = '';

	const addProduct = async () => {
		const productRef = doc(db, 'products', id);
		await setDoc(productRef, { name, brand, category }, { merge: true });
		id = '';
		name = '';
		category = '';
		brand = '';
	};
</script>

<h2>dashboard</h2>

<p>hi {adminName}</p>

<h3>add product</h3>

<label for="id">
	id
	<input type="text" id="id" bind:value={id} required />
</label>

<label for="name">
	name
	<input type="text" id="name" bind:value={name} required />
</label>

<label for="category">
	category
	<input type="text" id="category" bind:value={category} required />
</label>

<label for="brand">
	brand
	<input type="text" id="brand" bind:value={brand} required />
</label>

<button on:click={addProduct}>add product</button>
