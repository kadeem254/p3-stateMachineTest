import pinkie from "../assets/pinkie_spritesheet.png";
import Player from "../components/player";
import PlayerController from "../components/playerController";

export default class TestScene extends Phaser.Scene {
  constructor() {
    super("testScene");
    return this;
  }

  /* ######################################## */
  /* CORE METHODS: preload, create and upload */
  /* ######################################## */

  preload() {
    this.load.spritesheet("pinkie", pinkie, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.obj_player = new Player( this, 100, 150, "pinkie", 0 );

    this.playerController = new PlayerController( this, this.obj_player );
  }

  update( time, delta) {
    this.playerController.update( time, delta );
    return;
  }


}
