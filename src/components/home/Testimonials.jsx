import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';

export const Testimonials = () => {
  return (
    <section className="py-20 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block mb-2">
            PATRON TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900 tracking-tight">
            Loved Across 50,000+ Daily Rituals
          </h2>
          <p className="text-xs sm:text-sm text-forest-700/70 mt-2">
            Real stories of transformation from verified customers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-sand-300 shadow-soft flex flex-col justify-between hover:shadow-luxury transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center text-gold-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <h4 className="font-serif text-base font-semibold text-forest-900 mb-2">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-forest-700/80 leading-relaxed font-light mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-sand-200">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-forest-900 block">{rev.author}</span>
                    <span className="text-[11px] text-forest-700/60">{rev.city}</span>
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle size={11} className="text-emerald-700" /> Verified
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-sage-600 block mt-2 font-medium">
                  Purchased: {rev.productName}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
