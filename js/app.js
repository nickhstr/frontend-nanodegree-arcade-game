// Enemy constructor
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    //Width and height are set for collision detection
    this.width = 80;
    this.height = 50;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x += (dt) * this.speed;
    } else {
        this.x = -200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    // Width and height for collison detection
    this.width = 50;
    this.height = 75;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // The only thing to update is if for some reason the player's y value leaves the canvas area.
    if (this.y <= 0) {
        this.reset(202, 400);
    }
};

// Similar to the render method for Enemey
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The left/right and up/down values are the same as the widths and heights of the rows and columns in engine.js
Player.prototype.handleInput = function(move) {
    if (move === 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (move === 'right' && this.x < 400) {
        this.x += 101;
    }
    if (move === 'down' && this.y < 400) {
        this.y += 83;
    }
    if (move === 'left' && this.x > 0) {
        this.x -= 101;
    }
};

// This method resets the player's position under specific conditions.
Player.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;
};


// Instantiate enemies
var allEnemies = [
    new Enemy(-200, 73, 200),
    new Enemy(-200, 156, 300),
    new Enemy(-200, 239, 250)
];

// Instantiate player
var player = new Player(202, 400);


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

// Collision detection function.
function checkCollisions(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].y + allEnemies[i].height > player.y) {
            player.reset(202, 400);
        }
    }
};