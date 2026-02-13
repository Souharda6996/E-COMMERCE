import './PromoBanner.css'

function PromoBanner() {
    return (
        <section className="promo-banner">
            <div className="promo-bg-pattern"></div>
            <div className="promo-content">
                <span className="promo-tag">LIMITED OFFER</span>
                <h2 className="promo-heading">15% discount</h2>
                <p className="promo-detail">on your first order — Use code <strong>NAMASTEY15</strong></p>
                <a href="#products" className="promo-cta">SHOP NOW</a>
            </div>
        </section>
    )
}

export default PromoBanner
