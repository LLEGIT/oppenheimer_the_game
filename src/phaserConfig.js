import EndScene from './EndScene.js';
import HouseScene from './HouseScene.js';
import MainScene from './MainScene.js';
import MenuScene from './MenuScene.js';

const config = {
  type: Phaser.AUTO,
  width: 2400,
  height:1600,
  // scene: [MenuScene, MainScene, HouseScene, EndScene],
  scene: [MainScene, HouseScene],
  parent: "game",
  fullscreenTarget: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);