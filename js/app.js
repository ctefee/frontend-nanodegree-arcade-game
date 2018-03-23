"use strict";

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = 90;
  this.height = 50;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);

  if (this.x >= 505) {
    this.x = -this.width;
  }
  this.checkCollisions();
};

Enemy.prototype.checkCollisions = function() {
  if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height &&
    player.y + player.height > this.y) {
    player.resetPosition();
    //reset the score to 0 if collision happened
    document.getElementById('score').innerHTML = '0';
  }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.width = 80;
  this.height = 90;
  this.speed = speed;
  this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function(dt) {
  this.speed += this.speed * dt;

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create a handleInput() method
// Note: 'Key' are your left/right/up/down key presses

Player.prototype.handleInput = function(key) {
// Calculate and determine the steps needed to skip between each grass/rock block
    const x_step = 101;
    const y_step = 83;
    if (key == 'left' && this.x > 0) {
        this.x -= x_step;
    }
    else if (key == 'right' && this.x < 401) {
        this.x += x_step;
    }
    else if (key == 'up' && this.y > 0) {
        this.y -= y_step;
    }
    else if (key == 'down' && this.y < 325) {
        this.y += y_step;
    }

    // Use the given canvas elements height/width, and calculate when the player reaches the waterline
   // When player reaches the waterline, the game is won and score increases by 1.
    if (this.y < 40) {
      let score = parseInt(document.getElementById('score').innerHTML);
      score += 1;
      document.getElementById('score').innerHTML = score;
      this.resetPosition();
    }

};

// Resets and returns the player back to it's original position inside the 'canvas'
Player.prototype.resetPosition = function() {
  this.x = player_x;
  this.y = player_y;
};

/**
  @description - get random integer in the range
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let bug_y = [60, 145, 230]; //three options for vertical bug positions
allEnemies.push(new Enemy(0, bug_y[0], getRandomInt(30, 200)));
allEnemies.push(new Enemy(0, bug_y[1], getRandomInt(30, 200)));
allEnemies.push(new Enemy(0, bug_y[2], getRandomInt(30, 200)));

// Place the player object in a variable called player
let score = 0;
const player_x = 200;
const player_y = 405;
const player_speed = 200;
let player = new Player(player_x, player_y, player_speed);


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
