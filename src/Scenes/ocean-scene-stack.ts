import { KeyboardController } from "./controls/keyboard-controller";
import { Scene } from "phaser";
import Gameplay from "./game";
import { PhysicsAdapter } from "./game-engine/adapters/physics-adapter";
import { FollowCamera } from "./game-engine/adapters/follow-camera-adapter";

export class OceanSceneStack extends Scene {
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
            physicsPort: new PhysicsAdapter(this),
            cameraPort: new FollowCamera({ name: 'followCamera', x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, scene: this })
        });
    }

    update(time: number, delta: number) {
        this.gamePlay.update(time, delta);
    }
}

