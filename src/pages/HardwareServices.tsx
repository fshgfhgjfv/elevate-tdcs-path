import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Tag } from "lucide-react";

// --- UPDATED: Mock data with all your products ---
const hardwareProducts = [
  {
    name: "Pro Ducky Pi (Hardware Penetration)",
    image: "/path/to/your/image_646742.jpg", // <-- Your uploaded image
    category: "Hardware",
    rating: 5,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    name: "All Linuxndroid Courses",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Combo",
    rating: 0,
    originalPrice: 5624,
    salePrice: 4499,
    isOutOfStock: false,
  },
  {
    name: "AtomS3U(Rubber-Duck-Kit)",
    image: "https://images.pexels.com/photos/4316/technology-computer-chips-board.jpg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 0,
    originalPrice: 2999,
    salePrice: 2499,
    isOutOfStock: false,
  },
  {
    name: "BW16-5Ghz Kit(Pre-Installed Firmware)",
    image: "https://images.pexels.com/photos/843226/pexels-photo-843226.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 5.00,
    originalPrice: 1999,
    salePrice: 1499,
    isOutOfStock: false,
  },
  {
    name: "CYBER-T USB-ARMY-KNIFE(Pre-Installed Firmware)",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 5.00,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
  },
  {
    name: "CYD-ESP32(Marauder) Cyber Edition",
    image: "https://images.pexels.com/photos/4491459/pexels-photo-4491459.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 5.00,
    originalPrice: 3999,
    salePrice: 2999,
    isOutOfStock: false,
  },
  {
    name: "ESP32/2NRF Kit(Bluetooth Penetration)",
    image: "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 4.50,
    originalPrice: 2499,
    salePrice: 1799,
    isOutOfStock: true,
  },
  {
    name: "ESP8266-Kit(Pre-Installed WiFi Firmware)",
    image: "https://images.pexels.com/photos/3575189/pexels-photo-3575189.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hardware",
    rating: 0,
    originalPrice: 999,
    salePrice: 599,
    isOutOfStock: false,
  },
  {
    name: "EvilTeam (RedTeamer Choice)",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 4.50,
    originalPrice: 2000,
    salePrice: 1099,
    isOutOfStock: false,
  },
  {
    name: "F-OSINT (Final Open Source Intelligence)",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 4.75,
    originalPrice: 2000,
    salePrice: 1049,
    isOutOfStock: false,
  },
  {
    name: "Start Android (Beginner Level)",
    image: "https://images.pexels.com/photos/147413/fuchs-fox-animal-sly-147413.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 0,
    originalPrice: 1500,
    salePrice: 299,
    isOutOfStock: false,
  },
  {
    name: "Mr.Hacker Bug Bounty Course (Website Penetration)",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Courses",
    rating: 0,
    originalPrice: 1500,
    salePrice: 699,
    isOutOfStock: false,
  },
];

// Helper to format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Helper to render rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  if (rating === 0) return <div className="h-5"></div>; // Keep space
  
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < filledStars
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(2)})</span>
    </div>
  );
};

// New Product Card Component
const ProductCard = ({ product }: { product: (typeof hardwareProducts)[0] }) => {
  return (
    <Card className="overflow-hidden shadow-lg group relative">
      <CardHeader className="p-0">
        <div className="relative h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Tag className="h-3 w-3" />
            <span>SALE</span>
          </div>
          {product.isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <span className="text-xs font-semibold text-primary uppercase">{product.category}</span>
        <CardTitle className="text-lg h-14 line-clamp-2">{product.name}</CardTitle>
        <RatingStars rating={product.rating} />
        <div className="pt-2">
          <span className="text-xl font-bold text-red-600">{formatPrice(product.salePrice)}</span>
          <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  );
};


// The Main Page Component, rebuilt as a store
const HardwareServices = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5 relative">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold gradient-text mb-3">Hardware Store</h1>
          <p className="text-muted-foreground text-lg">
            Shop our professional lineup of cybersecurity hardware and tools.
          </p>
        </motion.div>

        {/* This div wraps the entire store layout to be blurred */}
        <div className="relative pointer-events-none">
          {/* Sidebar is on the left */}
          <div className="flex flex-col lg:flex-row gap-8"> 
            
            {/* Sidebar Filters (Left) */}
            <aside className="lg:w-1/4 space-y-6">
              <Card>
                <CardHeader><CardTitle>Filter by Price</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Slider defaultValue={[0, 5000]} max={10000} step={100} disabled />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Min: {formatPrice(0)}</span>
                    <span>Max: {formatPrice(5000)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Filter counts */}
              <Card>
                <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-hardware" disabled checked />
                    <label htmlFor="cat-hardware" className="text-sm font-medium leading-none text-muted-foreground">
                      Hardware (13)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-courses" disabled />
                    <label htmlFor="cat-courses" className="text-sm font-medium leading-none text-muted-foreground">
                      Courses (7)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-combo" disabled />
                    <label htmlFor="cat-combo" className="text-sm font-medium leading-none text-muted-foreground">
                      Combo (4)
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Deals</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-sale" disabled checked />
                    <label htmlFor="cat-sale" className="text-sm font-medium leading-none text-muted-foreground">
                      On Sale
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Stock Status</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-stock" disabled checked />
                    <label htmlFor="cat-stock" className="text-sm font-medium leading-none text-muted-foreground">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-out" disabled />
                    <label htmlFor="cat-out" className="text-sm font-medium leading-none text-muted-foreground">
                      Out of Stock
                    </label>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Product Grid (Right) */}
            <main className="lg:w-3/4">
              <div className="flex justify-between items-center mb-4">
                {/* Result count text */}
                <span className="text-muted-foreground text-sm">Showing 1–9 of 24 results</span>
                <Select disabled>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Default sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default sorting</SelectItem>
                    <SelectItem value="price-low">Sort by price: low to high</SelectItem>
                    <SelectItem value="price-high">Sort by price: high to low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hardwareProducts.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* "Coming Soon" Overlay with less blur */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <motion.div
          className="text-center"
          // Pulse/glow animation
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <h2 className="text-6xl font-extrabold text-white" style={{ textShadow: '0 0 25px rgba(255, 255, 255, 0.7)' }}>
            COMING SOON
          </h2>
          {/* --- THIS IS THE FIX --- */}
          <p className="text-2xl text-white/80 mt-2" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}>
            Our new hardware store is launching soon.
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default HardwareServices;