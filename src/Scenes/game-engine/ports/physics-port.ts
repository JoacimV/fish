
export interface IPhysicsObject {
    setDrag(drag: number): void;
    setMaxVelocity(maxVelocity: number): void;
    setVelocity(x: number, y: number): void;
    setAcceleration(x: number, y: number): void;
    setAngularVelocity(angularVelocity: number): void;
    getSpeed(): number;
    getRotation(): number;

}

export interface PhysicsPort {
    create(props: { image: string, name: string }): IPhysicsObject;
}