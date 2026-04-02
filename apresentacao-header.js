/**
 * Menu mobile (hambúrguer) nas páginas de apresentação / introdução / encerramento / créditos.
 */
(function () {
    var toggle = document.querySelector('.header-menu-toggle');
    var drawer = document.getElementById('header-drawer-menu');
    if (!toggle || !drawer) return;

    var backdrop = drawer.querySelector('.header-mobile-drawer-backdrop');
    var closeBtn = drawer.querySelector('.header-mobile-drawer-close');

    function openMenu() {
        drawer.removeAttribute('hidden');
        drawer.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('header-drawer-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        drawer.setAttribute('hidden', '');
        drawer.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('header-drawer-open');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (drawer.hasAttribute('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !drawer.hasAttribute('hidden')) {
            closeMenu();
        }
    });
})();
