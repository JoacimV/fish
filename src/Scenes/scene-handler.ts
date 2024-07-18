import { FollowCamera } from "./camera/follow-camera-adapter";
import { KeyboardController } from "./controls/keyboard-controller";
import { Scene } from "phaser";
import Gameplay from "./game";

interface ReactEvent extends CustomEvent {
    detail: {
        data: string
    }
}


export class SceneHandler extends Scene {
    private gamePlay: Gameplay = {} as Gameplay;
    public constructor() {
        super({ visible: true, key: 'SceneHandler' });
    }
    preload() {
        // this.load.spritesheet('fantasy', './fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('terrain', './fish/dist/terrain.png', { frameWidth: 48, frameHeight: 48 })
        this.load.spritesheet('animatedBobber', './fish/dist/bobber-animated.png', { frameWidth: 16, frameHeight: 16 })
        this.load.image('boat', './fish/dist/boat.png');
        this.load.image('bobber', './fish/dist/bobber.png');
    }

    create() {
        this.gamePlay = new Gameplay({
            controlPort: new KeyboardController(),
            cameraPort: new FollowCamera({ name: 'followCamera', x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }),
            scene: this
        });
        this.gamePlay.create();
        window.addEventListener('react', (event) => {
            const reactEvent = event as ReactEvent;
        });
        // Publish create message to the global window object
        window.dispatchEvent(new CustomEvent('phaser', { detail: { my: 'data' } }));

    }

    update(time: number, delta: number) {
        this.gamePlay.update(time, delta);
    }
}

