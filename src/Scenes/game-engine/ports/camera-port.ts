import { IPhysicsObject } from "./physics-port";

export interface CameraPort {
    update(delta: number): void;
    setFollow(follow: IPhysicsObject): void;
    setBackGroundColor(color: number): void;
}