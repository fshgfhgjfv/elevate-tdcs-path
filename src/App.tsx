import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import HardwareServices from './pages/HardwareServices';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <CartProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hardware" element={<HardwareServices />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
