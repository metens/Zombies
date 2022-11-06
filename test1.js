new p5();

// create player
let player = new Player(100, 100);
// let playerGun = new Gun(player.getPos(), 5, 10, { R: 150, G: 100, B: 80 });

let enemies = []; // list of all enemies

// create the map
let map = new Map(0, 0);

// let zombie;
// let zombieSound1, zombieSound2, zombieSound3;
// let zombieSound1;
let blood;
// function preload() {
//   // Blood animation when zombie dies
blood = loadImage("/sounds&animations/blood.gif");
//   // zombieSound1 = loadSound("/sounds&animations/zombieSound1.mp3");
//   // zombieSound2 = loadSound("/sounds&animations/zombieSound2.mp3");
//   // zombieSound3 = loadSound("/sounds&animations/zombieSound3.mp3");
// }

function setup() {
  createCanvas(400, 400);

  // spawn enemies
  for (let i = 0; i < 1; i++) {
    // enemies.push(new Enemy(random(0, width), random(0, height)));
    enemies.push(new Enemy(300, 200));
  }
  // zombieSound1.play();
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
      enemy.display(player);
      // enemy.playSound(zombieSound1);
      enemy.chase(map, player);

      player.setHit(enemy); // Checks if the zombie hits the player
      enemy.setHit(player);
    } else {
      // Blood splat when zombie dies:
      // enemy.die();
      enemies.splice(enemies.indexOf(enemy), 1); // remove the enemy from the enemies array (so player doesn't die from passing over dead body)
    }
  }

  // Check if zombie is touching player
  if (!player.getHit()) {
    player.update();
  } else {
    player.die();
    // noLoop();
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
