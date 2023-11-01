import { Boat } from "./boat-port";
import { ControlPort } from "../controls/control-port";
import { IPhysicsObject } from "../game-engine/ports/physics-port";

export interface WoodenBoatProps {
    controlPort: ControlPort;
    physicsObject: IPhysicsObject;
}

export class WoodenBoat implements Boat {
    public physicsObject: IPhysicsObject;

    public constructor(private props: WoodenBoatProps) {
        this.physicsObject = props.physicsObject;
        this.physicsObject.setMaxVelocity(50)
        this.physicsObject.setDrag(13)
    }

    update(delta: number) {
        const { left, right, up } = this.props.controlPort;
        const ACCELERATION = 200;
        if (up) {
            // rotate 90 degrees counter-clockwise
            const velX = Math.cos(this.physicsObject.getRotation()) * ACCELERATION;
            const velY = Math.sin(this.physicsObject.getRotation()) * ACCELERATION;
            this.physicsObject.setVelocity(velX, velY);
        } else {
            this.physicsObject.setAcceleration(0, 0);
        }
        // Only allow turning while moving
        if (this.physicsObject.getSpeed() > 0) {
            if (left) {
                this.physicsObject.setAngularVelocity(-ACCELERATION / 8);
            } else if (right) {
                this.physicsObject.setAngularVelocity(ACCELERATION / 8);
            } else {
                this.physicsObject.setAngularVelocity(0);
            }
        } else {
            this.physicsObject.setAngularVelocity(0);
        }
    }

    public getSpeed(): number {
        return this.physicsObject.getSpeed()
    }
}