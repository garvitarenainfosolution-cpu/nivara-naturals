import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake, Sparkles, Check } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-forest-900 text-sand-200 border-t border-forest-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Promise Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-forest-800 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 shrink-0">
              <Leaf size={20} />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-sand-50">100% Botanical Actives</h5>
              <p className="text-xs text-sand-300/70 mt-0.5">Cold-pressed herbs & zero harsh synthetic fillers.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-sand-50">Ayush Certified</h5>
              <p className="text-xs text-sand-300/70 mt-0.5">Tested for purity, stability & dermal tolerance.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 shrink-0">
              <HeartHandshake size={20} />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-sand-50">Cruelty-Free & Vegan</h5>
              <p className="text-xs text-sand-300/70 mt-0.5">Never tested on animals. 100% vegetarian formulations.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-sand-50">Ethically Sourced</h5>
              <p className="text-xs text-sand-300/70 mt-0.5">Direct fair-trade partnerships with Indian smallholder farms.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-14 border-b border-forest-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-widest text-sand-50">
                NIVARA
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-gold-400 font-medium">
                NATURALS • AYURVEDA
              </span>
            </Link>
            <p className="text-xs text-sand-300/80 leading-relaxed max-w-sm">
              Rooted in classical Ayurvedic pharmacology and refined with modern dermatological science. 
              We craft pure botanical elixirs for men and women seeking authentic, mindful self-care rituals.
            </p>
            <div className="pt-2 text-xs text-sand-300/60">
              <span>Made with love in India • Ships Pan-India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-sand-50 uppercase tracking-wider mb-4">
              Rituals & Shop
            </h5>
            <ul className="space-y-2.5 text-xs text-sand-300/80">
              <li><Link to="/products" className="hover:text-gold-400 transition-colors">All Formulations</Link></li>
              <li><Link to="/men" className="hover:text-gold-400 transition-colors">Men's Grooming</Link></li>
              <li><Link to="/women" className="hover:text-gold-400 transition-colors">Women's Botanicals</Link></li>
              <li><Link to="/products?category=Serum" className="hover:text-gold-400 transition-colors">Active Serums</Link></li>
              <li><Link to="/products?category=Sunscreen" className="hover:text-gold-400 transition-colors">Mineral Sun Protection</Link></li>
              <li><Link to="/products?category=Hair+Oil" className="hover:text-gold-400 transition-colors">Ayurvedic Hair Oils</Link></li>
            </ul>
          </div>

          {/* Philosophy & Support */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-sand-50 uppercase tracking-wider mb-4">
              Brand & Care
            </h5>
            <ul className="space-y-2.5 text-xs text-sand-300/80">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">Our Heritage</Link></li>
              <li><Link to="/ingredients" className="hover:text-gold-400 transition-colors">Our Clean Promise</Link></li>
              <li><Link to="/blog" className="hover:text-gold-400 transition-colors">Skincare Journal</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact Concierge</Link></li>
              <li><Link to="/faq" className="hover:text-gold-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-gold-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gold-400 transition-colors">Privacy & Terms</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div id="newsletter" className="space-y-3">
            <h5 className="font-serif text-sm font-semibold text-sand-50 uppercase tracking-wider">
              The Botanical Circle
            </h5>
            <p className="text-xs text-sand-300/80 leading-relaxed">
              Subscribe to receive Ayurvedic seasonal guidance, private preview launches, and an instant 10% privilege code.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-forest-800 text-sand-100 text-xs px-3.5 py-3 rounded-xl border border-forest-700 placeholder:text-sand-300/40 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gold-500 hover:bg-gold-400 text-forest-900 rounded-lg flex items-center justify-center transition-colors text-xs font-semibold"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={14} />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-gold-400 pt-1">
                  <Check size={14} />
                  <span>Welcome to Nivara! Check your inbox for your 10% code.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-300/60 gap-4">
          <p>© {new Date().getFullYear()} Nivara Naturals Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-sand-200">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-sand-200">Terms of Service</Link>
            <span>•</span>
            <span>Secure 256-Bit SSL Checkout</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
