document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const externalLinks = document.querySelectorAll('.external-link'); // Targets links pointing to external files
    const backLinks = document.querySelectorAll('.back-to-research');
    const researchLinksList = document.querySelector('a[href="#research"] + .nav-links-list');
    const aboutLinksList = document.querySelector('a[href="#about"] + .nav-links-list');
    const dynamicContainer = document.getElementById('dynamic-content-container');
    
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
    
    // NEW: Function to fetch and display external content (The core of the dynamic loading)
    const fetchContent = async (url, targetContainer) => {
        try {
            const response = await fetch(url);
            
            // Check if file was found
            if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Clear the existing content and load the new HTML content
            targetContainer.innerHTML = html; 
            
            // Show the dynamic container where the content was placed
            showSection(targetContainer.id);
            
        } catch (error) {
            console.error('Error loading external content:', error);
            targetContainer.innerHTML = `<section><h2>Error</h2><p>Could not load content from ${url}. Please ensure the file exists and is correctly named.</p></section>`;
            showSection(targetContainer.id);
        }
    };

    // Initial state: hide sub-links
    aboutLinksList.style.display = 'none';
    researchLinksList.style.display = 'none';

    // Handle clicks on main navigation links (unchanged logic)
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
                // Hide dynamic container when clicking main links
                dynamicContainer.classList.remove('active');
                dynamicContainer.classList.add('hidden');
            }
        });
    });

    // Handle clicks on EXTERNAL LINKS (Triggers the Fetch API)
    externalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = event.currentTarget.getAttribute('href');
            fetchContent(url, dynamicContainer);
        });
    });

    // Handle clicks on internal sub-navigation links (now only necessary if you add more static pages later)
    subNavLinks.forEach(link => {
        // Exclude the external-link class from this logic
        if (!link.classList.contains('external-link')) {
             link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = event.currentTarget.dataset.target;
                showSection(targetId);
            });
        }
    });

    // Handle "Back to" links (must be updated to hide dynamic container)
    // The back link is inside the content of the external file, so it will be loaded into the dynamicContainer
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('back-to-research')) {
            event.preventDefault();
            showSection('research');
            // Hide dynamic container when going back to research
            dynamicContainer.classList.remove('active');
            dynamicContainer.classList.add('hidden');
        }
    });
});