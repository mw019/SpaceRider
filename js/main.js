var SpaceRider = SpaceRider || {};

SpaceRider.game = new Phaser.Game('100%', '100%', Phaser.AUTO);
var playerHealth;
var scoreText;
var s = 0;
var gameOver;
var enemytimer;
var g;
SpaceRider.game.state.add('Preload', SpaceRider.Preload);
SpaceRider.game.state.add('GameState', SpaceRider.GameState);
SpaceRider.game.state.add('BootState', SpaceRider.BootState);
SpaceRider.game.state.add('MainMenu', SpaceRider.MainMenu);
SpaceRider.game.state.add('GameOver', SpaceRider.GameOver);

SpaceRider.game.state.start('BootState');