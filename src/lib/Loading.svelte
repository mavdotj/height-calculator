<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { replace } from 'svelte-spa-router'
    let value = writable(0);
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const wait = (t) => {
        return new Promise((res) => {
            setTimeout(res, t)
        })
    }

    onMount(async () => {
        let ticks = 0
        while($value < 100) {
            if(ticks % 12 === 12 || ticks % 12 === 0) {
                value.set($value + getRandomInt(15))
                console.log($value)
            }
            ticks++;
            await wait(100)
        }
        value.set(100)
        replace(`/height`)
    })
</script>

<span class="block mb-10">Loading...</span>
<progress class="progress progress-accent w-56 block shadow-lg" value={$value} max="100"></progress>