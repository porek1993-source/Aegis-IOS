/* Language switch for the Aegis pages. The head script has already set
   html.lang-en or html.lang-cs before first paint; this wires the buttons,
   remembers the choice and keeps the title and description in step. */
(function () {
  var KEY = 'aegis.lang';
  var root = document.documentElement;

  function apply(lang) {
    root.classList.remove('lang-en', 'lang-cs');
    root.classList.add('lang-' + lang);
    root.lang = lang;
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    var description = root.getAttribute('data-description-' + lang);
    var meta = document.querySelector('meta[name="description"]');
    if (description && meta) meta.setAttribute('content', description);
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.classList.contains('lang-cs') ? 'cs' : 'en');
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (event) {
        var lang = event.currentTarget.getAttribute('data-set-lang');
        try { localStorage.setItem(KEY, lang); } catch (e) {}
        apply(lang);
        if (window.history && history.replaceState && /[?&]lang=|#cs$/.test(location.href)) {
          history.replaceState(null, '', location.pathname);
        }
      });
    }
  });
})();
