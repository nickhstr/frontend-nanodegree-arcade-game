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
    // This resets the player's position when they reach the water, and increases the win counter by one.
    if (this.y <= 0) {
        this.reset(202, 400);
        winLoss.wins++;
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

// Gme constructor! When a player collects these, their score increases based on the score value of the gem.
var Gem = function(x, y, sprite, score) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.score = score;
    this.width = 50;
    this.height = 50;
};

// Similar to the render method for Enemy
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This hides the gems off-screen when collected by the player
Gem.prototype.hide = function() {
    this.x = 1000;
    this.y = 1000;
};

// Score constructor. Keeps track of score based on gems collected.
var Score = function() {
    this.text = 'Score: ';
    this.score = 0;
};

// Renders the score on the bottom left of the canvas.
Score.prototype.render = function() {
    ctx.font = '14pt Courier';
    ctx.fillStyle = 'white';
    ctx.fillText(this.text + this.score, 5, 580);
};

// Constructor for a win/loss counter.
var WinsLosses = function() {
    this.winText = 'Wins: ';
    this.lossText = 'Losses: ';
    this.wins = 0;
    this.losses = 0;
};

// Renders the win/loss counter on the bottom right of the canvas.
WinsLosses.prototype.render = function() {
    ctx.font = '14pt Courier';
    ctx.fillStyle = 'white';
    ctx.fillText(this.winText + this.wins + ' ' + this.lossText + this.losses, 290, 580);
};

// Instantiate enemies
var allEnemies = [
    new Enemy(-200, 73, 200),
    new Enemy(-200, 156, 300),
    new Enemy(-200, 239, 250)
];

// Instantiate player, in 3rd column, 6th row.
var player = new Player(202, 400);

//Instatiate all gems
var allGems = [
    new Gem(0, 68, 'images/Gem Blue.png', 100),
    new Gem(303, 151, 'images/Gem Orange.png', 50)
];

// Instantiates score
var score = new Score();

// Instantiates win/loss counter
var winLoss = new WinsLosses();

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
function checkCollisions(items, player) {
    items.forEach(function(item) {
        if (item.x < player.x + player.width &&
            item.x + item.width > player.x &&
            item.y < player.y + player.height &&
            item.y + item.height > player.y) {
            collided(item);
        }
    });
};

// Abstracts collisions, allowing reuse for multiple object types.
function collided(obj) {
    // Updates player location and loss counter.
    if (obj instanceof Enemy) {
        player.reset(202, 400);
        winLoss.losses++;
    }
    // Upon collection of gem, score is update and the gem is moved outside of the scope of the canvas.
    if (obj instanceof Gem) {
        obj.hide();
        score.score += obj.score;
    }
};