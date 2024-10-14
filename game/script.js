const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 320; // Set canvas width
canvas.height = 480; // Set canvas height

// Load images
const birdImage = new Image();
birdImage.src = 'images/bird.png'; // Path to your bird image

const pipeHeadImage = new Image();
pipeHeadImage.src = 'images/pipe-head.png'; // Path to your pipe head image

const pipeBodyImage = new Image();
pipeBodyImage.src = 'images/pipe-body.png'; // Path to your pipe body image

const backgroundImage = new Image();
backgroundImage.src = 'images/background.png'; // Path to your background image

// Wait for all images to load
let imagesLoaded = 0;
const totalImages = 4;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        init(); // Start the game when all images are loaded
    }
}

birdImage.onload = imageLoaded;
pipeHeadImage.onload = imageLoaded;
pipeBodyImage.onload = imageLoaded;
backgroundImage.onload = imageLoaded;

// Game variables
let birdY, gravity, lift, velocity, pipes, frame, score;
let debugMode = false; // Debug mode flag

// Get audio elements
const jumpSound = document.getElementById('jumpSound');
const backgroundMusic = document.getElementById('backgroundMusic');
const gameOverSound = document.getElementById('gameOverSound');

// Initialize game
function init() {
    birdY = canvas.height / 2;
    gravity = 0.6;
    lift = -15;
    velocity = 0;
    pipes = [];
    frame = 0;
    score = 0;
    updateScore(); // Update the scoreboard
    document.getElementById('gameOverMessage').style.display = 'none'; // Hide game over message
    draw(); // Start the game loop
}

// Pipe class
class Pipe {
    constructor(isTopPipe) {
        this.isTopPipe = isTopPipe; // Determine if the pipe is a top pipe
        this.top = this.isTopPipe ? 0 : Math.random() * (canvas.height / 2); // Set top position based on pipe type
        this.bottom = this.isTopPipe ? canvas.height - 100 : canvas.height - (this.top + 100); // Ensure a gap of 100 pixels
        this.x = canvas.width; // Start off-screen
        this.width = 20; // Width of the pipe
    }

    // Draw the pipe
    show() {
        if (this.isTopPipe) {
            ctx.drawImage(pipeHeadImage, this.x, 0, this.width, this.bottom); // Draw the top pipe head
        } else {
            ctx.drawImage(pipeBodyImage, this.x, 0, this.width, this.top); // Draw the top pipe body
            ctx.drawImage(pipeBodyImage, this.x, canvas.height - this.bottom, this.width, this.bottom); // Draw the bottom pipe body
        }

        // Draw boundaries for debug
        if (debugMode) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x, 0, this.width, this.top); // Top pipe boundary
            ctx.strokeRect(this.x, canvas.height - this.bottom, this.width, this.bottom); // Bottom pipe boundary
        }
    }

    // Update pipe position
    update() {
        this.x -= 2; // Move pipe left
    }

    // Check for collision
    hits(birdX, birdY) {
        if (birdX + 20 > this.x && birdX < this.x + this.width) {
            if (this.isTopPipe) {
                if (birdY < this.bottom) {
                    return true; // Collision detected with top pipe
                }
            } else {
                if (birdY < this.top || birdY + 20 > canvas.height - this.bottom) {
                    return true; // Collision detected with bottom pipe
                }
            }
        }
        return false; // No collision
    }
}

// Update the scoreboard
function updateScore() {
    document.getElementById('scoreboard').innerText = "Score: " + score;
}

// Game loop
function draw() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Draw background
    ctx.drawImage(birdImage, 50, birdY, 20, 20); // Draw bird

    // Draw bird boundary for debug
    if (debugMode) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(50, birdY, 20, 20); // Bird boundary
    }

    velocity += gravity; // Apply gravity
    birdY += velocity; // Update bird position

    // Check for ground collision
    if (birdY + 20 >= canvas.height) {
        birdY = canvas.height - 20; // Reset position
        velocity = 0; // Reset velocity
    }

    // Pipe generation
    if (frame % 75 === 0) {
        pipes.push(new Pipe()); // Add new pipe every 75 frames
    }

    // Update and show pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].show();

        // Check for collision
        if (pipes[i].hits(50, birdY)) {
            gameOverSound.play(); // Play game over sound
            document.getElementById('gameOverMessage').style.display = 'block'; // Show game over message
            backgroundMusic.pause(); // Stop background music
            return; // Exit the draw function
        }

        // Remove off-screen pipes
        if (pipes[i].x < -pipes[i].width) {
            pipes.splice(i, 1);
            score++; // Increment score
            updateScore(); // Update the scoreboard
        }
    }

    frame++; // Increment frame count
    requestAnimationFrame(draw); // Loop
}

// Control the bird
document.addEventListener('keydown', () => {
    velocity += lift; // Apply lift on key press
    jumpSound.play(); // Play jump sound
    if (!backgroundMusic.paused) {
        backgroundMusic.play(); // Play background music only if it's not already playing
    }
});

// Add touch event for mobile controls
document.addEventListener('touchstart', () => {
    velocity += lift; // Apply lift on touch
    jumpSound.play(); // Play jump sound
    if (!backgroundMusic.paused) {
        backgroundMusic.play(); // Play background music only if it's not already playing
    }
});

// Debug button functionality
document.getElementById('debugButton').addEventListener('click', () => {
    debugMode = !debugMode; // Toggle debug mode
});

// Restart button functionality
document.getElementById('restartButton').addEventListener('click', () => {
    init(); // Restart the game
    backgroundMusic.play(); // Play background music on restart
});

// Start the game
init(); // Initialize the game
