import { Scene } from 'phaser'
import { Boat } from './boats/boat-port'
import { ControlPort } from './controls/control-port';
import { CameraPort } from './camera/camera-port';
import { WoodenBoat } from './boats/wooden-boat';
import { PerlinMap } from './map';

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
    // const islandEdges = new IslandGenerator(this.scene).generateIsland(0, 90, 15, 10);
    const map = PerlinMap.instance;
    const seaBed = map.seaBed;
    // Loop over the seaBed and if the value is less than 10, draw a rectangle (island). one rectangle is 10x10
    const size = 10;
    const grass = this.scene.add.group();
    const sand = this.scene.add.group();
    const water = this.scene.add.group();

    for (let i = 0; i < seaBed.length; i++) {
      for (let j = 0; j < seaBed[i].length; j++) {
        const x = i * size;
        const y = j * size;
        if (seaBed[i][j] < 18) {
          grass.add(this.scene.add.rectangle(x, y, size, size, 0x3da74b, (1 - seaBed[i][j]) / 100));
        } else if (seaBed[i][j] < 22) {
          // Sand
          sand.add(this.scene.add.rectangle(x, y, size, size, 0xf4a460, (1 - seaBed[i][j]) / 100));
        } else {
          // this.scene.add.curve
          water.add(this.scene.add.rectangle(x, y, size, size, 0x5b83fa, (1 - seaBed[i][j]) / 100));
        }
      }
    }
    // Add collision detection between boat and sand
    for (let i = 0; i < sand.getChildren().length; i++) {
      this.scene.physics.add.existing(sand.getChildren()[i], true);
    }

    // Add collision between boat and world edges
    this.scene.physics.world.setBounds(0, 0, seaBed.length * size, seaBed[0].length * size);

    this.boat = WoodenBoat.instance;
    WoodenBoat.init({ controlPort: this.controlPort, scene: this.scene });
    this.scene.physics.add.collider(this.boat.sprite, sand);
    this.boat.sprite.setCollideWorldBounds(true);
    this.cameraPort.setFollow(this.boat.sprite);
    // remove the default camera
    this.scene.cameras.remove(this.scene.cameras.main);
    this.scene.cameras.addExisting(this.cameraPort.camera);
  }

  update(time: number, delta: number) {
    this.boat.update(delta);
    // Add a customer cursor
    // this.scene.input.setDefaultCursor('url(bobber.png), pointer');
    // Get cursor position
    // const cursor = this.scene.input.activePointer;
    // log what type of tile the cursor is over
    // if cursor is clicked
    // if (cursor.isDown) {

    // // Draw a image at the cursor position
    // const boatImage = this.scene.add.sprite(cursor.worldX, cursor.worldY, 'animatedBobber');
    // // Cycle through the animation
    // this.scene.anims.create({
    //   key: 'bobber',
    //   frames: this.scene.anims.generateFrameNumbers('animatedBobber', { start: 0, end: 3 }),
    //   frameRate: 2,
    //   repeat: -1
    // });
    // boatImage.anims.play('bobber', true);
    // // Connect a line between the image and the boat      
    // const line = this.scene.add.graphics();
    // line.lineStyle(1, 0xffffff, 1);
    // line.lineBetween(boatImage.x, boatImage.y, this.boat.sprite.x, this.boat.sprite.y);
    // }
  }
}
