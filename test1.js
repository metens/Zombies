new p5();

// create player
let player = new Player(100, 100);
let playerGun = new Gun(player.getPos(), 5, 10, { R: 150, G: 100, B: 80 });

let enemies = []; // list of all enemies

// create the map
let map = new Map(0, 0);

function setup() {
  createCanvas(400, 400);

  // spawn enemies
  for (let i = 0; i < 3; i++) {
    // enemies.push(new Enemy(random(0, width), random(0, height)));
    enemies.push(new Enemy(300, 200));
  }
}

let hit = false;

function draw() {
  // background(0);
  map.display();

  // update and draw the player
  player.display();
  playerGun.holdGun(player.getPos(), mouseX, mouseY);
  playerGun.updateBullet();

  // update and draw enemies
  for (let enemy of enemies) {
    if (!hit) {
      enemy.display();
    }

    for (let bullet = 0; bullet < playerGun.magazine.length; bullet++) {
      if (
        dist(
          playerGun.magazine[bullet].xPos,
          playerGun.magazine[bullet].yPos,
          enemy.getPos()[0],
          enemy.getPos()[1]
        ) <= 10
      ) {
        // bullet hits zombie
        hit = true;
        playerGun.magazine.splice(bullet, 1);
      }
    }

    enemy.chase(map, player);
  }

  player.update();

  player.collide(map);
}

function mouseClicked() {
  playerGun.shoot(player.getPos(), mouseX, mouseY);
}

function keyPressed() {
  player.move(keyCode, true);
}

function keyReleased() {
  player.move(keyCode, false);
}
