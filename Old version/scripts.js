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
// Get modal elements
const modal = document.getElementById('contact-modal');
const contactButton = document.getElementById('contact-button');
const closeButton = document.querySelector('.close-button');

// When the user clicks the contact button, open the modal
contactButton.addEventListener('click', () => {
    modal.style.display = 'flex'; // Display the modal
});

// When the user clicks on the close button, close the modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
});

// When the user clicks anywhere outside the modal content, close the modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
    }
});

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

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Auto-scroll for testimonials
    const testimonialsContainer = document.querySelector('.testimonials-container');
    let scrollAmount = 0;

    function autoScroll() {
        scrollAmount += 1;
        if (scrollAmount >= testimonialsContainer.scrollWidth / 2) {
            scrollAmount = 0;
        }
        testimonialsContainer.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(autoScroll);
    }

    autoScroll();
});
