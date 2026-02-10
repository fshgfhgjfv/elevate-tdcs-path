import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Shield,
  GraduationCap,
  Code2,
  Lock,
  Search,
  Clock,
  CheckCircle,
  X,
  Filter,
  Zap,
  Globe,
  Palette,
  Terminal,
  Package,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// --- 1. Enhanced Data Structure ---
// Note: I removed hardcoded iconUrls to use a dynamic fetcher for better consistency,
// but you can add them back if you have specific custom images.
const services = [
  {
    id: "ai-productivity",
    title: "AI & Productivity",
    icon: Zap,
    tools: [
      { name: "ChatGPT", domain: "openai.com", duration: "3 Months", description: "Advanced AI chat assistant with GPT-4 access.", features: ["GPT-4o Access", "Data Analysis", "DALL·E 3 Image Gen"] },
      { name: "Perplexity AI", domain: "perplexity.ai", duration: "1 Year", description: "AI-powered search engine for deep research.", features: ["Pro Search", "File Uploads", "Model Switching"] },
      { name: "Gemini Advanced", domain: "google.com", duration: "1 Year", description: "Google's most capable AI model.", features: ["1.5 Pro Model", "Python Integration", "2TB Storage"] },
      { name: "Claude Pro", domain: "anthropic.com", duration: "1 Month", description: "AI with massive context window.", features: ["Opus Model", "Large Context", "Project Knowledge"] },
      { name: "Notion", domain: "notion.so", duration: "6 Months", description: "All-in-one workspace for teams.", features: ["Unlimited Blocks", "AI Writer", "Team Spaces"] },
      { name: "Replit Core", domain: "replit.com", duration: "1 Year", description: "Cloud IDE with AI coding powers.", features: ["Faster Machines", "Private Repos", "Ghostwriter AI"] },
      { name: "Midjourney", domain: "midjourney.com", duration: "1 Year", description: "Generative AI for hyper-realistic images.", features: ["Fast GPU Time", "Stealth Mode", "Commercial Usage"] },
      { name: "Zapier", domain: "zapier.com", duration: "1 Year", description: "Automate workflows between apps.", features: ["Multi-step Zaps", "Unlimited Zaps", "Logic Paths"] },
    ],
  },
  {
    id: "software-creative",
    title: "Creative & Software",
    icon: Palette,
    tools: [
      { name: "Canva Pro", domain: "canva.com", duration: "1 Year", description: "Design platform for everyone.", features: ["Brand Kit", "Magic Resize", "Premium Content"] },
      { name: "Adobe Creative Cloud", domain: "adobe.com", duration: "1 Year", description: "The ultimate creative suite.", features: ["Photoshop", "Illustrator", "Premiere Pro", "20+ Apps"] },
      { name: "Figma Pro", domain: "figma.com", duration: "1 Year", description: "Collaborative interface design.", features: ["Dev Mode", "Unlimited Files", "Team Libraries"] },
      { name: "Descript", domain: "descript.com", duration: "1 Year", description: "All-in-one video & audio editor.", features: ["Overdub Voice", "Studio Sound", "Transcription"] },
      { name: "CapCut Pro", domain: "capcut.com", duration: "1 Year", description: "Advanced video editing made easy.", features: ["Cloud Storage", "Pro Effects", "Remove Background"] },
    ],
  },
  {
    id: "dev-hosting",
    title: "Dev & Hosting",
    icon: Terminal,
    tools: [
      { name: "GitHub Copilot", domain: "github.com", duration: "1 Year", description: "Your AI pair programmer.", features: ["Chat in IDE", "Code Suggestions", "CLI Assistance"] },
      { name: "Vercel Pro", domain: "vercel.com", duration: "1 Year", description: "Frontend cloud platform.", features: ["Higher Limits", "Team Collaboration", "Analytics"] },
      { name: "Webflow", domain: "webflow.com", duration: "1 Year", description: "Visual web development platform.", features: ["CMS", "Custom Code", "Site Export"] },
    ],
  },
  {
    id: "vpn-security",
    title: "Security & VPN",
    icon: Shield,
    tools: [
      { name: "NordVPN", domain: "nordvpn.com", duration: "1 Year", description: "Advanced internet security.", features: ["Threat Protection", "Meshnet", "Double VPN"] },
      { name: "ExpressVPN", domain: "expressvpn.com", duration: "1 Year", description: "High-speed secure anonymity.", features: ["Lightway Protocol", "TrustedServer", "Split Tunneling"] },
      { name: "1Password", domain: "1password.com", duration: "1 Year", description: "Password manager for families.", features: ["Watchtower", "Travel Mode", "Secure Sharing"] },
    ],
  },
  {
    id: "learning",
    title: "Learning",
    icon: GraduationCap,
    tools: [
      { name: "Coursera Plus", domain: "coursera.org", duration: "1 Year", description: "Unlimited access to courses.", features: ["Professional Certs", "Guided Projects", "7000+ Courses"] },
      { name: "Udemy Business", domain: "udemy.com", duration: "1 Year", description: "On-demand video courses.", features: ["Top Rated Instructors", "Offline Mode", "Certificates"] },
      { name: "MasterClass", domain: "masterclass.com", duration: "1 Year", description: "Learn from the best.", features: ["All Access", "Workbook Downloads", "Audio Mode"] },
    ],
  }
];

