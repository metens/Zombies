class Enemy {
  max_speed = 2;
  width = 30;
  mass = 10;
  max_force = 2;
  max_avoidance_force = 3;

  constructor(x, y) {
    this.old_position = new p5.Vector(x, y);
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.steering = new p5.Vector(0, 0);

    this.lookAhead = new p5.Vector(0, 0);
    this.lookAheadR = 30; // the radius of view
    this.lookAheadD = 40; // how far to look ahead
  }

  display() {
    // display the enemy
    fill(255, 255, 0);
    circle(this.position.x, this.position.y, this.width);

    // compare the old player position (previous frame) vs the current
    // player position to know whether the enemy is moving up, down, left, or right
    this.old_position.x = this.position.x;
    this.old_position.y = this.position.y;
  }

  moveRight() {
    if (this.position.x > this.old_position.x) {
      return true;
    } else return false;
  }
  moveLeft() {
    if (this.position.x < this.old_position.x) {
      return true;
    } else return false;
  }
  moveUp() {
    if (this.position.y < this.old_position.y) {
      return true;
    } else return false;
  }
  moveDown() {
    if (this.position.y > this.old_position.y) {
      return true;
    } else return false;
  }

  getPos() {
    return [this.position.x, this.position.y];
  }

  chase(map, target) {
    // Hard pursuit:
    this.velocity = p5.Vector.sub(target.position, this.position)
      .normalize()
      .mult(this.max_speed);
    this.position.add(this.velocity);

    map.position.x = 0;
    map.position.y = 0; // reset the position of the map so
    // we can have the correct dimensions
    for (let i = 0; i < map.mapArray.length; i++) {
      for (let j = 0; j < map.mapArray[i].length; j++) {
        if (map.mapArray[i][j] === 0) {
          // A barrier
          if (
            this.position.x + this.width / 2 > map.position.x &&
            this.position.x - this.width / 2 < map.position.x + map.tileWidth &&
            this.position.y + this.width / 2 > map.position.y &&
            this.position.y - this.width / 2 < map.position.y + map.tileWidth
          ) {
            if (this.moveRight() && this.position.x < map.position.x) {
              this.position.x = map.position.x - this.width / 2;
            } else if (this.moveDown() && this.position.y < map.position.y) {
              this.position.y = map.position.y - this.width / 2;
            } else if (
              this.moveUp() &&
              this.position.y > map.position.y + map.tileHeight
            ) {
              this.position.y = map.position.y + map.tileWidth + this.width / 2;
            } else if (
              this.moveLeft() &&
              this.position.x > map.position.x + map.tileWidth
            ) {
              this.position.x = map.position.x + map.tileWidth + this.width / 2;
            }
          }
        }
        map.position.x += map.tileWidth;
      }
      map.position.x = 0;
      map.position.y += map.tileWidth;
    }
  }
}

class Map {
  tileWidth = 80;
  tileHeight = 80;
  mapArray = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ];

  constructor(x, y) {
    this.position = new p5.Vector(x, y);
  }

  display() {
    // Reset the x and y values so that the map is re-drawn
    // in the same spot after every draw call
    this.position.x = 0;
    this.position.y = 0;

    noStroke();
    // The corner of each tile starts at the corner of the screen
    for (let i = 0; i < this.mapArray.length; i++) {
      for (let j = 0; j < this.mapArray[i].length; j++) {
        if (this.mapArray[i][j] === 0) {
          // A barrier
          fill("#6d4141");
          rect(
            this.position.x,
            this.position.y,
            this.tileWidth,
            this.tileHeight
          );
        } else {
          // No barrier, i.e. this.mapArray[i][j] === 1
          fill("#b5b69c");
          rect(
            this.position.x,
            this.position.y,
            this.tileWidth,
            this.tileHeight
          );
        }

        this.position.x += this.tileWidth;
      }
      this.position.x = 0;
      this.position.y += this.tileWidth;
    }
  }
}

class Player {
  speed = 5;

  moveRight = false;
  moveLeft = false;
  moveUp = false;
  moveDown = false;

  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);

    this.width = 20;
  }

  getPos() {
    return [this.position.x, this.position.y];
  }

  display() {
    fill(255, 255, 255);
    circle(this.position.x, this.position.y, 20);
  }

  isHit(enemy) {
    // was the player hit by the enemy
    if (p5.Vector.dist(enemy.position, this.position) < 10) {
      return true;
    } else {
      return false;
    }
  }

  collide(map) {
    map.position.x = 0;
    map.position.y = 0; // reset the position of the map so
    // we can have the correct dimensions
    for (let i = 0; i < map.mapArray.length; i++) {
      for (let j = 0; j < map.mapArray[i].length; j++) {
        if (map.mapArray[i][j] === 0) {
          // A barrier
          if (
            this.position.x + this.width / 2 > map.position.x &&
            this.position.x - this.width / 2 < map.position.x + map.tileWidth &&
            this.position.y + this.width / 2 > map.position.y &&
            this.position.y - this.width / 2 < map.position.y + map.tileWidth
          ) {
            if (this.moveRight && this.position.x < map.position.x) {
              this.position.x = map.position.x - this.width / 2;
            } else if (this.moveDown && this.position.y < map.position.y) {
              this.position.y = map.position.y - this.width / 2;
            } else if (
              this.moveUp &&
              this.position.y > map.position.y + map.tileHeight
            ) {
              this.position.y = map.position.y + map.tileWidth + this.width / 2;
            } else if (
              this.moveLeft &&
              this.position.x > map.position.x + map.tileWidth
            ) {
              this.position.x = map.position.x + map.tileWidth + this.width / 2;
            }
          }
        }
        map.position.x += map.tileWidth;
      }
      map.position.x = 0;
      map.position.y += map.tileWidth;
    }
  }

  update() {
    if (
      (this.moveRight && this.moveUp) ||
      (this.moveRight && this.moveDown) ||
      (this.moveLeft && this.moveUp) ||
      (this.moveLeft && this.moveDown)
    ) {
      this.position.x =
        this.position.x +
        this.speed * (this.moveRight - this.moveLeft) * Math.SQRT1_2;
      this.position.y =
        this.position.y +
        this.speed * (this.moveDown - this.moveUp) * Math.SQRT1_2;
    } else {
      this.position.x =
        this.position.x + this.speed * (this.moveRight - this.moveLeft);
      this.position.y =
        this.position.y + this.speed * (this.moveDown - this.moveUp);
    }
  }

  move(keyCode, moved) {
    switch (keyCode) {
      case 68:
        this.moveRight = moved;
        break;
      case 65:
        this.moveLeft = moved;
        break;
      case 87:
        this.moveUp = moved;
        break;
      case 83:
        this.moveDown = moved;
        break;
      default:
        return moved;
    }
  }
}
class Bullet {
  constructor(xPos, yPos, xVel, yVel, radius) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel || 0;
    this.yVel = yVel || 0;
    this.radius = radius || 10;
  }
}
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
