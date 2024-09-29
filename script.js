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
});