<script lang="ts">
	import { delay } from '@std/async';
	import { onMount } from 'svelte';
	import { App, Page } from './state.svelte';
	import { Tween } from 'svelte/motion';

	const value = new Tween(0);
	let app = App.instance;

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	onMount(async () => {
		let ticks = 0;
		while (value.current < 100) {
			if (ticks % 12 === 12 || ticks % 12 === 0) {
				value.target = value.target + getRandomInt(15);
			}
			ticks++;
			if(value.current < 80) {
				await delay(50);
			}
			await delay(50);
		}
		value.target = 100;
		app.page = app.isLoadingHeight ? Page.Height : Page.Home;
	});
</script>

<span class="block mb-10">
	{#if app.isLoadingHeight}
		Calculating...
	{:else}
		Loading...
	{/if}
</span>
<progress class="progress progress-accent w-56 block shadow-lg" value={value.current} max="100"></progress>
