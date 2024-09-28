// Countdown to a specific date and time (example: 1 hour from now)
const countdownElement = document.getElementById('countdown');

// Set the date for the countdown
let countdownDate = new Date().getTime() + (60 * 60 * 1000); // 1 hour from now

let countdownTimer = setInterval(() => {
    // Get today's date and time
    let now = new Date().getTime();
    
    // Find the difference between now and the countdown date
    let timeLeft = countdownDate - now;
    
    // Time calculations for days, hours, minutes, and seconds
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Output the result in the element
    countdownElement.innerHTML = `Estimated time: ${hours}h ${minutes}m ${seconds}s`;
    
    // If the countdown is over, clear the interval and show a message
    if (timeLeft < 0) {
        clearInterval(countdownTimer);
        countdownElement.innerHTML = "We are back online!";
    }
}, 1000);