// --- 2. Logic & Helpers ---
const getPriceForDuration = (duration: string) => {
  switch (duration) {
    case "1 Month": return 499;
    case "3 Months": return 999;
    case "6 Months": return 1999;
    case "1 Year": return 2999;
    default: return 2499;
  }
};

const flattenProducts = (services: any[]) => {
  const allProducts: any[] = [];
  services.forEach(service => {
    service.tools.forEach((tool: any) => {
      allProducts.push({
        ...tool,
        id: `${service.id}-${tool.name.toLowerCase().replace(/ /g, '-')}`,
        category: service.title,
        categoryIcon: service.icon,
        price: getPriceForDuration(tool.duration),
      });
    });
  });
  return allProducts;
};

const allProducts = flattenProducts(services);
const categories = [...new Set(allProducts.map(p => p.category))];
const durations = [...new Set(allProducts.map(p => p.duration))];
const maxPrice = Math.max(...allProducts.map(p => p.price));

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// --- 3. Smart Logo Component ---
// This ensures every logo works. If fetching fails, it shows a nice fallback.
const ServiceLogo = ({ domain, name, className = "w-12 h-12" }: { domain: string, name: string, className?: string }) => {
  const [error, setError] = useState(false);
  
  // Strategy: Try Clearbit -> Fallback to Initials
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  if (error || !domain) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 flex items-center justify-center shadow-inner`}>
        <span className="text-xl font-bold text-gray-300">
          {name.substring(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white rounded-xl p-1 shadow-sm border overflow-hidden`}>
      <img 
        src={logoUrl} 
        alt={name}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
};

