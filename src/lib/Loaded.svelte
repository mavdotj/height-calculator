<script>
    import height from "./store";
    import { replace } from 'svelte-spa-router';

    if(!$height) {
        replace('/')
    }

    function wrap() {
        return () => {
            height.set()
            replace('/')
        }
    }

</script>

<span class="font-extrabold">Congratulations</span>

<span class="font-bold">Your height is in fact <pre class="inline">{$height}</pre>cm!
</span>

<button class="btn btn-ghost" on:click={wrap()}>Go Again</button>