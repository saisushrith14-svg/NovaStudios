// Skip link visibility
var skipLink = document.querySelector('.skip-link');
// Hide the skip link when the user scrolls down, show it when they scroll back to the top
if (skipLink) {
    function updateSkipLink() {
        if (window.scrollY > 0) {
            skipLink.classList.add('hidden');
            skipLink.classList.remove('show');
        } else {
            skipLink.classList.remove('hidden');
            skipLink.classList.add('show');
        }
    }

    window.addEventListener('scroll', updateSkipLink);

    skipLink.addEventListener('focus', function () {
        skipLink.classList.remove('hidden');
        skipLink.classList.add('show');
    });

    skipLink.addEventListener('blur', function () {
        if (window.scrollY > 0) {
            skipLink.classList.add('hidden');
            skipLink.classList.remove('show');
        }
    });

    skipLink.addEventListener('click', function () {
        skipLink.classList.add('hidden');
        skipLink.classList.remove('show');
    });

    updateSkipLink();
}