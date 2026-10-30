import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, 
  Leaf, Plus, Minus, ArrowLeft, Check, Star 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { StarRating } from '../components/common/StarRating';
import { Badge } from '../components/common/Badge';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'ingredients' | 'howToUse' | 'reviews'
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="py-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-sand-50">
        <h2 className="font-serif text-2xl text-forest-900 mb-2">Formulation Not Found</h2>
        <p className="text-xs text-forest-700/60 mb-6">The product you are looking for may have been archived.</p>
        <Link to="/products" className="bg-forest-800 text-sand-50 text-xs px-6 py-3 rounded-xl font-semibold uppercase tracking-wider">
          Back to Apothecary
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Find related products in same category or gender
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="py-10 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs text-forest-700/60 mb-8">
          <Link to="/" className="hover:text-forest-900">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-forest-900">Apothecary</Link>
          <span>/</span>
          <span className="text-forest-900 font-semibold truncate">{product.name}</span>
        </div>

        {/* Top Product Layout: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-sand-200 border border-sand-300 shadow-soft">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">{product.badge}</Badge>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isFavorited
                    ? 'bg-rose-50 text-rose-500 shadow-md'
                    : 'bg-white/80 backdrop-blur-md text-forest-800 hover:bg-white hover:text-rose-500 shadow-sm'
                }`}
              >
                <Heart size={20} className={isFavorited ? "fill-rose-500 text-rose-500" : ""} />
              </button>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-forest-800 ring-2 ring-forest-800/20' : 'border-sand-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Buying Actions & Summary */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-sage-600 uppercase tracking-widest mb-2">
                <span>{product.category}</span>
                <span className="text-forest-700/60 font-medium lowercase capitalize">
                  {product.gender === 'men' ? "Men's Care" : "Women's Ritual"}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3">
                <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
                <span className="text-xs text-forest-700/50">•</span>
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {product.stockStatus}
                </span>
                <span className="text-xs text-forest-700/50">•</span>
                <span className="text-xs text-forest-700 font-medium">{product.size}</span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-4 bg-white rounded-2xl border border-sand-300 shadow-soft flex items-baseline gap-4">
              <span className="text-3xl font-bold text-forest-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="text-sm text-forest-700/50 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs bg-sage-500 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
              <span className="ml-auto text-[11px] text-forest-700/60">Inclusive of all taxes</span>
            </div>

            {/* Short summary */}
            <p className="text-sm text-forest-700/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Skin type & size specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-sand-200">
                <span className="text-forest-700/60 block text-[10px] uppercase font-bold tracking-wider mb-0.5">Recommended Skin Focus</span>
                <span className="font-semibold text-forest-900">{product.skinType}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-sand-200">
                <span className="text-forest-700/60 block text-[10px] uppercase font-bold tracking-wider mb-0.5">Artisanal Formulation</span>
                <span className="font-semibold text-forest-900">Small Batch Ayurvedic</span>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-4">
                
                {/* Qty Box */}
                <div className="flex items-center border border-sand-300 rounded-2xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-sand-100 rounded-lg text-forest-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-bold text-forest-900 min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-sand-100 rounded-lg text-forest-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Main Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-luxury ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-forest-800 hover:bg-forest-900 text-sand-50 active:scale-95'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={18} /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Cart • ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>

              {/* Direct Buy Now demo button */}
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 px-6 rounded-2xl font-semibold text-xs tracking-widest uppercase bg-gold-500 hover:bg-gold-400 text-forest-900 transition-colors shadow-sm"
              >
                Instant Buy & Checkout
              </button>
            </div>

            {/* Reassurance perks */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-sand-200 text-center text-xs text-forest-700/80">
              <div className="flex flex-col items-center gap-1">
                <Truck size={16} className="text-forest-800" />
                <span className="text-[11px] font-medium">Free Pan-India Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-forest-800" />
                <span className="text-[11px] font-medium">Ayush Heavy-Metal Tested</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw size={16} className="text-forest-800" />
                <span className="text-[11px] font-medium">Fresh 2026 Batch</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed In-Depth Information */}
        <div className="bg-white rounded-3xl border border-sand-300 p-6 sm:p-10 shadow-soft mb-20">
          
          {/* Tabs bar */}
          <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-sand-200 pb-4 mb-8">
            {[
              { id: 'description', label: 'Detailed Description' },
              { id: 'ingredients', label: 'Full Botanical Actives' },
              { id: 'howToUse', label: 'How to Use Ritual' },
              { id: 'reviews', label: `Patron Reviews (${product.reviewsCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-forest-800 text-sand-50 shadow-sm'
                    : 'text-forest-700 hover:text-forest-900 hover:bg-sand-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-forest-800/80 leading-relaxed font-light">
              <h3 className="font-serif text-xl font-medium text-forest-900 mb-2">
                Pure Formulation Philosophy
              </h3>
              <p>{product.description}</p>
              <p>
                Engineered with high bioavailability, allowing active herbal polyphenols to permeate into deeper epidermal layers without clogging pores. Free of silicones that create artificial barriers.
              </p>
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-xl font-medium text-forest-900 mb-2">
                Complete Transparent Formulation
              </h3>
              <p className="text-xs text-forest-700/70 mb-4 font-light">
                We believe in 100% label disclosure. No hidden fragrances or undisclosed processing aids.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-sand-50 border border-sand-200 text-xs text-forest-900 font-medium">
                    <Leaf size={14} className="text-sage-600 shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: How to Use */}
          {activeTab === 'howToUse' && (
            <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-forest-800/80 leading-relaxed font-light">
              <h3 className="font-serif text-xl font-medium text-forest-900 mb-2">
                Recommended Daily Protocol
              </h3>
              <p>{product.howToUse}</p>
              <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-forest-800 mt-4">
                <strong>Ayurvedic Tip:</strong> For highest absorption, warm the formulation gently between your palms for 5 seconds before pressing into clean skin.
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between pb-4 border-b border-sand-200">
                <div>
                  <h3 className="font-serif text-xl font-medium text-forest-900">
                    Patron Feedback
                  </h3>
                  <div className="mt-1">
                    <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={15} />
                  </div>
                </div>
                <button
                  onClick={() => alert("Review submission dialog demo: Thank you for sharing your ritual feedback!")}
                  className="bg-forest-800 text-sand-50 text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  Write a Review
                </button>
              </div>

              <div className="space-y-4 text-xs text-forest-800">
                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest-900">Dr. Sneha Pillai • Verified Patron</span>
                    <span className="text-forest-700/60 text-[11px]">3 days ago</span>
                  </div>
                  <div className="flex items-center text-gold-500">
                    {[1,2,3,4,5].map(s => <Star key={s} size={13} className="fill-gold-500 text-gold-500" />)}
                  </div>
                  <p className="text-forest-700/80 leading-relaxed font-light">
                    "Exceptional texture and aromatic depth. My skin barrier has significantly calmed within 10 days of starting this routine."
                  </p>
                </div>

                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest-900">Vikramaditya Joshi • Verified Patron</span>
                    <span className="text-forest-700/60 text-[11px]">2 weeks ago</span>
                  </div>
                  <div className="flex items-center text-gold-500">
                    {[1,2,3,4,5].map(s => <Star key={s} size={13} className="fill-gold-500 text-gold-500" />)}
                  </div>
                  <p className="text-forest-700/80 leading-relaxed font-light">
                    "Absorbs immediately without any greasy sheen. Clean natural scent from pure essential oils rather than artificial perfume."
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Related Formulations Recommendations */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-8 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block mb-1">
                COMPLEMENTARY RITUALS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-forest-900">
                You May Also Cherish
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
