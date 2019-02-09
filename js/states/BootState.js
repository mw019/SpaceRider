var SpaceRider = SpaceRider || {};

SpaceRider.BootState = {
  init: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  preload: function () {
    this.load.image('start', 'assets/img/start.png');
    this.load.image('loadBar', 'assets/img/bar.png');
    this.load.image('logo', 'assets/img/logo.png')
    this.load.audio('jump', ['assets/sounds/jump.mp3', 'assets/sounds/jump.ogg']);
  },
  create: function () {
    this.game.stage.backgroundColor = '#000b2e';

    this.state.start('Preload');
  }
}