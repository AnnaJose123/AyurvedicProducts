def cart_and_categories(request):
    """
    Context processor to pass global context like categories list and cart item count to all templates.
    """
    from .models import Category
    try:
        categories = Category.objects.all()
    except Exception:
        categories = []

    cart = request.session.get('cart', {})
    cart_count = sum(cart.values()) if isinstance(cart, dict) else 0

    return {
        'all_categories': categories,
        'cart_count': cart_count,
    }
