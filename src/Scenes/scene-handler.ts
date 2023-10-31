import { FollowCamera } from "./camera/follow-camera-adapter";
import { KeyboardController } from "./controls/keyboard-controller";
import { Scene } from "phaser";
import Gameplay from "./game";

export class SceneHandler extends Scene {
    private gamePlay: Gameplay = {} as Gameplay;
    public constructor() {
        super({ visible: true })
    }
    preload() {
        this.load.image('boat', './boat.png');
    }

    create() {
        this.gamePlay = new Gameplay({
            controlPort: new KeyboardController(),
            cameraPort: new FollowCamera({ name: 'followCamera', x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }),
            scene: this
        });
        this.gamePlay.create();
    }

    update(time: number, delta: number) {
        this.gamePlay.update(time, delta);
    }
}

