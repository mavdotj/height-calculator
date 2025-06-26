import { delay } from '@std/async';

export enum Page {
	Load,
	Home,
	Height
}

export class App {
	static readonly instance = new App();
	private _canFail = $state(true);
	canFail = $derived(this._canFail)
	private _reloadKey = $state(false)

	get reloadKey() {
		return this._reloadKey
	}

	reload() {
		this._canFail = false;
		this._reloadKey = !this._reloadKey;
	}

	private _page = $state<Page>(Page.Load);
	public get page() {
		return this._page;
	}
	public set page(value) {
		if (this.page == Page.Load) {
			this._canFail = true;
		}
		this._page = value;
	}
	height = $state<number | undefined>();

	isLoadingHeight = $state<boolean>(false);

	private constructor() {

	}
}

export class Typewriter {
	private _target = $state<string>();
	private _current = $state<string>();

	get current() {
		return this._current;
	}

	get target(): string | undefined {
		return this._target;
	}

	set target(target: string) {
		this.set(target);
	}

	async set(target: string) {
		this._current = '';
		this._target = target;
		for (const v of target.split('')) {
			this._current = `${this._current}${v}`;
			await delay(100);
		}
	}
}
