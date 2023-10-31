export interface CameraPort {
    camera: Phaser.Cameras.Scene2D.Camera;
    update(delta: number): void;
    setFollow(follow: Phaser.Physics.Arcade.Image): void;
}