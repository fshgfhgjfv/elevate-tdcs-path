import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Shield, 
  GraduationCap, 
  Palette,
  MessageSquare,
  Code2,
  Lock,
  Search,
  Tag,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// 1. --- Original Bundle Data Structure ---
const services = [
  {
    id: "ai-productivity",
    title: "AI & Productivity Tools Pro Pack",
    tools: [
      { name: "ChatGPT", icon: "🤖", duration: "3 Months", description: "Advanced AI chat assistant", features: ["GPT-4 access", "Faster responses", "Priority access"] },
      { name: "Perplexity AI Pro", icon: "🤖", duration: "1 Year", description: "AI-powered search engine", features: ["Unlimited searches", "Deep research", "Source citations"] },
      { name: "Gemini Pro", icon: "🔮", duration: "1 Year", description: "Google's advanced AI", features: ["Multimodal AI", "Code generation", "Document analysis"] },
      { name: "Gemini Ultra", icon: "🔮", duration: "1 Month", description: "Premium Gemini tier", features: ["Most capable model", "Extended context", "Advanced reasoning"] },
      { name: "Gamma AI", icon: "⚡", duration: "1 Year", description: "AI presentation maker", features: ["Auto design", "Templates", "Collaboration"] },
      { name: "Notion Business", icon: "📝", duration: "6 Months", description: "All-in-one workspace", features: ["Unlimited pages", "Team collaboration", "Advanced permissions"] },
      { name: "Lovable Pro", icon: "💖", duration: "1 Year", description: "AI app development", features: ["Code generation", "Real-time preview", "Deployment"] },
      { name: "Replit Core", icon: "💻", duration: "1 Year", description: "Cloud IDE platform", features: ["Always-on projects", "Multiplayer coding", "Ghostwriter AI"] },
      { name: "Bolt.new AI Code", icon: "⚡", duration: "1 Year", description: "AI code assistant", features: ["Code generation", "Auto-completion", "Debugging help"] },
      { name: "N8N Automation", icon: "🔄", duration: "1 Year", description: "Workflow automation", features: ["300+ integrations", "Self-hosted option", "Custom workflows"] },
      { name: "Make.com", icon: "🔹", duration: "1 Year", description: "Visual automation", features: ["No-code builder", "1000+ apps", "Advanced logic"] },
      { name: "ClickSites AI Website", icon: "🌐", duration: "1 Year", description: "AI website builder", features: ["Instant sites", "SEO optimization", "Custom domains"] },
      { name: "Jasper AI", icon: "✍", duration: "1 Month", description: "AI content writer", features: ["Marketing copy", "Blog posts", "Social media"] },
      { name: "Warp Dev AI", icon: "🖥", duration: "1 Year", description: "Modern terminal", features: ["AI command search", "Workflows", "Collaboration"] },
      { name: "Mobbin UI/UX", icon: "🎨", duration: "1 Year", description: "UI design library", features: ["50k+ screens", "Design patterns", "Mobile & web"] },
      { name: "Magic Patterns", icon: "🎭", duration: "1 Year", description: "AI UI generator", features: ["Generate designs", "Export code", "Figma plugin"] },
      { name: "Wispr Voice AI", icon: "🎤", duration: "1 Year", description: "Voice transcription", features: ["Real-time transcription", "Multi-language", "High accuracy"] },
      { name: "Granola Meeting", icon: "🍳", duration: "1 Year", description: "AI meeting notes", features: ["Auto summaries", "Action items", "Integrations"] },
      { name: "Superhuman", icon: "📧", duration: "1 Year", description: "Email productivity", features: ["Blazing fast", "Keyboard shortcuts", "AI assistance"] },
      { name: "Linear AI Project", icon: "📊", duration: "1 Year", description: "Issue tracking", features: ["Project management", "Roadmaps", "Integrations"] },
      { name: "Raycast AI", icon: "⚡", duration: "1 Year", description: "Productivity launcher", features: ["Quick actions", "Extensions", "AI commands"] },
    ],
  },
  {
    id: "software-subscriptions",
    title: "Software & Subscriptions Ultimate Pack",
    tools: [
      { name: "Canva Pro", icon: "🎨", duration: "1 Year", description: "Graphic design platform", features: ["Premium templates", "Brand kit", "Background remover"] },
      { name: "Adobe Creative Cloud", icon: "🎭", duration: "1 Year", description: "Creative suite", features: ["All Adobe apps", "Cloud storage", "Premium fonts"] },
      { name: "CorelDRAW", icon: "✏️", duration: "1 Year", description: "Vector graphics editor", features: ["Professional design", "Typography", "Illustrations"] },
      { name: "Descript", icon: "🎬", duration: "1 Year", description: "Video & audio editor", features: ["Transcription", "Overdub", "Screen recording"] },
      { name: "Filmora", icon: "🎥", duration: "1 Year", description: "Video editing", features: ["Effects library", "AI tools", "Export options"] },
      { name: "CapCut Pro", icon: "📹", duration: "1 Year", description: "Video editor", features: ["Advanced editing", "Effects", "Auto captions"] },
      { name: "ElevenLabs", icon: "🔊", duration: "1 Year", description: "AI voice generation", features: ["Voice cloning", "Multiple languages", "High quality"] },
    ],
  },
  {
    id: "vpn-security",
    title: "VPN & Security Premium Shield Pack",
    tools: [
      { name: "ExpressVPN Premium", icon: "🛡️", duration: "1 Year", description: "Top-tier VPN service", features: ["160+ locations", "Military encryption", "24/7 support"] },
      { name: "Surfshark VPN", icon: "🦈", duration: "1 Year", description: "Unlimited devices VPN", features: ["Unlimited devices", "CleanWeb", "Multi-hop"] },
      { name: "Advanced Threat Protection", icon: "🔒", duration: "1 Year", description: "Security suite", features: ["Real-time protection", "Malware blocking", "Safe browsing"] },
      { name: "Secure DNS", icon: "🌐", duration: "1 Year", description: "Privacy DNS", features: ["Ad blocking", "Tracking protection", "Fast resolution"] },
    ],
  },
  {
    id: "learning-career",
    title: "Learning & Career Master Pack",
    tools: [
      { name: "Coursera Plus", icon: "🎓", duration: "1 Year", description: "Online learning", features: ["7000+ courses", "Professional certificates", "University courses"] },
      { name: "edX Premium", icon: "📚", duration: "1 Year", description: "University courses", features: ["Top universities", "MicroMasters", "Certificates"] },
      { name: "LinkedIn Learning", icon: "💼", duration: "1 Year", description: "Professional skills", features: ["16000+ courses", "Certificates", "Expert instructors"] },
      { name: "Udemy Business", icon: "🎯", duration: "1 Year", description: "Business learning", features: ["7000+ courses", "Team access", "Learning paths"] },
      { name: "Career Coaching", icon: "👨‍💼", duration: "1 Year", description: "1-on-1 coaching", features: ["Resume review", "Interview prep", "Career guidance"] },
    ],
  }
];

