class Gun {
  magazine = [];
  bullets = 5;
  speed = 3;

  constructor(playerPos, width, height, color) {
    this.xPos = playerPos[0] || null;
    this.yPos = playerPos[1] || null;
    this.width = width || 0;
    this.height = height || 0;
    this.color = color || { R: 0, G: 0, B: 0 };
  }

  holdGun = function (playerPos, mouseX, mouseY) {
    let angle = Math.atan2(mouseX - playerPos[0], -mouseY + playerPos[1]);

    push();
    translate(playerPos[0], playerPos[1]);
    rotate(angle);
    fill(this.color.R, this.color.G, this.color.B);
    rect(10, -10, this.width, this.height);
    pop();
  };

  shoot = function (playerPos, mouseX, mouseY) {
    const theta = Math.atan2(mouseY - playerPos[1], mouseX - playerPos[0]); // Finds angle btwn player and mouse position
    const bulletVel = {
      x: Math.cos(theta) * this.speed,
      y: Math.sin(theta) * this.speed,
    };

    if (this.bullets > 0) {
      this.magazine.push(
        new Bullet(playerPos[0], playerPos[1], bulletVel.x, bulletVel.y)
      );
      this.bullets--;
    }
  };

  updateBullet = function () {
    for (let bullet = 0; bullet < this.magazine.length; bullet++) {
      this.magazine[bullet].yPos += this.magazine[bullet].yVel;
      this.magazine[bullet].xPos += this.magazine[bullet].xVel;

      noStroke();
      fill(0);
      circle(
        this.magazine[bullet].xPos,
        this.magazine[bullet].yPos,
        this.magazine[bullet].radius
      );
    }
  };
}
