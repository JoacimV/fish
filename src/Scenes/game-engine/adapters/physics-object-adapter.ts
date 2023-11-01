import { IPhysicsObject } from "../ports/physics-port";

export class PhysicsObject implements IPhysicsObject {
    private physicsBase: Phaser.Physics.Arcade.Body;
    public constructor(physicsBase: Phaser.Physics.Arcade.Body) {
        this.physicsBase = physicsBase;
    }

    setDrag(drag: number): void {
        this.physicsBase.setDrag(drag);
    }
    setMaxVelocity(maxVelocity: number): void {
        this.physicsBase.setMaxVelocity(maxVelocity);
    }

    setVelocity(x: number, y: number): void {
        this.physicsBase.setVelocity(x, y);
    }
    setAcceleration(x: number, y: number): void {
        this.physicsBase.setAcceleration(x, y);
    }
    setAngularVelocity(angularVelocity: number): void {
        this.physicsBase.setAngularVelocity(angularVelocity);
    }

    getSpeed(): number {
        return this.physicsBase.speed;
    }
    getRotation(): number {
        return this.physicsBase.rotation;

    }

}