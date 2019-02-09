var SpaceRider = SpaceRider || {};

SpaceRider.GameOver = {

  create: function () {

    this.ambience = this.add.audio('ambience');
    this.ambience.play();
    this.space = this.add.tileSprite(
      0,
      0,
      this.game.world.width,
      this.game.world.height,
      'space'
    );
    // moving the background
    this.space.autoScroll(0, 25);

    gameOver = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'spacefont', 'GAME OVER !', 40);

    gameOver.anchor.setTo(0.5);

  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      s = 0;
      this.state.start('GameState');
    }
  }

}