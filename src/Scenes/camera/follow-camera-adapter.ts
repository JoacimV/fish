import { CameraPort } from "./camera-port";

export interface CameraProps {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export class FollowCamera implements CameraPort {
    public camera: Phaser.Cameras.Scene2D.Camera = {} as Phaser.Cameras.Scene2D.Camera;
    constructor(props: CameraProps) {
        const { x, y, width, height } = props;
        this.camera = new Phaser.Cameras.Scene2D.Camera(x, y, width, height);
        this.camera.setZoom(5)
        // Set background color to the same blue as the water
        this.camera.setBackgroundColor('rgba(80, 167, 232, 1)');
        this.camera.name = props.name;
    }
    update(delta: number) {
    }

    public setFollow(follow: Phaser.Physics.Arcade.Image) {
        this.camera.startFollow(follow, true, 1, 1);
    }
}