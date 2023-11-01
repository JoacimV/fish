import Phaser from 'phaser'
import './style.css'
import { OceanSceneStack } from './Scenes/ocean-scene-stack';

let config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'app',
  pixelArt: true,
  scene: [OceanSceneStack],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }

}

new Phaser.Game(config)