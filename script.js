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
    // Handle clicks on main navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href').substring(1);
            showSection(targetId);

            // Hide/show the research links list
            if (targetId === 'research') {
                document.querySelector('.nav-links-list').style.display = 'block';
            } else {
                document.querySelector('.nav-links-list').style.display = 'none';
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