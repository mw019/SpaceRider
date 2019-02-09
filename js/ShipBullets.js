var SpaceRider = SpaceRider || {};

SpaceRider.ShipBullet = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullet');

  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

};

SpaceRider.ShipBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceRider.ShipBullet.prototype.constructor = SpaceRider.ShipBullet;