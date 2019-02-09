var SpaceRider = SpaceRider || {};

SpaceRider.MainMenu = {
  preload: function () {

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.loadBar = this.add.sprite(this.game.world.centerX,
      this.game.world.height - 200,
      'loadBar');
    this.loadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.loadBar);

    //this.load.image('start', 'assets/img/start.png');
    // loading game assets prior to starting the game
    this.load.image('spaceship', 'assets/img/f_ship.png');
    this.load.image('space', 'assets/img/space.png');
    this.load.image('enemy1', 'assets/img/enemy-blue.png');
    this.load.image('bullet', 'assets/img/bullet.png');
    this.load.image('enemy2', 'assets/img/enemy-green.png');
    this.load.image('fuel', 'assets/img/fuel.png');
    this.load.image('rock', 'assets/img/rock.png');
    this.load.image('particle', 'assets/img/particle.png');
    this.load.bitmapFont('spacefont', 'assets/img/spacefont/spacefont.png', 'assets/img/spacefont/spacefont.xml');
    this.load.audio('ambience', ['assets/sounds/space-ambience.mp3', 'assets/sounds/space-ambience.ogg']);
    this.load.audio('explosion', ['assets/sounds/explosion.mp3', 'assets/sounds/explosion.ogg']);

  },

  create: function () {

  },
  update: function () {
    if (this.game.input.activePointer.justPressed()) {
      this.state.start('GameState');
    }
  }
}