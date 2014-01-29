(function (root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  Function.prototype.inherits = function(parent){
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    this.prototype = new Surrogate();
  }

  var Asteroid = Asteroids.Asteroid = function (pos, vel){
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "white";
  Asteroid.RADIUS = 14;
  Asteroid.MAXSPEED = 5;
  Asteroid.IMG = new Image();
  Asteroid.IMG.src = 'asteroid.png'

  Asteroid.randomAsteroid = function(dimX, dimY){
    var position = [Math.random() * dimX, Math.random() * dimY];
    var velocity = Asteroid.randomVec();
    return new Asteroid(position, velocity);
  };

  Asteroid.randomVec = function() {
    var speed = Math.random() * Asteroid.MAXSPEED;
    var direction = Math.random() * 2 * Math.PI;
    return [ speed * Math.cos(direction), speed * Math.sin(direction) ];
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.drawImage(Asteroid.IMG, this.pos[0] - 14, this.pos[1] - 14);
  }

})(this);

