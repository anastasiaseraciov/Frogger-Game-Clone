// All Entities class
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 4.7;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {
        this.isOutofBoundsX = this.x > 5;
        this.isOutofBoundsY = this.y < 0.7;
    }

    // Draw the images on the screen method with x and y coordinates
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    checkCollisions(playerOrEnemy) {
        if (this.y === playerOrEnemy.y) {
            if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
                return true;
            }
        } else {
            return false;
        }
    }
}

// Enemy class
class Enemy extends Entity {
    constructor(x, y) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        super.update();
        if (this.isOutofBoundsX) {
            this.x = -1;
        } else {
            this.x = this.x + dt * 5; //Enemy speed
        }
    }

}

const enemy = new Enemy();

// Place all enemy objects in an array called allEnemies
// Enemies our player must avoid
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const allEnemies = [];
let bugOne = new Enemy(getRandomInt(0, 6), 0.7);
let bugTwo = new Enemy(getRandomInt(0, 6), 1.7);
let bugThree = new Enemy(getRandomInt(0, 6), 2.7);
allEnemies.push(bugOne, bugTwo, bugThree);

// Player Class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
    constructor(x, y) {
        /* this.x = 0;
        this.y = 0; */
        super();
        this.sprite = 'images/char-boy.png';
        this.moving = false;
        this.win = false; //Set to true when player reaches the water
        this.level = 1;
    }

    update(dt) {
        super.update();
        if (this.isOutofBoundsY && !this.moving && !this.win) {
            this.win = true;
        }
    }

    render() {
        super.render();
        this.moving = false;
    }

    /**
     * update player's x and y property according to keyboards events
     * @param {string} input - Direction to travel
     */
    handleInput(input) {
        switch (input) {
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x;
                break;
            case 'up':
                /* Automatically on moving the player the y position was getting more decimals
                In order the colission to occur had to round to one decimal */
                this.y = this.y > 0 ? parseFloat((this.y - 1).toFixed(1)) : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                /* Automatically on moving the player the y position was getting more decimals
                In order the colission to occur had to round to one decimal */
                this.y = this.y < 5 ? parseFloat((this.y + 1)).toFixed(1) : this.y;
                break;
            default:
                break;

        }
        this.moving = true;
    }
}

// Place the player object in a variable called player
const player = new Player();

// Now instantiate your objects.

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});