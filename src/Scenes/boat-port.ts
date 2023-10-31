export interface Vector2D {
    x: number;
    y: number;
}

export interface Boat {
    sprite: Phaser.Physics.Arcade.Image;
    velocity: Vector2D;
    update(delta: number): void;
}