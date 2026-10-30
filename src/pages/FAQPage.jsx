import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "Are Nivara Naturals products suitable for both men and women?",
    a: "Yes. While we curate dedicated Men's and Women's collections formulated for physiological nuances (such as men's higher sebum secretion and beard growth), all botanical actives are universally beneficial and 100% gender-inclusive."
  },
  {
    q: "Why use Bakuchiol instead of prescription Retinol?",
    a: "Synthetic retinol frequently triggers the 'retinol purge'—severe erythema, peeling, burning, and intense sun-sensitivity. 2% Bakuchiol extracted from Babchi seeds achieves comparable collagen stimulation and cellular turnover without compromising the epidermal barrier, making it safe for daytime use under sunscreen."
  },
  {
    q: "Do your mineral sunscreens leave any white cast on Indian skin tones?",
    a: "No. Both our Matte Shield SPF 50 (Men) and Invisible Dew SPF 50+ (Women) utilize specialized micronized non-nano Zinc Oxide dispersion technology that melts clear into melanin-rich Indian skin tones, including over facial stubble."
  },
  {
    q: "What is your standard delivery timeline across India?",
    a: "Orders are dispatched within 24 hours from our Mumbai facility via Bluedart or Delhivery express couriers. Metro deliveries arrive within 2–3 business days; rest of India takes 3–5 business days. Free shipping applies on all orders above ₹999."
  },
  {
    q: "Are Nivara preparations Ayush certified and heavy-metal tested?",
    a: "Yes. Every batch is manufactured in certified GMP facilities, recognized by the Ministry of Ayush, and tested for zero microbial contamination and heavy-metal purity (lead, arsenic, mercury)."
  },
  {
    q: "What is your return and satisfaction policy?",
    a: "We offer a 15-day ritual satisfaction guarantee. If a product does not suit your skin, simply email our concierge team for an exchange or full refund."
  }
];

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-sand-50 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block">
            PATRON CLARITY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-forest-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-forest-700/80 font-light max-w-lg mx-auto">
            Everything you need to know about our sourcing, formulations, and delivery policies.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-sand-300 shadow-soft overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-forest-900">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center text-forest-800 shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-forest-800 text-sand-50' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-forest-700/80 leading-relaxed font-light border-t border-sand-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
