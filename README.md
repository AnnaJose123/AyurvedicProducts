# AyurvedicProducts 🌿

A full-featured, visually stunning e-commerce web platform for authentic Ayurvedic products, organic herbs, and wellness remedies. Built using **Django** and a custom **Botanical Design System** with HTML5, CSS3, and JavaScript.

---

## 📖 Project Description

**AyurvedicProducts (AyurvedaVeda)** connects users with classical Ayurvedic science rooted in ancient Samhita wisdom. The platform allows patrons to explore organic churnas, facial elixirs, immunity rasayanas, and herbal teas crafted to balance the three Doshas—**Vata, Pitta, and Kapha**.

### Key Features:
- 🌿 **Herbal Catalog & Live Filtering**: Search herbs by name or ingredient, filter by category or Dosha type, and sort by price or popularity.
- 🔬 **Product Detail Views**: Comprehensive view of botanical ingredients, classical dosage instructions, health benefits, and customer ratings.
- ⭐ **Patron Reviews System**: Direct customer review submission and star rating display.
- 🛒 **Dynamic Shopping Cart**: Session-based cart with real-time badge updates, quantity modification, and free shipping calculation (Orders > ₹499).
- 💳 **Checkout & Order Receipt**: Streamlined order placement with Cash on Delivery (COD) and Instant UPI options, generating unique order tracking receipts (`AYUR-XXXXXXXX`).
- 🧘 **Interactive Dosha Assessment Quiz**: Mind-body consultation tool that analyzes skin and physical traits to recommend tailored herbal remedies.
- 🎨 **Botanical Design System**: Rich HSL color palette (Deep Emerald `#0f382c` & Warm Gold `#d4af37`), glassmorphism cards, micro-animations, and responsive layout.

---

## 🛠️ Technologies Used

- **Backend Framework**: Python 3.14, Django 6.1
- **Database**: SQLite3 (ORMs, migrations, custom seeding management command)
- **Frontend Layer**: HTML5 (Semantic Structure), Vanilla CSS3 (Custom Design System, Flexbox/Grid, CSS Variables, Glassmorphism), JavaScript ES6+ (Fetch API, Toast alerts, DOM manipulation)
- **Icons & Typography**: FontAwesome 6.5, Google Fonts (*Playfair Display* & *Plus Jakarta Sans*)
- **Image & Asset Handling**: Pillow (Python Imaging Library)

---

## ⚙️ Setup Instructions

### 1. Prerequisites
Ensure you have **Python 3.10+** and **Git** installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/AnnaJose123/AyurvedicProducts.git
cd AyurvedicProducts
```

### 3. (Optional) Create and Activate a Virtual Environment
- **Windows**:
  ```powershell
  python -m venv venv
  .\venv\Scripts\activate
  ```
- **macOS / Linux**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 🚀 How to Run the Django Project

### Step 1: Run Database Migrations
Apply the database migrations to set up SQLite schema for products, categories, reviews, and orders:
```bash
python manage.py migrate
```

### Step 2: Seed Sample Data
Populate the database with authentic Ayurvedic products, categories, and initial patron reviews using the built-in management command:
```bash
python manage.py seed_data
```

### Step 3: Start Development Server
Launch the Django local development server:
```bash
python manage.py runserver
```

### Step 4: Access the Application
Open your web browser and navigate to:
- 🌐 **Web Store**: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- ⚙️ **Django Admin Panel**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

*(To create an admin superuser, run `python manage.py createsuperuser` and follow the prompts).*

---

## 📂 Project Structure

```text
ayurvedic-products/
├── ayurvedic_products/      # Django Project Configuration (settings, urls, wsgi)
├── products/                # Main Application App
│   ├── management/
│   │   └── commands/
│   │       └── seed_data.py # Database Seeding Script
│   ├── models.py            # Category, Product, Review, Order, OrderItem models
│   ├── views.py             # App Logic & View Controllers
│   ├── urls.py              # URL Routes
│   ├── admin.py             # Django Admin Config
│   └── context_processors.py# Global Cart Count & Categories Processor
├── static/
│   ├── css/style.css        # Master Botanical CSS Design System
│   └── js/main.js           # AJAX Cart & Modal Interactions
├── templates/
│   ├── base.html            # Core Base Layout
│   ├── index.html           # Home Page
│   ├── dosha_recommendations.html # Dosha Quiz Results
│   ├── products/            # Catalog, Category, & Product Detail Templates
│   └── cart/                # Cart, Checkout, & Order Success Templates
├── manage.py                # Django CLI Tool
├── requirements.txt         # Dependencies
└── README.md                # Project Documentation
```

---

## ✒️ Author
Developed with ❤️ by **AnnaJose123**.
