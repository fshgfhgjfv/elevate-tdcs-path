import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Zap, 
  AlertTriangle,
  Check
} from 'lucide-react';
import { hardwareProducts } from '../data/hardwareProducts';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items } = useCart();
  const [product, setProduct] = useState(hardwareProducts.find(p => p.id === id));
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const found = hardwareProducts.find(p => p.id === id);
    setProduct(found);
    if (found) setActiveImage(0);
  }, [id]);

  // Check if already in cart
  const isInCart = product ? items.some(item => item.id === product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 mb-4 text-red-500" />
        <h1 className="text-4xl font-bold mb-2">404: TARGET NOT FOUND</h1>
        <Link to="/services/hardware" className="px-6 py-3 bg-green-600 text-black font-bold rounded">RETURN TO ARMORY</Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.salePrice,
      originalPrice: product.originalPrice,
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans pt-20 pb-12">
      <div className="container mx-auto px-4">
        
        <Link to="/services/hardware" className="inline-flex items-center text-green-500 hover:text-green-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hardware
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* IMAGES (Left Column) */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-800 bg-gray-900 group">
              <img 
                src={product.images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-green-600 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                {product.category}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                    activeImage === idx ? 'border-green-500' : 'border-transparent hover:border-gray-600'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS (Right Column) */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                </div>
                <span className={`text-sm font-bold ${product.isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                  {product.isOutOfStock ? 'OUT OF STOCK' : 'IN STOCK'}
                </span>
              </div>

              <div className="flex items-end space-x-4">
                <div className="text-4xl font-bold text-green-400">₹{product.salePrice.toLocaleString()}</div>
                <div className="text-xl text-gray-600 line-through mb-1">₹{product.originalPrice.toLocaleString()}</div>
                <div className="text-sm font-bold text-red-400 mb-2">({discount}% OFF)</div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Includes GST & All Taxes</p>
            </div>

            <div className="h-px bg-gray-800" />

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-green-500" /> Product Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-justify">{product.description}</p>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4 space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.isOutOfStock || isAdded}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] ${
                  product.isOutOfStock 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : isAdded || isInCart
                    ? 'bg-green-700 text-white'
                    : 'bg-green-600 text-black hover:bg-green-500 shadow-[0_0_15px_rgba(22,163,74,0.5)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>ADDED TO CART!</span>
                  </>
                ) : isInCart ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>IN YOUR CART</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    <span>{product.isOutOfStock ? 'UNAVAILABLE' : 'ADD TO ARSENAL'}</span>
                  </>
                )}
              </button>

              {isInCart && (
                <Link 
                  to="/hardware-checkout"
                  className="w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-200 transition-all"
                >
                  Proceed to Checkout →
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;