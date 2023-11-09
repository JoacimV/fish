import { Scene } from 'phaser'
import { Boat } from './boats/boat-port'
import { ControlPort } from './controls/control-port';
import { CameraPort } from './camera/camera-port';
import { WoodenBoat } from './boats/wooden-boat';
import { IslandGenerator } from './maps/island-generator';

export interface GameplayProps {
  controlPort: ControlPort;
  cameraPort: CameraPort;
  scene: Scene;
}

export default class Gameplay {
  private boat: Boat = {} as Boat;
  private cameraPort: CameraPort;
  private controlPort: ControlPort;
  public scene: Scene;

  public constructor(props: GameplayProps) {
    this.cameraPort = props.cameraPort;
    this.controlPort = props.controlPort;
    this.scene = props.scene;
  }

  
  create() {
    const islandEdges = new IslandGenerator(this.scene).generateIslandV2(0, 90, 15, 10);
    this.boat = new WoodenBoat({ controlPort: this.controlPort, scene: this.scene });
    this.cameraPort.setFollow(this.boat.sprite);
    // remove the default camera
    this.scene.cameras.remove(this.scene.cameras.main);
    this.scene.cameras.addExisting(this.cameraPort.camera);
    // Add collision detection between boat and island
    this.scene.physics.add.collider(this.boat.sprite, islandEdges);
  }

  update(time: number, delta: number) {
    this.boat.update(delta);
    this.cameraPort.update(delta);
    // UI

  }
}
