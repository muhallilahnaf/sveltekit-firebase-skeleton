<script>
	import { onMount } from 'svelte';
	import { authStore } from '$lib/store';
	import { db } from '$lib/firebase.client';
	import { getDocs, collection, doc, getDoc } from 'firebase/firestore/lite';

	let products = [];
	let categories = [];
	let selectedCategory;

	const productsRef = collection(db, 'products');
	const categoriesRef = doc(db, 'categories', 'all');

	$: reloadProducts(selectedCategory);

	const reloadProducts = async (selectedCat) => {
		let temp = [];
		const productsSnapshot = await getDocs(productsRef);
		productsSnapshot.docs.forEach((doc) => {
			const { name, category, brand } = doc.data();
			if (selectedCat === 'all' || category === selectedCat)
				temp.push({ id: doc.id, name, brand, category });
		});
		products = temp;
	};

	onMount(async () => {
		console.log('home page');

		const productsSnapshot = await getDocs(productsRef);
		products = productsSnapshot.docs.map((doc) => {
			const { name, category, brand } = doc.data();
			return { id: doc.id, name, brand, category };
		});

		const categoriesSnapshot = await getDoc(categoriesRef);
		if (categoriesSnapshot.exists()) {
			categories = categoriesSnapshot.data().list;
		}
	});
</script>

<h2>Home</h2>

<select name="category" id="category" bind:value={selectedCategory}>
	<option value="all" selected>all</option>
	{#each categories as category}
		<option value={category}>{category}</option>
	{/each}
</select>

<ul>
	{#each products as product}
		<li>{product.name} - {product.category}</li>
	{/each}
</ul>

<div class="tier-body">
	<img src="aafi-jira-pani.png" alt="" />
	<img src="aafi-mango.png" alt="" />
	<img src="aafi-orange.png" alt="" />
</div>

<div class="tier-body">
	<img src="aarong-chocolate-milk.png" alt="" />
	<img src="aarong-laban.png" alt="" />
	<img src="aarong-mango-milk.png" alt="" />
	<img src="aarong-mocha-milk.png" alt="" />
</div>

<style>
	.tier-body {
		min-height: 128px;
		width: 80vw;
	}
	img {
		height: 64px;
	}
</style>
