import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, ArrowLeft } from 'lucide-react';

export const PolicyPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isShipping = pathname.includes('shipping');
  const isPrivacy = pathname.includes('privacy');

  const title = isShipping
    ? "Shipping, Delivery & Return Policy"
    : isPrivacy
    ? "Privacy & Data Protection Policy"
    : "Terms of Service & Usage";

  return (
    <div className="bg-sand-50 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900">
          <ArrowLeft size={13} /> Back to Sanctuary Home
        </Link>

        <header className="space-y-2 pb-6 border-b border-sand-300">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block">
            LEGAL & OPERATIONAL TRANSPARENCY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900">
            {title}
          </h1>
          <p className="text-xs text-forest-700/60">Last updated: October 2026 • Nivara Naturals Pvt. Ltd.</p>
        </header>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-sand-300 shadow-soft space-y-8 text-xs sm:text-sm text-forest-800/80 leading-relaxed font-light">
          {isShipping ? (
            <>
              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">1. Pan-India Shipping Timelines</h3>
                <p>
                  All orders received before 2:00 PM IST Monday through Saturday are dispatched on the same day from our temperature-controlled facility in Mumbai.
                  Standard express transit takes 2-4 business days for tier-1 metropolitan cities and 3-6 days for regional destinations.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">2. Free Delivery Threshold</h3>
                <p>
                  Orders totaling ₹999 or higher qualify for complimentary express delivery across all serviceable Indian pincodes. For orders below ₹999, a nominal flat express shipping charge of ₹99 is applied at checkout.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">3. 15-Day Ritual Satisfaction Guarantee</h3>
                <p>
                  We stand firmly behind the integrity of our small-batch Ayurvedic preparations. If a product causes sensitivity or does not harmonize with your skin within 15 days of delivery, contact our concierge at concierge@nivaranaturals.com for an exchange or refund.
                </p>
              </section>
            </>
          ) : isPrivacy ? (
            <>
              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">1. Information We Collect</h3>
                <p>
                  We collect customer name, shipping address, contact phone number, and email address strictly to fulfill your order and provide delivery dispatch notifications.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">2. Financial Security & Payment Data</h3>
                <p>
                  Nivara Naturals never stores or logs your credit/debit card numbers or UPI MPINs. All transactions are securely routed through PCI-DSS Level 1 certified gateways with 256-bit TLS encryption.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">3. Zero Third-Party Advertising Sharing</h3>
                <p>
                  We will never sell, rent, or lease your personal customer information to external data brokers or telemarketers.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">1. Acceptance of Terms</h3>
                <p>
                  By browsing, accessing, or placing an order on nivaranaturals.com, you agree to comply with and be bound by these Terms of Service.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-forest-900">2. Product Authenticity & Batch Variations</h3>
                <p>
                  Because we utilize pure, unadulterated cold-pressed botanicals and wild herbs without artificial color dyes, slight natural variations in color, aroma, and viscosity between harvest batches are normal and a hallmark of authentic raw botanical integrity.
                </p>
              </section>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
