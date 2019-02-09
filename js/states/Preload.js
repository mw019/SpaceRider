var SpaceRider = SpaceRider || {};

SpaceRider.Preload = {
  preload: function () {

    this.start = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'start');

    this.start.anchor.setTo(0.5);
    this.add.tween(this.start).from({
      y: -200
    }, 2000, Phaser.Easing.Bounce.Out, true);
  },

  create: function () {


  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      this.state.start('MainMenu');
    }
  }
}