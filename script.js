document.addEventListener('DOMContentLoaded', () => {
    // New code to ensure initial state is correct
    const aboutLinksList = document.querySelector('a[href="#about"] + .nav-links-list');
    const researchLinksList = document.querySelector('a[href="#research"] + .nav-links-list');
    aboutLinksList.style.display = 'none';
    researchLinksList.style.display = 'none';
    
    // ... the rest of your existing JavaScript code below ...
    
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    // ... and so on
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const backLinks = document.querySelectorAll('.back-to-research');
    const researchLinksList = document.querySelector('a[href="#research"] + .nav-links-list');
    const aboutLinksList = document.querySelector('a[href="#about"] + .nav-links-list');
    
    // Function to show a specific section and hide all others
    const showSection = (targetId) => {
        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }
    };

    // Handle clicks on main navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href').substring(1);
            showSection(targetId);

            // Toggle sub-links
            if (targetId === 'about') {
                if (aboutLinksList.style.display === 'none' || aboutLinksList.style.display === '') {
                    aboutLinksList.style.display = 'block';
                } else {
                    aboutLinksList.style.display = 'none';
                }
                researchLinksList.style.display = 'none';
            } else if (targetId === 'research') {
                if (researchLinksList.style.display === 'none' || researchLinksList.style.display === '') {
                    researchLinksList.style.display = 'block';
                } else {
                    researchLinksList.style.display = 'none';
                }
                aboutLinksList.style.display = 'none';
            } else {
                aboutLinksList.style.display = 'none';
                researchLinksList.style.display = 'none';
            }
        });
    });

    // Handle clicks on sub-navigation links
    subNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = event.currentTarget.dataset.target;
            showSection(targetId);
        });
    });

    // Handle "Back to" links
    backLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const parentSection = event.target.closest('.content-section').id;
            if (parentSection === 'solar-panels' || parentSection === 'neutrino-analysis' || parentSection === 'machine-learning') {
                showSection('research');
            } else {
                showSection('about');
            }
        });
    });
});