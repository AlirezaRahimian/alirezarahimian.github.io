let navbar;
let navbarTop=0;
let isInitialized = false;
let currentSection = '';

function updateActiveNavItem(navItems, activeIndex) {
    navItems.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize function
function initNavbar() {
    console.log('Initializing navbar...');
    navbar = document.getElementById('navbar');
    if (navbar) {
        console.log('Navbar found, setting navbarTop...');
        navbarTop = navbar.offsetTop;
        console.log('navbarTop set to:', navbarTop);
        isInitialized = true;
        console.log('Navbar initialized successfully.');
        
        // Add event listeners only after initialization
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Initial call to set the navbar state
        stickyNavbar();
        updateNavigation();
    } else {
        console.error('Navbar element not found');
    }
}

function handleScroll() {
    if (isInitialized) {
        stickyNavbar();
        updateNavigation();
    } else {
        console.warn('Scroll event triggered before initialization');
    }
}

function handleResize() {
    if (isInitialized) {
        console.log('Resizing, updating navbarTop...');
        navbarTop = navbar.offsetTop;
        console.log('navbarTop updated to:', navbarTop);
        stickyNavbar();
    }
}

function stickyNavbar() {
    if (!isInitialized) {
        console.warn('Attempting to make navbar sticky before initialization');
        return;
    }
    
    if (window.scrollY >= navbarTop) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}



function updateNavigation() {
    if (!isInitialized) {
        console.warn('Attempting to update navigation before initialization');
        return;
    }
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - navbar.offsetHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const newSection = section.getAttribute('id');
            if (newSection !== currentSection) {
                currentSection = newSection;
                updateActiveNavItem(navItems, index);
            }
        }
    });
}

// Ensure initialization happens after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded, initializing navbar...');
    initNavbar();
});

// Add this single event listener
document.addEventListener('DOMContentLoaded', initNavbar);

// If you need to call stickyNavbar elsewhere, always check isInitialized first

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

    // Experience modal functionality
    const modal = document.getElementById('experience');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        const experienceData = {
            'tech-innovators': {
                title: 'Tech Innovators Inc.',
                role: 'Senior Product Manager',
                dates: '2020 - Present',
                details: 'Led cross-functional teams to deliver innovative products, resulting in a 30% increase in user engagement and a 25% boost in revenue. Implemented agile methodologies to streamline product development processes and improve time-to-market by 40%.',
                skills: ['Product Management', 'Agile Methodologies', 'User Experience', 'Data Analysis'],
                images: ['Images/image1.jpg', 'Images/image2.jpg']
            },
            'digital-solutions': {
                title: 'Digital Solutions Co.',
                role: 'UX/UI Designer',
                dates: '2018 - 2020',
                details: 'Redesigned core product interface, improving user satisfaction scores by 40% and reducing customer support tickets by 25%. Conducted user research and usability testing to inform design decisions.',
                skills: ['UI/UX Design', 'User Research', 'Prototyping', 'Usability Testing'],
                images: ['Images/image1.jpg', 'Images/image2.jpg']
            },
            'webcraft-studios': {
                title: 'WebCraft Studios',
                role: 'Web Developer',
                dates: '2016 - 2018',
                details: 'Developed responsive web applications, increasing mobile user engagement by 50%. Implemented modern front-end technologies to enhance user experience and improve website performance.',
                skills: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Front-end Frameworks'],
                images: ['Images/image1.jpg', 'Images/image2.jpg']
            },
            'agile-innovations': {
                title: 'Agile Innovations Ltd.',
                role: 'Scrum Master',
                dates: '2015 - 2016',
                details: 'Facilitated agile processes for multiple teams, improving sprint velocity by 35%. Implemented and optimized Scrum and Kanban methodologies to enhance team productivity and project outcomes.',
                skills: ['Agile Methodologies', 'Scrum', 'Kanban', 'Team Leadership'],
                images: ['Images/image1.jpg', 'Images/image2.jpg']
            },
            'startup-accelerator': {
                title: 'StartUp Accelerator',
                role: 'Junior Developer',
                dates: '2014 - 2015',
                details: 'Assisted in MVP development for three successful startup launches. Collaborated with founders and senior developers to implement key features and functionalities for various web and mobile applications.',
                skills: ['Rapid Prototyping', 'Full-stack Development', 'Startup Ecosystem', 'Collaboration'],
                images: ['Images/image1.jpg', 'Images/image2.jpg']
            }
        };

        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('click', function(e) {
                const experienceId = this.dataset.experience;
                const data = experienceData[experienceId];

                if (data) {
                    document.getElementById('modalTitle').textContent = data.title;
                    document.getElementById('modalRole').textContent = data.role;
                    document.getElementById('modalDates').textContent = data.dates;
                    document.getElementById('modalDetails').textContent = data.details;

                    const skillsList = document.getElementById('modalSkills');
                    skillsList.innerHTML = '';
                    data.skills.forEach(skill => {
                        const li = document.createElement('li');
                        li.textContent = skill;
                        skillsList.appendChild(li);
                    });

                    // Set up image carousel
                    const imagesContainer = document.getElementById('modalImages');
                    imagesContainer.innerHTML = '';
                    currentImages = data.images;
                    currentImageIndex = 0;
                    showImage(currentImageIndex);

                    modal.style.display = 'block';
                } else {
                    console.warn(`No data found for experience: ${experienceId}`);
                }
            });
        });

        function showImage(index) {
            const imagesContainer = document.getElementById('modalImages');
            imagesContainer.innerHTML = `<img src="${currentImages[index]}" alt="Experience image">`;
        }

        document.getElementById('prevImage').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentImageIndex);
        });

        document.getElementById('nextImage').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            showImage(currentImageIndex);
        });

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    } else {
        console.warn('Experience modal element not found');
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    function asyncOperation() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Operation complete');
            }, 1000);
        });
    }

    asyncOperation()
        .then(result => console.log(result))
        .catch(error => console.error(error));

    window.addEventListener('message', event => {
        if (event.data.type === 'asyncOperation') {
            // Process the message
            asyncOperation()
                .then(result => {
                    event.source.postMessage({ type: 'response', data: result }, event.origin);
                })
                .catch(error => {
                    event.source.postMessage({ type: 'error', data: error.message }, event.origin);
                });
        }
    });
});