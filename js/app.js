// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    // Determine the campus through the x and y axis and the enemy speed 
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The enemy image  
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // the speed multiplies to the dt to ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // if the enemies are out of the campus, they appear again randomly with different speeds.
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Collisions Checker. 
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Drwaing function of the enemy.
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class 
var Player = function (x, y) {

    //  Player movement in the x and y axis range. 
    this.x = x;
    this.y = y;

    //The player image. 
    this.player = 'images/char-princess-girl.png';
};

Player.prototype.update = function (dt) {

};

// Draw the user image.
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// the handleInput for user movement through out the keyored arrow inside the campus only.
Player.prototype.handleInput = function (keyPress) {

    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };
           if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };
            if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };
           if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

// The winning point and the rest the of the player location. 
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
        this.y = 405;
               Swal.fire( 'You Won!',  'Congratulations! ', 'success')
    }, 800);
};
};


// Array of the all enemies .
var allEnemies = [];

// The enemies Location and speed.
var enemyLocation = [63, 147, 230];
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The player starting point. 
var player = new Player(202, 405);

// This listens for key presses
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
