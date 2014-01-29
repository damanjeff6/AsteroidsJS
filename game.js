(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx){
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([Game.DIM_X / 2 , Game.DIM_Y / 2]);
    this.bullets = [];
    this.fireHandler();
    this.img = new Image();
    this.img.src = 'background.jpg';
  }

  Game.DIM_X = 1100;
  Game.DIM_Y = 800;
  Game.FPS = 60;

  Game.prototype.addAsteroids = function (num) {
    for(var i = 0; i < num; i++){
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_X);
    this.ctx.drawImage(this.img, 0, -10);
    this.ship.draw(this.ctx);
    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx);
    }
    for(var i = 0; i < this.bullets.length; i++){
      this.bullets[i].draw(this.ctx);
    }
  };

  Game.prototype.step = function () {
    this.keyHandlers();
    this.ship.move();
    if(this.isOutOfBounds(this.ship)) this.loopObject(this.ship);
    for(var i = 0; i < this.asteroids.length; i++){
      var a = this.asteroids[i];
      a.move();
      if(this.isOutOfBounds(a)) this.loopObject(a);
    }
    for(var i = 0; i < this.bullets.length; i++){
      var b = this.bullets[i];
      b.move();
      if(this.isOutOfBounds(b)) this.removeBullet(i);
    }
    this.draw();
    this.checkCollisions();
  }

  Game.prototype.isOutOfBounds = function(obj) {
    return obj.pos[0] < 0 || obj.pos[0] > Game.DIM_X ||
           obj.pos[1] < 0 || obj.pos[1] > Game.DIM_Y;
  }

  Game.prototype.loopObject = function(a) {
    if(a.pos[0] > Game.DIM_X) a.pos[0] = 0;
    if(a.pos[0] < 0)          a.pos[0] = Game.DIM_X;
    if(a.pos[1] > Game.DIM_Y) a.pos[1] = 0;
    if(a.pos[1] < 0)          a.pos[1] = Game.DIM_Y;
  }

  Game.prototype.start = function () {
    var game = this;
    this.addAsteroids(5);
    this.timer = setInterval(function(){
      game.step();
    }, Math.floor(1000/Game.FPS));
  };

  Game.prototype.checkCollisions = function () {
    for(var i = 0; i < this.asteroids.length; i++){
      if (this.ship.isCollidedWith(this.asteroids[i])){
        this.stop();
      }
      for(var j = 0; j < this.bullets.length; j++){
        if (this.asteroids[i].isCollidedWith(this.bullets[j])){
          this.removeAsteroid(i);
          this.removeBullet(j);
        }
      }
    }
  };

  Game.prototype.removeAsteroid = function (index) {
    this.asteroids.splice(index, 1);
  };

  Game.prototype.removeBullet = function (index) {
    this.bullets.splice(index, 1);
  }

  Game.prototype.stop = function () {
    clearInterval(this.timer);
    alert("GAME OVER!");
  };

  Game.prototype.keyHandlers = function () {
    if(key.isPressed("w")) this.ship.power([ 0, -1]);
    if(key.isPressed("a")) this.ship.power([-1,  0]);
    if(key.isPressed("s")) this.ship.power([ 0,  1]);
    if(key.isPressed("d")) this.ship.power([ 1,  0]);
  }

  Game.prototype.fireHandler = function () {
    var game = this;

    key('space', function(){
      game.bullets.push( game.ship.fireBullet() );
    });
  };

})(this);