// Skip link visibility
var skipLink = document.querySelector('.skip-link');
// Hide the skip link when the user scrolls down, show it when they scroll back to the top
if (skipLink) {
    function updateSkipLink() {
        if (window.scrollY > 0) {
            skipLink.classList.add('hidden');
        } else {
            skipLink.classList.remove('hidden');
        }
    }
// Add event listener for scroll events to update the skip link visibility
    window.addEventListener('scroll', updateSkipLink);
// Add event listener for click events on the skip link to hide it when clicked
    skipLink.addEventListener('click', function () {
        skipLink.classList.add('hidden');
    });

    updateSkipLink();
}