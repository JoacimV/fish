import { IPhysicsObject } from "../ports/physics-port";
import { CameraPort } from "../ports/camera-port";
import { Scene } from "phaser";
export interface CameraProps {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    scene: Scene;
}

export class FollowCamera implements CameraPort {
    public camera: Phaser.Cameras.Scene2D.Camera;
    public scene: Scene;
    private follow: IPhysicsObject | undefined;

    constructor(props: CameraProps) {
        const { x, y, width, height } = props;
        this.scene = props.scene;
        this.camera = this.scene.cameras.add(x, y, width, height, true, props.name);
    }

    update(delta: number): void {
        if (this.follow) {
            // find the physics object from the scene by name 'po'
            const object = this.scene.physics.world.bodies.entries.find((body) => body.gameObject.name === 'boat');
            this.camera.startFollow(object!, true, 0.05, 0.05);
        }
    }
    setBackGroundColor(color: number): void {
        this.camera.setBackgroundColor(color);
    }


    public setFollow(follow: IPhysicsObject) {
        this.follow = follow;
    }
}