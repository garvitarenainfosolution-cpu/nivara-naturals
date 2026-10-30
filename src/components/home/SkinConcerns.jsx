import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Droplets, Sun, Feather } from 'lucide-react';

const CONCERNS_DATA = [
  {
    id: "anti-aging",
    icon: Sparkles,
    title: "Anti-Aging & Firmness",
    tagline: "Cellular renewal without peeling or inflammation",
    description: "Rebuild dermal density with plant-derived 2% Bakuchiol, Gotu Kola triterpenes, and organic cold-pressed rosehip seed oil.",
    keyIngredient: "Indian Babchi Seed (Bakuchiol)",
    link: "/products?concern=anti-aging",
    bgClass: "from-amber-900/10 to-sand-100"
  },
  {
    id: "acne",
    icon: Shield,
    title: "Acne & Oil Control",
    tagline: "Purify congested pores & balance sebum",
    description: "Activated bamboo charcoal, wild Nilgiri tea tree, and Moroccan rhassoul clay sweep away acne bacteria while preserving essential barrier lipids.",
    keyIngredient: "Activated Himalayan Charcoal & Tea Tree",
    link: "/products?concern=acne",
    bgClass: "from-emerald-950/10 to-sand-100"
  },
  {
    id: "hydration",
    icon: Droplets,
    title: "Deep Barrier Hydration",
    tagline: "Multi-depth moisture replenishment",
    description: "Sacred pink lotus and triple molecular hyaluronic acid flood parched cells with weightless, 72-hour dewy hydration.",
    keyIngredient: "Bio-Fermented Hyaluronic Acid & Pink Lotus",
    link: "/products?concern=hydration",
    bgClass: "from-blue-950/10 to-sand-100"
  },
  {
    id: "brightening",
    icon: Sun,
    title: "Sunspots & Pigmentation",
    tagline: "Natural skin tone illumination",
    description: "Authentic Kashmiri Mogra saffron and 15% stabilized Vitamin C gently fade sun tans, dark spots, and stubborn post-blemish marks.",
    keyIngredient: "Kashmiri Mogra Saffron (Grade A)",
    link: "/products?concern=brightening",
    bgClass: "from-yellow-950/10 to-sand-100"
  },
  {
    id: "sensitive",
    icon: Feather,
    title: "Sensitivity & Barrier Repair",
    tagline: "Calm redness, razor burn & irritation",
    description: "Pure steam-distilled Damask rose water and Mysore sandalwood instantly soothe reactive, stressed skin and razor friction.",
    keyIngredient: "Single-Origin Kannauj Rose Distillate",
    link: "/products?concern=sensitive",
    bgClass: "from-rose-950/10 to-sand-100"
  }
];

export const SkinConcerns = () => {
  const [activeConcern, setActiveConcern] = useState(CONCERNS_DATA[0]);

  return (
    <section className="py-20 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block mb-2">
            TARGETED BOTANICAL SOLUTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900 tracking-tight">
            Shop by Skin Concern
          </h2>
          <p className="text-xs sm:text-sm text-forest-700/70 mt-2">
            Select your primary skin focus to discover our tailored Ayurvedic treatment protocols.
          </p>
        </div>

        {/* Concern Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {CONCERNS_DATA.map((concern) => {
            const Icon = concern.icon;
            const isActive = activeConcern.id === concern.id;
            return (
              <button
                key={concern.id}
                onClick={() => setActiveConcern(concern)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-forest-800 text-sand-50 shadow-luxury'
                    : 'bg-white text-forest-800 border border-sand-300 hover:border-forest-700'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-gold-400' : 'text-forest-700'} />
                <span>{concern.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Concern Highlight Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-sand-300 p-8 sm:p-12 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600 block">
              HERBAL TARGET PROTOCOL
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-forest-900">
              {activeConcern.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-sage-600">
              {activeConcern.tagline}
            </p>
            <p className="text-xs sm:text-sm text-forest-700/80 leading-relaxed font-light">
              {activeConcern.description}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-forest-800">Hero Botanical Active: </span>
              <span className="text-[11px] text-forest-700/70">{activeConcern.keyIngredient}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-6 bg-sand-100 rounded-2xl border border-sand-200 shrink-0 w-full md:w-64">
            <span className="text-xs text-forest-700/70 font-medium mb-3">Curated Ritual Products</span>
            <Link
              to={activeConcern.link}
              className="w-full inline-flex items-center justify-center gap-2 bg-forest-800 hover:bg-forest-900 text-sand-50 text-xs font-semibold py-3 px-5 rounded-xl uppercase tracking-wider transition-colors shadow-md"
            >
              View Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
