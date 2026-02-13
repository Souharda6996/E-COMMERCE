import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = ({ onBack }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        // Snapshot order details before clearing cart
        const orderId = `NI-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderDetails({
            id: orderId,
            date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
            items: [...cartItems],
            total: cartTotal,
            customer: { ...formData },
            paymentMethod: 'Credit / Debit Card' // idealized for demo
        });

        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
            clearCart();
            window.scrollTo(0, 0);
        }, 2000);
    };

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="checkout-empty">
                <h2>Your bag is empty</h2>
                <button onClick={onBack} className="continue-btn">Continue Shopping</button>
            </div>
        );
    }

    if (step === 3 && orderDetails) {
        return (
            <div className="checkout-success-container">
                <div className="success-header">
                    <div className="success-icon-large">✓</div>
                    <h2>Thank you, {orderDetails.customer.firstName}!</h2>
                    <p>Your order has been placed successfully.</p>
                    <p className="email-note">We've sent a detailed confirmation to <strong>{orderDetails.customer.email}</strong></p>
                </div>

                <div className="order-receipt">
                    <div className="receipt-header">
                        <div className="receipt-brand">NAMASTEY INDIA</div>
                        <div className="receipt-meta">
                            <span>Order ID: <strong>#{orderDetails.id}</strong></span>
                            <span>Date: {orderDetails.date}</span>
                        </div>
                    </div>

                    <div className="receipt-body">
                        <div className="receipt-section customer-info">
                            <h4>Shipping Address</h4>
                            <p>{orderDetails.customer.firstName} {orderDetails.customer.lastName}</p>
                            <p>{orderDetails.customer.address}</p>
                            <p>{orderDetails.customer.city}, {orderDetails.customer.zip}</p>
                            <p>Phone: {orderDetails.customer.phone}</p>
                        </div>

                        <div className="receipt-section payment-info">
                            <h4>Payment Method</h4>
                            <p>{orderDetails.paymentMethod}</p>
                            <p className="payment-status">Paid via Secure Gateway</p>
                        </div>
                    </div>

                    <div className="receipt-items">
                        <h4>Order Summary</h4>
                        {orderDetails.items.map((item, i) => (
                            <div key={i} className="receipt-item-row">
                                <div className="r-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="r-item-details">
                                    <strong>{item.name}</strong>
                                    <span>Size: {item.size} | Qty: {item.quantity}</span>
                                </div>
                                <div className="r-item-price">₹{item.price * item.quantity}</div>
                            </div>
                        ))}
                    </div>

                    <div className="receipt-totals">
                        <div className="r-total-row"><span>Subtotal</span><span>₹{orderDetails.total}</span></div>
                        <div className="r-total-row"><span>Shipping</span><span>Free</span></div>
                        <div className="r-total-row"><span>Tax (Included)</span><span>₹{Math.round(orderDetails.total * 0.18)}</span></div>
                        <div className="r-total-row final"><span>Total</span><span>₹{orderDetails.total}</span></div>
                    </div>

                    <div className="receipt-footer">
                        <p>Need help? Contact us at support@namasteyindia.com</p>
                        <button className="download-btn" onClick={() => alert('Downloading Invoice PDF...')}>
                            📥 Download Invoice
                        </button>
                    </div>
                </div>

                <button onClick={onBack} className="continue-btn-large">Continue Shopping</button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <button onClick={onBack} className="back-link">← Return to Store</button>
                <div className="checkout-logo">NAMASTEY INDIA</div>
                <div className="secure-badge">🔒 Secure Checkout</div>
            </div>

            <div className="checkout-layout">
                {/* LEFT: Forms */}
                <div className="checkout-left">
                    <div className="checkout-steps">
                        <div className={`step ${step === 1 ? 'active' : 'completed'}`}>1. Shipping</div>
                        <div className={`step ${step === 2 ? 'active' : ''}`}>2. Payment</div>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleFormSubmit} className="checkout-form">
                            <div className="form-section">
                                <h3>Contact Information</h3>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-section">
                                <h3>Shipping Address</h3>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                                <div className="form-row">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="zip"
                                        placeholder="PIN Code"
                                        required
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button type="submit" className="checkout-btn-main">Continue to Payment</button>
                        </form>
                    ) : (
                        <div className="payment-section">
                            <div className="review-block">
                                <div className="review-row">
                                    <span>Contact</span>
                                    <span>{formData.email}</span>
                                    <button onClick={() => setStep(1)} className="edit-btn">Change</button>
                                </div>
                                <div className="review-row">
                                    <span>Ship to</span>
                                    <span>{formData.address}, {formData.city} {formData.zip}</span>
                                    <button onClick={() => setStep(1)} className="edit-btn">Change</button>
                                </div>
                            </div>

                            <h3>Payment Method</h3>
                            <div className="payment-options">
                                <label className="payment-option">
                                    <input type="radio" name="payment" defaultChecked />
                                    <span className="radio-custom"></span>
                                    <div className="option-details">
                                        <span className="option-title">Credit / Debit Card</span>
                                        <span className="option-desc">Secure payment via Razorpay/Stripe</span>
                                    </div>
                                    <div className="payment-icons">💳 🏦</div>
                                </label>
                                <label className="payment-option">
                                    <input type="radio" name="payment" />
                                    <span className="radio-custom"></span>
                                    <div className="option-details">
                                        <span className="option-title">UPI / Google Pay</span>
                                        <span className="option-desc">Pay directly from your bank app</span>
                                    </div>
                                    <div className="payment-icons">📱</div>
                                </label>
                                <label className="payment-option">
                                    <input type="radio" name="payment" />
                                    <span className="radio-custom"></span>
                                    <div className="option-details">
                                        <span className="option-title">Cash on Delivery (COD)</span>
                                        <span className="option-desc">Pay when you receive the order</span>
                                    </div>
                                    <div className="payment-icons">💵</div>
                                </label>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className={`checkout-btn-main ${isProcessing ? 'processing' : ''}`}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Pay ₹${cartTotal}`}
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT: Summary */}
                <div className="checkout-right">
                    <div className="order-summary">
                        {cartItems.map((item, i) => (
                            <div key={i} className="summary-item">
                                <div className="summary-img-wrapper">
                                    <img src={item.image} alt={item.name} />
                                    <span className="summary-qty">{item.quantity}</span>
                                </div>
                                <div className="summary-info">
                                    <h4>{item.name}</h4>
                                    <p>{item.size}</p>
                                </div>
                                <span className="summary-price">₹{item.price * item.quantity}</span>
                            </div>
                        ))}

                        <div className="summary-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="total-row final">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
