import { Scene } from 'phaser'
import { Boat } from './boats/boat-port'
import { ControlPort } from './controls/control-port';
import { CameraPort } from './camera/camera-port';
import { WoodenBoat } from './boats/wooden-boat';

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
    this.boat = new WoodenBoat({ controlPort: this.controlPort, scene: this.scene });
    this.cameraPort.setFollow(this.boat.sprite);
    // remove the default camera
    this.scene.cameras.remove(this.scene.cameras.main);
    this.scene.cameras.addExisting(this.cameraPort.camera);
    // Create a sprite at the center of the screen using the 'logo' image.
    const island = this.scene.physics.add.sprite(this.scene.cameras.main.centerX + 100, this.scene.cameras.main.centerY + 100, 'boast');
    // Make island static
    island.setImmovable(true);
    // Draw a rectangle around the island
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0xffffff);
    graphics.strokeRect(island.x - island.width / 2, island.y - island.height / 2, island.width, island.height);
    // Add collision detection between boat and island
    // this.physics.add.collider(this.boat.sprite, island);
  }

  update(time: number, delta: number) {
    this.boat.update(delta);
    this.cameraPort.update(delta);
    // UI

  }
}
