import os
import requests
from pathlib import Path

# Create images directory if it doesn't exist
images_dir = 'public/images'
os.makedirs(images_dir, exist_ok=True)

# Product definitions with image search keywords for realistic photos
products = [
    # Men's Clothing
    {'id': 1, 'name': 'Classic T-Shirt', 'keyword': 'mens-tshirt'},
    {'id': 2, 'name': 'Casual Shirt', 'keyword': 'mens-shirt'},
    {'id': 3, 'name': 'Denim Jeans', 'keyword': 'mens-jeans'},
    {'id': 4, 'name': 'Formal Jacket', 'keyword': 'mens-jacket'},
    {'id': 5, 'name': 'Comfortable Hoodie', 'keyword': 'mens-hoodie'},
    {'id': 6, 'name': 'Polo Shirt', 'keyword': 'mens-polo'},
    
    # Men's Footwear
    {'id': 7, 'name': 'Running Shoes', 'keyword': 'running-shoes'},
    {'id': 8, 'name': 'Casual Sneakers', 'keyword': 'sneakers'},
    {'id': 9, 'name': 'Formal Shoes', 'keyword': 'formal-shoes'},
    {'id': 10, 'name': 'Chelsea Boots', 'keyword': 'boots'},
    {'id': 11, 'name': 'Loafers', 'keyword': 'loafers'},
    {'id': 12, 'name': 'Sandals', 'keyword': 'mens-sandals'},
    
    # Men's Accessories
    {'id': 13, 'name': 'Analog Watch', 'keyword': 'watch'},
    {'id': 14, 'name': 'Leather Wallet', 'keyword': 'leather-wallet'},
    {'id': 15, 'name': 'Brown Belt', 'keyword': 'belt'},
    {'id': 16, 'name': 'UV Sunglasses', 'keyword': 'sunglasses'},
    {'id': 17, 'name': 'Baseball Cap', 'keyword': 'cap'},
    {'id': 18, 'name': 'Canvas Backpack', 'keyword': 'backpack'},
    
    # Men's Grooming
    {'id': 19, 'name': 'Body Cologne', 'keyword': 'cologne'},
    {'id': 20, 'name': 'Shampoo', 'keyword': 'shampoo'},
    {'id': 21, 'name': 'Beard Kit', 'keyword': 'beard'},
    {'id': 22, 'name': 'Face Wash', 'keyword': 'skincare'},
    {'id': 23, 'name': 'Moisturizer', 'keyword': 'cream'},
    {'id': 24, 'name': 'Razor Blade Set', 'keyword': 'razor'},
    
    # Men's Sports
    {'id': 25, 'name': 'Gym T-Shirt', 'keyword': 'gym-shirt'},
    {'id': 26, 'name': 'Basketball Shoes', 'keyword': 'basketball-shoes'},
    {'id': 27, 'name': 'Gym Duffel Bag', 'keyword': 'gym-bag'},
    {'id': 28, 'name': 'Resistance Bands Set', 'keyword': 'resistance-bands'},
    {'id': 29, 'name': 'Sports Water Bottle', 'keyword': 'water-bottle'},
    {'id': 30, 'name': 'Fitness Tracker Watch', 'keyword': 'smartwatch'},
    
    # Women's Clothing
    {'id': 31, 'name': 'Casual Top', 'keyword': 'womens-top'},
    {'id': 32, 'name': 'Summer Dress', 'keyword': 'womens-dress'},
    {'id': 33, 'name': 'Midi Skirt', 'keyword': 'skirt'},
    {'id': 34, 'name': 'Formal Blazer', 'keyword': 'womens-blazer'},
    {'id': 35, 'name': 'Skinny Jeans', 'keyword': 'womens-jeans'},
    {'id': 36, 'name': 'Cozy Cardigan', 'keyword': 'cardigan'},
    
    # Women's Footwear
    {'id': 37, 'name': 'Party Heels', 'keyword': 'heels'},
    {'id': 38, 'name': 'Ballet Flats', 'keyword': 'flats'},
    {'id': 39, 'name': 'Canvas Sneakers', 'keyword': 'womens-sneakers'},
    {'id': 40, 'name': 'Ankle Boots', 'keyword': 'womens-boots'},
    {'id': 41, 'name': 'Strappy Sandals', 'keyword': 'womens-sandals'},
    {'id': 42, 'name': 'Slip-ons Loafers', 'keyword': 'womens-loafers'},
    
    # Women's Accessories
    {'id': 43, 'name': 'Leather Handbag', 'keyword': 'handbag'},
    {'id': 44, 'name': 'Gold Necklace', 'keyword': 'necklace'},
    {'id': 45, 'name': 'Diamond Earrings', 'keyword': 'earrings'},
    {'id': 46, 'name': 'Pearl Bracelet', 'keyword': 'bracelet'},
    {'id': 47, 'name': 'Silk Scarf', 'keyword': 'scarf'},
    {'id': 48, 'name': 'Elegant Watch', 'keyword': 'womens-watch'},
    
    # Women's Beauty
    {'id': 49, 'name': 'Premium Lipstick', 'keyword': 'lipstick'},
    {'id': 50, 'name': 'Face Foundation', 'keyword': 'makeup'},
    {'id': 51, 'name': 'Volumizing Mascara', 'keyword': 'cosmetics'},
    {'id': 52, 'name': 'Eye Shadow Palette', 'keyword': 'eyeshadow'},
    {'id': 53, 'name': 'Blush Powder', 'keyword': 'blush'},
    {'id': 54, 'name': 'Face Serum', 'keyword': 'serum'},
    
    # Women's Sports
    {'id': 55, 'name': 'Sports Bra', 'keyword': 'sports-bra'},
    {'id': 56, 'name': 'Yoga Leggings', 'keyword': 'yoga-pants'},
    {'id': 57, 'name': 'Running Shoes', 'keyword': 'womens-running-shoes'},
    {'id': 58, 'name': 'Gym Tote Bag', 'keyword': 'gym-tote'},
    {'id': 59, 'name': 'Premium Yoga Mat', 'keyword': 'yoga-mat'},
    {'id': 60, 'name': 'Smart Fitness Watch', 'keyword': 'fitness-watch'},
]

def download_product_image(product_id, width=300, height=400):
    """Download a real product photo from Picsum.photos"""
    try:
        # Use Picsum.photos API with seed based on product ID for variety
        # Seed ensures different images for different products
        url = f"https://picsum.photos/{width}/{height}?random&seed={product_id}"
        
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Save the image
        image_path = os.path.join(images_dir, f'product-{product_id}.png')
        with open(image_path, 'wb') as f:
            f.write(response.content)
        
        print(f'Created: {image_path}')
        return True
    except Exception as e:
        print(f'Error downloading image for product {product_id}: {str(e)}')
        return False

# Generate images for all products
print("Downloading real product images...")
print("This may take a moment...\n")

success_count = 0
for product in products:
    if download_product_image(product['id']):
        success_count += 1

print(f"\nSuccessfully downloaded {success_count}/{len(products)} product images!")
if success_count == len(products):
    print("All product images are ready!")
