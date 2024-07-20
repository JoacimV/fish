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
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter = {} as Phaser.GameObjects.Particles.ParticleEmitter;

    private constructor() { }

    update(delta: number) {
        const { left, right } = this.controlPort;
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        const ACCELERATION = 50;
        if (this.targetThrottle > 0) {
            this.emitter.emitting = true;
            // Make particles go in the opposite direction of the boat
            // this.emitter.speed( -body.speed,  -body.speed);
            this.emitter.angle = this.sprite.angle - 180;
            // this.emitter.setParticleSpeed(-body.velocity.x, -body.velocity.y);
            this.throttle = Phaser.Math.Linear(this.throttle, this.targetThrottle, delta / 2000); // Linear interpolation
            // rotate 90 degrees counter-clockwise
            const velX = Math.cos(this.sprite.rotation) * ACCELERATION * this.throttle;
            const velY = Math.sin(this.sprite.rotation) * ACCELERATION * this.throttle;
            this.sprite.setVelocity(velX, velY);
        } else {
            this.sprite.setAcceleration(0, 0);
            this.throttle = 0;
            this.emitter.emitting = false;
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

        if (this.emitter) {
            // Set the emitter's position to the boat's rear end
            this.emitter.x = this.sprite.x - Math.cos(this.sprite.rotation) * 15;
            this.emitter.y = this.sprite.y - Math.sin(this.sprite.rotation) * 15;
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
        this.#instance.sprite.setDrag(13);
        this.#instance.emitter = this.#instance.sprite.scene.add.particles(500, 840, 'elec3', {
            lifespan: 100,
            speed: { min: 100, max: 150 },
            scale: { start: 0.03, end: 0 },
            angle: { min: 10, max: -10 },
            // maxParticles:10,
            blendMode: 'ADD',
            emitting: true,
            accelerationX: -100,
            accelerationY: -100,

        });
    }

    public static get instance() {
        if (!WoodenBoat.#instance) {
            WoodenBoat.#instance = new WoodenBoat();
        }
        return WoodenBoat.#instance;
    }
}