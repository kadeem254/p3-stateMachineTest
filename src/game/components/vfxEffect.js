export default class VfxEffect extends Phaser.GameObjects.Sprite{
  constructor( scene, x, y ){
    super( scene, x, y);
    this.scene.add.existing( this );
    this.on(
      Phaser.Animations.Events.ANIMATION_START,
      this.onAnimationStart,
      this
    )
    return this;
  }

  onAnimationStart(){
    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      this.disableOnAnimationEnd,
      this
    )
    return;
  }

  disableOnAnimationEnd(){
    this.off(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      this.disableOnAnimationEnd,
      this
    )

    this.setActive( false ),
    this.setVisible( false )

  }
}