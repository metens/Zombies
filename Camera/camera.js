class Player {
  constructor(xpos, ypos) {
    this.position = new p5.Vector(xpos, ypos);
    this.xpos = xpos;
    this.ypos = ypos;
  }

  display() {
    fill(255, 0, 0);
    circle(this.xpos, this.ypos, 20);
  }
}

class Game {
  moveRight = false;
  moveLeft = false;
  moveUp = false;
  moveDown = false;

  constructor(xpos, ypos, width, height, map, player) {
    this.xpos = xpos;
    this.ypos = ypos;

    this.width = width;
    this.height = height;

    this.map = map;
    this.player = player;
  }

  collide() {
    this.map.position.x = this.map.x; // was = 0 before;
    this.map.position.y = this.map.y; // reset the position of the this.map so

    for (let i = 0; i < this.map.mapArray.length; i++) {
      for (let j = 0; j < this.map.mapArray[i].length; j++) {
        if (
          this.map.mapArray[i][j] === 0 && // We are encountering a barrier
          this.player.position.x > this.map.position.x &&
          this.player.position.x < this.map.position.x + this.map.tileWidth && // checking the left & right sides of a barrier tile
          this.player.position.y > this.map.position.y &&
          this.player.position.y < this.map.position.y + this.map.tileHeight
        ) {
          if (keyIsDown(39)) {
            // right (D key)
            console.log("right");
            // this.right = false;
            this.player.position.x = this.map.position.x;
          }
        }
        this.map.position.x += this.map.tileWidth;
      }
      this.map.position.x = this.map.x; // was 0
      this.map.position.y += this.map.tileWidth;
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

  // move() {
  //   if (keyIsDown(LEFT_ARROW) && this.left) {
  //     this.map.x += 5;
  //   }
  //   if (keyIsDown(RIGHT_ARROW) && this.right) {
  //     this.map.x -= 5;
  //   }
  //   if (keyIsDown(UP_ARROW) && this.up) {
  //     this.map.y += 5;
  //   }
  //   if (keyIsDown(DOWN_ARROW) && this.down) {
  //     this.map.y -= 5;
  //   }
  // }

  play() {
    this.map.display();
    this.move();
    this.collide();
    this.player.display();
  }
}

class Map {
  mapArray = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ];

  constructor(xpos, ypos) {
    this.tileWidth = 50;
    this.tileHeight = 50;

    // The mapArray col/row
    this.col = 5;
    this.row = 5;

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
      this.position.y += this.tileHeight;
    }
  }
}

// class Camera {
//   constructor(xpos, ypos, width, height, map, player) {
//     this.width = width;
//     this.height = height;

//     this.xpos = xpos;
//     this.ypos = ypos;

//     this.map = map;
//     this.player = player;
//   }

//   display() {
//     fill(255, 255, 255, 0);
//     noStroke();
//     rect(this.xpos, this.ypos, this.width, this.height);
//   }

//   move() {
//     if (keyIsDown(LEFT_ARROW) && this.xpos > this.map.x) {
//       this.map.x += 5;
//     }

//     if (
//       keyIsDown(RIGHT_ARROW) &&
//       this.xpos < this.map.x + this.map.mapWidth - this.width
//     ) {
//       this.map.x -= 5;
//     }

//     if (keyIsDown(UP_ARROW) && this.ypos > this.map.y) {
//       this.map.y += 5;
//     }

//     if (
//       keyIsDown(DOWN_ARROW) &&
//       this.ypos < this.map.y + this.map.mapHeight - this.height
//     ) {
//       this.map.y -= 5;
//     }
//   }
// }

// class Camera {
//   constructor(map, width, height) {
//     this.x = 0;
//     this.y = 0;
//     this.width = width;
//     this.height = height;
//     this.maxX = map.cols * map.tsize - width;
//     this.maxY = map.rows * map.tsize - height;
//   }

//   follow(sprite) {
//     this.following = sprite;
//     sprite.screenX = 0;
//     sprite.screenY = 0;
//   }

//   update() {
//     // assume followed sprite should be placed at the center of the screen
//     // whenever possible
//     this.following.screenX = this.width / 2;
//     this.following.screenY = this.height / 2;

//     // make the camera follow the sprite
//     this.x = this.following.x - this.width / 2;
//     this.y = this.following.y - this.height / 2;
//     // clamp values
//     this.x = Math.max(0, Math.min(this.x, this.maxX));
//     this.y = Math.max(0, Math.min(this.y, this.maxY));

//     // in map corners, the sprite cannot be placed in the center of the screen
//     // and we have to change its screen coordinates

//     // left and right sides
//     if (
//       this.following.x < this.width / 2 ||
//       this.following.x > this.maxX + this.width / 2
//     ) {
//       this.following.screenX = this.following.x - this.x;
//     }
//     // top and bottom sides
//     if (
//       this.following.y < this.height / 2 ||
//       this.following.y > this.maxY + this.height / 2
//     ) {
//       this.following.screenY = this.following.y - this.y;
//     }
//   }
// }
