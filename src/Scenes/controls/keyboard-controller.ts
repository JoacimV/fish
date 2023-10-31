import { ControlPort } from "./control-port";

export class KeyboardController implements ControlPort {
    public right: boolean = false;
    public left: boolean = false;
    public down: boolean = false;
    public up: boolean = false;

    public constructor() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }


    private onKeyDown(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft' || e.key === 'a') this.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd') this.right = true;
        if (e.key === 'ArrowUp' || e.key === 'w') this.up = true;
        if (e.key === 'ArrowDown' || e.key === 's') this.down = true;
    }

    private onKeyUp(e: KeyboardEvent) {
        // set released key state to false
        if (e.key === 'ArrowLeft' || e.key === 'a') this.left = false;
        if (e.key === 'ArrowRight'|| e.key === 'd') this.right = false;
        if (e.key === 'ArrowUp'|| e.key === 'w') this.up = false;
        if (e.key === 'ArrowDown'|| e.key === 's') this.down = false;
    }
}