import { useRef, useEffect, useState } from 'react'
import './Founder.css'

function Founder() {
    const sectionRef = useRef(null)
    const cardRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    // Intersection Observer for scroll-triggered animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.15 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // 3D tilt effect on the photo card
    const handleMouseMove = (e) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        // Smoother, subtle tilt
        const rotateX = ((y - centerY) / centerY) * -5
        const rotateY = ((x - centerX) / centerX) * 5

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    const handleMouseLeave = () => {
        const card = cardRef.current
        if (!card) return
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }

    return (
        <section className={`founder ${isVisible ? 'founder-visible' : ''}`} ref={sectionRef}>
            {/* Animated Background Elements */}
            <div className="founder-bg-shape shape-1"></div>
            <div className="founder-bg-shape shape-2"></div>

            <div className="founder-container">
                {/* Photo Column */}
                <div className="founder-photo-col">
                    <div
                        className="founder-card-3d"
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="founder-card-shine"></div>
                        <div className="founder-img-wrapper">
                            <img
                                src="/images/founder.jpg"
                                alt="Souharda Mandal — Founder of Namastey India"
                                className="founder-img"
                            />
                        </div>
                        <div className="founder-card-border"></div>
                    </div>
                    <div className="founder-name-tag">
                        <span className="tag-line"></span>
                        <span className="tag-name">SOUHARDA MANDAL</span>
                        <span className="tag-role">Founder & CEO</span>
                    </div>
                </div>

                {/* Text Column */}
                <div className="founder-text-col">
                    <span className="founder-label fade-in-up delay-1">MEET THE FOUNDER</span>
                    <h2 className="founder-heading fade-in-up delay-2">The Vision Behind<br />Namastey India</h2>
                    <div className="founder-divider fade-in-up delay-3">
                        <span className="divider-diamond">◆</span>
                    </div>

                    <p className="founder-bio fade-in-up delay-4">
                        <strong>Souharda Mandal</strong> is the Founder of NAMASTEY INDIA, a brand created with a vision
                        to celebrate India's rich culture through modern fashion. With a strong passion for innovation
                        and entrepreneurship, he established NAMASTEY INDIA to bridge tradition with contemporary style.
                    </p>

                    <p className="founder-bio fade-in-up delay-5">
                        His vision is simple — to offer premium quality collections that reflect elegance, confidence,
                        and cultural pride. Every piece curated under NAMASTEY INDIA represents authenticity,
                        craftsmanship, and timeless Indian heritage blended with modern sophistication.
                    </p>

                    <p className="founder-bio fade-in-up delay-6">
                        As a founder, Souharda is committed to delivering excellence, trust, and a seamless shopping
                        experience to customers across the country.
                    </p>

                    <div className="founder-values fade-in-up delay-7">
                        <div className="value-item">
                            <div className="value-icon">✦</div>
                            <div>
                                <h4>Authenticity</h4>
                                <p>Celebrating true Indian heritage</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">✦</div>
                            <div>
                                <h4>Craftsmanship</h4>
                                <p>Attention to every detail</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">✦</div>
                            <div>
                                <h4>Excellence</h4>
                                <p>Premium quality guaranteed</p>
                            </div>
                        </div>
                    </div>

                    <blockquote className="founder-quote fade-in-up delay-8">
                        "Fashion is not just about clothing — it's about confidence, culture, and who you are."
                        <cite>— Souharda Mandal</cite>
                    </blockquote>
                </div>
            </div>
        </section>
    )
}

export default Founder
