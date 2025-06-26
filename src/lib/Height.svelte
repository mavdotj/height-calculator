<script lang=ts>
	import App, { Page } from "./state.svelte";

    let app = App.instance;
</script>

<span class="font-extrabold">Congratulations</span>

<span class="font-bold">Your height is in fact <pre class="inline">{app.height}</pre>cm!
</span>

<button class="btn btn-ghost" on:click={() => {
    app.height = undefined
    app.page = Page.Home
}}>Go Again</button>