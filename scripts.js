// Placeholder JavaScript if you want to add interactivity in the future

// Example: A simple alert message on page load
window.onload = function() {
    //alert("Welcome to Alireza Rahimian's online resume!");
};

document.addEventListener('DOMContentLoaded', function() {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            modeToggle.textContent = 'Toggle Light Mode';
        } else {
            modeToggle.textContent = 'Toggle Dark Mode';
        }
    });
});
