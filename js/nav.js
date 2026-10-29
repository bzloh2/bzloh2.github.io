(() => {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.id = 'site-nav';
    nav.innerHTML = `
        <div class="site-nav-inner">
            <a href="/" class="site-nav-name">Brian Loh</a>
            <div class="site-nav-links">
                <a href="mailto:brianzloh@gmail.com" class="site-nav-link nav-email">📧 Email Me</a>
                <a href="/" class="site-nav-link nav-dev">💻 Developer</a>
                <a href="/socialmedia/" class="site-nav-link nav-social">🎥 Social</a>
                <a href="/gallery/" class="site-nav-link nav-gallery">📸 Gallery</a>
                <a href="/videos/" class="site-nav-link nav-videos">▶️ Videos</a>
                <a href="/marketing/" class="site-nav-link nav-marketing">📈 Marketing</a>
            </div>
        </div>
    `;

    const currentPath = window.location.pathname
        .replace(/index\.html$/, '')
        .replace(/\/?$/, '/');

    nav.querySelectorAll('.site-nav-link[href^="/"]').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.setAttribute('aria-current', 'page');
        }
    });

    document.body.prepend(nav);

    const updateScrollState = () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
})();
