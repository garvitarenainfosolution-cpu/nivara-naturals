import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

export const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  // Detect scroll to add slight shadow and backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-sand-50/95 backdrop-blur-md shadow-sm border-b border-sand-300' : 'bg-sand-50 border-b border-sand-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg text-forest-900 hover:bg-sand-200 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu size={22} />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 ml-1 rounded-lg text-forest-900 hover:bg-sand-200"
              aria-label="Search products"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group flex flex-col items-center sm:items-start">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-forest-900 group-hover:text-forest-700 transition-colors">
                NIVARA
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-gold-500 font-medium">
                NATURALS • AYURVEDA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link 
              to="/" 
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-gold-500 ${
                location.pathname === '/' ? 'text-forest-900 border-b-2 border-forest-800 pb-0.5' : 'text-forest-700'
              }`}
            >
              Home
            </Link>

            {/* Shop Dropdown trigger with Mega Menu */}
            <div 
              className="relative py-4"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button 
                className="flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-forest-700 hover:text-gold-500 transition-colors focus:outline-none"
              >
                <span>Collections</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link 
              to="/men" 
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-gold-500 ${
                location.pathname === '/men' ? 'text-forest-900 border-b-2 border-forest-800 pb-0.5' : 'text-forest-700'
              }`}
            >
              Men's Care
            </Link>

            <Link 
              to="/women" 
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-gold-500 ${
                location.pathname === '/women' ? 'text-forest-900 border-b-2 border-forest-800 pb-0.5' : 'text-forest-700'
              }`}
            >
              Women's Rituals
            </Link>

            <Link 
              to="/ingredients" 
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-gold-500 ${
                location.pathname === '/ingredients' ? 'text-forest-900 border-b-2 border-forest-800 pb-0.5' : 'text-forest-700'
              }`}
            >
              Ingredients
            </Link>

            <Link 
              to="/about" 
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-gold-500 ${
                location.pathname === '/about' ? 'text-forest-900 border-b-2 border-forest-800 pb-0.5' : 'text-forest-700'
              }`}
            >
              About Us
            </Link>

            <Link 
              to="/blog" 
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-gold-500 ${
                location.pathname.startsWith('/blog') ? 'text-forest-900 border-b-2 border-forest-800 pb-0.5' : 'text-forest-700'
              }`}
            >
              Journal
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Desktop */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 p-2 rounded-full text-forest-800 hover:text-gold-500 hover:bg-sand-200 transition-colors"
              title="Search"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/products?wishlist=true"
              className="relative p-2 rounded-full text-forest-800 hover:text-rose-500 hover:bg-sand-200 transition-colors"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-forest-800 hover:bg-forest-900 text-sand-50 py-2 px-3.5 sm:px-4 rounded-full transition-all shadow-sm active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={17} />
              <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">Bag</span>
              <span className="w-5 h-5 rounded-full bg-gold-500 text-forest-900 text-[11px] font-bold flex items-center justify-center">
                {totalItemsCount}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {isMegaMenuOpen && (
        <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
