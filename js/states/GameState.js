var SpaceRider = SpaceRider || {};

SpaceRider.GameState = {
  init: function () {


    this.bulletSpeed = -300;
    this.shipSpeed = 300;

  },

  preload: function () {

  },

  // main functionality of the game, executes after the preload state
  create: function () {
    // add space background
    this.space = this.add.tileSprite(
      0,
      0,
      this.game.world.width,
      this.game.world.height,
      'space'
    );
    // moving the background
    this.space.autoScroll(0, 25);
    this.ambience = this.add.audio('ambience');
    this.ambience.play();
    // add player/ship
      this.spaceship = this.add.sprite(
      this.game.world.centerX,
      this.game.world.height - 80,
      'spaceship'
    );
    this.spaceship.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.spaceship);
    this.spaceship.body.collideWorldBounds = true;
    this.spaceship.health = 5;
    this.game.camera.follow(this.spaceship);


    this.generateBullets();
    this.fireTimer = this.game.time.events.loop(3000 / 5, this.createBullets, this);

    this.game.time.events.repeat(Phaser.Timer.SECOND * 6, 100, hello, this);

    function hello() {
    this.generateEnemies();
    }
    this.explosion = this.add.audio('explosion');
    // this.ambience.play();


    // this.fireEnemies = this.game.time.events.loop(1000 / 100, this.createEnemy, this);

    var h = this.spaceship.health;
    playerHealth = this.game.add.bitmapText(this.game.world.width - 100, 10, 'spacefont', '' + this.spaceship.health + '%', 30);
    playerHealth.render = function () {
      h = --h;
      playerHealth.text = 'lIVES: ' + h + '%';
    };
    playerHealth.render();

    scoreText = this.game.add.bitmapText(0, 10, 'spacefont', '', 30);
    scoreText.render = function () {

      scoreText.text = 'Score: ' + s + '%';
    };
    scoreText.render();
  },

  update: function () {

    // 
    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.damageEnemy, null, this);

    this.game.physics.arcade.overlap(this.spaceship, this.enemies, this.killSpaceShip, null, this);

    // resetting the ship's motion
    this.spaceship.body.velocity.x = 0;

    // activepointer returns whether the screen has any user input
    if (this.game.input.activePointer.isDown) {
      var targetX = this.game.input.activePointer.position.x;
      // game.input.active.position gives co-ordinates of the touch 

      var direction = targetX >= this.game.world.centerX ? 1 : -1;

      this.spaceship.body.velocity.x = direction * this.shipSpeed;


      var bank;
      var Acceleration = 300;
      //var Drag = 400;
      this.spaceship.body.acceleration = Acceleration;

      bank = this.spaceship.body.velocity.x / this.shipSpeed;
      this.spaceship.scale.x = 1 - Math.abs(bank) / 5;
      this.spaceship.angle = bank * 10;
      if (!direction) {
        this.spaceship.reset();
      }

    }
  },

  // generate enemy bullets by using a group
  generateBullets: function () {
    this.bullets = this.add.group();
    //enable physics in all bullets
    this.bullets.enableBody = true;
  },

  // create a bullet and add it to the group
  createBullets: function () {
    // check if there exists any bullet 
    var bullet = this.bullets.getFirstExists(false);

    if (!bullet) {
      bullet = new SpaceRider.ShipBullet(this.game, this.spaceship.x, this.spaceship.top);
      this.bullets.add(bullet);
    } //else {
    // reset position
    // bullet.reset(this.spaceship.x, this.spaceship.top);
    //}
    // set velocity
    bullet.body.velocity.y = this.bulletSpeed;

    var bulletOffset = 20 * Math.sin(this.game.math.degToRad(this.spaceship.angle));
    bullet.reset(this.spaceship.x + bulletOffset, this.spaceship.y);
    bullet.angle = this.spaceship.angle;
    this.game.physics.arcade.velocityFromAngle(bullet.angle - 90, this.bulletSpeed, bullet.body.velocity);
    bullet.body.velocity.x += this.spaceship.body.velocity.x;

    if (!bullet) {
      bullet = new SpaceRider.ShipBullet(this.game, this.spaceship.x, this.spaceship.top);
      this.bullets.add(bullet);
    } else {
      // reset position
      bullet.reset(this.spaceship.x, this.spaceship.top);
    }
    // set velocity
    bullet.body.velocity.y = this.bulletSpeed;
  },


  generateEnemies: function () {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.enemies.damageAmount = 1;


    this.enemy = new SpaceRider.Enemy(this.game, 100, 0, 'enemy1', 4);
    this.enemies.add(this.enemy);
    this.enemy.body.velocity.x = 100;
    this.enemy.body.velocity.y = 200;

    this.enemy = new SpaceRider.Enemy(this.game, 600, 0, 'enemy2', 2);
    this.enemies.add(this.enemy);
    this.enemy.body.velocity.x = 40;
    this.enemy.body.velocity.y = 200;

    this.enemy = new SpaceRider.Enemy(this.game, 300, 0, 'rock', 2);
    this.enemies.add(this.enemy);
    this.enemy.body.velocity.x = 50;
    this.enemy.body.velocity.y = 200;

    this.enemy = new SpaceRider.Enemy(this.game, this.game.world.centerX,
    this.game.world.height - 500, 'rock', 4);
    this.enemies.add(this.enemy);
    this.enemy.body.velocity.x = 50;
    this.enemy.body.velocity.y = 200;

  },
  damageEnemy: function (bullet, enemy) {
    enemy.damage(2);

    if (enemy.health == 0) {
      s += 10;
      scoreText.render();
      this.explosion.play();

    }
    bullet.kill();

  },

  killSpaceShip: function (spaceship, enemy) {
    enemy.kill();

    //score += 10;
    spaceship.damage(1);
    // shakes the world camera with intensity and for a specified time
    this.game.camera.shake(0.001, 500);
    playerHealth.render();
    //spaceship.kill();

    if (this.spaceship.health == 0) {
      // this.game.state.start('GameState');
      this.game.state.start('GameOver');
    }

  }
};