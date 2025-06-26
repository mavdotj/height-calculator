import { delay } from "@std/async"
export { delay } from "@std/async"

export enum Page {
    Load,
    Home,
    Height
}

class App {
    static readonly instance = new App()

    page = $state<Page>(Page.Load)
    height = $state<number | undefined>();

    isLoadingHeight = $state<boolean>(false)

    private constructor() { }
}

export class Typewriter {
    private _target = $state<string>()
    private _current = $state<string>()

    get current() {
        return this._current
    }

    get target(): string | undefined {
        return this._target
    }

    set target(target: string) {
        this.set(target)
    }

    async set(target: string) {
        this._current = ""
        this._target = target
        for (const v of target.split('')) {
            this._current = `${this._current}${v}`
            await delay(100)
        }
    }
}


export default App;