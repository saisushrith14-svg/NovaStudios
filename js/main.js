/**
 * Nova Studios — Theme and Navigation Controller
 * Handles Light/Dark mode settings, localStorage persistence, and mobile menu toggling.
 */

// 1. Immediate Execution (Pre-render) to prevent Flash of Unstyled Content (FOUC)
(function () {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // No preference saved: check system media query
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    } catch (e) {
        console.error('Failed to parse saved theme settings', e);
    }
})();

// 2. DOM Interactive Setup
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Handler
    const themeToggles = document.querySelectorAll('.theme-toggle');

    const updateThemeUI = (theme) => {
        themeToggles.forEach(toggle => {
            toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
            toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        });
    };

    // Initialize UI states
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeUI(currentTheme);

    // Add click listeners to all theme toggles
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });
    });

    // Mobile Navigation Menu Toggle
    const navToggles = document.querySelectorAll('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggles.length > 0 && navLinks) {
        navToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        });
    }

    // Enable transition animations only after initial rendering is done
    // This stops components from animating from light to dark on page load.
    setTimeout(() => {
        document.documentElement.classList.add('theme-loaded');
    }, 150);
});
