var tabs = document.querySelectorAll('.movie-tab');
var panels = document.querySelectorAll('.tab-panel');
if (tabs.length) {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
            }
            this.classList.add('active');
            for (var j = 0; j < panels.length; j++) {
                panels[j].classList.remove('active');
            }
            var idx = Array.prototype.indexOf.call(tabs, this);
            if (panels[idx]) {
                panels[idx].classList.add('active');
            }
        });
    }
}
