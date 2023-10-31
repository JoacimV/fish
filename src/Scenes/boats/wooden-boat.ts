import { Boat } from "./boat-port";
import { ControlPort } from "../controls/control-port";

export interface WoodenBoatProps {
    controlPort: ControlPort;
    scene: Phaser.Scene;
}

export class WoodenBoat implements Boat {
    public sprite: Phaser.Physics.Arcade.Image;

    public constructor(private props: WoodenBoatProps) {
        this.sprite = this.props.scene.physics.add.image(0, 0, 'boat');
        this.sprite.setMaxVelocity(50)
        this.sprite.setDrag(13)
        // // center the sprite's anchor point
        this.sprite.setOrigin(0.5, 0.5)
        // Scale the sprite up
        this.sprite.scaleX = 3;
        this.sprite.scaleY = 3;
    }

    update(delta: number) {
        const { left, right, up } = this.props.controlPort;
        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        const ACCELERATION = 200;
        if (up) {
            // rotate 90 degrees counter-clockwise
            const velX = Math.cos(this.sprite.rotation) * ACCELERATION;
            const velY = Math.sin(this.sprite.rotation) * ACCELERATION;
            this.sprite.setVelocity(velX, velY);
        } else {
            this.sprite.setAcceleration(0, 0);
        }
        // Only allow turning while moving
        if (body.speed > 0) {
            if (left) {
                this.sprite.setAngularVelocity(-ACCELERATION / 8);
            } else if (right) {
                this.sprite.setAngularVelocity(ACCELERATION / 8);
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
}