import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './ProductModal.css';

// Generate deterministic "random" data from product id
const seededValue = (id, min, max, offset = 0) => {
    const val = ((id * 2654435761 + offset) >>> 0) % 1000;
    return min + (val / 1000) * (max - min);
};

const generateRating = (id) => {
    return Math.round(seededValue(id, 35, 50)) / 10; // 3.5 - 5.0
};

const generateReviewCount = (id) => {
    return Math.floor(seededValue(id, 12, 480, 7));
};

const generateMRP = (price) => {
    const markup = 1.35 + Math.random() * 0.25;
    return Math.round((price * markup) / 10) * 10;
};

const getSizes = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('footwear') || cat.includes('shoe')) {
        return ['6', '7', '8', '9', '10', '11'];
    }
    if (cat.includes('clothing') || cat.includes('sports')) {
        return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
    return ['One Size'];
};

const reviewNames = [
    'Aarav S.', 'Priya M.', 'Rohit K.', 'Sneha D.', 'Vikram P.',
    'Ananya R.', 'Karthik N.', 'Meera T.', 'Arjun B.', 'Divya G.'
];

const reviewTexts = [
    'Excellent quality! Exceeded my expectations. Would definitely recommend.',
    'Very happy with this purchase. The material feels premium and durable.',
    'Great value for money. Fits perfectly and looks amazing.',
    'Love the design and craftsmanship. Fast delivery too!',
    'Superb product! The attention to detail is impressive.',
    'Comfortable and stylish. Gets compliments every time I wear it.',
    'Worth every rupee. The quality is outstanding for this price range.',
    'Amazing product, exactly as described. Will buy again!',
];

const generateReviews = (id) => {
    const count = Math.min(3, Math.floor(seededValue(id, 2, 4, 3)));
    const reviews = [];
    for (let i = 0; i < count; i++) {
        const nameIdx = Math.floor(seededValue(id, 0, reviewNames.length, i * 13));
        const textIdx = Math.floor(seededValue(id, 0, reviewTexts.length, i * 17));
        const rating = Math.round(seededValue(id, 35, 50, i * 23)) / 10;
        const daysAgo = Math.floor(seededValue(id, 1, 60, i * 7));
        reviews.push({
            name: reviewNames[Math.floor(nameIdx)],
            text: reviewTexts[Math.floor(textIdx)],
            rating,
            date: `${daysAgo} days ago`,
        });
    }
    return reviews;
};

const StarRating = ({ rating, size = 16 }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<span key={i} className="star filled" style={{ fontSize: size }}>★</span>);
        } else if (i - rating < 1 && i - rating > 0) {
            stars.push(<span key={i} className="star half" style={{ fontSize: size }}>★</span>);
        } else {
            stars.push(<span key={i} className="star empty" style={{ fontSize: size }}>★</span>);
        }
    }
    return <span className="star-rating">{stars}</span>;
};

