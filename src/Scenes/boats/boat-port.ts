export interface Boat {
    sprite: Phaser.Physics.Arcade.Image;
    update(delta: number): void;
    getSpeed(): number;
}