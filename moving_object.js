(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, vel, rad, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = rad;
    this.color = color;
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dx = this.pos[0] - otherObject.pos[0];
    var dy = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return this.radius + otherObject.radius > distance
  };

})(this);