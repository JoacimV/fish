import Phaser from 'phaser'
import './style.css'
import { SceneHandler } from './Scenes/scene-handler';
import { UIScene } from './Scenes/ui-scene';

let config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'app',
  pixelArt: true,
  seed: ['joacim'],
  scene: [SceneHandler, UIScene],
  powerPreference: 'high-performance',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { x: 0, y: 0 }
    }
  }

}

new Phaser.Game(config)