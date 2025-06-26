<script lang="ts">
	// Dirty nasty code, never open this file again.
	import { onMount, untrack } from 'svelte';
	import { App, Page, Typewriter } from './state.svelte';
	enum Stage {
		Start,
		Install,
		Installing,
		Run,
		Running
	}

	let app = App.instance;

	const wait = (t: number) =>
		new Promise((res) => {
			setTimeout(res, t);
			setTimeout(() => {
				stage = Stage.Run;
			}, t + 200);
		});

	let stage: Stage = $state(Stage.Start);

	onMount(() => {
		stage = Stage.Install;
	});

	function installpackage() {
		stage = Stage.Installing;
	}

	function runpackage() {
		stage = Stage.Running;
		inputelm?.focus();
	}

	let inputelm = $state<HTMLSpanElement>();
	let invalid = $state(false);
	let value = $state('');

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
</script>

<!-- Dirty nasty code, never open this file again. -->
<!-- I actually did open this file again... -->

{#snippet typewrite(target: string, then: () => void)}
	{@const typewriter = new Typewriter()}
	{(() => {
		untrack(() => {
			typewriter.set(target).then(then);
		});
	})() ?? ''}
	{typewriter.current}
{/snippet}

<div class="w-full h-full bg-black text-green-600 flex flex-col">
	<span>~ </span>

	<span class="inline">
		{#if stage >= Stage.Install}
			<span>&gt;</span>{@render typewrite('npm i -g height-calc', installpackage)}
		{/if}
	</span>
	{#if stage >= Stage.Installing}
		{#await wait(2000)}
			<span>...</span>
		{:then}
			installed {getRandomInt(Number.MAX_SAFE_INTEGER)} packages, audited {getRandomInt(300)} packages in {getRandomInt(500)}y<br />
			<br />
			{getRandomInt(62)} packages are looking for funding<br />
			run `npm fund` for details<br />
			<br />
			found {getRandomInt(500)} vulnerabilities<br />
		{/await}
	{/if}
	<span class="inline">
		{#if stage >= Stage.Run}
			<span>&gt;</span>{@render typewrite('height-calc', runpackage)}
		{/if}
	</span>
	{#if stage === Stage.Running}
		<span class="inline">
			Input Height: <span
				bind:this={inputelm}
				contenteditable
				bind:textContent={
					() => value || '      ',
					(v) => {
						if (value !== v) {
							invalid = false;
							value = v.trim();
						}
					}
				}
				class="min-w-8! border-1 border-white/10 rounded-md whitespace-pre"
				class:text-red-500={invalid}
			></span>
		</span>
	{/if}
</div>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			let height = parseFloat(value);
			if (isNaN(height)) {
				invalid = true;
				return;
			}
			app.height = height;
			app.isLoadingHeight = true;
			app.page = Page.Load;
		}
	}}
/>
