import { createContext, useContext, useState, useEffect, useRef } from 'react';
import '../components/Toast.css';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Persist cart in local storage
        try {
            const savedCart = localStorage.getItem('namastey_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error('Failed to load cart', e);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '' });
    const toastTimeoutRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.setItem('namastey_cart', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    }, [cartItems]);

    const showToastMessage = (message) => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

        setToast({ visible: true, message });

        toastTimeoutRef.current = setTimeout(() => {
            setToast({ visible: false, message: '' });
        }, 3000);
    };

    const addToCart = (product, quantity = 1, size = 'M') => {
        setCartItems(prev => {
            const existingItemIndex = prev.findIndex(
                item => item.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prev, { ...product, quantity, size }];
            }
        });
        // Don't auto-open cart, just show toast for better UX
        // setIsCartOpen(true); 
        showToastMessage(`Added to bag: ${product.name} (${size})`);

        // Trigger cart icon pulse event (optional, can be handled via custom event or state)
        window.dispatchEvent(new Event('cart-updated'));
    };

    const removeFromCart = (itemId, size) => {
        setCartItems(prev => prev.filter(item => !(item.id === itemId && item.size === size)));
    };

    const updateQuantity = (itemId, size, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev => {
            return prev.map(item =>
                item.id === itemId && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            toggleCart,
            openCart,
            closeCart,
            cartCount,
            cartTotal
        }}>
            {children}

            {/* Toast Notification Rendered Here */}
            <div className={`cart-toast ${toast.visible ? 'visible' : ''}`}>
                <span className="toast-icon">✓</span>
                <span className="toast-message">{toast.message}</span>
            </div>
        </CartContext.Provider>
    );
};
