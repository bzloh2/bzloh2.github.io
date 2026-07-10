// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(ease * target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// INTERSECTION OBSERVER
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Counter observer — only fires once
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numEl = entry.target.querySelector('.stat-number');
            if (numEl && !numEl.classList.contains('counted')) {
                numEl.classList.add('counted');
                animateCounter(numEl);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    counterObserver.observe(card);
});

// Fade-in observer for sections
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Apply initial hidden state + observe
const animatedEls = document.querySelectorAll(
    '.service-card, .stat-card, .project-showcase, .contact-card, .video-section'
);
animatedEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ============================================
// NAV SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 40) {
        nav.style.borderBottomColor = 'rgba(255,255,255,0.12)';
    } else {
        nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
    }
}, { passive: true });
