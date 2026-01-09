import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Filter, 
  ChevronDown, 
  Star, 
  Cpu, 
  Wifi, 
  Radio
} from 'lucide-react';
import { hardwareProducts } from '../data/hardwareProducts';

const HardwareServices = () => {
  // --- STATE MANAGEMENT ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // --- DERIVED DATA ---
  // Extract unique categories dynamically from the product list
  const categories = ['All', ...Array.from(new Set(hardwareProducts.map(p => p.category.split('/')[0].trim())))];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return hardwareProducts
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category.includes(selectedCategory);
        const matchesPrice = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
        
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.salePrice - b.salePrice;
        if (sortBy === 'price-high') return b.salePrice - a.salePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default (Featured)
      });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans pt-20 pb-12">
      <div className="container mx-auto px-4">
        
        {/* --- TOP BAR: SEARCH & RESULTS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Cpu className="w-6 h-6 mr-2 text-green-500" />
            ADD To Cart
          </h1>

          <div className="flex-1 w-full md:max-w-xl mx-4 relative">
            <input 
              type="text" 
              placeholder="Search tools, gadgets, or courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
          </div>

          <button 
            className="md:hidden flex items-center bg-gray-800 px-4 py-2 rounded text-sm"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT SIDEBAR: FILTERS --- */}
          <aside className={`lg:w-64 flex-shrink-0 space-y-8 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            
            {/* Category Filter */}
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="font-bold text-white mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2 text-green-500" /> Categories
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="hidden" 
                    />
                    <span className={`w-4 h-4 rounded-full border border-gray-600 mr-3 flex items-center justify-center ${selectedCategory === cat ? 'border-green-500' : ''}`}>
                      {selectedCategory === cat && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    </span>
                    <span className={`text-sm ${selectedCategory === cat ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter (Simple Range) */}
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
              <h3 className="font-bold text-white mb-4">Price Range</h3>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>₹0</span>
                <span>₹50,000+</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50000" 
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="mt-2 text-right text-green-400 font-mono text-sm">
                Max: ₹{priceRange[1].toLocaleString()}
              </div>
            </div>
          </aside>

          {/* --- RIGHT CONTENT: PRODUCT GRID --- */}
          <div className="flex-1">
            
            {/* Sorting & Count Bar */}
            <div className="flex justify-between items-center mb-6 bg-gray-900 p-3 rounded-lg border border-gray-800">
              <span className="text-gray-400 text-sm">
                Showing <strong className="text-white">{filteredProducts.length}</strong> Results
              </span>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm hidden sm:inline">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black text-white text-sm border border-gray-700 rounded px-3 py-1 outline-none focus:border-green-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* THE GRID */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 group flex flex-col h-full">
                    
                    {/* Image Area */}
                    <div className="relative h-48 overflow-hidden bg-gray-800">
                      <Link to={`/hardware/product/${product.id}`}>
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                      </Link>
                      {product.isOutOfStock && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-red-500 font-bold border-2 border-red-500 px-4 py-1 rounded rotate-12">OUT OF STOCK</span>
                        </div>
                      )}
                      {/* Category Tag */}
                      <span className="absolute bottom-2 left-2 bg-black/80 text-green-400 text-xs px-2 py-1 rounded border border-gray-700">
                        {product.category.split('/')[0]}
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/hardware/product/${product.id}`} className="hover:text-green-400 transition-colors">
                          <h3 className="font-bold text-lg leading-tight line-clamp-2">{product.name}</h3>
                        </Link>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-3 space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-400">{product.rating} ({product.reviewCount})</span>
                      </div>

                      {/* Price Section */}
                      <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-500 line-through block">₹{product.originalPrice}</span>
                          <span className="text-xl font-bold text-white">₹{product.salePrice}</span>
                        </div>
                        
                        <Link 
                          to={`/hardware/product/${product.id}`}
                          className={`p-2 rounded-lg transition-colors ${
                            product.isOutOfStock 
                              ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                              : 'bg-green-600 text-black hover:bg-green-500'
                          }`}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800 border-dashed">
                <Wifi className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No signals found.</h3>
                <p className="text-gray-600 mt-2">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setPriceRange([0, 50000]);}}
                  className="mt-6 text-green-500 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareServices;