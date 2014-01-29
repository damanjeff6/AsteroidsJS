(function (root){
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var Bullet = Asteroids.Bullet = function (pos, dir) {
    var vel = [dir[0] * Bullet.SPEED, dir[1] * Bullet.SPEED]

    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  }

  Bullet.RADIUS = 2;
  Bullet.COLOR = "red";
  Bullet.SPEED = 5;

  Bullet.inherits(Asteroids.MovingObject);


})(this);