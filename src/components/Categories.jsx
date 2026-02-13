import './Categories.css'

const categories = [
    {
        name: 'JACKETS & COATS',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop&q=80'
    },
    {
        name: 'DRESSES & SKIRTS',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop&q=80'
    },
    {
        name: 'T-SHIRTS & TOPS',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec515c9?w=500&h=600&fit=crop&q=80'
    },
    {
        name: 'BAGS & ACCESSORIES',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop&q=80'
    },
    {
        name: 'FOOTWEAR',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop&q=80'
    },
    {
        name: 'ACTIVEWEAR',
        image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=500&h=600&fit=crop&q=80'
    }
]

function Categories({ onNavigate }) {
    const handleCategoryClick = (categoryName) => {
        // Map display name to standardized key or just pass directly
        if (onNavigate) {
            onNavigate('all', categoryName);
        }
    }

    return (
        <section className="categories">
            <div className="categories-container">
                <h2 className="categories-title">PRODUCT CATEGORIES</h2>
                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <a
                            key={index}
                            href="#products"
                            onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(cat.name);
                            }}
                            className="category-tile"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <img src={cat.image} alt={cat.name} loading="lazy" />
                            <div className="category-overlay">
                                <span className="category-name">{cat.name}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories
