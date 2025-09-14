document.addEventListener('DOMContentLoaded', () => {
    const mainResearchLink = document.querySelector('a[href="#research"]');
    const researchLinksGroup = document.querySelector('.research-links-group');
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const backLinks = document.querySelectorAll('.back-to-research');

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
            const targetId = event.currentTarget.getAttribute('href').substring(1); // Get the section ID
            showSection(targetId);
            
            // Toggle research sub-links visibility
            if (targetId === 'research') {
                researchLinksGroup.style.display = 'block';
            } else {
                researchLinksGroup.style.display = 'none';
            }
        });
    });

    // Handle clicks on research sub-links
    subNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.dataset.target;
            showSection(targetId);
        });
    });

    // Handle "Back to Research" links
    backLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showSection('research');
        });
    });
});