// Toggle the navigation menu on and off (existing functionality)
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Highlight navigation link when scrolling and updating section header
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav ul li a');
const sectionHeader = document.createElement('div'); // Create the floating header element
sectionHeader.id = 'section-header';
document.body.appendChild(sectionHeader); // Add it to the body

window.addEventListener('scroll', () => {
    let currentSection = '';

    // Check which section is in the viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id'); // Get current section's ID
            sectionHeader.innerHTML = section.querySelector('h2').innerText; // Update mobile header with section name
        }
    });

    // Update the active class for desktop navigation
    navItems.forEach(item => {
        item.classList.remove('active'); // Remove "active" from all links
        if (item.getAttribute('href').includes(currentSection)) {
            item.classList.add('active'); // Add "active" to the current one
        }
    });

    // Show or hide floating header on mobile
    if (window.innerWidth <= 768) {
        sectionHeader.style.display = 'block';
    } else {
        sectionHeader.style.display = 'none'; // Hide floating header on desktop
    }
});