function ProductModal({ product, category, onClose }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [imageZoomed, setImageZoomed] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();

    const mrp = generateMRP(product.price);
    const discount = Math.round(((mrp - product.price) / mrp) * 100);
    const rating = generateRating(product.id);
    const reviewCount = generateReviewCount(product.id);
    const sizes = getSizes(category);
    const reviews = generateReviews(product.id);
    const sku = `NI-${product.id.toString().padStart(5, '0')}`;

    // Estimated delivery: 3-7 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const deliveryStr = deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short', month: 'short', day: 'numeric'
    });

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize && sizes[0] !== 'One Size') {
            alert('Please select a size');
            return;
        }

        const sizeToAdd = selectedSize || (sizes[0] === 'One Size' ? 'One Size' : sizes[0]);

        addToCart(product, quantity, sizeToAdd);

        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
            onClose(); // Optional: close modal after adding, or keep open
        }, 800);
    };

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-container">
                {/* Close button */}
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-body">
                    {/* LEFT: Image */}
                    <div className="modal-image-section">
                        <div
                            className={`modal-image-wrapper ${imageZoomed ? 'zoomed' : ''}`}
                            onMouseEnter={() => setImageZoomed(true)}
                            onMouseLeave={() => setImageZoomed(false)}
                        >
                            <img src={product.image} alt={product.name} className="modal-product-img" />
                        </div>
                        <div className="image-badges">
                            <span className="badge-discount">-{discount}% OFF</span>
                            <span className="badge-new">★ BESTSELLER</span>
                        </div>
                    </div>

                    {/* RIGHT: Details */}
                    <div className="modal-details-section">
                        {/* Title & Category */}
                        <p className="modal-category">{category}</p>
                        <h2 className="modal-product-name">{product.name}</h2>

                        {/* Rating */}
                        <div className="modal-rating-row">
                            <StarRating rating={rating} size={18} />
                            <span className="rating-number">{rating}</span>
                            <span className="rating-count">({reviewCount} reviews)</span>
                        </div>

                        {/* Pricing */}
                        <div className="modal-pricing">
                            <span className="sale-price">₹{product.price.toLocaleString('en-IN')}</span>
                            <span className="mrp-price">₹{mrp.toLocaleString('en-IN')}</span>
                            <span className="discount-tag">{discount}% off</span>
                        </div>
                        <p className="tax-info">Inclusive of all taxes</p>

                        {/* Size selector */}
                        <div className="modal-sizes">
                            <h4>Select Size</h4>
                            <div className="size-options">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="modal-quantity">
                            <h4>Quantity</h4>
                            <div className="quantity-controls">
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >−</button>
                                <span className="qty-value">{quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                >+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="modal-actions">
                            <button
                                className={`btn-add-cart ${addedToCart ? 'added' : ''}`}
                                onClick={handleAddToCart}
                            >
                                {addedToCart ? '✓ Added' : '🛒 Add to Cart'}
                            </button>
                            <button className="btn-buy-now" onClick={() => {
                                handleAddToCart();
                                setTimeout(() => {
                                    onClose();
                                    window.dispatchEvent(new Event('navigate-to-checkout'));
                                }, 100);
                            }}>⚡ Buy Now</button>
                        </div>

                        {/* Delivery Info */}
                        <div className="modal-info-card">
                            <div className="info-row">
                                <span className="info-icon">🚚</span>
                                <div>
                                    <strong>Free Delivery</strong>
                                    <p>On orders above ₹999. Estimated by <strong>{deliveryStr}</strong></p>
                                </div>
                            </div>
                            <div className="info-row">
                                <span className="info-icon">↩️</span>
                                <div>
                                    <strong>7-Day Easy Returns</strong>
                                    <p>Free returns & exchanges within 7 days</p>
                                </div>
                            </div>
                            <div className="info-row">
                                <span className="info-icon">🛡️</span>
                                <div>
                                    <strong>Genuine Product</strong>
                                    <p>100% authentic, quality assured</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Options */}
                        <div className="modal-payment">
                            <h4>Payment Options</h4>
                            <div className="payment-methods">
                                <div className="pay-method">
                                    <span className="pay-icon">💳</span>
                                    <span>Credit / Debit Card</span>
                                </div>
                                <div className="pay-method">
                                    <span className="pay-icon">📱</span>
                                    <span>UPI / Google Pay</span>
                                </div>
                                <div className="pay-method">
                                    <span className="pay-icon">🏦</span>
                                    <span>Net Banking</span>
                                </div>
                                <div className="pay-method">
                                    <span className="pay-icon">💵</span>
                                    <span>Cash on Delivery</span>
                                </div>
                                <div className="pay-method">
                                    <span className="pay-icon">📦</span>
                                    <span>EMI Available</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="modal-specs">
                            <h4>Product Details</h4>
                            <table className="specs-table">
                                <tbody>
                                    <tr><td>Description</td><td>{product.description}</td></tr>
                                    <tr><td>SKU</td><td>{sku}</td></tr>
                                    <tr><td>Category</td><td>{category}</td></tr>
                                    <tr><td>Availability</td><td className="in-stock">In Stock</td></tr>
                                    <tr><td>Seller</td><td>Namastey India Official</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Reviews */}
                        <div className="modal-reviews">
                            <h4>Customer Reviews</h4>
                            <div className="reviews-summary">
                                <div className="reviews-big-rating">
                                    <span className="big-number">{rating}</span>
                                    <div>
                                        <StarRating rating={rating} size={14} />
                                        <p>{reviewCount} ratings</p>
                                    </div>
                                </div>
                            </div>
                            <div className="reviews-list">
                                {reviews.map((rev, i) => (
                                    <div key={i} className="review-card">
                                        <div className="review-header">
                                            <StarRating rating={rev.rating} size={12} />
                                            <span className="review-author">{rev.name}</span>
                                            <span className="review-date">{rev.date}</span>
                                        </div>
                                        <p className="review-text">{rev.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
