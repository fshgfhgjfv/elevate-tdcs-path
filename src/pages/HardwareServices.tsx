import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Star, Package, SlidersHorizontal } from 'lucide-react';
import { hardwareProducts } from '../data/hardwareProducts';
import { motion } from 'framer-motion';

const HardwareServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', ...Array.from(new Set(hardwareProducts.map(p => p.category.split('/')[0].trim())))];

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

  const discount = (orig: number, sale: number) => Math.round(((orig - sale) / orig) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Our Pre-Programmed <span className="text-primary">Hardware</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Professional-grade security tools, pre-configured and ready to deploy.
          </p>
        </div>

        {/* Notice Banner */}
        <div className="mb-8 bg-primary/10 border border-primary/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-primary animate-ping absolute" />
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              📦 After payment, tracking ID is sent within <span className="text-primary font-bold">1-2 hours</span> via email/SMS.
            </p>
          </div>
          <Link
            to="/track-parcel"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            <Package className="w-4 h-4" />
            Track Your Parcel
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search hardware..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted/50 border-border hover:border-primary/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-muted/50 border border-border text-sm rounded-lg px-3 py-2.5 outline-none focus:border-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={`/hardware/product/${product.id}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-muted/30 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Sale Badge */}
                    {product.originalPrice > product.salePrice && !product.isOutOfStock && (
                      <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                        -{discount(product.originalPrice, product.salePrice)}%
                      </span>
                    )}
                    {/* Out of Stock Overlay */}
                    {product.isOutOfStock && (
                      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-destructive font-bold border-2 border-destructive px-4 py-1.5 rounded text-sm uppercase tracking-wider">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.category.split('/')[0]}</p>
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      {product.originalPrice > product.salePrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-lg font-bold">
                        ₹{product.salePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-border">
            <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">No products found</h3>
            <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareServices;
