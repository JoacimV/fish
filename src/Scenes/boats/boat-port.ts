import { IPhysicsObject } from "../game-engine/ports/physics-port";

export interface Boat {
    physicsObject: IPhysicsObject;
    update(delta: number): void;
    getSpeed(): number;
}