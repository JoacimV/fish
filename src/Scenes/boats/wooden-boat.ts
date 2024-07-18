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

    private constructor() { }

    update(delta: number) {
        const { left, right, up } = this.controlPort;
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        const ACCELERATION = 200;

        if (this.throttle > 0) {
            // rotate 90 degrees counter-clockwise
            const velX = Math.cos(this.sprite.rotation) * ACCELERATION * this.throttle;
            const velY = Math.sin(this.sprite.rotation) * ACCELERATION * this.throttle;
            this.sprite.setVelocity(velX, velY);
        } else {
            this.sprite.setAcceleration(0, 0);
        }
        // Only allow turning while moving
        if (body.speed > 0) {
            if (left) {
                this.sprite.setAngularVelocity(-ACCELERATION / 2);
            } else if (right) {
                this.sprite.setAngularVelocity(ACCELERATION / 2);
            } else {
                this.sprite.setAngularVelocity(0);
            }
        } else {
            this.sprite.setAngularVelocity(0);
        }
    }

    public getSpeed(): number {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        return body.speed;
    }

    public setThrottle(throttle: number) {
        this.throttle = throttle;
    }

    public getThrottle(): number {
        return this.throttle;
    }

    public getPosition(): { x: number; y: number; } {
        return { x: this.sprite.x, y: this.sprite.y };
    }

    public static init(props: WoodenBoatProps) {
        this.#instance.controlPort = props.controlPort;
        this.#instance.sprite = props.scene.physics.add.image(63000, 84000, 'boat');
        // this.#instance.sprite.x = 100;
        // this.#instance.sprite.y = 100;
        // this.controlPort = props.controlPort;
        // this.sprite = props.scene.physics.add.image(0, 0, 'boat');
        // Make the collider ellipse shaped
        this.#instance.sprite.body?.setCircle(6, 8, 9);
        // this.sprite.body?.setCircle(6, 8, 9);
        // this.sprite.setSize(16, 16);

        this.#instance.sprite.setMaxVelocity(150);
        // this.sprite.setMaxVelocity(150)
        this.#instance.sprite.setDrag(13);
        // this.sprite.setDrag(13)
        // // center the sprite's anchor point
        // this.#instance.sprite.setOrigin(0.5, 0.5);
        // this.sprite.setOrigin(0.5, 0.5)
        // Scale the sprite up
        this.#instance.sprite.scaleX = 6;
        // this.sprite.scaleX = 6;
        this.#instance.sprite.scaleY = 8;
        // this.sprite.scaleY = 8;
    }

    public static get instance() {
        if (!WoodenBoat.#instance) {
            WoodenBoat.#instance = new WoodenBoat();
        }
        return WoodenBoat.#instance;
    }
}