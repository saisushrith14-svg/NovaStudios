document.addEventListener('DOMContentLoaded', function () {
    var faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question, index) {
        // Set accessibility attributes
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('tabindex', '0');

        var answer = question.nextElementSibling;
        if (answer) {
            var answerId = 'faq-answer-' + index;
            answer.setAttribute('id', answerId);
            question.setAttribute('aria-controls', answerId);
        }

        // Toggle handler
        function toggleAccordion() {
            var item = question.parentElement;
            var isActive = item.classList.contains('active');

            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                var span = question.querySelector('span');
                if (span) {
                    span.textContent = '+';
                }
            } else {
                // Collapse all other active items
                var activeItems = document.querySelectorAll('.faq-item.active');
                for (var i = 0; i < activeItems.length; i++) {
                    var activeItem = activeItems[i];
                    activeItem.classList.remove('active');
                    var activeQuestion = activeItem.querySelector('.faq-question');
                    if (activeQuestion) {
                        activeQuestion.setAttribute('aria-expanded', 'false');
                        var activeSpan = activeQuestion.querySelector('span');
                        if (activeSpan) {
                            activeSpan.textContent = '+';
                        }
                    }
                }

                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                var span = question.querySelector('span');
                if (span) {
                    span.textContent = '−'; // Unicode minus sign (U+2212)
                }
            }
        }

        // Click event listener
        question.addEventListener('click', toggleAccordion);

        // Keyboard navigation (Enter / Space)
        question.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleAccordion();
            }
        });
    });
});
