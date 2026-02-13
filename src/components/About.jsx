import { useEffect, useRef, useState } from 'react'
import './About.css'

function About() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ products: 0, customers: 0, brands: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Counter animation logic
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const intervalTime = duration / steps

    const targets = { products: 500, customers: 50, brands: 15 } // 50k will be handled by string
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++

      setCounts(prev => ({
        products: Math.min(Math.floor((targets.products / steps) * currentStep), targets.products),
        customers: Math.min(Math.floor((targets.customers / steps) * currentStep), targets.customers),
        brands: Math.min(Math.floor((targets.brands / steps) * currentStep), targets.brands)
      }))

      if (currentStep >= steps) clearInterval(timer)
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section id="about" className={`about ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="about-container">
        <div className="about-text-col">
          <h2 className="about-heading">ABOUT US</h2>
          <div className="about-divider"></div>
          <p className="about-description">
            Welcome to <strong>Namastey India</strong> — where fashion meets tradition.
            We curate premium collections that blend contemporary style with timeless elegance.
            Every piece in our collection is thoughtfully selected to help you express your unique identity.
          </p>
          <p className="about-description">
            From everyday essentials to statement pieces, we believe that great style should be accessible to everyone.
            Our commitment to quality and craftsmanship ensures that each product delivers both comfort and confidence.
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">{counts.products}+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">{counts.customers}K+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{counts.brands}+</span>
              <span className="stat-label">Brands</span>
            </div>
          </div>
        </div>
        <div className="about-images-col">
          <div className="about-image-grid-3d">
            <div className="about-img about-img-large">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop&q=80"
                alt="Clothing Store Interior"
                loading="lazy"
              />
            </div>
            <div className="about-img about-img-small">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=350&fit=crop&q=80"
                alt="Fashion Shopping"
                loading="lazy"
              />
            </div>
            {/* Decorative parallax element */}
            <div className="about-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
