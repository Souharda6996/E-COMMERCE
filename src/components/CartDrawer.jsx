import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

function CartDrawer({ onCheckout }) {
    const {
        isCartOpen,
        closeCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    // ... (keep useEffect)

    const handleProceed = () => {
        closeCart();
        if (onCheckout) onCheckout();
    };

    // ... inside return ...
    // <button className="checkout-btn" onClick={handleProceed}>Proceed to Checkout</button>

    // Prevent background scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={closeCart}></div>
            <div className="cart-drawer">
                <div className="cart-header">
                    <h2>Your Shopping Bag ({cartItems.length})</h2>
                    <button className="close-btn" onClick={closeCart}>
                        ✕
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your bag is empty.</p>
                            <button className="continue-btn" onClick={closeCart}>Start Shopping</button>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={`${item.id}-${item.size}-${index}`} className="cart-item">
                                <div className="cart-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-header">
                                        <h3>{item.name}</h3>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            aria-label="Remove item"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="item-variant">Size: {item.size}</p>
                                    <p className="item-price">₹{item.price}</p>

                                    <div className="item-controls">
                                        <div className="qty-selector">
                                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <p className="shipping-note">Shipping & taxes calculated at checkout</p>
                        <button className="checkout-btn" onClick={() => { closeCart(); onCheckout(); }}>Proceed to Checkout</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartDrawer;
