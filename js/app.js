// All Entities class
class Entity {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {
        this.isOutofBoundsX = this.x > 5;
        this.isOutofBoundsY = this.y < 1;
    }

    // Draw the images on the screen method with x and y coordinates
    render() {
            ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
        }

    checkCollisiions(playerOrEnemy) {
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
    constructor(x, y){
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        super.update();
        if(this.isOutofBoundsX){
            this.x = -1;
        }
        else {
            this.x += dt;
        }
    }
}

// Place all enemy objects in an array called allEnemies
// Enemies our player must avoid
const allEnemies = [...Array(3)].map((_, i) => new Enemy(0, i + 1, 'Rock.png'));

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
    constructor(x, y) {
        /* this.x = 0;
        this.y = 0; */
        super();
        this.sprite = 'images/char-boy.png';
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
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y + 1 : this.y;
                break;
            default:
                break;

        }
    }
}

// Place the player object in a variable called player
const player = new Player();



// Now instantiate your objects.





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});