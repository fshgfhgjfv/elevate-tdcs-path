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
  Heart,
  Play,
  Video,
  MessageCircle,
  Scale,
  Headphones,
  BadgeCheck,
  Box,
  FileText,
  Info,
  ThumbsUp,
  Send,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { hardwareProducts } from '../data/hardwareProducts';
import { getDefaultPackageContents, defaultLegal, defaultDisclaimer, defaultDelivery, defaultSupport } from '../data/productDefaults';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const getEmbedUrl = (url: string): string => {
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1`;
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  return url;
};

const RatingStars = ({ rating, size = 'w-4 h-4' }: { rating: number; size?: string }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${size} ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : i < rating ? 'text-yellow-400 fill-yellow-400/50' : 'text-gray-600'}`} />
    ))}
  </div>
);

const ClickableStars = ({ rating, onRate, size = 'w-7 h-7' }: { rating: number; onRate: (r: number) => void; size?: string }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <button key={i} onClick={() => onRate(i)} className="transition-transform hover:scale-125">
        <Star className={`${size} cursor-pointer ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 hover:text-yellow-400/50'}`} />
      </button>
    ))}
  </div>
);

const SectionHeader = ({ icon, title, badge, badgeColor = 'bg-green-500/20 text-green-400' }: { icon: React.ReactNode; title: string; badge?: string; badgeColor?: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="p-2.5 bg-gray-800/80 rounded-xl">{icon}</div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    {badge && <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeColor}`}>{badge}</span>}
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(hardwareProducts.find(p => p.id === id));
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Review form state
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const found = hardwareProducts.find(p => p.id === id);
    setProduct(found);
    if (found) setActiveImage(0);
    setQuantity(1);
    window.scrollTo(0, 0);
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
  const packageContents = product.packageContents || getDefaultPackageContents(product.name);
  const legal = product.legal || defaultLegal;
  const disclaimer = product.disclaimer || defaultDisclaimer;
  const delivery = product.delivery || defaultDelivery;
  const support = product.support || defaultSupport;
  const longDesc = product.longDescription || product.description;

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

  const handleSubmitReview = () => {
    if (!reviewRating) { toast.error('Please select a rating'); return; }
    if (!reviewTitle.trim()) { toast.error('Please enter a review title'); return; }
    if (!reviewComment.trim()) { toast.error('Please enter your review'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Review submitted successfully! It will appear after moderation.');
      setReviewTitle('');
      setReviewComment('');
      setReviewRating(0);
      setIsSubmitting(false);
    }, 1000);
  };

  const relatedProducts = hardwareProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const reviewStats = [5, 4, 3, 2, 1].map(star => {
    const count = product.reviews.filter(r => r.rating === star).length;
    const pct = product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0;
    return { star, count, pct };
  });

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 group">
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">-{discount}% OFF</div>
              )}
              <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase">{product.category}</div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-green-500 ring-2 ring-green-500/30' : 'border-gray-800 hover:border-gray-600'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <RatingStars rating={product.rating} size="w-5 h-5" />
                  <span className="ml-2 font-semibold text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${product.isOutOfStock ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                  {product.isOutOfStock ? '● Out of Stock' : '● In Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-4xl md:text-5xl font-bold text-green-400">₹{product.salePrice.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full">Save ₹{(product.originalPrice - product.salePrice).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Inclusive of all taxes</p>
            </div>

            {/* Short Description */}
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
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-medium">Quantity:</span>
                <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-800 rounded-md transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-800 rounded-md transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleAddToCart} disabled={product.isOutOfStock || isAdded}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
                    product.isOutOfStock ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : isAdded ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-green-600 to-green-500 text-black hover:from-green-500 hover:to-green-400 shadow-[0_0_30px_rgba(22,163,74,0.4)]'
                  }`}
                >
                  {isAdded ? <><Check className="w-6 h-6" /><span>Added to Cart!</span></> : <><ShoppingCart className="w-6 h-6" /><span>{product.isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span></>}
                </button>
                <button className="p-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition-colors"><Heart className="w-6 h-6" /></button>
              </div>

              {isInCart && (
                <Link to="/hardware-checkout" className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 transition-all">
                  <Package className="w-5 h-5" /> Proceed to Checkout
                </Link>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
              {[
                { icon: <Truck className="w-5 h-5 text-green-500" />, text: "Free Shipping\nAbove ₹5000" },
                { icon: <Shield className="w-5 h-5 text-green-500" />, text: "Secure\nCheckout" },
                { icon: <RotateCcw className="w-5 h-5 text-green-500" />, text: "7 Days\nReturn Policy" },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-green-500/10 rounded-full">{badge.icon}</div>
                  <span className="text-xs text-gray-400 whitespace-pre-line">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* ALL SECTIONS ALWAYS VISIBLE — NO ACCORDION / NO CLICK TO VIEW */}
        {/* ══════════════════════════════════════════════════════════════ */}

        {/* ─── Detailed Description ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 md:p-8">
          <SectionHeader icon={<FileText className="w-5 h-5 text-blue-400" />} title="Detailed Description" />
          <p className="text-gray-300 leading-relaxed whitespace-pre-line text-[15px]">{longDesc}</p>
        </motion.section>

        {/* ─── Package Contents ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 md:p-8">
          <SectionHeader icon={<Box className="w-5 h-5 text-purple-400" />} title="Package Included" badge="What's in the Box" badgeColor="bg-purple-500/20 text-purple-400" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {packageContents.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-800/40 rounded-xl p-4 border border-gray-700/40">
                <div className="w-9 h-9 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-200 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Technical Specifications — Alternating Row Table ─── */}
        {product.specifications && product.specifications.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 md:p-8">
            <SectionHeader icon={<Zap className="w-5 h-5 text-yellow-400" />} title="Technical Specifications" badge="Full Specs" badgeColor="bg-yellow-500/20 text-yellow-400" />
            <div className="rounded-xl overflow-hidden border border-gray-700/50">
              <div className="grid grid-cols-2 bg-gray-800/80 px-5 py-3 border-b border-gray-700/50">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Specification</span>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Details</span>
              </div>
              {product.specifications.map((spec, idx) => (
                <div key={idx} className={`grid grid-cols-2 px-5 py-3.5 ${idx % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-900/20'} ${idx !== product.specifications.length - 1 ? 'border-b border-gray-800/40' : ''}`}>
                  <span className="text-gray-400 font-medium text-sm">{spec.label}</span>
                  <span className="text-white font-semibold text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ─── Delivery Information — Badges Layout ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 md:p-8">
          <SectionHeader icon={<Truck className="w-5 h-5 text-green-400" />} title="Delivery Information" badge="Fast Shipping" badgeColor="bg-green-500/20 text-green-400" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {[
              { icon: <Truck className="w-5 h-5" />, title: "Standard Delivery", desc: "5-7 business days", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
              { icon: <Zap className="w-5 h-5" />, title: "Express Delivery", desc: "2-3 business days", color: "text-green-400 bg-green-500/10 border-green-500/20" },
              { icon: <MapPin className="w-5 h-5" />, title: "Pan-India Shipping", desc: "Insured with tracking", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
            ].map((item, i) => (
              <div key={i} className={`rounded-xl p-4 border ${item.color} flex flex-col items-center text-center gap-2`}>
                <div className={`p-2.5 rounded-full ${item.color}`}>{item.icon}</div>
                <span className="font-semibold text-white text-sm">{item.title}</span>
                <span className="text-xs text-gray-400">{item.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{delivery}</p>
        </motion.section>

        {/* ─── Warranty & Support ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 md:p-8">
          <SectionHeader icon={<Shield className="w-5 h-5 text-cyan-400" />} title="Warranty & Support" badge="30-Day Warranty" badgeColor="bg-cyan-500/20 text-cyan-400" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { icon: <Shield className="w-5 h-5 text-cyan-400" />, title: "30-Day Warranty", desc: "Manufacturing defects covered" },
              { icon: <Phone className="w-5 h-5 text-green-400" />, title: "WhatsApp Support", desc: "Mon-Sat, 10AM - 7PM IST" },
              { icon: <Mail className="w-5 h-5 text-blue-400" />, title: "Email Support", desc: "hardware@tdcs.in" },
              { icon: <Globe className="w-5 h-5 text-purple-400" />, title: "Community Access", desc: "Forums & firmware guides" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 bg-gray-700/50 rounded-lg flex-shrink-0">{item.icon}</div>
                <div>
                  <span className="font-semibold text-white text-sm block">{item.title}</span>
                  <span className="text-xs text-gray-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{support}</p>
        </motion.section>

        {/* ─── Legal Information ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 md:p-8">
          <SectionHeader icon={<Scale className="w-5 h-5 text-orange-400" />} title="Legal Information" />
          <p className="text-gray-400 leading-relaxed text-sm">{legal}</p>
        </motion.section>

        {/* ─── Disclaimer ─── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8">
          <SectionHeader icon={<AlertTriangle className="w-5 h-5 text-red-400" />} title="⚠️ Important Disclaimer" badge="Read Before Use" badgeColor="bg-red-500/20 text-red-400" />
          <p className="text-red-300/80 leading-relaxed text-sm">{disclaimer}</p>
        </motion.section>

        {/* ─── Video Review Section ─── */}
        {product.videoUrl && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg"><Play className="w-6 h-6 text-red-500" /></div>
              Product Review Video
            </h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="aspect-video relative">
                <iframe src={getEmbedUrl(product.videoUrl)} title={`${product.name} Review`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
              </div>
              <div className="p-4 border-t border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400"><Video className="w-4 h-4" /><span className="text-sm">Watch the full product review</span></div>
                <a href={product.videoUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 text-sm font-medium">Open in new tab →</a>
              </div>
            </div>
          </motion.section>
        )}

        {/* ═══════════════════════════════════════════════ */}
        {/* CUSTOMER REVIEWS + WRITE A REVIEW              */}
        {/* ═══════════════════════════════════════════════ */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg"><MessageCircle className="w-6 h-6 text-yellow-500" /></div>
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-white mb-2">{product.rating}</div>
                <RatingStars rating={product.rating} size="w-6 h-6" />
                <p className="text-gray-400 mt-2">{product.reviewCount} total ratings</p>
              </div>
              <div className="space-y-3">
                {reviewStats.map(({ star, count, pct }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-8">{star}★</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="lg:col-span-2 space-y-4">
              {product.reviews.length > 0 ? product.reviews.map((review) => (
                <div key={review.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      {review.title && <h4 className="font-semibold text-white mb-1">{review.title}</h4>}
                      <RatingStars rating={review.rating} />
                    </div>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <BadgeCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-3">{review.comment}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium">{review.author}</span>
                    <span>{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              )) : (
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No reviews yet</p>
                  <p className="text-gray-500 text-sm mt-1">Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>

          {/* ─── Write a Review Form ─── */}
          <div className="mt-10 bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Send className="w-5 h-5 text-green-400" /> Write a Review
            </h3>
            {user ? (
              <div className="mt-5 space-y-5">
                {/* Star Rating */}
                <div>
                  <label className="text-sm text-gray-400 font-medium block mb-2">Your Rating *</label>
                  <ClickableStars rating={reviewRating} onRate={setReviewRating} />
                </div>

                {/* Title */}
                <div>
                  <label className="text-sm text-gray-400 font-medium block mb-2">Review Title *</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={e => setReviewTitle(e.target.value)}
                    placeholder="Summarize your experience"
                    maxLength={100}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-sm"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="text-sm text-gray-400 font-medium block mb-2">Your Review *</label>
                  <textarea
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    maxLength={1000}
                    rows={4}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-black font-bold rounded-xl hover:from-green-500 hover:to-green-400 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? <><Clock className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Review</>}
                </button>
              </div>
            ) : (
              <div className="mt-4 bg-gray-800/40 border border-gray-700/40 rounded-xl p-6 text-center">
                <MessageCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400 mb-3">Please log in to write a review</p>
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-black font-bold rounded-xl hover:bg-green-500 transition-colors text-sm">
                  Login to Review
                </Link>
              </div>
            )}
          </div>
        </motion.section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/hardware/product/${p.id}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
