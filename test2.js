class Enemy {
  max_speed = 2;
  width = 30;
  mass = 10;
  max_force = 2;
  max_avoidance_force = 3;

  hitStatus = false;

  zombie = loadImage("/sounds&animations/zombie.gif");
  blood = loadImage("/sounds&animations/blood.gif");
  zombieSounds = [loadSound("/sounds&animations/zombieSound1.mp3")];

  // zombieSound1 = loadSound("/sounds&animations/zombieSound1.mp3");

  constructor(x, y) {
    this.old_position = new p5.Vector(x, y);
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.steering = new p5.Vector(0, 0);

    this.lookAhead = new p5.Vector(0, 0);
    this.lookAheadR = 30; // the radius of view
    this.lookAheadD = 40; // how far to look ahead
  }

  setHit(player) {
    for (let bullet = 0; bullet < player.magazine.length; bullet++) {
      if (
        p5.Vector.dist(player.magazine[bullet].position, this.position) < 10
      ) {
        // bullet hits zombie
        this.hitStatus = true;
        player.magazine.splice(bullet, 1); // remove bullet from screen
      }
    }
  }

  getHit() {
    return this.hitStatus;
  }

  die() {
    imageMode(CENTER);
    image(this.blood, this.position.x, this.position.y, 60, 60);
  }

  display(target) {
    // make random zombie sound
    // this.zombieSounds[0].play();

    // display the enemy
    let angle = Math.atan2(
      target.position.x - this.position.x,
      -target.position.y + this.position.y
    );

    push();
    translate(this.position.x, this.position.y);
    rotate(angle - 90 * (Math.PI / 180)); // rotate the zombie image by 90 degrees
    imageMode(CENTER);
    image(this.zombie, 0, 0, 60, 60);
    pop();

    // compare the old player position (previous frame) vs the current
    // player position to know whether the enemy is moving up, down, left, or right
    // Prevents the zombie to pass through walls in the map...
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
  // mapArray = [
  //   [0, 0, 0, 0, 0],
  //   [0, 1, 1, 1, 0],
  //   [0, 1, 0, 1, 0],
  //   [0, 1, 1, 1, 0],
  //   [0, 0, 0, 0, 0],
  // ];
  mapArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  constructor(xpos, ypos) {
    this.tileWidth = 50;
    this.tileHeight = 50;

    // The mapArray col/row
    this.col = this.mapArray[0].length;
    this.row = this.mapArray.length;

    // These positions change every time to draw all the tiles on the map
    this.position = new p5.Vector(xpos, ypos);

    // The true x and y position of the map
    this.x = xpos;
    this.y = ypos;

    this.mapWidth = this.tileWidth * this.col;
    this.mapHeight = this.tileHeight * this.row;
  }

  display() {
    // Reset the x and y values so that the map is re-drawn
    // in the same spot after every draw call
    this.position.x = this.x;
    this.position.y = this.y;

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
      // this.xpos = 0;
      this.position.x = this.x;
      this.position.y += this.tileWidth;
    }
  }
}
class Player {
  speed = 4;
  hitStatus = false;

  moveRight = false;
  moveLeft = false;
  moveUp = false;
  moveDown = false;

  magazine = [];
  bullets = 5;
  bull_speed = 8;

  height = 30;
  width = 30;

