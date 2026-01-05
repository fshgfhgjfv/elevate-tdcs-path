import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  AlertTriangle 
} from 'lucide-react';
import { hardwareProducts } from '../data/hardwareProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(hardwareProducts.find(p => p.id === id));
  const [activeImage, setActiveImage] = useState(0);

  // Re-run search if ID changes
  useEffect(() => {
    const found = hardwareProducts.find(p => p.id === id);
    setProduct(found);
    if (found) setActiveImage(0);
  }, [id]);

  // ERROR STATE: If product ID doesn't match anything in the list
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 mb-4 text-red-500" />
        <h1 className="text-4xl font-bold mb-2">404: TARGET NOT FOUND</h1>
        <p className="text-gray-400 mb-8">The hardware ID "{id}" could not be located in the database.</p>
        <Link 
          to="/services/hardware" 
          className="px-6 py-3 bg-green-600 text-black font-bold rounded hover:bg-green-500 transition-colors"
        >
          RETURN TO ARMORY
        </Link>
      </div>
    );
  }

  // CALCULATE DISCOUNT
  const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans pt-20 pb-12">
      <div className="container mx-auto px-4">
        
        {/* ✅ FIXED BACK BUTTON LINK */}
        <Link to="/services/hardware" className="inline-flex items-center text-green-500 hover:text-green-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hardware
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: IMAGES */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-800 bg-gray-900 group">
              <img 
                src={product.images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 bg-green-600 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                {product.category}
              </div>
            </div>

            {/* Thumbnail Gallery */}
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

          {/* RIGHT COLUMN: DETAILS */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
              
              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">{product.reviewCount} Verified Reviews</span>
                <span className="text-gray-500">|</span>
                <span className={`text-sm font-bold ${product.isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                  {product.isOutOfStock ? 'OUT OF STOCK' : 'IN STOCK'}
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-end space-x-4">
                <div className="text-4xl font-bold text-green-400">₹{product.salePrice.toLocaleString()}</div>
                <div className="text-xl text-gray-600 line-through mb-1">₹{product.originalPrice.toLocaleString()}</div>
                <div className="text-sm font-bold text-red-400 mb-2">({discount}% OFF)</div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Includes GST & All Taxes</p>
            </div>

            <div className="h-px bg-gray-800" />

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-green-500" />
                Product Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-justify">
                {product.description}
              </p>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
                Key Capabilities
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-green-500" />
                Technical Specifications
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr key={idx} className="border-b border-gray-800 last:border-0">
                        <td className="py-2 text-gray-500 font-medium">{spec.label}</td>
                        <td className="py-2 text-gray-200 font-mono text-right">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button 
                disabled={product.isOutOfStock}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] ${
                  product.isOutOfStock 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 text-black hover:bg-green-500 shadow-[0_0_15px_rgba(22,163,74,0.5)]'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{product.isOutOfStock ? 'UNAVAILABLE' : 'ADD TO ARSENAL'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-20 border-t border-gray-800 pt-12">
            <h2 className="text-2xl font-bold mb-8">Operator Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                        <div key={review.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-white">{review.author}</h4>
                                    <div className="flex text-yellow-400 text-sm mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-700'}`} 
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">{review.date}</span>
                            </div>
                            <p className="text-gray-400 text-sm italic">"{review.comment}"</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center text-gray-500 italic py-10">
                        No reviews recorded for this item yet. Be the first to deploy it.
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;