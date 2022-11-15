new p5();

let map;
let player;

function setup() {
  let cv = createCanvas(200, 200);

  // cv.position(250, 100); // changes where the canvas is relative to the window of the page
  // background(51);
  rectMode(CENTER);

  map = new Map(0, 0);
  player = new Player(100, 100);
  game = new Game(100, 100, width, height, map, player);
}

function draw() {
  background(51);
  game.play();
}
