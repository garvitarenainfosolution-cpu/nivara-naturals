import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Heart, ShoppingBag, ShieldCheck, HelpCircle, BookOpen } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { wishlistCount } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-forest-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-sand-50 shadow-2xl z-10 flex flex-col border-r border-sand-300">
        {/* Header */}
        <div className="p-5 border-b border-sand-200 flex items-center justify-between bg-white">
          <Link to="/" onClick={onClose} className="font-serif text-lg font-bold tracking-wider text-forest-900">
            NIVARA <span className="text-gold-500 font-sans text-xs tracking-widest font-normal">NATURALS</span>
          </Link>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-forest-700 hover:bg-sand-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-forest-700/60 block mb-2">
              Collections
            </span>
            <ul className="space-y-3 text-sm font-medium text-forest-900">
              <li>
                <Link to="/products" onClick={onClose} className="flex items-center justify-between py-1 hover:text-gold-500">
                  <span>All Botanical Products</span>
                  <ArrowRight size={14} className="text-forest-700/40" />
                </Link>
              </li>
              <li>
                <Link to="/men" onClick={onClose} className="flex items-center justify-between py-1 text-forest-900 hover:text-gold-500">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-800"></span>
                    Men's Grooming Collection
                  </span>
                  <ArrowRight size={14} className="text-forest-700/40" />
                </Link>
              </li>
              <li>
                <Link to="/women" onClick={onClose} className="flex items-center justify-between py-1 text-forest-900 hover:text-gold-500">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-500"></span>
                    Women's Ayurvedic Rituals
                  </span>
                  <ArrowRight size={14} className="text-forest-700/40" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-sand-200">
            <span className="text-[10px] font-bold uppercase tracking-widest text-forest-700/60 block mb-2">
              Brand & Philosophy
            </span>
            <ul className="space-y-3 text-sm font-medium text-forest-800">
              <li>
                <Link to="/about" onClick={onClose} className="block py-1 hover:text-gold-500">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link to="/ingredients" onClick={onClose} className="block py-1 hover:text-gold-500">
                  Pure Ingredients & Our Promise
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={onClose} className="block py-1 hover:text-gold-500">
                  Skincare Journal & Editorial
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-sand-200">
            <span className="text-[10px] font-bold uppercase tracking-widest text-forest-700/60 block mb-2">
              Support & Help
            </span>
            <ul className="space-y-2.5 text-xs text-forest-700">
              <li>
                <Link to="/faq" onClick={onClose} className="flex items-center gap-2 py-1 hover:text-forest-900">
                  <HelpCircle size={14} /> Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={onClose} className="flex items-center gap-2 py-1 hover:text-forest-900">
                  <BookOpen size={14} /> Contact Skincare Concierge
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" onClick={onClose} className="flex items-center gap-2 py-1 hover:text-forest-900">
                  <ShieldCheck size={14} /> Shipping & Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-5 border-t border-sand-200 bg-white">
          <Link
            to="/products"
            onClick={onClose}
            className="w-full bg-forest-800 text-sand-50 text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            Shop Now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
