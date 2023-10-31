import { Boat, Vector2D } from "./boat-port";
import { GameObjects } from 'phaser';
import { ControlPort } from "../controls/control-port";

export interface WoodenBoatProps {
    app: Phaser.Scene;
    controlPort: ControlPort;
}

export class WoodenBoat implements Boat {
    public sprite: Phaser.Physics.Arcade.Image;
    public velocity: Vector2D;
    text: GameObjects.Text;

    public constructor(private props: WoodenBoatProps) {
        const { app } = props;
        this.velocity = { x: 0, y: 0 }
        this.sprite = app.physics.add.image(0, 0, 'boat');
        // Rotate image 90 degrees so it's facing right
        this.sprite.setMaxVelocity(50)
        this.sprite.setDrag(13)

        // // center the sprite's anchor point
        this.sprite.setOrigin(0.5, 0.5)
        // move the sprite to the center of the screen       
        this.sprite.x = app.cameras.main.centerX;
        this.sprite.y = app.cameras.main.centerY;
        // Scale the sprite up
        this.sprite.scaleX = 3;
        this.sprite.scaleY = 3;
        this.text = app.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' } as any);
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
                this.sprite.setAngularVelocity(-ACCELERATION / 16);
            } else if (right) {
                this.sprite.setAngularVelocity(ACCELERATION / 16);
            } else {
                this.sprite.setAngularVelocity(0);
            }
        }
        this.text.setText(`Speed: ${body.speed}`);
    }

    multiplyScalar(vector: Vector2D, scalar: number) {
        vector.x *= scalar;
        vector.y *= scalar;
    }
}