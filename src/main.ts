import Phaser from 'phaser'
import Gameplay from './Scenes/game'
import './style.css'

let config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'app',
  pixelArt: true,
  scene: [Gameplay],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
}

const game = new Phaser.Game(config)
console.log('created game', game)