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

// Add a variable to store the player's name
let playerName = 'Player 1'; // You can change this to get the actual player's name

// Add a variable to store the player's previous high score
let previousHighScore = 0; // Initialize previous high score

// Array to store leaderboard entries
let leaderboardEntries = []; // Initialize as an empty array

// Initialize game
function init() {
    loadLeaderboard(); // Load leaderboard from localStorage
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
            jumpSound.muted = true;

            // Check if the current score is higher than the previous high score
            if (score > previousHighScore) {
                previousHighScore = score; // Update previous high score
                showNameInput(); // Show name input when a new high score is achieved
            } else {
                updateLeaderboard(playerName, score); // Update the leaderboard with the player's score
                document.getElementById('leaderboard').style.display = 'block'; // Show leaderboard
            }

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
    if (!jumpSound.muted) { // Check if jump sound is not muted
        velocity += lift; // Apply lift on key press
        jumpSound.play(); // Play jump sound
    }
    startBackgroundMusic(); // Start background music on key press
});

// Add touch event for mobile controls
document.addEventListener('touchstart', (event) => {
    const leaderboard = document.getElementById('leaderboard');
    const isTouchInside = leaderboard.contains(event.target);

    if (!isTouchInside) {
        hideLeaderboard(); // Hide leaderboard if touch is outside
    } else {
        event.preventDefault(); // Prevent default touch behavior if inside leaderboard
    }

    // Check if jump sound is not muted and apply lift
    if (!jumpSound.muted && !isTouchInside) { // Only jump if not touching the leaderboard
        velocity += lift; // Apply lift on touch
        jumpSound.play(); // Play jump sound
    }

    startBackgroundMusic(); // Start background music on touch
}, { passive: false }); // Set passive to false to allow preventDefault

// Debug button functionality
document.getElementById('debugButton').addEventListener('click', () => {
    debugMode = !debugMode; // Toggle debug mode
});

// Restart button functionality
document.getElementById('restartButton').addEventListener('click', () => {
    init(); // Restart the game
    startBackgroundMusic() // Play background music on restart
    jumpSound.muted = false; // Unmute jump sound on restart
});

// Start the game
init(); // Initialize the game

// Function to update the leaderboard
function updateLeaderboard(playerName, score) {
    // Check if the player already exists in the leaderboard
    const existingEntry = leaderboardEntries.find(entry => entry.name === playerName);
    
    if (existingEntry) {
        // Update the score if the player already exists
        existingEntry.score = Math.max(existingEntry.score, score); // Keep the higher score
    } else {
        // Add new score to the leaderboard
        leaderboardEntries.push({ name: playerName, score: score });
    }

    // Sort the leaderboard by score in descending order
    leaderboardEntries.sort((a, b) => b.score - a.score);

    // Keep only the top 10 entries
    leaderboardEntries = leaderboardEntries.slice(0, 10);

    // Save the leaderboard to localStorage
    localStorage.setItem('leaderboardEntries', JSON.stringify(leaderboardEntries));

    // Update the leaderboard display
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = ''; // Clear existing entries

    leaderboardEntries.forEach(entry => {
        const newEntry = document.createElement('li');
        newEntry.textContent = `${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(newEntry);
    });
}

// Function to load the leaderboard from localStorage
function loadLeaderboard() {
    const storedEntries = localStorage.getItem('leaderboardEntries');
    if (storedEntries) {
        leaderboardEntries = JSON.parse(storedEntries); // Parse the stored JSON string
    }
}

// Function to hide the leaderboard
function hideLeaderboard() {
    document.getElementById('leaderboard').style.display = 'none'; // Hide leaderboard
}

// Event listener for clicks or touches outside the leaderboard and name input container
document.addEventListener('click', (event) => {
    const leaderboard = document.getElementById('leaderboard');
    const nameInputContainer = document.getElementById('nameInputContainer');
    
    const isClickInsideLeaderboard = leaderboard.contains(event.target);
    const isClickInsideNameInput = nameInputContainer.contains(event.target);
    
    // Hide leaderboard if click is outside both the leaderboard and name input container
    if (!isClickInsideLeaderboard && !isClickInsideNameInput) {
        hideLeaderboard(); // Hide leaderboard if click is outside
    }
});

// Show name input when a new record is achieved
function showNameInput() {
    document.getElementById('nameInputContainer').style.display = 'block'; // Show input container
    document.getElementById('leaderboard').style.display = 'none'; // Hide leaderboard
}

// Handle name submission
document.getElementById('submitNameButton').addEventListener('click', () => {
    const playerNameInput = document.getElementById('playerNameInput').value; // Get input value
    if (playerNameInput) {
        playerName = playerNameInput; // Update player name
        document.getElementById('nameInputContainer').style.display = 'none'; // Hide input container
        updateLeaderboard(playerName, score); // Update leaderboard with new name and score
        
        // Show leaderboard after hiding the name input container
        document.getElementById('leaderboard').style.display = 'block'; // Show leaderboard
    }
});

// Start background music after user interaction
function startBackgroundMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
            console.error("Error playing background music:", error);
        });
    }
}
