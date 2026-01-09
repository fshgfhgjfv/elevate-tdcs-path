import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Zap, 
  AlertTriangle,
  Check,
  Shield,
  Truck,
  RotateCcw,
  Package,
  ChevronRight,
  Minus,
  Plus,
  Heart
} from 'lucide-react';
import { hardwareProducts } from '../data/hardwareProducts';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items } = useCart();
  const [product, setProduct] = useState(hardwareProducts.find(p => p.id === id));
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = hardwareProducts.find(p => p.id === id);
    setProduct(found);
    if (found) setActiveImage(0);
    setQuantity(1);
  }, [id]);

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
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.salePrice,
        originalPrice: product.originalPrice,
        category: product.category,
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = hardwareProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-gray-100 font-sans pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/services/hardware" className="hover:text-green-400 transition-colors">Hardware</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-green-400 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: Product Images */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 group">
              <img 
                src={product.images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discount}% OFF
                </div>
              )}
              <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                {product.category}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === idx 
                      ? 'border-green-500 ring-2 ring-green-500/30' 
                      : 'border-gray-800 hover:border-gray-600'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                    />
                  ))}
                  <span className="ml-2 font-semibold text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  product.isOutOfStock 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {product.isOutOfStock ? '● Out of Stock' : '● In Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-4xl md:text-5xl font-bold text-green-400">₹{product.salePrice.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full">
                  Save ₹{(product.originalPrice - product.salePrice).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" /> Product Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-medium">Quantity:</span>
                <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.isOutOfStock || isAdded}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
                    product.isOutOfStock 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-green-600 to-green-500 text-black hover:from-green-500 hover:to-green-400 shadow-[0_0_30px_rgba(22,163,74,0.4)]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      <span>{product.isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
                    </>
                  )}
                </button>
                <button className="p-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Checkout Button */}
              {isInCart && (
                <Link 
                  to="/hardware-checkout"
                  className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 transition-all"
                >
                  <Package className="w-5 h-5" />
                  Proceed to Checkout
                </Link>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <Truck className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-xs text-gray-400">Free Shipping<br/>Above ₹5000</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-xs text-gray-400">Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <RotateCcw className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-xs text-gray-400">7 Days<br/>Return Policy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
              {product.specifications.map((spec, idx) => (
                <div 
                  key={idx} 
                  className={`flex justify-between py-4 px-6 ${idx % 2 === 0 ? 'bg-gray-900/30' : ''} ${idx !== product.specifications.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  <span className="text-gray-400 font-medium">{spec.label}</span>
                  <span className="text-white font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link 
                  key={p.id} 
                  to={`/hardware/product/${p.id}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={p.images[0]} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-green-400 transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">₹{p.salePrice.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm line-through">₹{p.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;