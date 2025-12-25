import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>
          <h2>Product not found</h2>
          <Link to="/hardware" style={styles.backLink}>
            Back to Hardware
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.breadcrumb}>
        <Link to="/hardware" style={styles.breadcrumbLink}>Hardware</Link>
        <span style={styles.breadcrumbSeparator}>/</span>
        <span>{product.name}</span>
      </div>

      <div style={styles.productContainer}>
        <div style={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
          />
        </div>

        <div style={styles.infoSection}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>

          <div style={styles.priceSection}>
            <span style={styles.price}>${product.price.toFixed(2)}</span>
          </div>

          <div style={styles.quantitySection}>
            <label style={styles.quantityLabel}>Quantity:</label>
            <div style={styles.quantityControl}>
              <button
                onClick={() => handleQuantityChange(-1)}
                style={styles.quantityButton}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span style={styles.quantityValue}>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                style={styles.quantityButton}
                disabled={quantity >= 99}
              >
                +
              </button>
            </div>
          </div>

          <button onClick={handleAddToCart} style={styles.addButton}>
            Add to Cart
          </button>

          {showSuccess && (
            <div style={styles.successMessage}>
              Added to cart successfully!
            </div>
          )}

          <div style={styles.featuresSection}>
            <h3 style={styles.sectionTitle}>Features</h3>
            <ul style={styles.featuresList}>
              {product.features.map((feature, index) => (
                <li key={index} style={styles.featureItem}>{feature}</li>
              ))}
            </ul>
          </div>

          {product.specifications && (
            <div style={styles.specificationsSection}>
              <h3 style={styles.sectionTitle}>Specifications</h3>
              <dl style={styles.specsList}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} style={styles.specItem}>
                    <dt style={styles.specKey}>{key}:</dt>
                    <dd style={styles.specValue}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '2rem',
  },
  breadcrumb: {
    maxWidth: '1200px',
    margin: '0 auto 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  breadcrumbLink: {
    color: '#3b82f6',
    textDecoration: 'none',
  },
  breadcrumbSeparator: {
    color: '#d1d5db',
  },
  notFound: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '4rem 0',
  },
  backLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '1rem',
    marginTop: '1rem',
    display: 'inline-block',
  },
  productContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    padding: '3rem',
  },
  imageSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    maxHeight: '500px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    display: 'inline-block',
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    padding: '0.375rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1rem',
    width: 'fit-content',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
    color: '#1a1a1a',
  },
  description: {
    fontSize: '1.125rem',
    color: '#6b7280',
    margin: '0 0 2rem 0',
    lineHeight: 1.6,
  },
  priceSection: {
    padding: '1.5rem 0',
    borderTop: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '2rem',
  },
  price: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  quantityLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a1a1a',
    transition: 'background-color 0.2s',
  },
  quantityValue: {
    width: '60px',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 600,
    borderLeft: '1px solid #e5e7eb',
    borderRight: '1px solid #e5e7eb',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: 600,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '1rem',
  },
  successMessage: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 600,
    marginBottom: '2rem',
  },
  featuresSection: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
    color: '#1a1a1a',
  },
  featuresList: {
    margin: 0,
    padding: '0 0 0 1.5rem',
    listStyle: 'disc',
  },
  featureItem: {
    color: '#4b5563',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  specificationsSection: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
  },
  specsList: {
    margin: 0,
    display: 'grid',
    gap: '0.75rem',
  },
  specItem: {
    display: 'flex',
    gap: '1rem',
  },
  specKey: {
    fontWeight: 600,
    color: '#1a1a1a',
    minWidth: '120px',
  },
  specValue: {
    color: '#6b7280',
    margin: 0,
  },
};
