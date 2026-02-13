import { useState, useEffect } from 'react'
import ProductCard from './ProductCard.jsx'
import ProductModal from './ProductModal.jsx'
import { productsData } from '../data/products.js'
import { categoryMapping } from '../utils/categoryMapping.js'
import './Products.css'

function Products({ activeGender, activeCategory, onGenderChange, onCategoryChange }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')

  // Filter products based on props
  const getFilteredProducts = () => {
    let filtered = productsData

    // 1. Filter by Gender
    if (activeGender !== 'all') {
      filtered = filtered.filter(p => p.gender === activeGender)
    }

    // 2. Filter by Category (if not 'All')
    if (activeCategory !== 'All') {
      // If we have a mapping function, use it
      if (categoryMapping[activeCategory]) {
        // We need to flatten the structure first to filter individual items
        // Wait, productsData is structued by categories: { gender, category, items: [] }
        // We need to filter *items* within categories or filter categories?
        // Let's filter items and restructure.

        const newStructure = []
        filtered.forEach(group => {
          const matchingItems = group.items.filter(item =>
            categoryMapping[activeCategory]({ ...item, category: group.category })
          )
          if (matchingItems.length > 0) {
            newStructure.push({ ...group, items: matchingItems })
          }
        })
        return newStructure
      } else {
        // Fallback simple filter if passed category name directly matches group category
        return filtered.filter(group => group.category === activeCategory)
      }
    }

    return filtered
  }

  const displayedProducts = getFilteredProducts()

  const handleProductClick = (product, category) => {
    setSelectedProduct(product)
    setSelectedCategory(category)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setSelectedCategory('')
  }

  return (
    <section id="products" className="products">
      <h2 className="section-title">Our Collections</h2>

      {/* Gender Filter Buttons */}
      <div className="gender-filter">
        {['all', 'men', 'women'].map(g => (
          <button
            key={g}
            className={`filter-btn ${activeGender === g ? 'active' : ''}`}
            onClick={() => {
              onGenderChange(g)
              onCategoryChange('All') // Reset category when switching gender
            }}
          >
            {g === 'all' ? 'All Products' : g === 'men' ? '👔 Men' : '👗 Women'}
          </button>
        ))}
      </div>

      {/* Active Category Tag (if selected) */}
      {activeCategory !== 'All' && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            background: '#f5f5f5',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            border: '1px solid #e0e0e0',
            color: '#1a1a1a'
          }}>
            Filtered by: <strong>{activeCategory}</strong>
            <button
              onClick={() => onCategoryChange('All')}
              style={{ marginLeft: '10px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#999' }}
            >✕</button>
          </span>
        </div>
      )}

      {/* Display Filtered Products */}
      {displayedProducts.length > 0 ? (
        displayedProducts.map((group, idx) => (
          <div key={idx} className="category-section">
            <h4 className="category-title">{group.category}</h4>
            <div className="products-grid">
              {group.items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={(p) => handleProductClick(p, group.category)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
          <p>No products found matching your selection.</p>
          <button
            onClick={() => { onGenderChange('all'); onCategoryChange('All'); }}
            className="filter-btn"
            style={{ marginTop: '1rem' }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      )}
    </section>
  )
}

export default Products
