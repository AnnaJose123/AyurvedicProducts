/* Ayurvedic Products - Main Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
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
                    // Update header cart count
                    const badge = document.querySelector('.cart-badge');
                    if (badge) {
                        badge.textContent = data.cart_count;
                        badge.style.transform = 'scale(1.3)';
                        setTimeout(() => badge.style.transform = 'scale(1)', 200);
                    }
                    showToast(data.message || 'Product added to cart!');
                }
            })
            .catch(err => {
                console.error('Add to cart failed:', err);
                window.location.href = url; // Fallback normal request
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
});

// Toast notification helper
function showToast(message) {
    let toast = document.getElementById('ayur-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ayur-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.background = '#0f382c';
        toast.style.color = '#d4af37';
        toast.style.padding = '14px 24px';
        toast.style.borderRadius = '50px';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        toast.style.zIndex = '9999';
        toast.style.fontWeight = '600';
        toast.style.fontSize = '0.9rem';
        toast.style.transition = 'all 0.3s ease';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-leaf" style="margin-right: 8px;"></i> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 3000);
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
