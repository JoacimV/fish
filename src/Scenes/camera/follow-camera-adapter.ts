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
    private follow: Phaser.Physics.Arcade.Image = {} as Phaser.Physics.Arcade.Image;
    constructor(props: CameraProps) {
        const { x, y, width, height } = props;
        this.camera = new Phaser.Cameras.Scene2D.Camera(x, y, width, height);
        // Set background color to dark blue
        this.camera.setBackgroundColor(0x000066);
        this.camera.name = props.name;
    }
    update(delta: number) {
        const { follow } = this;
        this.camera.startFollow(follow, false, 0.5, 0.5)
    }

    public setFollow(follow: Phaser.Physics.Arcade.Image) {
        this.follow = follow;
    }
}