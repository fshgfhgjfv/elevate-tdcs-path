import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>Add some products to get started</p>
          <Link to="/hardware" style={styles.shopButton}>
            Shop Hardware
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (productId: string, delta: number, currentQuantity: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.cartContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Shopping Cart</h1>
          <button onClick={clearCart} style={styles.clearButton}>
            Clear Cart
          </button>
        </div>

        <div style={styles.cartItems}>
          {items.map((item) => (
            <div key={item.product.id} style={styles.cartItem}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={styles.itemImage}
              />
              <div style={styles.itemInfo}>
                <Link
                  to={`/product/${item.product.id}`}
                  style={styles.itemName}
                >
                  {item.product.name}
                </Link>
                <p style={styles.itemDescription}>{item.product.description}</p>
                <span style={styles.itemCategory}>{item.product.category}</span>
              </div>
              <div style={styles.itemActions}>
                <div style={styles.quantityControl}>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, -1, item.quantity)}
                    style={styles.quantityButton}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={styles.quantityValue}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, 1, item.quantity)}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
                <div style={styles.itemPricing}>
                  <span style={styles.itemPrice}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <span style={styles.unitPrice}>
                    ${item.product.price.toFixed(2)} each
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Subtotal:</span>
            <span style={styles.summaryValue}>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Shipping:</span>
            <span style={styles.summaryValue}>Free</span>
          </div>
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span style={styles.totalLabel}>Total:</span>
            <span style={styles.totalValue}>${totalPrice.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
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
  emptyCart: {
    maxWidth: '600px',
    margin: '4rem auto',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '4rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  emptyTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
    color: '#1a1a1a',
  },
  emptyText: {
    fontSize: '1.125rem',
    color: '#6b7280',
    margin: '0 0 2rem 0',
  },
  shopButton: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
  },
  cartContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    margin: 0,
    color: '#1a1a1a',
  },
  clearButton: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '2px solid #ef4444',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'grid',
    gridTemplateColumns: '150px 1fr auto',
    gap: '1.5rem',
    alignItems: 'center',
  },
  itemImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  itemName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  itemDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  itemCategory: {
    display: 'inline-block',
    backgroundColor: '#e5e7eb',
    color: '#1f2937',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 500,
    width: 'fit-content',
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-end',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #e5e7eb',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  quantityButton: {
    width: '36px',
    height: '36px',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  quantityValue: {
    width: '50px',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: 600,
    borderLeft: '1px solid #e5e7eb',
    borderRight: '1px solid #e5e7eb',
  },
  itemPricing: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.25rem',
  },
  itemPrice: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  unitPrice: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  removeButton: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: 'none',
    padding: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  summary: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    marginLeft: 'auto',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  summaryLabel: {
    fontSize: '1rem',
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1a1a1a',
  },
  totalRow: {
    paddingTop: '1rem',
    borderTop: '2px solid #e5e7eb',
    marginTop: '1rem',
  },
  totalLabel: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a1a1a',
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '1rem',
    fontSize: '1.125rem',
    fontWeight: 600,
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1.5rem',
  },
};
