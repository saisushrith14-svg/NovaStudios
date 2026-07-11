document.addEventListener('DOMContentLoaded', function () {
  var filterBar = document.querySelector('.filter-bar');
  var grid = document.querySelector('.card-grid-4, .card-grid');
  if (!filterBar || !grid) return;

  var buttons = filterBar.querySelectorAll('.filter-btn');
  var cards = grid.children;

  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      Array.prototype.forEach.call(buttons, function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var selected = btn.textContent.trim();

      Array.prototype.forEach.call(cards, function (card) {
        var genreEl = card.querySelector('.genre');
        var genre = genreEl ? genreEl.textContent.trim() : '';

        // fallback: pull genre out of "X Seasons • Genre • Rating" text
        if (!genre) {
          var metaEl = card.querySelector('.show-meta');
          if (metaEl) {
            var parts = metaEl.textContent.split('•').map(function (s) { return s.trim(); });
            genre = parts[1] || '';
          }
        }

        var show = selected === 'All' || genre === selected;
        card.style.display = show ? '' : 'none';
      });
    });
  });
});