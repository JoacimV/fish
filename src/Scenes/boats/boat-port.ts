export interface Boat {
    sprite: Phaser.Physics.Arcade.Image;
    update(delta: number): void;
    getSpeed(): string;
    setThrottle(throttle: number): void;
    getThrottle(): number;
    getPosition(): { x: number, y: number };

}