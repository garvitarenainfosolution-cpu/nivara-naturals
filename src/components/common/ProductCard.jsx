import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { StarRating } from './StarRating';
import { Badge } from './Badge';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = React.useState(false);

  const discountPercent = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-soft hover:shadow-luxury hover:border-sage-300 transition-all duration-300 flex flex-col h-full">
      {/* Top Image Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-sand-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <Badge variant={product.badge.toLowerCase().includes('retinol') || product.badge.toLowerCase().includes('gold') ? 'gold' : 'default'}>
              {product.badge}
            </Badge>
          )}
          {discountPercent > 0 && (
            <span className="bg-sage-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 shadow-md'
              : 'bg-white/80 backdrop-blur-md text-forest-800 hover:bg-white hover:text-rose-500 shadow-sm'
          }`}
        >
          <Heart size={18} className={isFavorited ? "fill-rose-500 text-rose-500" : ""} />
        </button>

        {/* Quick Add overlay button on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden sm:block z-10">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
              added
                ? 'bg-emerald-700 text-white'
                : 'bg-forest-800 text-sand-50 hover:bg-forest-900 active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check size={16} /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Quick Add • ₹{product.price}
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Skin Type */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-sage-600 uppercase tracking-widest mb-1.5">
            <span>{product.category}</span>
            <span className="text-forest-700/60 font-medium lowercase capitalize">
              {product.gender === 'men' ? "Men's Care" : "Women's Ritual"}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-base sm:text-lg font-medium text-forest-900 group-hover:text-forest-600 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-forest-700/70 line-clamp-2 mb-3 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Rating and Price Footer */}
        <div>
          <div className="mb-3">
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-sand-200">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-forest-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-forest-700/50 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Mobile Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
              className={`sm:hidden p-2.5 rounded-full transition-all ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-forest-800 text-sand-50 hover:bg-forest-900'
              }`}
            >
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
