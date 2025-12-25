import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Professional Tools & Hardware</h1>
          <p style={styles.heroSubtitle}>
            Everything you need for your next project. Quality tools, competitive prices.
          </p>
          <Link to="/hardware" style={styles.heroButton}>
            Shop Now
          </Link>
        </div>
      </section>

      <section style={styles.features}>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Fast Delivery</h3>
            <p style={styles.featureText}>
              Get your tools delivered quickly with our express shipping options
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🛡️</div>
            <h3 style={styles.featureTitle}>Quality Guarantee</h3>
            <p style={styles.featureText}>
              All products backed by manufacturer warranties and our satisfaction guarantee
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💰</div>
            <h3 style={styles.featureTitle}>Best Prices</h3>
            <p style={styles.featureText}>
              Competitive pricing on all tools and hardware with regular promotions
            </p>
          </div>
        </div>
      </section>

      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Project?</h2>
          <p style={styles.ctaText}>
            Browse our complete selection of professional-grade tools and hardware
          </p>
          <Link to="/hardware" style={styles.ctaButton}>
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
  },
  hero: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '6rem 2rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 700,
    margin: '0 0 1.5rem 0',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    margin: '0 0 2.5rem 0',
    opacity: 0.9,
    lineHeight: 1.5,
  },
  heroButton: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1.25rem 3rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.25rem',
    fontWeight: 600,
    transition: 'transform 0.2s',
  },
  features: {
    backgroundColor: '#f9fafb',
    padding: '5rem 2rem',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1.5rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
    color: '#1a1a1a',
  },
  featureText: {
    fontSize: '1rem',
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.6,
  },
  cta: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '5rem 2rem',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
  },
  ctaText: {
    fontSize: '1.25rem',
    margin: '0 0 2rem 0',
    opacity: 0.95,
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: 'white',
    color: '#3b82f6',
    padding: '1.25rem 3rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.125rem',
    fontWeight: 600,
  },
};
