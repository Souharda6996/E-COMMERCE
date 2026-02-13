
const categoryMapping = {
    'JACKETS & COATS': (item) => ['Jacket', 'Coat', 'Blazer', 'Cardigan', 'Hoodie'].some(k => item.name.includes(k)),
    'DRESSES & SKIRTS': (item) => ['Dress', 'Skirt'].some(k => item.name.includes(k)),
    'T-SHIRTS & TOPS': (item) => ['Shirt', 'Top', 'T-Shirt', 'Polo'].some(k => item.name.includes(k)),
    'BAGS & ACCESSORIES': (item) => item.category.includes('Accessories') || ['Bag', 'Backpack', 'Handbag', 'Belt', 'Watch', 'Sunglasses', 'Cap', 'Scarf', 'Necklace', 'Earrings', 'Bracelet'].some(k => item.name.includes(k)),
    'FOOTWEAR': (item) => item.category.includes('Footwear') || ['Shoes', 'Sneakers', 'Boots', 'Loafers', 'Sandals', 'Heels', 'Flats'].some(k => item.name.includes(k)),
    'ACTIVEWEAR': (item) => item.category.includes('Sports') || ['Leggings', 'Bra', 'Joggers', 'Gym', 'Yoga'].some(k => item.name.includes(k)),
}

export { categoryMapping }
