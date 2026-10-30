import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Sparkles, Heart } from 'lucide-react';

export const WomensCollectionPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const womensProducts = PRODUCTS.filter((p) => p.gender === 'women');

  const categories = ['All', 'Face Wash', 'Moisturizer', 'Serum', 'Sunscreen', 'Hair Oil', 'Scrub', 'Toner', 'Lip Balm', 'Body Lotion', 'Face Mask'];

  const filtered = activeCategory === 'All'
    ? womensProducts
    : womensProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-sand-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Women's Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-forest-900 via-forest-800 to-sage-600 text-sand-50 p-8 sm:p-14 mb-12 shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400 block">
              SACRED AYURVEDIC BEAUTY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-sand-50">
              The Queen's Radiance Rituals
            </h1>
            <p className="text-xs sm:text-sm text-sand-200/90 leading-relaxed font-light">
              Nourish your skin with time-honored rasayana botanicals: Grade-A Kashmiri Mogra saffron, sacred pink lotus nectar, 2% plant-derived Bakuchiol retinol, and steam-distilled Damask rose water.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all uppercase tracking-wider ${
                activeCategory === cat
                  ? 'bg-forest-800 text-sand-50 shadow-sm'
                  : 'bg-white text-forest-700 border border-sand-300 hover:border-forest-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 10 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
