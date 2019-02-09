var SpaceRider = SpaceRider || {};

SpaceRider.Enemy = function (game, x, y, key, health) {
  Phaser.Sprite.call(this, game, x, y, key);

  this.anchor.setTo(0.5);
  this.health = health;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

SpaceRider.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
SpaceRider.Enemy.prototype.constructor = SpaceRider.Enemy;

SpaceRider.Enemy.prototype.update = function () {
  if (this.x < 0.05 * this.game.world.width) {
    this.x = 0.05 * this.game.world.width + 2;
    this.body.velocity.x *= -1;
  } else if (this.x > 0.95 * this.game.world.width) {
    this.x = 0.95 * this.game.world.width - 2;
    this.body.velocity.x *= -1;
  }

  if (this.top > this.game.world.height) {
    this.kill();
  }
};

SpaceRider.Enemy.prototype.damage = function (amount) {
  Phaser.Sprite.prototype.damage.call(this, amount);

  if (this.health <= 0) {
    var emitter = this.game.add.emitter(this.x, this.y, 100);
    emitter.makeParticles('particle');
    emitter.minParticleSpeed.setTo(-100, -100);
    emitter.maxParticleSpeed.setTo(100, 100);
    emitter.gravity = 0;
    emitter.start(true, 500, null, 100);
  }
};

// SpaceRider.Enemy.prototype.reset = function (x, y, health, key, scale, speedX, speedY) {
//   Phaser.Sprite.prototype.reset.call(this, x, y, health);

//   this.loadTexture(key);
//   this.scale.setTo(scale);
//   this.body.velocity.x = speedX;
//   this.body.velocity.y = speedY;
// };