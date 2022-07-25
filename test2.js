class Obstacle {
    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.width = 100;
    }

    display() {
        fill(255, 255, 0);
        rect(this.position.x, this.position.y, this.width, this.width);
    }
}

class Map {
    tileWidth = 80; tileHeight = 80;
    mapArray = [
        // [0, 0, 0, 0, 0],
        // [0, 1, 1, 1, 0],
        // [0, 1, 1, 1, 0],
        // [0, 1, 1, 1, 0],
        // [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ];

    constructor(x, y) {
        this.position = new p5.Vector(x, y);
    }

    display() {
        // Reset the x and y values so that the map is re-drawn 
        // in the same spot after every draw call
        this.position.x = 0; this.position.y = 0;

        noStroke();
        // The corner of each tile starts at the corner of the screen
        for (let i = 0; i < this.mapArray.length; i++) {
            for (let j = 0; j < this.mapArray[i].length; j++) {
                if (this.mapArray[i][j] === 0) { // A barrier
                    fill("#6d4141");
                    rect(this.position.x, this.position.y, this.tileWidth, this.tileHeight);
                } else { // No barrier, i.e. this.mapArray[i][j] === 1
                    fill("#b5b69c");
                    rect(this.position.x, this.position.y, this.tileWidth, this.tileHeight);
                }
                
                this.position.x += this.tileWidth;
            }
            this.position.x = 0;
            this.position.y += this.tileWidth;
        }
    }
}

class Player {
    speed = 5;

    moveRight = false;
    moveLeft = false;
    moveUp = false;
    moveDown = false;

    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector(0, 0);

        this.width = 20;
    }

    display() {
        fill(255, 255, 255);
        circle(this.position.x, this.position.y, 20);
    }

    collide(map) {
        map.position.x = 0; map.position.y = 0; // reset the position of the map so 
                                                // we can have the correct dimensions
        for (let i = 0; i < map.mapArray.length; i++) {
            for (let j = 0; j < map.mapArray[i].length; j++) {
                if (map.mapArray[i][j] === 0) { // A barrier
                    if (this.position.x + this.width/2 > map.position.x &&
                    this.position.x - this.width/2 < map.position.x + map.tileWidth &&
                    this.position.y + this.width/2 > map.position.y &&
                    this.position.y - this.width/2 < map.position.y + map.tileWidth) {
                        if (this.moveRight && this.position.x < map.position.x) {
                            this.position.x = map.position.x - this.width/2;
                        } else if (this.moveLeft && this.position.x > map.position.x + map.tileWidth) {
                            this.position.x = map.position.x + map.tileWidth + this.width/2;
                        } else if (this.moveDown) {
                            this.position.y = map.position.y - this.width/2;
                        } else if (this.moveUp) {
                            this.position.y = map.position.y + map.tileWidth + this.width/2;
                        }
                    }
                }
                map.position.x += map.tileWidth;
            }
            map.position.x = 0;
            map.position.y += map.tileWidth;
        }

        // collide(obj) {
        //     if (this.position.x + this.width/2 > obj.position.x &&
        //     this.position.x - this.width/2 < obj.position.x + obj.width &&
        //     this.position.y + this.width/2 > obj.position.y &&
        //     this.position.y - this.width/2 < obj.position.y + obj.width) {
        //         if (this.moveRight && this.position.x < obj.position.x) {
        //             this.position.x = obj.position.x - this.width/2;
        //         } else if (this.moveLeft && this.position.x > obj.position.x + obj.width) {
        //             this.position.x = obj.position.x + obj.width + this.width/2;
        //         } else if (this.moveDown) {
        //             this.position.y = obj.position.y - this.width/2;
        //         } else if (this.moveUp) {
        //             this.position.y = obj.position.y + obj.width + this.width/2;
        //         }
        //     }
        // }
    }
            
    update() {      
            if ((this.moveRight && this.moveUp) || (this.moveRight && this.moveDown)
            || (this.moveLeft && this.moveUp) || (this.moveLeft && this.moveDown)) {
                this.position.x = this.position.x + this.speed * (this.moveRight - this.moveLeft) * Math.SQRT1_2;
                this.position.y = this.position.y + this.speed * (this.moveDown - this.moveUp) * Math.SQRT1_2;
            } else {
                this.position.x = this.position.x + this.speed * (this.moveRight - this.moveLeft) * Math.SQRT1_2;
                this.position.y = this.position.y + this.speed * (this.moveDown - this.moveUp) * Math.SQRT1_2;
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
}