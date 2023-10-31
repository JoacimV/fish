
export interface Controls {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
}
export class KeyboardController implements Controls {
    right: boolean = false;
    left: boolean = false;
    down: boolean = false;
    up: boolean = false;
    public constructor() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }


    private onKeyDown(e: KeyboardEvent) {

        if (e.key === 'ArrowLeft') this.left = true;
        if (e.key === 'ArrowRight') this.right = true;
        if (e.key === 'ArrowUp') this.up = true;
        if (e.key === 'ArrowDown') this.down = true;
    }

    private onKeyUp(e: KeyboardEvent) {
        // set released key state to false
        if (e.key === 'ArrowLeft') this.left = false;
        if (e.key === 'ArrowRight') this.right = false;
        if (e.key === 'ArrowUp') this.up = false;
        if (e.key === 'ArrowDown') this.down = false;

    }
}