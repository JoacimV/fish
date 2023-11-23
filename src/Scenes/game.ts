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
    const islandEdges = new IslandGenerator(this.scene).generateIsland(0, 90, 15, 10);
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
    // Add a customer cursor
    this.scene.input.setDefaultCursor('url(bobber.png), pointer');
    // Get cursor position
    const cursor = this.scene.input.activePointer;
    // log what type of tile the cursor is over
    // if cursor is clicked
    if (cursor.isDown) {
      // Draw a image at the cursor position
      const boatImage = this.scene.add.sprite(cursor.worldX, cursor.worldY, 'animatedBobber');
      // Cycle through the animation
      this.scene.anims.create({
        key: 'bobber',
        frames: this.scene.anims.generateFrameNumbers('animatedBobber', { start: 0, end: 3 }),
        frameRate: 2,
        repeat: -1
      });
      boatImage.anims.play('bobber', true);
      // Connect a line between the image and the boat      
      const line = this.scene.add.graphics();
      line.lineStyle(1, 0xffffff, 1);
      line.lineBetween(boatImage.x, boatImage.y, this.boat.sprite.x, this.boat.sprite.y);
    }

    // UI
  }
}
