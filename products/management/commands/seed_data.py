from django.core.management.base import BaseCommand
from products.models import Category, Product, Review

class Command(BaseCommand):
    help = 'Seeds database with authentic Ayurvedic products and categories'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting database seeding...'))

        # Categories
        cat_supplements, _ = Category.objects.get_or_create(
            name='Herbal Supplements',
            defaults={
                'description': 'Pure organic churna, capsules, and herbal formulations rooted in ancient Samhitas.',
                'icon': 'fa-capsules'
            }
        )
        cat_skincare, _ = Category.objects.get_or_create(
            name='Skincare & Radiance',
            defaults={
                'description': 'Kumkumadi tailams, ubtans, and herbal face elixirs for luminous natural skin.',
                'icon': 'fa-spa'
            }
        )
        cat_haircare, _ = Category.objects.get_or_create(
            name='Hair Care & Oils',
            defaults={
                'description': 'Bhringraj and Brahmi tailams for strong root nourishment and shiny hair.',
                'icon': 'fa-hand-holding-water'
            }
        )
        cat_immunity, _ = Category.objects.get_or_create(
            name='Immunity & Wellness',
            defaults={
                'description': 'Authentic Chyawanprash, Giloy Ghanvati, and rasayanas for vital Ojas vitality.',
                'icon': 'fa-shield-heart'
            }
        )
        cat_teas, _ = Category.objects.get_or_create(
            name='Herbal Teas & Elixirs',
            defaults={
                'description': 'Calming Tulsi, Kadha brews, and detox infusions tailored for your Dosha balance.',
                'icon': 'fa-mug-hot'
            }
        )

        # Products
        products_data = [
            {
                'category': cat_supplements,
                'name': 'Organic Ashwagandha Churna',
                'subtitle': '100% Pure Indian Ginseng Root Powder (Withania Somnifera)',
                'description': 'Ashwagandha is renowned as a premiere Rasayana herb. It calms the nervous system, alleviates chronic stress, enhances stamina, and restores deep restorative sleep patterns.',
                'ingredients': '100% Organic Ashwagandha Root Powder',
                'benefits': 'Reduces cortisol & stress, builds muscle strength, boosts memory and restful sleep.',
                'usage_instructions': 'Mix 1 tsp with warm milk or honey water twice daily before meals.',
                'price': 499.00,
                'discount_price': 399.00,
                'dosha_type': 'vata',
                'rating': 4.9,
                'review_count': 34,
                'stock': 45,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'
            },
            {
                'category': cat_skincare,
                'name': 'Kumkumadi Miraculous Beauty Fluid',
                'subtitle': 'Precious Kashmiri Saffron & 26 Ayurvedic Botanical Oils',
                'description': 'An ancient Royal Ayurvedic formulation infused with Kashmiri Saffron (Kesar), Lotus Pollen, and Sandalwood. Gently brightens skin tone, reduces pigmentation, and imparts a golden glow.',
                'ingredients': 'Kashmiri Saffron, Sandalwood Oil, Lotus Extract, Manjistha, Sesame Oil',
                'benefits': 'Diminishes dark spots, enhances natural complexion glow, deeply hydrates dry skin.',
                'usage_instructions': 'Apply 3-4 drops on clean face and gently massage in upward circular motions before sleep.',
                'price': 1299.00,
                'discount_price': 999.00,
                'dosha_type': 'pitta',
                'rating': 4.95,
                'review_count': 58,
                'stock': 30,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800'
            },
            {
                'category': cat_immunity,
                'name': 'Gold Chyawanprash Supreme',
                'subtitle': 'Enriched with Swarna Bhasma, Amla & 40+ Medicinal Herbs',
                'description': 'Crafted strictly according to Charaka Samhita. Contains wild Amla fruit jam packed with Vitamin C, Silver & Gold Leaf, Pippali, and pure Ghee to build immune defense.',
                'ingredients': 'Fresh Amla, Swarna Bhasma, Nagkesar, Cardamom, Organic Honey, A2 Cow Ghee',
                'benefits': 'Strengthens immune system, improves digestion, protects respiratory health.',
                'usage_instructions': 'Consume 1 tablespoon every morning followed by warm milk or water.',
                'price': 899.00,
                'discount_price': 749.00,
                'dosha_type': 'all',
                'rating': 4.88,
                'review_count': 42,
                'stock': 60,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=800'
            },
            {
                'category': cat_haircare,
                'name': 'Bringadi Intensive Hair Treatment Oil',
                'subtitle': 'Traditional Herbal Oil with Bhringraj, Amla & Indigo',
                'description': 'A 100% natural Ayurvedic hair therapy that prevents hair loss, premature greying, and dandruff. Cold-pressed sesame oil slow-cooked with fresh Bhringraj leaf juice.',
                'ingredients': 'Bhringraj, Amla, Indigo, Balloon Vine, Licorice, Sesame Oil',
                'benefits': 'Prevents hair fall, encourages thick growth, cools scalp, relieves headache.',
                'usage_instructions': 'Gently massage into scalp and roots 30 minutes before washing hair.',
                'price': 650.00,
                'discount_price': 549.00,
                'dosha_type': 'pitta',
                'rating': 4.82,
                'review_count': 27,
                'stock': 40,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800'
            },
            {
                'category': cat_supplements,
                'name': 'Triphala Digestive Detox Capsules',
                'subtitle': 'Synergistic Blend of Haritaki, Bibhitaki & Amalaki',
                'description': 'Triphala cleanses the GI tract, supports smooth bowel movements, promotes nutrient absorption, and acts as a powerful antioxidant detox for the whole body.',
                'ingredients': 'Organic Haritaki, Organic Bibhitaki, Organic Amalaki Extract',
                'benefits': 'Promotes digestive regularity, detoxes colon, supports healthy weight management.',
                'usage_instructions': 'Take 2 capsules with warm water before bedtime.',
                'price': 399.00,
                'discount_price': 349.00,
                'dosha_type': 'all',
                'rating': 4.76,
                'review_count': 19,
                'stock': 80,
                'is_featured': False,
                'image_url': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
            },
            {
                'category': cat_teas,
                'name': 'Holy Basil Tulsi Detox Infusion',
                'subtitle': 'Blend of Rama, Krishna & Vana Tulsi Leaves with Ginger',
                'description': 'A soothing, caffeine-free herbal tea crafted from three sacred varieties of Holy Basil. Uplifts mood, cleanses respiratory passages, and boosts cellular vitality.',
                'ingredients': 'Rama Tulsi, Krishna Tulsi, Vana Tulsi, Organic Dry Ginger, Lemongrass',
                'benefits': 'Relieves congestion, balances stress levels, rich in natural antioxidants.',
                'usage_instructions': 'Steep 1 tea bag or 1 tsp in boiling water for 3-5 minutes. Enjoy warm.',
                'price': 299.00,
                'discount_price': 249.00,
                'dosha_type': 'kapha',
                'rating': 4.90,
                'review_count': 31,
                'stock': 50,
                'is_featured': True,
                'image_url': 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800'
            },
            {
                'category': cat_skincare,
                'name': 'Haldi Chandan Glowing Face Ubtan',
                'subtitle': 'Pure Wild Turmeric, Sandalwood & Chickpea Flour Mask',
                'description': 'Traditional wedding day secret skin illuminator. Gently exfoliates dead skin cells, targets acne blemishes, and leaves skin soft and glowing.',
                'ingredients': 'Kasturi Manjal (Wild Turmeric), Chandan (Sandalwood), Besan, Rose Petal Powder',
                'benefits': 'Removes tan, unclogs pores, provides instant radiant skin texture.',
                'usage_instructions': 'Mix 1 tbsp with Rose Water or Raw Milk to make a paste. Apply for 15 mins then wash.',
                'price': 450.00,
                'discount_price': 380.00,
                'dosha_type': 'pitta',
                'rating': 4.85,
                'review_count': 22,
                'stock': 35,
                'is_featured': False,
                'image_url': 'https://images.unsplash.com/photo-1567928269937-ae145459809a?auto=format&fit=crop&q=80&w=800'
            },
            {
                'category': cat_supplements,
                'name': 'Brahmi Memory & Focus Tonic',
                'subtitle': 'Bacopa Monnieri Extract for Cognitive & Mental Clarity',
                'description': 'Known in Ayurveda as the Medhya Rasayana (mind sharpener). Brahmi improves concentration, reduces mental fatigue, and calms an overactive Mind.',
                'ingredients': 'Standardized Brahmi (Bacopa Monnieri) Leaf Extract',
                'benefits': 'Enhances focus and retention, reduces anxiety, supports brain neuron health.',
                'usage_instructions': 'Take 1 capsule twice daily with water after meals.',
                'price': 520.00,
                'discount_price': 449.00,
                'dosha_type': 'vata',
                'rating': 4.92,
                'review_count': 15,
                'stock': 40,
                'is_featured': False,
                'image_url': 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=800'
            }
        ]

        for pdata in products_data:
            product, created = Product.objects.get_or_create(
                name=pdata['name'],
                defaults=pdata
            )
            if created:
                # Add sample reviews
                Review.objects.create(
                    product=product,
                    user_name='Dr. Ananya Sharma',
                    rating=5,
                    comment='Outstanding quality! Pure authentic formulation that strictly adheres to classical texts.'
                )
                Review.objects.create(
                    product=product,
                    user_name='Rajesh Kumar',
                    rating=5,
                    comment='Felt a noticeable difference within just 7 days of regular use. Highly recommended!'
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with Ayurvedic products!'))
