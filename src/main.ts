import Phaser from 'phaser'
import './style.css'
import { SceneHandler } from './Scenes/scene-handler';

let config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'app',
  pixelArt: true,
  scene: [SceneHandler],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }

}

new Phaser.Game(config)