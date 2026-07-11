(function () {
    'use strict';

    // Initialize floating "Back to Top" button
    initBackToTop();

    var toggle = document.querySelector('.nav-toggle');
    var navbar = document.querySelector('.navbar');
    if (!toggle || !navbar) return;

    // Initialize aria-expanded state on load
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function () {
        var isOpen = navbar.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close the menu after a navigation link is clicked
    var links = navbar.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            navbar.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navbar.classList.contains('nav-open')) {
            navbar.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });

    /**
     * Creates and initializes the Back to Top button
     */
    function initBackToTop() {
        if (document.getElementById('back-to-top')) return;

        var btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.setAttribute('title', 'Back to top');
        
        // Clean vector chevron-up SVG icon
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>';

        document.body.appendChild(btn);

        var isScrolling;
        window.addEventListener('scroll', function () {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
                toggleButtonVisibility(btn);
            }, 50);
        }, { passive: true });

        // Run check on load in case page starts scrolled down
        toggleButtonVisibility(btn);

        btn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            btn.blur();
        });
    }

    function toggleButtonVisibility(btn) {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }
})();