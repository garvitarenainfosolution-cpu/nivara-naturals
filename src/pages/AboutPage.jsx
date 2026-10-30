import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="bg-sand-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Narrative */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block">
            OUR HERITAGE & ORIGIN
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-forest-900 leading-tight">
            Rooted in Ancient Wisdom. Refined by Modern Skin Science.
          </h1>
          <p className="text-sm sm:text-base text-forest-700/80 leading-relaxed font-light pt-2">
            Nivara Naturals was founded on a singular conviction: that true skin vitality is not achieved through aggressive synthetic stripping, but through harmonious cellular nourishment with pure botanical life-force.
          </p>
        </div>

        {/* 2-Column Story with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-sand-200">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80"
                alt="Botanical Harvesting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-forest-900 text-sand-50 p-6 rounded-3xl shadow-xl max-w-xs hidden sm:block">
              <span className="text-gold-400 font-serif text-2xl font-bold block">100%</span>
              <span className="text-xs text-sand-200 font-light">Smallholder botanical harvest partnerships across 6 Indian states.</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-xs sm:text-sm text-forest-800/80 leading-relaxed font-light">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600 block">
              THE NIVARA CHRONICLE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-forest-900">
              From Copper Degs in Kannauj to Cold Presses in Kerala
            </h2>
            <p>
              In classical Sanskrit, <em>Nivara</em> represents sanctuary, balance, and quiet restoration. For generations, traditional Indian apothecary preparations unlocked the therapeutic potential of botanicals like Babchi, Gotu Kola, and Kashmiri Mogra saffron.
            </p>
            <p>
              However, modern industrial commercialization replaced precious cold-pressed oils with cheap petroleum mineral oils and artificial silicones that temporarily disguise dullness while suffocating the skin barrier.
            </p>
            <p>
              We established Nivara Naturals to reclaim the gold standard: authentic copper hydro-distillations, slow seed extractions, and zero chemical compromise. Every formulation is crafted with meticulous care in climate-controlled micro-batches.
            </p>

            <div className="pt-4">
              <Link
                to="/ingredients"
                className="inline-flex items-center gap-2 bg-forest-800 text-sand-50 px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-forest-900 transition-colors"
              >
                Explore Our Clean Promise <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-forest-800 mb-5">
              <Leaf size={24} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-forest-900 mb-2">100% Bio-Active</h3>
            <p className="text-xs text-forest-700/70 leading-relaxed font-light">
              We never dilute our products with plain tap water or inert fillers. Every base is rich in organic aloe leaf hydrosol, steam-distilled rose, or herbal water.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-sand-200 flex items-center justify-center text-gold-600 mb-5">
              <Award size={24} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-forest-900 mb-2">Clinically Tested</h3>
            <p className="text-xs text-forest-700/70 leading-relaxed font-light">
              Our products undergo thorough 4-week clinical barrier patch tests under dermatologist supervision to guarantee zero irritation even on reactive skin.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-sand-300 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 flex items-center justify-center text-sand-50 mb-5">
              <Heart size={24} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-forest-900 mb-2">Ethical Stewardship</h3>
            <p className="text-xs text-forest-700/70 leading-relaxed font-light">
              We practice direct fair-trade pricing with independent farmers in Kashmir, Karnataka, and Himachal Pradesh, ensuring living wages and biodiversity protection.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
