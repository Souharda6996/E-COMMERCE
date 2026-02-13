import { useState, useEffect, useCallback } from 'react'
import './Hero.css'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=800&fit=crop&q=80',
    label: '— NEW SEASON —',
    title: 'DRESS HERE\nAND BE IN STYLE',
    subtitle: 'Discover the latest trends for everyone',
    tag: 'WOMEN\'S COLLECTION'
  },
  {
    type: 'video',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&h=800&fit=crop&q=80', // Fallback
    videoSrc: 'https://videos.pexels.com/video-files/853870/853870-hd_1920_1080_25fps.mp4',
    label: '— MEN\'S FASHION —',
    title: 'REDEFINE\nYOUR LOOK',
    subtitle: 'Premium menswear crafted for the modern man',
    tag: 'MEN\'S COLLECTION'
  },
  {
    type: 'video',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1400&h=800&fit=crop&q=80', // Fallback
    videoSrc: 'https://videos.pexels.com/video-files/3205898/3205898-hd_1920_1080_25fps.mp4',
    label: '— WOMEN\'S FASHION —',
    title: 'ELEGANCE\nMEETS COMFORT',
    subtitle: 'Timeless pieces for every occasion',
    tag: 'WOMEN\'S EDIT'
  },
  {
    image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=1400&h=800&fit=crop&q=80',
    label: '— STREET STYLE —',
    title: 'BOLD &\nFEARLESS',
    subtitle: 'Urban fashion for men who stand out',
    tag: 'MEN\'S STREETWEAR'
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=800&fit=crop&q=80',
    label: '— EXCLUSIVE DROP —',
    title: 'THE ART OF\nDRESSING UP',
    subtitle: 'Curated styles for him & her',
    tag: 'UNISEX COLLECTION'
  }
]

function Hero({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    // Longer interval for videos to be appreciated
    const intervalTime = heroSlides[currentSlide].type === 'video' ? 8000 : 5000;
    const timer = setInterval(nextSlide, intervalTime)
    return () => clearInterval(timer)
  }, [nextSlide, currentSlide])

  const handleShopClick = () => {
    if (onNavigate) {
      onNavigate('all', 'All')
    } else {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
    }
  }

  const slide = heroSlides[currentSlide]

  return (
    <section id="home" className="hero">
      <div className="hero-slider">
        {/* Background images/videos */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`hero-slide-bg ${i === currentSlide ? 'active' : ''}`}
          >
            {s.type === 'video' ? (
              <video
                src={s.videoSrc}
                className="hero-slide-img"
                autoPlay
                muted
                loop
                playsInline
                poster={s.image}
                onLoadedData={() => {
                  // Optional: remove poster or handle loading state
                }}
              />
            ) : (
              <img src={s.image} alt={s.tag} className="hero-slide-img" />
            )}
          </div>
        ))}

        {/* Overlay */}
        <div className="hero-overlay">
          <div className="hero-content" key={currentSlide}>
            <div className="hero-frame">
              <span className="hero-tag">{slide.tag}</span>
              <p className="hero-label">{slide.label}</p>
              <h1 className="hero-title">
                {slide.title.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <button className="hero-cta" onClick={handleShopClick}>
                EXPLORE COLLECTION
              </button>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          className="slide-arrow slide-arrow-left"
          onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="slide-arrow slide-arrow-right"
          onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="slide-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`slide-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="slide-counter">
          <span className="counter-current">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="counter-divider">/</span>
          <span className="counter-total">{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="hero-badge">
        <span className="badge-text">NEW COLLECTION</span>
        <div className="badge-line"></div>
      </div>
    </section>
  )
}

export default Hero
