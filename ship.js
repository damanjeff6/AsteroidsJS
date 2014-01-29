(function (root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var Ship = Asteroids.Ship = function (pos){
    Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR)
    this.dir = Math.PI * 1/4;
  };

  Ship.COLOR = "blue";
  Ship.RADIUS = 12;
  Ship.ACCEL = 0.1;
  Ship.IMG = new Image();
  Ship.IMG.src = 'ship.png';

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0] * Ship.ACCEL;
    this.vel[1] += impulse[1] * Ship.ACCEL;
  };

  Ship.prototype.fireBullet = function () {
    var speed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    var dir = [this.vel[0] / speed, this.vel[1] / speed];

    return new Asteroids.Bullet(this.pos.slice(), dir);
  }

  Ship.prototype.draw = function (ctx) {
    ctx.drawImage(Ship.IMG,
       this.pos[0] - 15,
       this.pos[1] - 15);
  }

})(this);