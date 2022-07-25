new p5();

// create player
let player = new Player(100, 100);

// create obj
let obstacles = []

// create the map
let map = new Map(0, 0);

function setup() {
    createCanvas(400, 400);
    // for (let i = 0; i < 5; i++) {
    //     obstacles.push(new Obstacle(random(0, 400), random(0, 400)))
    // }
}

function draw() {
    // background(0);
    map.display();

    // update and draw the player
    player.display();

    // for (let obstacle of obstacles) {
    //     obstacle.display();
    // }

    player.update();

    player.collide(map)

    // for (let obstacle of obstacles) {
    //     player.collide(obstacle);
    // }
    
}

function keyPressed() {
    player.move(keyCode, true);
}

function keyReleased() {
    player.move(keyCode, false);
}