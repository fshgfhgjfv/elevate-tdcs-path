import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, ShieldCheck, Zap, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import CurrencySelector from "@/components/CurrencySelector";
import { hardwareProducts } from "@/data/hardwareProducts";

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.round(rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`}
      />
    ))}
    <span className="ml-2 text-xs text-gray-400">({rating})</span>
  </div>
);

const HardwareServices = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("default");

  const categories = ["Hardware", "Courses", "Combo"];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = hardwareProducts
    .filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      if (product.salePrice < priceRange[0] || product.salePrice > priceRange[1]) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.salePrice - b.salePrice;
        case "price-high":
          return b.salePrice - a.salePrice;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: typeof hardwareProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.salePrice,
      originalPrice: product.originalPrice,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        
        {/* Hero Section with Currency Selector */}
        <div className="relative rounded-2xl overflow-hidden mb-12 border border-white/10 bg-gradient-to-r from-red-900/20 to-transparent p-8 md:p-16">
          <div className="absolute top-4 right-4 z-20">
            <CurrencySelector />
          </div>
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <Zap className="h-3 w-3" />
              <span>LIVE: RED TEAM HARDWARE DISCOUNTS</span>
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">
              ARM YOUR <span className="text-red-600">ARSENAL</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Professional-grade penetration testing tools and hardware kits. Battle-tested by security researchers worldwide.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">Explore Catalog</Button>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
            <ShieldCheck className="w-full h-full text-white" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-6">
            <Card className="bg-black/40 border-white/10 text-white">
              <CardHeader><CardTitle className="text-sm">Categories</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id={cat} 
                        className="border-white/20"
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      <label 
                        htmlFor={cat} 
                        className="text-sm text-gray-400 group-hover:text-red-500 transition-colors cursor-pointer"
                      >
                        {cat}
                      </label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 text-white">
              <CardHeader><CardTitle className="text-sm">Price Range</CardTitle></CardHeader>
              <CardContent>
                <Slider 
                  value={priceRange} 
                  onValueChange={setPriceRange}
                  max={10000} 
                  step={100} 
                  className="my-6" 
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400">
                Deploying <span className="text-white font-bold">{filteredProducts.length}</span> tactical tools
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-black border-white/10">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  <SelectItem value="default">Newest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card 
                    className="bg-zinc-900/50 border-white/10 overflow-hidden h-full flex flex-col group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute top-2 right-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded">
                        -{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                      </div>
                      {product.isOutOfStock && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-red-500 font-bold tracking-widest text-xs border border-red-500 px-4 py-2">SOLD OUT</span>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="icon" 
                          variant="secondary"
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-5 flex-grow">
                      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">{product.category}</p>
                      <h3 className="text-white font-semibold text-sm mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
                        {product.name}
                      </h3>
                      <RatingStars rating={product.rating} />
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-gray-500 text-xs line-through">{formatPrice(product.originalPrice)}</p>
                          <p className="text-xl font-bold text-white">{formatPrice(product.salePrice)}</p>
                        </div>
                        <Button 
                          size="icon" 
                          className="bg-white hover:bg-red-600 text-black hover:text-white rounded-none transition-all"
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={product.isOutOfStock}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HardwareServices;
