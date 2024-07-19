import { Boat } from "./boat-port";
import { ControlPort } from "../controls/control-port";

export interface WoodenBoatProps {
    controlPort: ControlPort;
    scene: Phaser.Scene;
}

export class WoodenBoat implements Boat {
    static #instance: WoodenBoat;
    private controlPort: ControlPort = {} as ControlPort;
    public sprite: Phaser.Physics.Arcade.Image = {} as Phaser.Physics.Arcade.Image;
    private throttle = 0;
    private targetThrottle = 0;

    private turnRight = false;
    private turnLeft = false;

    private constructor() { }

    update(delta: number) {
        const { left, right } = this.controlPort;
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        const ACCELERATION = 50;
        if (this.targetThrottle > 0) {
            this.throttle = Phaser.Math.Linear(this.throttle, this.targetThrottle, delta / 2000); // Linear interpolation
            // rotate 90 degrees counter-clockwise
            const velX = Math.cos(this.sprite.rotation) * ACCELERATION * this.throttle;
            const velY = Math.sin(this.sprite.rotation) * ACCELERATION * this.throttle;
            this.sprite.setVelocity(velX, velY);
        } else {
            this.sprite.setAcceleration(0, 0);
            this.throttle = 0;
        }
        // Only allow turning while moving
        if (body.speed > 0) {
            if (left || this.turnLeft) {
                this.sprite.setAngularVelocity(-ACCELERATION);
            } else if (right || this.turnRight) {
                this.sprite.setAngularVelocity(ACCELERATION);
            } else {
                this.sprite.setAngularVelocity(0);
            }
        } else {
            this.sprite.setAngularVelocity(0);
            this.setTurnLeft(false);
            this.setTurnRight(false);
        }
    }

    public getSpeed(): string {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        if (!body) {
            return '';
        }
        // Round speed to 2 decimals
        return (body.speed / 10).toFixed(2);
    }

    public setThrottle(throttle: number) {
        this.targetThrottle = throttle;
    }

    public getThrottle(): number {
        return this.throttle;
    }

    public getPosition(): { x: number; y: number; } {
        return { x: this.sprite.x, y: this.sprite.y };
    }

    public setTurnRight(turnRight: boolean) {
        this.turnRight = turnRight;
    }

    public setTurnLeft(turnLeft: boolean) {
        this.turnLeft = turnLeft;
    }

    public static init(props: WoodenBoatProps) {
        this.#instance.controlPort = props.controlPort;
        this.#instance.sprite = props.scene.physics.add.image(500, 840, 'boat');
        // Make the collider ellipse shaped
        this.#instance.sprite.body?.setCircle(6, 8, 9);
        // this.#instance.sprite.setMaxVelocity(150);
        this.#instance.sprite.setDrag(13);
        // this.#instance.sprite.setAngularDrag(100);
        // this.#instance.sprite.setBounce(0.2);
        // this.#instance.sprite.setDamping(true);
        // this.#instance.sprite.setFriction(1);
        // // center the sprite's anchor point
        // this.#instance.sprite.setOrigin(0.5, 0.5);
        // Scale the sprite up
        // this.#instance.sprite.scaleX = 6;
        // this.#instance.sprite.scaleY = 8;
        // Move the sprite to the top layer
        // this.#instance.sprite.setDepth(1);

    }

    public static get instance() {
        if (!WoodenBoat.#instance) {
            WoodenBoat.#instance = new WoodenBoat();
        }
        return WoodenBoat.#instance;
    }
}