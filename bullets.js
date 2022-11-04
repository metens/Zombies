class Bullet {
  constructor(xPos, yPos, xVel, yVel, radius) {
    this.position = new p5.Vector(xPos, yPos);
    // this.xPos = xPos;
    // this.yPos = yPos;
    this.velocity = new p5.Vector(xVel || 0, yVel || 0);
    // this.xVel = xVel || 0;
    // this.yVel = yVel || 0;
    this.radius = radius || 10;
  }
}
