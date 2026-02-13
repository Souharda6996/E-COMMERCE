import { useState, useEffect } from 'react'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import NewCollection from './components/NewCollection.jsx'
import Products from './components/Products.jsx'
import About from './components/About.jsx'
import PromoBanner from './components/PromoBanner.jsx'
import Founder from './components/Founder.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Checkout from './components/Checkout.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

function App() {
  const [activeGender, setActiveGender] = useState('all')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentView, setCurrentView] = useState('home') // 'home', 'checkout', 'login', 'signup'

  const handleNavigate = (gender, category) => {
    setCurrentView('home');
    setActiveGender(gender || 'all')
    setActiveCategory(category || 'All')
    // Defer scroll until after render if switching views
    setTimeout(() => {
      const productsSection = document.getElementById('products')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100);
  }

  const handleGoHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  }

  const handleCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  }

  const handleLoginNav = () => {
    setCurrentView('login');
    window.scrollTo(0, 0);
  }

  const handleAuthNavigation = (view) => {
    if (view === 'home') handleGoHome();
    else {
      setCurrentView(view);
      window.scrollTo(0, 0);
    }
  }

  // Listen for checkout events from deep components
  useEffect(() => {
    const handleEvent = () => handleCheckout();
    window.addEventListener('navigate-to-checkout', handleEvent);
    return () => window.removeEventListener('navigate-to-checkout', handleEvent);
  }, []);

  return (
    <CartProvider>
      <div className="App">
        {currentView === 'home' ? (
          <>
            <Navbar onNavigate={handleNavigate} onLoginClick={handleLoginNav} />
            <CartDrawer onCheckout={handleCheckout} />
            <Hero onNavigate={handleNavigate} />
            <NewCollection />
            <PromoBanner />
            <Products
              activeGender={activeGender}
              activeCategory={activeCategory}
              onGenderChange={setActiveGender}
              onCategoryChange={setActiveCategory}
            />
            <About />
            <Founder />
            <Footer onNavigate={handleNavigate} />
          </>
        ) : currentView === 'checkout' ? (
          <Checkout onBack={handleGoHome} />
        ) : currentView === 'login' ? (
          <Login onNavigate={handleAuthNavigation} onLogin={handleGoHome} />
        ) : (
          <Signup onNavigate={handleAuthNavigation} onSignup={handleGoHome} />
        )}
      </div>
    </CartProvider>
  )
}


export default App