// 2. --- Logic to flatten products and add prices ---
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
        price: getPriceForDuration(tool.duration), // Assign the new price
      });
    });
  });
  return allProducts;
};

const allProducts = flattenProducts(services);
const categories = [...new Set(allProducts.map(p => p.category))];
const durations = [...new Set(allProducts.map(p => p.duration))];
const maxPrice = Math.max(...allProducts.map(p => p.price));

// Helper to format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// 3. --- New Individual Product Card Component ---
const ProductCard = ({ product, onGetService }: { product: any, onGetService: (id: string, name: string, price: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <Card className="flex-grow flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center space-x-4 p-4">
          <span className="text-4xl">{product.icon}</span>
          <div>
            <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">{product.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow space-y-3">
          <p className="text-sm text-muted-foreground min-h-[40px]">{product.description}</p>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{product.duration}</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="text-sm text-muted-foreground"> / one-time</span>
          </div>
        </CardContent>
        <div className="p-4 pt-0">
          <Button
            variant="gradient"
            className="w-full"
            onClick={() => onGetService(product.id, product.name, product.price.toString())}
          >
            Get Service
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};


// 4. --- Main Services Component (Rebuilt as a Store) ---
const Services = () => {
  // --- Filter State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("default");

  // --- Filter Handlers ---
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDurations(prev =>
      prev.includes(duration)
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    );
  };

  // --- Filtered Products Logic ---
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Search filter
    if (searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Category filter
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }

    // Duration filter
    if (selectedDurations.length > 0) {
      products = products.filter(p => selectedDurations.includes(p.duration));
    }
    
    // Sort
    switch (sortOrder) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return products;
  }, [searchTerm, priceRange, selectedCategories, selectedDurations, sortOrder]);

  // --- Razorpay Handler ---
  const handleGetService = (serviceId: string, serviceName: string, price: string) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: parseInt(price.replace(/[^0-9]/g, '')) * 100,
      currency: "INR",
      name: "TDCS Technologies",
      description: serviceName,
      handler: function (response: any) {
        toast({
          title: "Payment Successful! 🎉",
          description: `Your ${serviceName} subscription is now active.`,
        });
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#FFB347" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      toast({
        title: "Payment Failed ❌",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    });
    rzp.open();
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section (Unchanged) */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              TDCS Premium Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock your potential with our exclusive bundle packages. Get premium tools, software, and learning resources at unbeatable prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- NEW: Store Layout Section --- */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
              {/* --- Filters Sidebar --- */}
              <aside className="lg:w-1/4 space-y-6">
                <Card>
                  <CardHeader><CardTitle>Search</CardTitle></CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Input 
                        placeholder="e.g. ChatGPT, Canva..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                      <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Filter by Price</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Slider 
                      min={0} 
                      max={maxPrice} 
                      step={100} 
                      value={priceRange} 
                      onValueChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`cat-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={`cat-${category}`} className="text-sm font-medium leading-none">
                          {category.replace(' Pro Pack', '').replace(' Ultimate Pack', '').replace(' Premium Shield Pack', '').replace(' Master Pack', '')}
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader><CardTitle>Duration</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {durations.map(duration => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`dur-${duration}`} 
                          checked={selectedDurations.includes(duration)}
                          onCheckedChange={() => handleDurationChange(duration)}
                        />
                _       <label htmlFor={`dur-${duration}`} className="text-sm font-medium leading-none">
                          {duration}
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </aside>

              {/* --- Product Grid --- */}
              <main className="lg:w-3/4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground text-sm">
                    Showing {filteredProducts.length} of {allProducts.length} results
                  </span>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default sorting</SelectItem>
                      <SelectItem value="price-asc">Sort by price: low to high</SelectItem>
                      <SelectItem value="price-desc">Sort by price: high to low</SelectItem>
                      <SelectItem value="name-asc">Sort by name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
          _           key={product.id}
                      product={product}
                      onGetService={handleGetService}
      _           />
                  ))}
                </div>
Read more
                {filteredProducts.length === 0 && (
                  <div className="text-center col-span-full py-12">
                    <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
                  </div>
          T       )}
              </main>
*           </div>
        </div>
      </section>

      {/* Features Section (Unchanged) */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
A       <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Why Choose TDCS Bundles?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium access to industry-leading tools at a fraction of the cost
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Sparkles, title: "Premium Quality", desc: "Verified premium accounts" },
              { icon: Lock, title: "Secure Access", desc: "Protected & encrypted" },
              { icon: MessageSquare, title: "24/7 Support", desc: "Always here to help" },
Read more
              { icon: Code2, title: "Easy Setup", desc: "Instant activation" }
            ].map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={idx}
Read more
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="text-center p-6 hover:shadow-glow transition-all duration-300">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                      <FeatureIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
C                   <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </Card>
                </motion.div>
col-span-full
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section (Unchanged) */}
      <section className="py-20 bg-muted/20">
Clicking on this button will show you a pop-up.
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
          _ viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="p-12 shadow-glow-lg border-2">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Ready to Upgrade Your Digital Arsenal?
    s         </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of satisfied customers who trust TDCS for their software needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" className="shadow-glow">
                s   View All Bundles
                </Button>
s
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
A
    </div>
  );
};

export default Services;