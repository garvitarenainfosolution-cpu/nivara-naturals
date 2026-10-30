import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Droplets, Leaf } from 'lucide-react';

export const MegaMenu = ({ onClose }) => {
  return (
    <div 
      className="absolute top-full left-0 w-full bg-sand-50/95 backdrop-blur-xl border-b border-sand-200 shadow-luxury z-50 py-8 px-6 transition-all"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Men's Rituals */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-forest-800"></span>
            <h4 className="font-serif text-base font-bold text-forest-900 tracking-wide">
              Men's Grooming
            </h4>
          </div>
          <p className="text-xs text-forest-700/60 mb-3">High-potency botanical care engineered for thicker, oilier skin.</p>
          <ul className="space-y-2 text-xs text-forest-700">
            <li><Link to="/products?category=Face+Wash&gender=men" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Charcoal & Tea Tree Cleansers</Link></li>
            <li><Link to="/products?category=Moisturizer&gender=men" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Sandalwood Matte Hydrators</Link></li>
            <li><Link to="/products?category=Serum&gender=men" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Vitamin C & Ashwagandha Serums</Link></li>
            <li><Link to="/products?category=Sunscreen&gender=men" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Matte Beard-Friendly Sunscreens</Link></li>
            <li><Link to="/products?category=Hair+Oil&gender=men" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Bhringraj Follicle Fortifiers</Link></li>
          </ul>
          <Link to="/men" onClick={onClose} className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-gold-500 mt-4">
            View All Men's Care <ArrowRight size={13} />
          </Link>
        </div>

        {/* Column 2: Women's Rituals */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-sage-500"></span>
            <h4 className="font-serif text-base font-bold text-forest-900 tracking-wide">
              Women's Rituals
            </h4>
          </div>
          <p className="text-xs text-forest-700/60 mb-3">Sacred lotus, Kashmiri saffron, and pure cold-pressed botanicals.</p>
          <ul className="space-y-2 text-xs text-forest-700">
            <li><Link to="/products?category=Face+Wash&gender=women" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Kumkumadi Cleansing Nectars</Link></li>
            <li><Link to="/products?category=Moisturizer&gender=women" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Lotus Cloud Gel Creams</Link></li>
            <li><Link to="/products?category=Serum&gender=women" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">2% Botanical Bakuchiol Youth Elixirs</Link></li>
            <li><Link to="/products?category=Toner&gender=women" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Kannauj Steam-Distilled Rose Mists</Link></li>
            <li><Link to="/products?category=Hair+Oil&gender=women" onClick={onClose} className="hover:text-forest-900 hover:translate-x-1 inline-block transition-transform">Cold-Pressed Brahmi Hair Elixirs</Link></li>
          </ul>
          <Link to="/women" onClick={onClose} className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-gold-500 mt-4">
            View All Women's Rituals <ArrowRight size={13} />
          </Link>
        </div>

        {/* Column 3: Shop by Concern */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-gold-500"></span>
            <h4 className="font-serif text-base font-bold text-forest-900 tracking-wide">
              Skin Concerns
            </h4>
          </div>
          <p className="text-xs text-forest-700/60 mb-3">Targeted formulations calibrated for your specific skin needs.</p>
          <ul className="space-y-2.5 text-xs text-forest-700">
            <li>
              <Link to="/products?concern=anti-aging" onClick={onClose} className="flex items-center gap-2 hover:text-forest-900 group">
                <Sparkles size={14} className="text-gold-500 group-hover:scale-110 transition-transform" />
                <span>Fine Lines & Anti-Aging</span>
              </Link>
            </li>
            <li>
              <Link to="/products?concern=acne" onClick={onClose} className="flex items-center gap-2 hover:text-forest-900 group">
                <Shield size={14} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Acne & Oil Control</span>
              </Link>
            </li>
            <li>
              <Link to="/products?concern=hydration" onClick={onClose} className="flex items-center gap-2 hover:text-forest-900 group">
                <Droplets size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />
                <span>Deep Barrier Hydration</span>
              </Link>
            </li>
            <li>
              <Link to="/products?concern=brightening" onClick={onClose} className="flex items-center gap-2 hover:text-forest-900 group">
                <Leaf size={14} className="text-amber-500 group-hover:scale-110 transition-transform" />
                <span>Sun Dullness & Pigmentation</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Promotional Feature Card */}
        <div className="bg-forest-900 text-sand-50 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative group">
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 mb-2 block">
              HERITAGE HARVEST
            </span>
            <h5 className="font-serif text-base font-semibold mb-2">
              The Bakuchiol Youth Discovery
            </h5>
            <p className="text-xs text-sand-200/80 leading-relaxed mb-4">
              Pure botanical retinol alternative. 100% plant-based, zero peeling, visible firming in 28 days.
            </p>
          </div>
          <Link
            to="/product/women-03"
            onClick={onClose}
            className="relative z-10 inline-flex items-center justify-center gap-2 bg-gold-500 text-forest-900 text-xs font-semibold py-2.5 px-4 rounded-xl hover:bg-gold-400 transition-colors"
          >
            Explore Elixir <ArrowRight size={14} />
          </Link>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-forest-700/50 blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  );
};
