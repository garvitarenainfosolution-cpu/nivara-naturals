import React, { useState } from 'react';
import { INGREDIENTS } from '../data/ingredients';
import { Check, X, Shield, Sparkles, MapPin, Leaf } from 'lucide-react';

const NEVER_LIST = [
  { name: "Parabens & Phenoxyethanol", reason: "Potential hormone disruptors" },
  { name: "Sulphates (SLS / SLES)", reason: "Strips natural skin barrier lipids" },
  { name: "Mineral Oils & Paraffin", reason: "Petroleum byproducts that clog pores" },
  { name: "Silicones (Dimethicone)", reason: "Creates fake plastic film over skin" },
  { name: "Phthalates & Synthetic Musk", reason: "Artificial hormone-altering fragrances" },
  { name: "Synthetic Dyes & Colorants", reason: "Common trigger for contact dermatitis" },
  { name: "Animal Derivatives", reason: "100% Cruelty-Free & Vegan formulation standard" },
  { name: "Microplastic Beads", reason: "Harmful to facial tissue and marine ecosystems" }
];

export const IngredientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = INGREDIENTS.filter(
    (ing) =>
      ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ing.benefit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ing.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-sand-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block">
            RADICAL TRANSPARENCY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-forest-900 leading-tight">
            Our Botanical Actives & The Clean Promise
          </h1>
          <p className="text-sm sm:text-base text-forest-700/80 leading-relaxed font-light pt-2">
            Every drop is intentional. We formulate exclusively with cold-pressed plant seeds, therapeutic flower distillates, and clinically validated Ayurvedic herbs.
          </p>
        </div>

        {/* Searchable Ingredients Glossary */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-300">
            <div>
              <h2 className="font-serif text-2xl font-medium text-forest-900">
                Hero Actives Directory
              </h2>
              <p className="text-xs text-forest-700/60 mt-0.5">Explore our most potent wild-harvested botanicals.</p>
            </div>
            <input
              type="text"
              placeholder="Filter by active or origin (e.g. Saffron, Kashmir)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-forest-900 focus:outline-none focus:border-forest-700 w-full sm:w-72"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ing) => (
              <div
                key={ing.id}
                className="bg-white rounded-3xl p-6 border border-sand-300 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-sand-200">
                    <img src={ing.image} alt={ing.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gold-600 font-bold uppercase tracking-wider mb-1">
                    <MapPin size={12} />
                    <span>{ing.origin}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-forest-900 mb-2">
                    {ing.name}
                  </h3>
                  <span className="text-xs font-semibold text-sage-600 block mb-2">{ing.benefit}</span>
                  <p className="text-xs text-forest-700/80 leading-relaxed font-light">
                    {ing.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] text-forest-900 font-medium">
                  <span className="text-forest-700/60 block text-[10px] uppercase tracking-wider">Featured in:</span>
                  <span>{ing.featuredProduct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The "Never List" (Zero compromise) */}
        <div className="bg-forest-900 text-sand-50 rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400 block mb-2">
              ZERO COMPROMISE STANDARDS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-sand-50 tracking-tight">
              Our 8 "Never In Nivara" Prohibitions
            </h2>
            <p className="text-xs sm:text-sm text-sand-300/80 mt-2 font-light">
              You will never find any of these cheap industry stabilizers or filler chemicals in any Nivara bottle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEVER_LIST.map((item, idx) => (
              <div key={idx} className="bg-forest-800/60 border border-forest-700 p-5 rounded-2xl">
                <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs mb-3">
                  ✕
                </div>
                <h4 className="font-serif text-sm font-semibold text-sand-50 mb-1">
                  {item.name}
                </h4>
                <p className="text-[11px] text-sand-300/70 font-light leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
