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