// --- 4. Modern Product Card ---
const ProductCard = ({ product, onViewDetails }: { product: any, onViewDetails: (product: any) => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <div className="h-full relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(var(--primary),0.3)] transition-all duration-300 flex flex-col">
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="p-6 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-start mb-4">
            <ServiceLogo domain={product.domain} name={product.name} className="w-14 h-14" />
            <Badge variant="outline" className="bg-background/50 backdrop-blur-md border-primary/20">
              {product.category}
            </Badge>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-grow">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                <Clock className="w-3 h-3 mr-1.5" />
                {product.duration}
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
              </div>
            </div>

            <Button 
              className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
              variant="secondary"
              onClick={() => onViewDetails(product)}
            >
              View Bundle
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 5. Enhanced Detail Modal ---
const ProductDetailModal = ({ product, onClose, onGetService }: { 
  product: any, 
  onClose: () => void, 
  onGetService: (id: string, name: string, price: number) => void 
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        layoutId={`card-${product.id}`}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="bg-background border border-border w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Graphic */}
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background relative">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full bg-background/50 hover:bg-background" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <div className="absolute -bottom-8 left-8">
            <ServiceLogo domain={product.domain} name={product.name} className="w-24 h-24 shadow-xl" />
          </div>
        </div>

        <div className="p-8 pt-12 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                   <Globe className="w-4 h-4" />
                   <span className="text-sm">{product.domain}</span>
                </div>
             </div>
             <div className="text-right">
                <div className="text-2xl font-bold text-primary">{formatPrice(product.price)}</div>
                <div className="text-xs text-muted-foreground">One-time payment</div>
             </div>
          </div>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> 
              Premium Features
            </h4>
            <div className="grid gap-3">
              {product.features.map((feature: string, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center p-3 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/10 mt-auto">
          <Button 
            size="lg" 
            className="w-full text-lg h-12 rounded-xl shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)] hover:shadow-[0_0_25px_-5px_rgba(var(--primary),0.6)] transition-shadow"
            onClick={() => {
              onGetService(product.id, product.name, product.price);
              onClose();
            }}
          >
            Get {product.name} Now
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 6. Main Services Page ---
const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };
  const handleDurationChange = (duration: string) => {
    setSelectedDurations(prev => prev.includes(duration) ? prev.filter(d => d !== duration) : [...prev, duration]);
  };

  const filteredProducts = useMemo(() => {
    let products = allProducts;
    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedCategories.length > 0) products = products.filter(p => selectedCategories.includes(p.category));
    if (selectedDurations.length > 0) products = products.filter(p => selectedDurations.includes(p.duration));
    
    switch (sortOrder) {
      case "price-asc": products.sort((a, b) => a.price - b.price); break;
      case "price-desc": products.sort((a, b) => b.price - a.price); break;
      case "name-asc": products.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return products;
  }, [searchTerm, priceRange, selectedCategories, selectedDurations, sortOrder]);

  const handleGetService = (serviceId: string, serviceName: string, price: number) => {
    navigate("/checkout", { state: { serviceName, price: formatPrice(price) } });
    toast({ title: "Redirecting...", description: "Taking you to secure checkout." });
  };

  // Shared Filter Content
  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">Price Range</h3>
        <Slider 
          min={0} max={maxPrice} step={100} value={priceRange} 
          onValueChange={setPriceRange} className="my-6" 
        />
        <div className="flex justify-between text-sm font-semibold">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox 
                id={`cat-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={`cat-${category}`} className="text-sm leading-none cursor-pointer hover:text-primary transition-colors">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">Duration</h3>
        <div className="flex flex-wrap gap-2">
          {durations.map(duration => (
            <div 
              key={duration}
              onClick={() => handleDurationChange(duration)}
              className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedDurations.includes(duration) 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              {duration}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 pt-24 pb-20 container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">Premium</span>
              <span className="text-primary"> Tools.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Equip yourself with industry-standard software, AI models, and security tools at a fraction of the cost.
            </p>
            <Link
              to="/track-parcel"
              className="inline-flex items-center gap-2 mt-4 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              <Package className="w-4 h-4" />
              Track Your Parcel
            </Link>
          </motion.div>
          
          {/* Search & Mobile Filter Toggle */}
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search tools..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background/50 backdrop-blur-sm border-border/50 focus:ring-primary/20 rounded-xl"
              />
            </div>
            <Button variant="outline" size="icon" className="md:hidden shrink-0" onClick={() => setShowMobileFilters(true)}>
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 p-6 rounded-2xl border border-border/50 bg-background/30 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-6 text-primary">
                 <Filter className="w-5 h-5" />
                 <span className="font-bold">Filters</span>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filter Drawer (Overlay) */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              >
                <motion.div 
                  initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                  className="absolute right-0 top-0 h-full w-80 bg-background border-l p-6 shadow-2xl overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <FilterContent />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <main className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> tools
              </p>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] bg-background/50 rounded-xl border-border/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={setSelectedProduct}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border/50 bg-muted/5">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                <Button variant="link" onClick={() => {setSearchTerm(""); setPriceRange([0, maxPrice]); setSelectedCategories([]); setSelectedDurations([]);}} className="mt-2 text-primary">
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onGetService={handleGetService}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;