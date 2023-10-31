import Phaser from 'phaser'

import { Boat } from './boat-port'
import { WoodenBoat } from './wooden-boat';


export default class Gameplay extends Phaser.Scene {
  private boat: Boat = {} as Boat;
  preload() {
    this.load.image('boat', './boat.png')
  }

  create() {
    console.log('created gameplay scene')
    // Set background color to dark blue
    this.cameras.main.setBackgroundColor(0x000066);
    this.boat = new WoodenBoat(this);
    // Create a sprite at the center of the screen using the 'logo' image.
    const island = this.physics.add.sprite(this.cameras.main.centerX + 100, this.cameras.main.centerY + 100, 'boast');
    // Make island static
    island.setImmovable(true);

    // Draw a rectangle around the island
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff);
    graphics.strokeRect(island.x - island.width / 2, island.y - island.height / 2, island.width, island.height);
    // Add collision detection between boat and island
    this.physics.add.collider(this.boat.sprite, island);

  }

  update(time: number, delta: number) {
    this.boat.update(delta);
  }
}