  constructor(x, y, map) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);

    this.width = 20;
    this.color = [255, 255, 255];

    // The player animation:
    this.player = loadImage("/sounds&animations/player.gif");
    this.blood = loadImage("/sounds&animations/blood.gif");

    this.map = map;
  }

  getPos() {
    return [this.position.x, this.position.y];
  }

  getAmmo() {
    // checks the amount of bullets left
    if (this.bullets > 0) {
      return true;
    } else {
      return false;
    }
  }

  setCol(r, g, b) {
    this.color = [r, g, b];
  }

  display(mouseX, mouseY) {
    let angle = Math.atan2(mouseX - this.position.x, -mouseY + this.position.y);

    push();
    translate(this.position.x, this.position.y);
    rotate(angle - 90 * (Math.PI / 180));
    imageMode(CENTER);
    image(this.player, 0, 0, 50, 50); // (image, xpos, ypos, width, height) // xpos/ypos = 0 bc we translate first
    pop();
  }

  setHit(enemy) {
    if (p5.Vector.dist(enemy.position, this.position) < 10)
      this.hitStatus = true;
  }
  getHit() {
    // was the player hit by the enemy?
    return this.hitStatus;
  }

  die() {
    imageMode(CENTER);
    image(this.blood, this.position.x, this.position.y, 50, 50); // (image, xpos, ypos, width, height) // xpos/ypos = 0 bc we translate first
  }

  shoot = function (mouseX, mouseY) {
    const theta = Math.atan2(
      mouseY - this.position.y,
      mouseX - this.position.x
    ); // Finds angle btwn player and mouse position
    const bulletVel = {
      x: Math.cos(theta) * this.bull_speed,
      y: Math.sin(theta) * this.bull_speed,
    };

    if (this.bullets > 0) {
      this.magazine.push(
        new Bullet(this.position.x, this.position.y, bulletVel.x, bulletVel.y)
      );
      this.bullets--;
    }
  };

  updateBullet = function () {
    for (let bullet = 0; bullet < this.magazine.length; bullet++) {
      this.magazine[bullet].position.y += this.magazine[bullet].velocity.y;
      this.magazine[bullet].position.x += this.magazine[bullet].velocity.x;

      // noStroke();
      fill("#a39a0a");
      circle(
        this.magazine[bullet].position.x,
        this.magazine[bullet].position.y,
        this.magazine[bullet].radius
      );
    }
  };

  collide() {
    this.map.position.x = this.map.x;
    this.map.position.y = this.map.y; // reset the position of the this.map so
    // we can have the correct dimensions
    for (let i = 0; i < this.map.mapArray.length; i++) {
      for (let j = 0; j < this.map.mapArray[i].length; j++) {
        if (this.map.mapArray[i][j] === 0) {
          // A barrier
          if (
            this.position.x + this.width / 2 > this.map.position.x &&
            this.position.x - this.width / 2 <
              this.map.position.x + this.map.tileWidth &&
            this.position.y + this.width / 2 > this.map.position.y &&
            this.position.y - this.width / 2 <
              this.map.position.y + this.map.tileWidth
          ) {
            if (this.moveRight && this.position.x < this.map.position.x) {
              this.moveRight = false;
              this.position.x = this.map.position.x - this.width / 2;
            }
            if (this.moveDown && this.position.y < this.map.position.y) {
              this.moveDown = false;
              this.position.y = this.map.position.y - this.width / 2;
            }
            if (
              this.moveUp &&
              this.position.y > this.map.position.y + this.map.tileHeight
            ) {
              this.moveUp = false;
              this.position.y =
                this.map.position.y + this.map.tileWidth + this.width / 2;
            }
            if (
              this.moveLeft &&
              this.position.x > this.map.position.x + this.map.tileWidth
            ) {
              this.moveLeft = false;
              this.position.x =
                this.map.position.x + this.map.tileWidth + this.width / 2;
            }
          }
        }
        this.map.position.x += this.map.tileWidth;
      }
      this.map.position.x = this.map.x;
      this.map.position.y += this.map.tileWidth;
    }
  }

  update() {
    // if (
    //   (this.moveRight && this.moveUp) ||
    //   (this.moveRight && this.moveDown) ||
    //   (this.moveLeft && this.moveUp) ||
    //   (this.moveLeft && this.moveDown)
    // ) {
    //   this.position.x =
    //     this.position.x +
    //     this.speed * (this.moveRight - this.moveLeft) * Math.SQRT1_2;

    //   this.position.y =
    //     this.position.y +
    //     this.speed * (this.moveDown - this.moveUp) * Math.SQRT1_2;
    // } else {

    this.map.x = this.map.x - this.speed * (this.moveRight - this.moveLeft);
    this.map.y = this.map.y - this.speed * (this.moveDown - this.moveUp);

    // this.position.x =
    //   this.position.x + this.speed * (this.moveRight - this.moveLeft);

    // this.position.y =
    //   this.position.y + this.speed * (this.moveDown - this.moveUp);
    // }
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
