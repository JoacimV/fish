import { Boat } from './boats/boat-port'
import { ControlPort } from './controls/control-port';
import { CameraPort } from './game-engine/ports/camera-port';
import { WoodenBoat } from './boats/wooden-boat';
import { PhysicsPort } from './game-engine/ports/physics-port';

export interface GameplayProps {
  controlPort: ControlPort;
  physicsPort: PhysicsPort;
  cameraPort: CameraPort;
}

export default class Gameplay {
  private boat: Boat = {} as Boat;
  private cameraPort: CameraPort;
  private controlPort: ControlPort;
  private physicsPort: PhysicsPort;


  public constructor(props: GameplayProps) {
    const { controlPort, physicsPort, cameraPort } = props;
    this.controlPort = controlPort;
    this.physicsPort = physicsPort;
    this.cameraPort = cameraPort;
    this.create();
  }

  create() {
    // Dark blue
    this.cameraPort.setBackGroundColor(0x000066);
    this.boat = new WoodenBoat({ controlPort: this.controlPort, physicsObject: this.physicsPort.create({ image: 'boat', name: 'boat' }) });
    this.cameraPort.setFollow(this.boat.physicsObject);

  }

  update(time: number, delta: number) {
    this.boat.update(delta);
    this.cameraPort.update(delta);
  }
}
