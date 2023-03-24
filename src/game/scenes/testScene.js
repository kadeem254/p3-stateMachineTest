import pinkie from "../assets/pinkie_spritesheet.png";
import Player from "../components/player";
import PlayerController from "../components/playerController";

import fire_01_json from "../data/fire.json";
import fire_01_image from "../assets/fire.png";

import dustEffects from "../assets/dustEffects_spritesheet.png";
import VfxEffect from "../components/vfxEffect";


export default class TestScene extends Phaser.Scene {
  constructor() {
    super("testScene");
    return this;
  }

  /* ######################################## */
  /* CORE METHODS: preload, create and upload */
  /* ######################################## */

  preload() {
    this.load.aseprite( "flame", fire_01_image, fire_01_json );
    this.load.spritesheet("pinkie", pinkie, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("dustEffects", dustEffects, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // temporary fire aseprite test
    let flameOn = this.anims.createFromAseprite("flame","burn");
    flameOn[0].repeat = -1;
    this.add.sprite( 150, 150 ).play("burn");

    // Particles
    this.dustEffectsGroup = this.add.group({
      classType: VfxEffect,
    });
    this.anims.create({
      key: "dustEffect_jump",
      frames: this.anims.generateFrameNames( "dustEffects", {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: 0
    });

    // Player
    this.obj_player = new Player( this, 100, 150, "pinkie", 0 );
    this.obj_player.setGravityY( 80 );
    this.playerController = new PlayerController( this, this.obj_player );
  }

  update( time, delta) {
    this.playerController.update( time, delta );
    return;
  }


}
