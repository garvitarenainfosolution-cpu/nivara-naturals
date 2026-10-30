import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rotate3D, Sparkles, ShieldCheck, ArrowRight, Check, Droplets, Leaf } from 'lucide-react';
import gsap from 'gsap';
import { SerumBottle3D } from './SerumBottle3D';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const Showcase3D = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const canvasRef = useRef(null);
  const infoRef = useRef(null);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [activeActiveTab, setActiveActiveTab] = useState(0);

  // The featured hero formulation: Bakuchiol 2% Botanical Youth Serum
  const heroProduct = PRODUCTS.find((p) => p.id === 'women-03') || PRODUCTS[0];

  const ACTIVE_INGREDIENTS = [
    {
      name: "2% Pure Indian Babchi (Bakuchiol)",
      role: "Botanical Retinol Alternative",
      desc: "Stimulates collagen and accelerates skin turnover by 48% in 28 days with zero burning, redness, or peeling.",
      origin: "Uttarakhand Foothills"
    },
    {
      name: "Cold-Pressed Virgin Rosehip",
      role: "Lipid Barrier Fortification",
      desc: "Rich in provitamin A and essential omegas 3, 6, and 9 to rebuild stressed moisture mantles.",
      origin: "Himachal Valleys"
    },
    {
      name: "Bio-Fermented Vegan Peptides",
      role: "Micro-Firming Matrix",
      desc: "Tripeptide chains that improve elasticity around expression areas and forehead lines.",
      origin: "Botanical Bio-Lab"
    }
  ];

  // GSAP Smooth Entrance Animation on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header tag and title reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
      );

      // 3D Canvas scale and smooth fade in
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.3, delay: 0.2, ease: 'power3.out' }
      );

      // Left info sidebar reveal
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.2, delay: 0.35, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    addToCart(heroProduct, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-forest-900 text-sand-50 relative overflow-hidden"
    >
      {/* Background radial glows adhering to Nivara palette */}
      <div className="absolute top-0 right-1/4 w-[38rem] h-[38rem] bg-forest-800/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[30rem] h-[30rem] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#c5a05908_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Animated by GSAP) */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-forest-800/90 border border-forest-700 px-4 py-1.5 rounded-full text-gold-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-3 shadow-lg">
            <Rotate3D size={15} />
            <span>Interactive 3D Formulation Lab</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-sand-50 tracking-tight leading-tight">
            Examine the Anatomy of Pure Glass & Botanicals
          </h2>
          <p className="text-xs sm:text-sm text-sand-300/80 mt-3 font-light leading-relaxed">
            Drag to rotate our signature forest-green glass serum bottle 360 degrees. Inspect our gold anodized dropper assembly and pure plant-derived retinol actives.
          </p>
        </div>

        {/* 3D Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Product Specifications & Active Selection */}
          <div ref={infoRef} className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-gold-400 mb-1.5">
                <Sparkles size={13} />
                <span>SIGNATURE APOTHECARY ELIXIR</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-sand-50 leading-snug">
                {heroProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-sand-300/80 mt-2 font-light leading-relaxed">
                Formulated with 100% plant-based Babchi extract, Kashmiri Mogra saffron, and micro-peptides. Certified Ayush grade with zero synthetic silicone fillers.
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-forest-800/80 rounded-2xl border border-forest-700/80 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gold-400">
                ₹{heroProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-sand-300/50 line-through">
                ₹{heroProduct.mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] bg-gold-500/20 text-gold-300 border border-gold-500/30 px-2.5 py-0.5 rounded-full font-bold">
                Save ₹{heroProduct.mrp - heroProduct.price}
              </span>
              <span className="ml-auto text-[11px] text-sand-300/60 font-medium">
                30 ml / 1.0 fl. oz.
              </span>
            </div>

            {/* Interactive Actives Tabs */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sand-300/70 block">
                Inspect Bio-Active Botanical Mechanisms:
              </span>
              
              <div className="space-y-2">
                {ACTIVE_INGREDIENTS.map((active, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveActiveTab(idx)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      activeActiveTab === idx
                        ? 'bg-forest-800 border-gold-500/70 shadow-lg ring-1 ring-gold-500/30'
                        : 'bg-forest-800/40 border-forest-700/60 hover:bg-forest-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-semibold text-sand-50">
                        {active.name}
                      </span>
                      <span className="text-[10px] text-gold-400 font-medium">
                        {active.origin}
                      </span>
                    </div>
                    {activeActiveTab === idx && (
                      <p className="text-[11px] text-sand-300/80 mt-1.5 leading-relaxed font-light animate-fadeIn">
                        {active.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Buying Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full sm:flex-1 py-3.5 px-6 rounded-2xl font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-luxury ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-gold-500 hover:bg-gold-400 text-forest-900 active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <Droplets size={16} /> Add to Cart • ₹{heroProduct.price}
                  </>
                )}
              </button>

              <Link
                to={`/product/${heroProduct.id}`}
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-forest-800 hover:bg-forest-700 border border-forest-700 text-sand-200 hover:text-white px-5 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Full Ritual Specs <ArrowRight size={14} />
              </Link>
            </div>

            {/* Trust Points */}
            <div className="flex items-center gap-6 pt-3 text-[11px] text-sand-300/70 border-t border-forest-800">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-gold-400" />
                100% Plant Retinol
              </span>
              <span className="flex items-center gap-1.5">
                <Leaf size={14} className="text-sage-400" />
                Ayush Certified Pure
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Three.js 3D Viewport (Animated by GSAP) */}
          <div 
            ref={canvasRef}
            className="lg:col-span-7 relative flex justify-center order-1 lg:order-2"
          >
            {/* Outer Decorative Glow Frame */}
            <div className="w-full max-w-lg aspect-[4/5] sm:aspect-square rounded-[3rem] bg-gradient-to-b from-forest-800/50 via-forest-800/20 to-forest-800/60 border border-forest-700/80 shadow-2xl backdrop-blur-xl relative overflow-hidden flex items-center justify-center">
              
              {/* Inner Three.js Canvas Scene */}
              <SerumBottle3D />

              {/* Corner Watermarks */}
              <div className="absolute top-6 left-6 pointer-events-none text-sand-300/40 text-[10px] font-mono uppercase tracking-widest">
                [ R3F • THREE.JS 3D ENGINE ]
              </div>
              <div className="absolute top-6 right-6 pointer-events-none text-gold-400/80 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={12} />
                <span>PBR GLASS & GOLD</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
