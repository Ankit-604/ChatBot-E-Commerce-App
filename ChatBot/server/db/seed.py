import sys
import os
import random
from faker import Faker

# Allow relative imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from extensions import db
from models import Product
from app import create_app

app = create_app()
fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    names = ["Smartphone", "Laptop", "Headphones", "Book", "Shirt", "Keyboard", "Shoes", "Tablet", "Watch", "Monitor"]

    image_urls = {
        "Smartphone": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Laptop": "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Headphones": "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lfGVufDB8fDB8fHww",
        "Book": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEJvb2t8ZW58MHx8MHx8fDA%3D",
        "Shirt": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Keyboard": "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8S2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
        "Shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "Tablet": "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGFibGV0fGVufDB8fDB8fHww",
        "Watch": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2F0Y2h8ZW58MHx8MHx8fDA%3D",
        "Monitor": "https://images.unsplash.com/photo-1588200908342-23b585c03e26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1vbml0b3J8ZW58MHx8MHx8fDA%3D"
    }

    category_map = {
        "Smartphone": "Electronics",
        "Laptop": "Electronics",
        "Headphones": "Electronics",
        "Book": "Books",
        "Shirt": "Clothing",
        "Keyboard": "Electronics",
        "Shoes": "Clothing",
        "Tablet": "Electronics",
        "Watch": "Accessories",
        "Monitor": "Electronics"
    }

    for i in range(100):
        product_type = random.choice(names)
        product_name = f"{product_type} {i}"
        image_url = image_urls.get(product_type, "https://via.placeholder.com/150")
        category = category_map.get(product_type, "Others")

        product = Product(
            name=product_name,
            category=category,
            price=round(random.uniform(50, 999), 2),
            description=fake.sentence(),
            image_url=image_url
        )
        db.session.add(product)

    db.session.commit()
    print("✅ 100+ mock products added successfully!")
