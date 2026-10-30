import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ShieldCheck, Sparkles, Droplets } from 'lucide-react';

export const MensCollectionPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const mensProducts = PRODUCTS.filter((p) => p.gender === 'men');

  const categories = ['All', 'Face Wash', 'Moisturizer', 'Serum', 'Sunscreen', 'Hair Oil', 'Scrub', 'Toner', 'Lip Balm', 'Body Lotion', 'Face Mask'];

  const filtered = activeCategory === 'All'
    ? mensProducts
    : mensProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-sand-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Men's Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-forest-900 text-sand-50 p-8 sm:p-14 mb-12 shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400 block">
              ENGINEERED FOR MEN'S SKIN
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-sand-50">
              The Gentleman's Botanical Arsenal
            </h1>
            <p className="text-xs sm:text-sm text-sand-300/80 leading-relaxed font-light">
              Men's dermal layer is naturally thicker and produces more sebum. Our formulations harness activated Himalayan charcoal, Mysore sandalwood, and cold-pressed Bhringraj for zero-shine, high-performance daily grooming.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
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
