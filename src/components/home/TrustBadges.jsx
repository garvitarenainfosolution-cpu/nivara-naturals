import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Recycle, FlaskConical, Sparkles } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Ayush Certified Standards",
    desc: "Formulated according to authenticated pharmacopeia standards with verified heavy metal testing."
  },
  {
    icon: FlaskConical,
    title: "Zero Toxic Synthetics",
    desc: "100% free from parabens, silicones, sulphates, artificial colorants, and petrochemical fragrances."
  },
  {
    icon: Award,
    title: "Cold-Pressed Freshness",
    desc: "Slow-pressed in micro-batches to preserve heat-sensitive antioxidants and volatile phytonutrients."
  },
  {
    icon: HeartHandshake,
    title: "Ethical Fair-Trade",
    desc: "Direct partnerships with certified smallholder botanical growers in Kashmir, Uttarakhand, and Kerala."
  },
  {
    icon: Recycle,
    title: "Amber Glass Apothecary",
    desc: "Infinitely recyclable UV-protective pharmaceutical amber glass that shields bio-actives from light degradation."
  },
  {
    icon: Sparkles,
    title: "Dermatologically Tested",
    desc: "Extensively clinical patch-tested on diverse Indian skin tones for optimum dermal harmony."
  }
];

export const TrustBadges = () => {
  return (
    <section className="py-20 bg-forest-900 text-sand-50 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400 block mb-2">
            UNCOMPROMISING PURITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-sand-50 tracking-tight">
            The Nivara Clean Beauty Standard
          </h2>
          <p className="text-xs sm:text-sm text-sand-300/80 mt-2 font-light">
            We hold our preparations to the world's most rigorous botanical safety benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-forest-800/50 border border-forest-700/70 rounded-3xl p-6 sm:p-8 hover:bg-forest-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-forest-700/80 flex items-center justify-center text-gold-400 mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="font-serif text-lg font-medium text-sand-50 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-sand-300/80 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
