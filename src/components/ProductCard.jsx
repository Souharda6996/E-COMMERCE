import { useState, useRef } from 'react'
import './ProductCard.css'

function ProductCard({ product, onProductClick }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef(null)

  const handleImageError = (e) => {
    e.target.style.display = 'none'
  }

  const handleClick = () => {
    if (onProductClick) onProductClick(product)
  }

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }

  return (
    <div
      className="product-card"
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine overlay that follows mouse */}
      <div className="card-shine"></div>

      <div className="card-image-area">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
      </div>

      {/* Always-visible minimal info */}
      <div className="card-info">
        <h3>{product.name}</h3>
        <p className="card-price">₹{product.price}</p>
      </div>

      {/* Slide-up reveal on hover */}
      <div className="card-reveal">
        <div className="reveal-content">
          <p className="reveal-desc">{product.description}</p>
          <button className="reveal-btn" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
            View Details →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
