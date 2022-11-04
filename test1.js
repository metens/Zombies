new p5();

// create player
let player = new Player(100, 100);
// let playerGun = new Gun(player.getPos(), 5, 10, { R: 150, G: 100, B: 80 });

let enemies = []; // list of all enemies

// create the map
let map = new Map(0, 0);

function setup() {
  createCanvas(400, 400);

  // spawn enemies
  for (let i = 0; i < 1; i++) {
    // enemies.push(new Enemy(random(0, width), random(0, height)));
    enemies.push(new Enemy(300, 200));
  }
}

function draw() {
  // background(0);
  map.display();

  // update and draw the player
  player.display(mouseX, mouseY);
  player.updateBullet();

  for (let enemy of enemies) {
    if (!enemy.getHit()) {
      // update and draw enemies
      enemy.display();
      enemy.chase(map, player);
    }

    player.setHit(enemy); // Checks if the zombie hits the player

    enemy.setHit(player);
  }

  // Check if zombie is touching player
  if (!player.getHit()) {
    player.update();
  } else {
    player.setCol(255, 0, 0);
    // const blood_splat = new Image(40, 40);
    // blood_splat.src = "/sounds&animations/blood.gif";
    // document.body.appendChild(blood_splat);
  }

  player.collide(map);
}

function mouseClicked() {
  player.shoot(mouseX, mouseY);
}

function keyPressed() {
  player.move(keyCode, true);
}

function keyReleased() {
  player.move(keyCode, false);
}
