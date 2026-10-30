import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-sand-100 overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sage-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-gold-400/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#15291e08_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-sand-300 px-3.5 py-1.5 rounded-full shadow-sm">
              <Sparkles size={14} className="text-gold-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest-800">
                100% Ayurvedic • Clinically Refined
              </span>
            </div>

            {/* Main Headline with Playfair Display */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-forest-900 leading-[1.12] tracking-tight">
              Pure Botanicals. <br />
              <span className="italic font-serif font-light text-forest-700">Timeless</span> Radiance.
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-forest-700/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Handcrafted in small artisanal batches with cold-pressed Himalayan herbs, rare Kashmiri saffron, and potent plant actives. Designed with intention for both women and men.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/women"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-forest-800 text-sand-50 hover:bg-forest-900 px-8 py-4 rounded-2xl text-xs uppercase tracking-widest font-semibold transition-all shadow-luxury hover:shadow-luxury-hover hover:-translate-y-0.5"
              >
                Women's Rituals <ArrowRight size={15} />
              </Link>

              <Link
                to="/men"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-forest-900 border border-sand-300 hover:border-forest-700 px-8 py-4 rounded-2xl text-xs uppercase tracking-widest font-semibold transition-all hover:-translate-y-0.5 shadow-sm"
              >
                Men's Grooming <ArrowRight size={15} />
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-sand-300/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-forest-900 block">20+</span>
                <span className="text-[11px] text-forest-700/70 font-medium">Ayurvedic Actives</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-forest-900 block">100%</span>
                <span className="text-[11px] text-forest-700/70 font-medium">Clean & Vegan</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-forest-900 block">4.9 ★</span>
                <span className="text-[11px] text-forest-700/70 font-medium">From 2,400+ Rituals</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Arch Frame */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/60 bg-sand-200">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80"
                alt="Nivara Naturals Luxury Botanical Elixirs"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-sand-50">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                  FEATURED FORMULATION
                </span>
                <h4 className="font-serif text-lg font-medium">
                  Bakuchiol 2% Botanical Youth Serum
                </h4>
                <p className="text-xs text-sand-200/90 mt-0.5">₹1,499 • 100% Plant Retinol</p>
              </div>
            </div>

            {/* Floating Badge 1: Top Left */}
            <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-luxury border border-sand-200 flex items-center gap-3 animate-float hidden sm:flex">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-forest-800">
                <Leaf size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600 block">Purity Guarantee</span>
                <span className="text-xs font-bold text-forest-900">Zero Synthetic Fillers</span>
              </div>
            </div>

            {/* Floating Badge 2: Bottom Right */}
            <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-luxury border border-sand-200 flex items-center gap-3 animate-float-delayed hidden sm:flex">
              <div className="w-10 h-10 rounded-full bg-sand-200 flex items-center justify-center text-gold-500">
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700/60 block">Ayush Certified</span>
                <span className="text-xs font-bold text-forest-900">100% Dermal Safety</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
