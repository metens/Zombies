new p5();

let enemies = []; // list of all enemies

// create the map
let map = new Map(0, 0);

// create player
let player = new Player(200, 200, map);

// let zombie;
// let zombieSound1, zombieSound2, zombieSound3;
// let zombieSound1;

let blood;
function preload() {
  //   // Blood animation when zombie dies
  blood = loadImage("/sounds&animations/blood.gif");
  //   // zombieSound1 = loadSound("/sounds&animations/zombieSound1.mp3");
  //   // zombieSound2 = loadSound("/sounds&animations/zombieSound2.mp3");
  //   // zombieSound3 = loadSound("/sounds&animations/zombieSound3.mp3");
  pistol_sound = loadSound("/sounds&animations/pistol.mp3");
  empty_gun = loadSound("/sounds&animations/empty_gun.mp3");
  footsteps = loadSound("/sounds&animations/footsteps.mp3");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.position(200, 0);
  // rectMode(CENTER);
  // imageMode(CENTER);

  // spawn enemies
  // for (let i = 0; i < 1; i++) {
  //   // enemies.push(new Enemy(random(0, width), random(0, height)));
  //   enemies.push(new Enemy(300, 200));
  // }
  // zombieSound1.play();
}

function draw() {
  background(0);
  map.display();

  // update and draw the player
  player.display(mouseX, mouseY);
  player.updateBullet();

  // for (let enemy of enemies) {
  //   if (!enemy.getHit()) {
  //     // update and draw enemies
  //     enemy.display(player);
  //     // enemy.playSound(zombieSound1);
  //     enemy.chase(map, player);

  //     player.setHit(enemy); // Checks if the zombie hits the player
  //     enemy.setHit(player);
  //   } else {
  //     // Blood splat when zombie dies:
  //     // enemy.die();
  //     enemies.splice(enemies.indexOf(enemy), 1); // remove the enemy from the enemies array (so player doesn't die from passing over dead body)
  //   }
  // }

  // // Check if zombie is touching player
  // if (!player.getHit()) {
  //   // player.update();
  //   // player.move();
  // } else {
  //   player.die();
  //   // noLoop();
  // }

  ////////////////////////////
  mapArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  ////////////////////////////

  player.collide();
  // player.move();
  player.update();
}

function mouseClicked() {
  if (player.getAmmo()) {
    // if there is ammo:
    pistol_sound.setVolume(0.2);
    pistol_sound.play();
  } else {
    // if no ammo:
    empty_gun.setVolume(0.3);
    empty_gun.play();
  }
  player.shoot(mouseX, mouseY);
}

function keyPressed() {
  // if (keyIsDown(87) || keyIsDown(83) || keyIsDown(68) || keyIsDown(65)) {
  //   // footsteps.setVolume(0.3);
  //   footsteps.play();
  // } else {
  //   footsteps.stop();
  // }

  // if (keyCode === 87 || keyCode === 83 || keyCode === 68 || keyCode === 65) {
  //   // footsteps.setVolume(0.3);
  //   footsteps.play();
  // }

  player.move(keyCode, true);
}

function keyReleased() {
  // footsteps.stop();
  // if (keyIsDown(87) || keyIsDown(83) || keyIsDown(68) || keyIsDown(65)) {
  //   // footsteps.setVolume(0.3);
  //   footsteps.play();
  // } else {
  //   footsteps.stop();
  // }
  // if (keyCode === 87 || keyCode === 83 || keyCode === 68 || keyCode === 65) {
  //   footsteps.stop();
  // }
  player.move(keyCode, false);
}
