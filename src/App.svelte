<script lang="ts">
	import Router, { location, replace } from 'svelte-spa-router';
	replace('/load')
	import Home from './lib/Home.svelte';
	import Loaded from './lib/Loaded.svelte';
	import Loading from './lib/Loading.svelte';
</script>

<div id="appwrap" class="h-screen w-screen flex flex-col">
	<div class="flex-grow bg-base-200 w-full flex flex-col justify-center items-center">
		<Router routes={{
			'/': Home,
			'/height': Loaded,
			'/load': Loading
		}} />
	</div>
</div>

