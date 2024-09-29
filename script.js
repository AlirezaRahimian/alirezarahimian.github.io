document.addEventListener('DOMContentLoaded', function() {
    // Contact button functionality
    const contactButton = document.getElementById('contactButton');
    const contactBox = document.getElementById('contactBox');
    const closeContact = document.getElementById('closeContact');
    const overlay = document.getElementById('overlay');

    if (contactButton && contactBox && closeContact && overlay) {
        contactButton.addEventListener('click', function() {
            contactBox.style.display = 'block';
            overlay.style.display = 'block';
        });

        function closeContactBox() {
            contactBox.style.display = 'none';
            overlay.style.display = 'none';
        }

        closeContact.addEventListener('click', closeContactBox);

        overlay.addEventListener('click', closeContactBox);

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const contactInfo = document.getElementById('contactInfo').value;
                const message = document.getElementById('message').value;

                if(contactInfo && message) {
                    alert('Thank you! Your message has been sent.');
                    contactForm.reset();
                    closeContactBox();
                } else {
                    alert('Please fill out all fields.');
                }
            });
        }
    }

    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (darkModeToggle) {
        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Save dark mode preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', null);
            }
        });
    }

    // Navigation highlight on scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;

    function stickyNavbar() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }

    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 10; // Adjust for navbar height
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function() {
        stickyNavbar();
        highlightNavOnScroll();
    });

    // Call once to set initial state
    stickyNavbar();
    highlightNavOnScroll();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ... rest of the existing code ...
});