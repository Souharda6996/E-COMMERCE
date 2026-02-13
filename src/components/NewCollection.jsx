import { useState } from 'react'
import { productsData } from '../data/products.js'
import ProductModal from './ProductModal.jsx'
import './NewCollection.css'

function NewCollection() {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('')

    // Pick 8 items to showcase (from different categories for variety)
    // Indexes: Jackets 0, Dresses 0, T-Shirts 1, Bags 0, Footwear 0
    const showcasedProducts = [
        productsData[0].items[0], // Black Leather Biker Jacket
        productsData[1].items[0], // Floral Summer Sundress
        productsData[2].items[1], // Striped Polo Shirt
        productsData[4].items[0], // White Canvas Sneakers
        productsData[3].items[0], // Leather Tote Bag
        productsData[5].items[1], // High-Validation Sports Bra
        productsData[2].items[0], // Classic White Crew Neck
        productsData[0].items[1]  // Beige Trench Coat
    ]

    // We need to map back to category name for the modal
    const getProductCategory = (product) => {
        const foundGroup = productsData.find(group => group.items.includes(product));
        return foundGroup ? foundGroup.category : '';
    }

    const handleQuickView = (product) => {
        const category = getProductCategory(product);
        setSelectedProduct(product);
        setSelectedCategory(category);
    }

    return (
        <section id="collection" className="new-collection">
            <div className="collection-header">
                <h2 className="section-title">New Arrivals</h2>
                <p className="section-subtitle">Discover the latest trends for the season</p>
            </div>

            <div className="collection-grid">
                {showcasedProducts.map((product) => (
                    <div key={product.id} className="collection-card">
                        <div className="card-image-wrapper">
                            <img src={product.image} alt={product.name} loading="lazy" />
                            <div className="card-overlay">
                                <button
                                    className="quick-view-btn"
                                    onClick={() => handleQuickView(product)}
                                >
                                    Quick View
                                </button>
                            </div>
                            {product.discount && (
                                <span className="card-badge sale">-{product.discount}</span>
                            )}
                        </div>
                        <div className="card-details">
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-price">₹{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="collection-footer">
                <a href="#products" className="view-all-btn">View All Products</a>
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    category={selectedCategory}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    )
}

export default NewCollection
