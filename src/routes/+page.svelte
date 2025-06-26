<script lang=ts>
	import Height from "$lib/Height.svelte";
	import Home from "$lib/Home.svelte";
	import Loading from "$lib/Loading.svelte";
	import App, { Page } from "$lib/state.svelte";

let app = App.instance;
</script>

<div class="h-screen w-screen flex flex-col">
	<div class="flex-grow bg-base-200 w-full flex flex-col justify-center items-center">
        {#if app.page === Page.Height}
        <Height />
        {:else if app.page === Page.Home}
        <Home />
        {:else if app.page === Page.Load}
        <Loading />
        {/if}
	</div>
</div>

