import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { INGREDIENTS } from '../../data/ingredients';

export const IngredientsSpotlight = () => {
  return (
    <section className="py-20 bg-sand-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block mb-2">
              CONSCIOUS SOURCING
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900 tracking-tight">
              Rare Botanical Actives Spotlight
            </h2>
          </div>
          <Link
            to="/ingredients"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest-800 hover:text-gold-500 mt-2 md:mt-0 transition-colors"
          >
            Read Our Full Ingredients Index <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6 Ingredient Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              className="group bg-white rounded-3xl p-6 border border-sand-300 shadow-soft hover:shadow-luxury hover:border-sage-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-sand-200">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-forest-800 flex items-center gap-1">
                    <MapPin size={11} className="text-gold-500" />
                    <span>{ing.origin}</span>
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 block mb-1">
                  {ing.benefit}
                </span>

                <h3 className="font-serif text-xl font-medium text-forest-900 mb-2">
                  {ing.name}
                </h3>

                <p className="text-xs text-forest-700/70 leading-relaxed font-light mb-4">
                  {ing.description}
                </p>
              </div>

              <div className="pt-3 border-t border-sand-200 text-[11px] text-forest-800 font-medium">
                <span className="text-forest-700/60 block text-[10px] uppercase tracking-wider">Featured In:</span>
                <span className="font-semibold text-forest-900">{ing.featuredProduct}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
