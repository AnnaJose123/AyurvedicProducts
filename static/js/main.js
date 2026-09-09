/* Ayurvedic Products - Award-Winning Motion & Interaction Engine */

document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER COUNTER & TEAR-AWAY
    initPreloader();

    // 2. CUSTOM LERP CURSOR
    initCustomCursor();

    // 3. SPLIT TEXT HERO ENHANCEMENT
    initSplitTextHero();

    // 4. ORCHESTRATED SCROLL REVEALS
    initScrollReveals();

    // 5. MAGNETIC BUTTONS ("Book a visit" / CTAs)
    initMagneticButtons();

    // 6. AJAX CART & MODAL INTERACTIONS
    initCartAndModals();
});

/* ----------------------------------------------------
 * 1. Preloader (0 to 100% Counter + Translate Y Tear-away)
 * ---------------------------------------------------- */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const counterEl = document.getElementById('preloader-counter');
    const barEl = document.getElementById('preloader-bar-fill');

    if (!preloader || !counterEl) return;

    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 4;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            counterEl.textContent = '100%';
            if (barEl) barEl.style.width = '100%';
            
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = '';
            }, 300);
        } else {
            counterEl.textContent = `${count}%`;
            if (barEl) barEl.style.width = `${count}%`;
        }
    }, 40);
}

/* ----------------------------------------------------
 * 2. Custom Cursor (Lerped dot & expanding ring)
 * ---------------------------------------------------- */
function initCustomCursor() {
    // Check if device supports fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let dot = document.querySelector('.cursor-dot');
    let ring = document.querySelector('.cursor-ring');

    if (!dot) {
        dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
    }
    if (!ring) {
        ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(ring);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function render() {
        // High frequency lerp for smooth ring movement
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        dotX += (mouseX - dotX) * 0.4;
        dotY += (mouseY - dotY) * 0.4;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Expand cursor ring over hoverable items
    const hoverTargets = 'a, button, input, select, textarea, .btn-primary, .btn-secondary, .treatment-row, .magnetic-btn, .category-card, .product-card';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) {
            ring.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) {
            ring.classList.remove('cursor-hover');
        }
    });
}

/* ----------------------------------------------------
 * 3. Split-Text Hero Setup
 * ---------------------------------------------------- */
function initSplitTextHero() {
    const splitElements = document.querySelectorAll('.split-text-hero');
    splitElements.forEach(el => {
        if (el.dataset.splitDone) return;
        const text = el.innerText.trim();
        const words = text.split(/\s+/);
        el.innerHTML = '';

        words.forEach((word, index) => {
            const wrapper = document.createElement('span');
            wrapper.className = 'word-wrapper';
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.style.setProperty('--word-index', index);
            wordSpan.textContent = word + (index < words.length - 1 ? '\u00A0' : '');
            wrapper.appendChild(wordSpan);
            el.appendChild(wrapper);
        });

        el.dataset.splitDone = 'true';
    });
}

/* ----------------------------------------------------
 * 4. Orchestrated Scroll Reveals System
 * ---------------------------------------------------- */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach((el, index) => {
        // Set staggered reveal index if not preset
        if (!el.style.getPropertyValue('--reveal-index')) {
            el.style.setProperty('--reveal-index', (index % 5).toString());
        }
        revealObserver.observe(el);
    });
}

/* ----------------------------------------------------
 * 5. Magnetic Buttons ("Book a visit" / CTAs Nudge Effect)
 * ---------------------------------------------------- */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - btnCenterX) * 0.35;
            const deltaY = (e.clientY - btnCenterY) * 0.35;

            btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.03)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
    });
}

/* ----------------------------------------------------
 * 6. Cart AJAX & Modal Interactions
 * ---------------------------------------------------- */
function initCartAndModals() {
    // Quick Add to Cart via AJAX
    const addCartBtns = document.querySelectorAll('.js-add-cart-ajax');
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = btn.dataset.url;
            fetch(url, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const badge = document.querySelector('.cart-badge');
                    if (badge) {
                        badge.textContent = data.cart_count;
                        badge.style.transform = 'scale(1.4)';
                        setTimeout(() => badge.style.transform = 'scale(1)', 200);
                    }
                    showToast(data.message || 'Product added to cart!');
                }
            })
            .catch(err => {
                console.error('AJAX add to cart failed:', err);
                window.location.href = url;
            });
        });
    });

    // Dosha Quiz Modal Setup
    const openQuizBtn = document.getElementById('open-dosha-modal');
    const modal = document.getElementById('dosha-quiz-modal');
    const closeQuizBtn = document.getElementById('close-dosha-modal');

    if (openQuizBtn && modal) {
        openQuizBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    if (closeQuizBtn && modal) {
        closeQuizBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Toast helper
function showToast(message) {
    let toast = document.getElementById('ayur-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ayur-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '28px';
        toast.style.right = '28px';
        toast.style.background = '#0F150C';
        toast.style.color = '#C79A4B';
        toast.style.padding = '14px 24px';
        toast.style.borderRadius = '50px';
        toast.style.boxShadow = '0 12px 36px rgba(0,0,0,0.3)';
        toast.style.zIndex = '99999';
        toast.style.fontWeight = '600';
        toast.style.fontSize = '0.9rem';
        toast.style.border = '1px solid #C79A4B';
        toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-seedling" style="margin-right: 8px;"></i> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 3200);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
