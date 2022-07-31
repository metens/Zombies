new p5();

// create player
let player = new Player(100, 100);

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

function draw() {
    // background(0);
    map.display();

    // update and draw the player
    player.display();

    // update and draw enemies
    for (let enemy of enemies) {
        enemy.display();        
        enemy.chase(map, player);

    }

    player.update();

    player.collide(map)
}

function keyPressed() {
    player.move(keyCode, true);
}

function keyReleased() {
    player.move(keyCode, false);
}