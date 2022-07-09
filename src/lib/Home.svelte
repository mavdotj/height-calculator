<script lang=ts>
    // Dirty nasty code, never open this file again.
    import { onMount } from 'svelte';
    import Typewriter from 'svelte-typewriter'
    import height from './store';
    import { replace } from 'svelte-spa-router';
    enum Stage {
        Start,
        Install,
        Installing,
        Run,
        Running
    }

    const wait = (t) => {
        return new Promise((res) => {
            setTimeout(res, t)
            setTimeout(() => {
                stage = Stage.Run
            }, t + 200)
        })
    }

    let stage: Stage = 0;

    onMount(() => {
        stage = Stage.Install
    })

    function installpackage() {
        stage = Stage.Installing
    }

    function runpackage() {
        stage = Stage.Running
    }

    let inputelm;

    function enter(e) {
        if(e.key === "Enter") {
            replace('/load')
        }
    }
</script>

<!-- Dirty nasty code, never open this file again. -->

<div class="w-full h-full bg-black text-green-600 flex flex-col">
<span>~ </span>

<span class="inline">
    {#if stage >= Stage.Install}
    <span>&gt;</span><Typewriter on:done={installpackage}>
        npm i -g height-calc
    </Typewriter>
    {/if}
</span>
{#if stage >= Stage.Installing}
{#await wait(2000)}
    <span>...</span>
{:then} 
installed 918273871239847 packages, audited 141 packages in 379y<br>
<br>
45 packages are looking for funding<br>
run `npm fund` for details<br>
<br>
found 400 vulnerabilities<br>
{/await}
{/if}
<span class="inline">
    {#if stage >= Stage.Run}
    <span>&gt;</span><Typewriter on:done={runpackage}>
        height-calc
    </Typewriter>
    {/if}
</span>
{#if stage === Stage.Running}
<span class="inline">
    Input Height: <input bind:this={inputelm} bind:value={$height} type="number" class="input input-ghost input-xs w-full max-w-xs inline" />
    {#if inputelm}
    <span class="hidden">{inputelm.focus()}</span>
    {/if}
</span>
{/if}
</div>


<svelte:window on:keydown={enter}></svelte:window>