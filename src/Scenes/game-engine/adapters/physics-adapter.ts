import { IPhysicsObject, PhysicsPort } from "../ports/physics-port";
import { PhysicsObject } from "./physics-object-adapter";

export class PhysicsAdapter implements PhysicsPort {
    private physics: Phaser.Physics.Arcade.ArcadePhysics;

    public constructor(scene: Phaser.Scene) {
        this.physics = scene.physics;
    }

    public create(props: { image: string, name: string }): IPhysicsObject {
        const physicsBase = this.physics.add.image(0, 0, props.image);
        physicsBase.name = props.name;
        const body = physicsBase.body as Phaser.Physics.Arcade.Body;
        const physicsObject = new PhysicsObject(body);
        return physicsObject
    }
    // Add collision detection between boat and island
    // this.physics.add.collider(this.boat.sprite, island);

}