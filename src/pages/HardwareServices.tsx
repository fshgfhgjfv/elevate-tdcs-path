import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Package } from 'lucide-react';
import { hardwareProducts } from '../data/hardwareProducts';
import { motion, AnimatePresence } from 'framer-motion';

const HardwareServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  
  // Rotating Text State
  const rotatingWords = ["Hardware", "Devices", "Gadgets", "Tools"];
  const [wordIndex, setWordIndex] = useState(0);

  // 1. Force White Background & Handle Text Rotation Timer
  useEffect(() => {
    // Background Styles
    const originalStyle = window.getComputedStyle(document.body).backgroundColor;
    const originalColor = window.getComputedStyle(document.body).color;
    document.body.style.setProperty('background-color', '#ffffff', 'important');
    document.body.style.setProperty('color', '#0f172a', 'important');

    // Rotation Timer
    const rotationTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);

    return () => {
      document.body.style.backgroundColor = originalStyle;
      document.body.style.color = originalColor;
      clearInterval(rotationTimer);
    };
  }, []);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(hardwareProducts.map(p => p.category.split('/')[0].trim())))];
  }, []);

  const filteredProducts = useMemo(() => {
    return hardwareProducts
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category.includes(selectedCategory);
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.salePrice - b.salePrice;
        if (sortBy === 'price-high') return b.salePrice - a.salePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const discount = (orig, sale) => Math.round(((orig - sale) / orig) * 100);

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4">

        {/* Header with Rotating Text */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 flex flex-col items-center justify-center gap-2">
            <span>Our Pre-Programmed</span>
            <div className="h-[1.2em] relative flex items-center justify-center min-w-[300px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-blue-600 absolute"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto">
            Professional-grade security tools, pre-configured and ready to deploy.
          </p>
        </div>

        {/* Notice Banner */}
        <div className="mb-8 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping absolute" />
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <p className="text-sm text-slate-600">
              📦 After payment, tracking ID is sent within <span className="text-blue-600 font-bold">1-2 hours</span>.
            </p>
          </div>
          <Link
            to="/track-parcel"
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm shadow-md"
          >
            <Package className="w-4 h-4" />
            Track Your Parcel
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search hardware..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Product Grid */}
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={`/hardware/product/${product.id}`}
                    className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 h-full"
                  >
                    <div className="relative aspect-square bg-slate-100 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.originalPrice > product.salePrice && !product.isOutOfStock && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                          -{discount(product.originalPrice, product.salePrice)}%
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                        {product.category.split('/')[0]}
                      </p>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                          />
                        ))}
                        <span className="text-xs text-slate-400 ml-1">({product.reviewCount})</span>
                      </div>

                      <div className="flex items-baseline gap-2 mt-auto">
                        <span className="text-lg font-bold text-slate-900">
                          ₹{product.salePrice.toLocaleString()}
                        </span>
                        {product.originalPrice > product.salePrice && (
                          <span className="text-xs text-slate-400 line-through font-medium">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600">No products found</h3>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 text-blue-600 font-bold hover:underline text-sm"
              >
                Reset Search
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HardwareServices;