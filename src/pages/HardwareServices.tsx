import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function HardwareServices() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Professional Hardware & Tools</h1>
        <p style={styles.subtitle}>
          Quality tools and equipment for professionals and DIY enthusiasts
        </p>
      </div>

      <div style={styles.productsGrid}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={styles.productCard}
          >
            <div style={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.productImage}
              />
              <span style={styles.categoryBadge}>{product.category}</span>
            </div>
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productDescription}>{product.description}</p>
              <div style={styles.productFooter}>
                <span style={styles.price}>${product.price.toFixed(2)}</span>
                <span style={styles.viewDetails}>View Details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  hero: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
  },
  subtitle: {
    fontSize: '1.25rem',
    margin: 0,
    opacity: 0.9,
  },
  productsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '0.375rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  productInfo: {
    padding: '1.5rem',
  },
  productName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: '0 0 0.5rem 0',
    color: '#1a1a1a',
  },
  productDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: '0 0 1rem 0',
    lineHeight: 1.5,
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  viewDetails: {
    color: '#3b82f6',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
};
