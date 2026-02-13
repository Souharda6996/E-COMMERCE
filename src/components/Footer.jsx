import './Footer.css'

function Footer({ onNavigate }) {
  const handleLinkClick = (e, gender, category) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(gender, category);
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <h3 className="footer-logo">NAMASTEY INDIA</h3>
          <p className="footer-tagline">Fashion for everyone. Premium quality, timeless style.</p>
          <div className="footer-social">
            <a href="#" title="Instagram" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" title="Twitter" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" title="Facebook" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">CATALOG</h4>
          <ul className="footer-links">
            <li><a href="#products" onClick={(e) => handleLinkClick(e, 'all', 'All')}>New Collection</a></li>
            <li><a href="#products" onClick={(e) => handleLinkClick(e, 'all', 'All')}>All Products</a></li>
            <li><a href="#products" onClick={(e) => handleLinkClick(e, 'men', 'All')}>Men's Wear</a></li>
            <li><a href="#products" onClick={(e) => handleLinkClick(e, 'women', 'All')}>Women's Wear</a></li>
            <li><a href="#products" onClick={(e) => handleLinkClick(e, 'all', 'BAGS & ACCESSORIES')}>Accessories</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">FOLLOW US</h4>
          <ul className="footer-links">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Pinterest</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">CONTACTS</h4>
          <ul className="footer-links">
            <li><a href="mailto:namasteyindia@gmail.com">namasteyindia@gmail.com</a></li>
            <li><a href="tel:+919876543210">+91 98765 43210</a></li>
            <li><span>Bangalore, India</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Namastey India. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
