// ============================================
// GALLERY SCRIPT — BRIAN LOH
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxLocation = document.getElementById('lightbox-location');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentIndex = 0;
    let visibleItems = [...items];

    const categoryHeaders = document.querySelectorAll('.category-header');

    // --------------------------------------------
    // FILTERING
    // --------------------------------------------
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter headers
            categoryHeaders.forEach(header => {
                const headerCat = header.dataset.category;
                if (filter === 'all' || headerCat === filter) {
                    header.style.display = 'block';
                    setTimeout(() => {
                        header.style.opacity = '1';
                        header.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    header.style.opacity = '0';
                    header.style.transform = 'translateY(-6px)';
                    setTimeout(() => {
                        header.style.display = 'none';
                    }, 200);
                }
            });

            // Filter photo items
            items.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 250);
                }
            });

            // Update visibleItems list for lightbox navigation
            visibleItems = items.filter(item => {
                const category = item.dataset.category;
                return filter === 'all' || category === filter;
            });
        });
    });

    // --------------------------------------------
    // LIGHTBOX LOGIC
    // --------------------------------------------
    function openLightbox(index) {
        if (index < 0) index = visibleItems.length - 1;
        if (index >= visibleItems.length) index = 0;

        currentIndex = index;
        const currentItem = visibleItems[currentIndex];

        if (!currentItem) return;

        const src = currentItem.dataset.src;
        const title = currentItem.dataset.title;
        const location = currentItem.dataset.location;
        const categoryLabel = currentItem.dataset.categoryLabel;
        const caption = currentItem.dataset.caption;

        lightboxImg.src = src;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxLocation.textContent = '📍 ' + location;
        lightboxCategory.textContent = categoryLabel;
        lightboxCaption.textContent = caption;
        lightboxCounter.textContent = `${currentIndex + 1} of ${visibleItems.length}`;

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function nextPhoto() {
        openLightbox(currentIndex + 1);
    }

    function prevPhoto() {
        openLightbox(currentIndex - 1);
    }

    // Attach click handlers to items
    items.forEach(item => {
        item.addEventListener('click', () => {
            const visibleIdx = visibleItems.indexOf(item);
            if (visibleIdx !== -1) {
                openLightbox(visibleIdx);
            }
        });
    });

    // Controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextPhoto(); });
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevPhoto(); });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    });

    // --------------------------------------------
    // NAV SCROLL EFFECT
    // --------------------------------------------
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.style.borderBottomColor = 'rgba(255,255,255,0.14)';
            nav.style.background = 'rgba(7, 9, 14, 0.94)';
        } else {
            nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
            nav.style.background = 'rgba(7, 9, 14, 0.82)';
        }
    }, { passive: true });
});
