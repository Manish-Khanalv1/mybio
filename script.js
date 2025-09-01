document.addEventListener('DOMContentLoaded', () => {
    const mainResearchLink = document.querySelector('a[href="#research"]');
    const researchLinksGroup = document.querySelector('.research-links-group');
    const sections = document.querySelectorAll('.content-section');
    const backLinks = document.querySelectorAll('.back-to-research');

    // Toggle the display of the research sub-links
    mainResearchLink.addEventListener('click', (event) => {
        event.preventDefault();
        researchLinksGroup.style.display = researchLinksGroup.style.display === 'none' ? 'block' : 'none';
    });

    // Handle clicks on sub-links
    researchLinksGroup.querySelectorAll('.sub-nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.dataset.target;
            
            sections.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            });
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }
        });
    });

    // Handle "Back to Research" links
    backLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            sections.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            });
            
            const researchSection = document.getElementById('research');
            researchSection.classList.remove('hidden');
            researchSection.classList.add('active');
        });
    });
});