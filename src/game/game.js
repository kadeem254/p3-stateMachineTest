import Phaser from "phaser";
import TestScene from "./scenes/testScene";

/**
 * Start the game
 * @returns 
 */
function startGame(){
  let screenExpansionFactor = 2.5;

  let game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 32*4*screenExpansionFactor,
    height: 32*3*screenExpansionFactor,

    parent: document.getElementById("game-container"),
    backgroundColor: "#272727",
    pixelArt: true,

    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
      default: "arcade",
      arcade: {
        debug: true,
      }
    },

    scene: [TestScene]
  });

  return game;
}

export {
  startGame
}