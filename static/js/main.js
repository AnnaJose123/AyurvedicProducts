/* Panchakosha / AyurvedaVeda - Award-Winning Motion Mechanics */
document.addEventListener('DOMContentLoaded', () => {

    /* 1. Preloader Tear-Away (Counting Percentage) */
    const preloader = document.getElementById('preloader');
    const counterEl = document.querySelector('.preloader-counter');
    const progressEl = document.querySelector('.preloader-progress');

    if (preloader && counterEl) {
        let count = 0;
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 8) + 3;
            if (count >= 100) {
                count = 100;
                clearInterval(interval);

                counterEl.textContent = '100%';
                if (progressEl) progressEl.style.width = '100%';

                setTimeout(() => {
                    preloader.classList.add('loaded');
                    // Trigger hero split-text animation after preloader exit
                    triggerHeroAnimation();
                }, 300);
            } else {
                counterEl.textContent = count + '%';
                if (progressEl) progressEl.style.width = count + '%';
            }
        }, 30);
    } else {
        triggerHeroAnimation();
    }

    /* 2. Custom Cursor (Lerped Dot & Ring via requestAnimationFrame) */
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (dot && ring) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        function renderCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        // Expand cursor ring on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, input, select, textarea, .product-card-award, .dosha-card, .hover-target');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    /* 3. Split Text Hero Stagger Cascading Rise-In */
    function triggerHeroAnimation() {
        const splitTitles = document.querySelectorAll('.hero-title-split');
        splitTitles.forEach(title => {
            if (!title.dataset.splitDone) {
                const words = title.innerText.trim().split(/\s+/);
                title.innerHTML = words.map((word, index) => {
                    return `<span class="word-wrap"><span class="word-inner" style="transition-delay: ${index * 0.08}s">${word}</span></span>`;
                }).join(' ');
                title.dataset.splitDone = 'true';
            }
            setTimeout(() => {
                title.classList.add('animated');
            }, 100);
        });
    }

    /* 4. Single IntersectionObserver for Orchestrated Scroll Reveals */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observerOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const index = Array.from(revealElements).indexOf(el) % 6;
                    el.style.transitionDelay = `${index * 0.12}s`;
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* 5. Magnetic Button Physics (Nudges toward cursor on hover) */
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            const offsetX = (e.clientX - btnCenterX) * 0.35;
            const offsetY = (e.clientY - btnCenterY) * 0.35;

            btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    /* 6. Quick AJAX Add to Cart */
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
                        setTimeout(() => badge.style.transform = 'scale(1)', 250);
                    }
                    showToast(data.message || 'Added to cart!');
                }
            })
            .catch(err => {
                window.location.href = url;
            });
        });
    });
});

// Toast notification helper
function showToast(message) {
    let toast = document.getElementById('ayur-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ayur-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '32px';
        toast.style.right = '32px';
        toast.style.background = '#C79A4B';
        toast.style.color = '#0F150C';
        toast.style.padding = '14px 28px';
        toast.style.borderRadius = '50px';
        toast.style.boxShadow = '0 12px 36px rgba(0,0,0,0.4)';
        toast.style.zIndex = '99999';
        toast.style.fontWeight = '700';
        toast.style.fontSize = '0.9rem';
        toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-leaf" style="margin-right: 8px;"></i> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(24px)';
    }, 3200);
}

// Get CSRF Token Helper
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
