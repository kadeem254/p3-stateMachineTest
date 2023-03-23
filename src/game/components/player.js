export default class Player extends Phaser.Physics.Arcade.Sprite{
  constructor( scene, x, y, texture, frame ){
    super( scene, x, y, texture, frame );

    // add to scene
    this.scene.physics.world.enableBody( this, 0 );
    this.scene.add.existing( this );

    // change hitbox
    this.body.setSize( 16, 28 );
    this.body.setOffset( 8, 4 );

    this.body.setCollideWorldBounds( true );
    this.setGravityY( 40 );

    return this;
  }
}