from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from .models import Category, Product, Review, Order, OrderItem
from django.db.models import Q

def home(request):
    featured_products = Product.objects.filter(is_featured=True)[:8]
    if not featured_products.exists():
        featured_products = Product.objects.all()[:8]
    categories = Category.objects.all()
    latest_products = Product.objects.all()[:4]
    
    context = {
        'featured_products': featured_products,
        'categories': categories,
        'latest_products': latest_products,
    }
    return render(request, 'index.html', context)

def product_list(request):
    products = Product.objects.all()
    category_slug = request.GET.get('category')
    dosha = request.GET.get('dosha')
    query = request.GET.get('q')
    sort = request.GET.get('sort', 'newest')

    selected_category = None
    if category_slug:
        selected_category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=selected_category)

    if dosha and dosha != 'all':
        products = products.filter(Q(dosha_type=dosha) | Q(dosha_type='all'))

    if query:
        products = products.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(ingredients__icontains=query) |
            Q(benefits__icontains=query)
        )

    if sort == 'price_low':
        products = products.order_by('price')
    elif sort == 'price_high':
        products = products.order_by('-price')
    elif sort == 'rating':
        products = products.order_by('-rating')
    else:
        products = products.order_by('-created_at')

    categories = Category.objects.all()
    context = {
        'products': products,
        'categories': categories,
        'selected_category': selected_category,
        'current_dosha': dosha,
        'search_query': query,
        'current_sort': sort,
    }
    return render(request, 'products/product_list.html', context)

def category_products(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = Product.objects.filter(category=category)
    context = {
        'category': category,
        'products': products,
        'categories': Category.objects.all(),
    }
    return render(request, 'products/category_products.html', context)

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    reviews = product.reviews.all()
    related_products = Product.objects.filter(category=product.category).exclude(id=product.id)[:4]
    
    context = {
        'product': product,
        'reviews': reviews,
        'related_products': related_products,
    }
    return render(request, 'products/product_detail.html', context)

def add_review(request, product_id):
    if request.method == 'POST':
        product = get_object_or_404(Product, id=product_id)
        user_name = request.POST.get('user_name', 'Anonymous User')
        rating = int(request.POST.get('rating', 5))
        comment = request.POST.get('comment', '')

        if comment:
            Review.objects.create(
                product=product,
                user_name=user_name,
                rating=rating,
                comment=comment
            )
            messages.success(request, 'Thank you! Your review has been published.')
        else:
            messages.error(request, 'Please provide a comment for your review.')

    return redirect('product_detail', slug=product.slug)

def cart_detail(request):
    cart = request.session.get('cart', {})
    cart_items = []
    subtotal = 0

    for product_id_str, quantity in cart.items():
        try:
            product = Product.objects.get(id=int(product_id_str))
            total_price = product.current_price * quantity
            subtotal += total_price
            cart_items.append({
                'product': product,
                'quantity': quantity,
                'total_price': total_price,
            })
        except Product.DoesNotExist:
            continue

    delivery_fee = 0 if subtotal > 499 or subtotal == 0 else 50
    grand_total = subtotal + delivery_fee

    context = {
        'cart_items': cart_items,
        'subtotal': subtotal,
        'delivery_fee': delivery_fee,
        'grand_total': grand_total,
    }
    return render(request, 'cart/cart_detail.html', context)

def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart = request.session.get('cart', {})
    product_id_str = str(product_id)

    qty = int(request.POST.get('quantity', 1)) if request.method == 'POST' else 1
    cart[product_id_str] = cart.get(product_id_str, 0) + qty

    request.session['cart'] = cart
    messages.success(request, f'Added {product.name} to your herbal cart!')

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        cart_count = sum(cart.values())
        return JsonResponse({'status': 'success', 'cart_count': cart_count, 'message': f'Added {product.name} to cart!'})

    return redirect(request.META.get('HTTP_REFERER', 'cart_detail'))

def update_cart(request, product_id):
    if request.method == 'POST':
        cart = request.session.get('cart', {})
        product_id_str = str(product_id)
        quantity = int(request.POST.get('quantity', 1))

        if quantity > 0:
            cart[product_id_str] = quantity
        else:
            cart.pop(product_id_str, None)

        request.session['cart'] = cart
        messages.info(request, 'Cart updated successfully.')

    return redirect('cart_detail')

def remove_from_cart(request, product_id):
    cart = request.session.get('cart', {})
    product_id_str = str(product_id)
    if product_id_str in cart:
        cart.pop(product_id_str)
        request.session['cart'] = cart
        messages.info(request, 'Item removed from your cart.')
    return redirect('cart_detail')

def checkout(request):
    cart = request.session.get('cart', {})
    if not cart:
        messages.warning(request, 'Your cart is empty.')
        return redirect('product_list')

    cart_items = []
    subtotal = 0
    for product_id_str, quantity in cart.items():
        try:
            product = Product.objects.get(id=int(product_id_str))
            total_price = product.current_price * quantity
            subtotal += total_price
            cart_items.append({
                'product': product,
                'quantity': quantity,
                'total_price': total_price,
            })
        except Product.DoesNotExist:
            continue

    delivery_fee = 0 if subtotal > 499 else 50
    grand_total = subtotal + delivery_fee

    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        address = request.POST.get('address')
        city = request.POST.get('city')
        state = request.POST.get('state')
        pincode = request.POST.get('pincode')
        payment_method = request.POST.get('payment_method', 'cod')

        if full_name and address and phone:
            order = Order.objects.create(
                full_name=full_name,
                email=email,
                phone=phone,
                address=address,
                city=city,
                state=state,
                pincode=pincode,
                payment_method=payment_method,
                total_amount=grand_total,
                is_paid=(payment_method != 'cod')
            )

            for item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    product=item['product'],
                    price=item['product'].current_price,
                    quantity=item['quantity']
                )

            request.session['cart'] = {}
            messages.success(request, 'Your Ayurvedic order has been placed successfully!')
            return redirect('order_success', order_number=order.order_number)
        else:
            messages.error(request, 'Please complete all required fields.')

    context = {
        'cart_items': cart_items,
        'subtotal': subtotal,
        'delivery_fee': delivery_fee,
        'grand_total': grand_total,
    }
    return render(request, 'cart/checkout.html', context)

def order_success(request, order_number):
    order = get_object_or_404(Order, order_number=order_number)
    context = {'order': order}
    return render(request, 'cart/order_success.html', context)

def dosha_quiz(request):
    dosha = request.GET.get('dosha', 'all')
    recommended_products = Product.objects.filter(Q(dosha_type=dosha) | Q(dosha_type='all'))[:6]
    return render(request, 'dosha_recommendations.html', {
        'dosha': dosha,
        'recommended_products': recommended_products,
    })
