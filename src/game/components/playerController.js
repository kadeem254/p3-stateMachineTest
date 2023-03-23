import StateMachine from "./statemachine";

const playerActions = {
  jump: false,
  left: false,
  right: false,
};

export default class PlayerController {
  constructor(
    scene = new Phaser.Scene(),
    sprite = new Phaser.Physics.Arcade.Sprite(),
    actions
  ) {
    this.sprite = sprite;
    this.addAnimations();
    if (scene instanceof Phaser.Scene == false) {
      throw new Error("Scene is not of type: Phaser.Scene");
    }
    this.scene = scene;

    this.playerControls = this.scene.input.keyboard.addKeys(
      "A,D,LEFT,RIGHT,W,SPACE,UP,E"
    );

    this.stateMachine = new StateMachine(this);
    this.stateMachine
      .addState("idle", {
        onEnter: this.onEnter_Idle.bind(this),
        onUpdate: this.onUpdate_Idle.bind(this),
      })
      .addState("walk", {
        onEnter: this.onEnter_Walk.bind(this),
        onUpdate: this.onUpdate_Walk.bind(this),
      })
      .addState("jump", {
        onEnter: this.onEnter_Jump.bind(this),
        onUpdate: this.onUpdate_Jump.bind(this),
      })
      .addState("fall", {
        onEnter: this.onEnter_Fall.bind(this),
        onUpdate: this.onUpdate_Fall.bind(this),
      })
      .setState("idle");
  }

  update(time, delta) {
    this.stateMachine.update(delta);
    return;
  }

  addAnimations() {
    // idle animation
    this.sprite.anims.create({
      key: "player_idle",
      repeat: -1,
      frameRate: 10,
      frames: this.sprite.anims.generateFrameNumbers("pinkie", {
        start: 0,
        end: 3,
      }),
    });

    // walk animation
    this.sprite.anims.create({
      key: "player_walk",
      repeat: -1,
      frameRate: 10,
      frames: this.sprite.anims.generateFrameNumbers("pinkie", {
        start: 8,
        end: 13,
      }),
    });

    // player jump
    this.sprite.anims.create({
      key: "player_jump",
      frameRate: 10,
      frames: this.sprite.anims.generateFrameNumbers("pinkie", {
        start: 24,
        end: 28,
      }),
    });

    // player jump
    this.sprite.anims.create({
      key: "player_fall",
      frameRate: 10,
      frames: this.sprite.anims.generateFrameNumbers("pinkie", {
        start: 28,
        end: 30,
      }),
    });

    return;
  }

  // IDLE FUNCTIONS
  onEnter_Idle() {
    this.sprite.anims.play("player_idle");
    return;
  }

  onUpdate_Idle() {
    // check if moving horizontally
    let horizontal = this.checkHorizontalMovement();
    if (horizontal == 1 || horizontal == -1) {
      this.stateMachine.setState("walk");
    }

    if (this.checkJump() == 1) {
      this.stateMachine.setState("jump");
    }

    if (!this.sprite.body.onFloor()) {
      this.stateMachine.setState("fall");
    }

    return;
  }

  // WALK FUNCTIONS
  onEnter_Walk() {
    console.log("entered walk state");
    this.sprite.anims.play("player_walk");
    return;
  }

  onUpdate_Walk() {
    let speed = 32;

    let horizontal = this.checkHorizontalMovement();

    switch (horizontal) {
      case 1:
        this.sprite.flipX = false;
        break;
      case -1:
        this.sprite.flipX = true;
        break;
      default:
        this.stateMachine.setState("idle");
        break;
    }

    this.sprite.setVelocityX(speed * horizontal);

    if (this.checkJump() == 1) {
      this.stateMachine.setState("jump");
    }

    return;
  }

  // JUMP FUNCTIONS
  onEnter_Jump() {
    console.log("enter jump state");
    this.sprite.anims.play("player_jump");

    return;
  }

  onUpdate_Jump() {
    let speed = 32;

    let horizontal = this.checkHorizontalMovement();

    switch (horizontal) {
      case 1:
        this.sprite.flipX = false;
        break;
      case -1:
        this.sprite.flipX = true;
        break;
      default:
        break;
    }

    speed *= horizontal;
    this.sprite.setVelocityX(speed);

    const jumpStart = (anim, frame) => {
      if (frame.index <= 2) return;

      this.sprite.off(Phaser.Animations.Events.ANIMATION_UPDATE, jumpStart);

      if (this.sprite.body.onFloor()) {
        this.sprite.setVelocityY(-40);
      }

      return;
    };

    this.sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, jumpStart, this);

    if (this.sprite.body.velocity.y > 0) {
      if (this.sprite.body.onFloor()) {
        this.stateMachine.setState("idle");
      } else {
        this.stateMachine.setState("fall");
      }
    }

    return;
  }

  // FALL FUNCTIONS
  onEnter_Fall() {
    console.log("enter fall state");
    this.sprite.anims.play("player_fall");
    return;
  }

  onUpdate_Fall() {
    let speed = 32;
    let horizontal = this.checkHorizontalMovement();

    switch (horizontal) {
      case 1:
        this.sprite.flipX = false;
        break;
      case -1:
        this.sprite.flipX = true;
        break;
      default:
        break;
    }

    this.sprite.setVelocityX(speed * horizontal);

    if (this.sprite.body.onFloor()) {
      this.sprite.setFrame(31);
      this.stateMachine.setState("idle");
    }

    return;
  }

  // COMMON CHECKS
  /**Returns either 0, 1 or -1 depending on keys pressed */
  checkHorizontalMovement() {
    let directions = {
      left: false,
      right: false,
    };

    if (this.playerControls["A"].isDown) {
      directions.left = true;
    }

    if (this.playerControls["D"].isDown) {
      directions.right = true;
    }

    if (
      (!directions.left && !directions.right) ||
      (directions.left && directions.right)
    ) {
      return 0;
    }

    if (directions.left) return -1;

    // directions.right == true
    return 1;
  }

  /**Returns 1 if jump button is pressed */
  checkJump() {
    if (this.playerControls["SPACE"].isDown) {
      return 1;
    }

    return 0;
  }
}
