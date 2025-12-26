import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Tag, ShoppingCart, Eye, ShieldCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

// Updated Product Data with provided links
const products = [
  {
    id: "pro-ducky-pi",
    name: "Pro Ducky Pi (Hardware Penetration)",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    category: "Hardware",
    rating: 5,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    id: "tdcs-courses",
    name: "All TDCS Technologies Private Limited Courses",
    image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Combo",
    rating: 4.8,
    originalPrice: 5624,
    salePrice: 4499,
    isOutOfStock: false,
  },
  {
    id: "atoms3u",
    name: "AtomS3U (Rubber-Duck-Kit)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbselltZRTKqlWg620s_Rq_HE2tgyUSIj7Pg&s",
    category: "Hardware",
    rating: 4.5,
    originalPrice: 2999,
    salePrice: 2499,
    isOutOfStock: false,
  },
  {
    id: "bw16-kit",
    name: "BW16-5Ghz Kit (Pre-Installed Firmware)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDg98A3ww8C_jg8f_KU91KY9kn2MRyqZoLQ&s",
    category: "Hardware",
    rating: 5.0,
    originalPrice: 1999,
    salePrice: 1499,
    isOutOfStock: false,
  },
  {
    id: "cyber-t-knife",
    name: "CYBER-T USB-ARMY-KNIFE",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzRhZ8FEcQAMMyx2ONJqm65DAUk8ufX-5WZw&s",
    category: "Hardware",
    rating: 5.0,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    id: "cyd-esp32",
    name: "CYD-ESP32 (Marauder) Cyber Edition",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ALPJCxwCPh2-ApQTWan19yyVgLShdVxwXQ&s",
    category: "Hardware",
    rating: 5.0,
    originalPrice: 3999,
    salePrice: 2999,
    isOutOfStock: false,
  },
  {
    id: "esp32-2nrf",
    name: "ESP32/2NRF Kit (Bluetooth Penetration)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFn3vA9m383WW65WUV3J1gqkwxPLWzWz-tiFOTFYZkRvLRiNCVQNOSiAUPknvA-Fn-nE&usqp=CAU",
    category: "Hardware",
    rating: 4.5,
    originalPrice: 2499,
    salePrice: 1799,
    isOutOfStock: true,
  },
  {
    id: "evil-team",
    name: "EvilTeam (RedTeamer Choice)",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 4.5,
    originalPrice: 2000,
    salePrice: 1099,
    isOutOfStock: false,
  },
  {
    id: "mr-hacker",
    name: "Mr.Hacker Bug Bounty Course",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFm8WCUAtuRQM-I8W83xWnLqxRaU2vfAMYZQ&s",
    category: "Courses",
    rating: 4.9,
    originalPrice: 1500,
    salePrice: 699,
    isOutOfStock: false,
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        
        {/* Commercial Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12 border border-white/10 bg-gradient-to-r from-red-900/20 to-transparent p-8 md:p-16">
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
                {["Hardware", "Courses", "Combo"].map((cat) => (
                  <div key={cat} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Checkbox id={cat} className="border-white/20" />
                      <label htmlFor={cat} className="text-sm text-gray-400 group-hover:text-red-500 transition-colors">{cat}</label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 text-white">
              <CardHeader><CardTitle className="text-sm">Price Range</CardTitle></CardHeader>
              <CardContent>
                <Slider defaultValue={[0, 5000]} max={10000} step={100} className="my-6" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹0</span>
                  <span>₹10,000+</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400">Deploying <span className="text-white font-bold">{products.length}</span> tactical tools</p>
              <Select defaultValue="default">
                <SelectTrigger className="w-[180px] bg-black border-white/10">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  <SelectItem value="default">Newest Arrivals</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
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
                        src={product.image} 
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
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
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