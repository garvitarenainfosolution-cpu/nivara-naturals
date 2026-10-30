import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const BestSellers = () => {
  const [filter, setFilter] = useState('all'); // 'all' | 'women' | 'men'

  const filtered = PRODUCTS.filter((p) => {
    if (filter === 'women') return p.gender === 'women';
    if (filter === 'men') return p.gender === 'men';
    return true;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-sand-100/60 border-y border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-gold-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-forest-800">
                TIME-TESTED FAVORITES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900 tracking-tight">
              Our 8 Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-forest-700/70 mt-1 max-w-lg">
              The formulations most celebrated by our patrons for tangible skin transformation.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-sand-300 shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                filter === 'all'
                  ? 'bg-forest-800 text-sand-50 shadow-sm'
                  : 'text-forest-700 hover:text-forest-900'
              }`}
            >
              All (8)
            </button>
            <button
              onClick={() => setFilter('women')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                filter === 'women'
                  ? 'bg-forest-800 text-sand-50 shadow-sm'
                  : 'text-forest-700 hover:text-forest-900'
              }`}
            >
              Women's
            </button>
            <button
              onClick={() => setFilter('men')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                filter === 'men'
                  ? 'bg-forest-800 text-sand-50 shadow-sm'
                  : 'text-forest-700 hover:text-forest-900'
              }`}
            >
              Men's
            </button>
          </div>
        </div>

        {/* 8 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-forest-800 text-forest-800 hover:text-sand-50 border-2 border-forest-800 px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-semibold transition-all hover:shadow-lg"
          >
            Explore Complete 20-Product Catalog <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
};
