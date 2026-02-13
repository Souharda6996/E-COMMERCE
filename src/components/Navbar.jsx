import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onNavigate, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const { openCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger pulse animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Home', action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); } },
    { label: 'New Arrivals', action: () => { onNavigate('all', 'All'); setIsOpen(false); } },
    { label: 'Men', action: () => { onNavigate('men', 'All'); setIsOpen(false); } },
    { label: 'Women', action: () => { onNavigate('women', 'All'); setIsOpen(false); } },
    { label: 'About', action: () => { document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); } },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href="#" onClick={(e) => { e.preventDefault(); item.action(); }}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="logo-text">NAMASTEY INDIA</a>
        </div>

        <div className="nav-right">
          <ul className="nav-icons">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('all', 'All'); }} title="Shop">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); if (onLoginClick) onLoginClick(); }} title="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); openCart(); }} title="Cart" className={`cart-icon-wrapper ${cartPulse ? 'pulse' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </a></li>
          </ul>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
