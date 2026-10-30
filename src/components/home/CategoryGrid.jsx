import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES_DATA = [
  {
    title: "Cleansers & Washes",
    subtitle: "Charcoal, Tea Tree & Kumkumadi Oils",
    categoryParam: "Face Wash",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
    cols: "md:col-span-2"
  },
  {
    title: "Potent Serums",
    subtitle: "2% Bakuchiol & Vitamin C 15%",
    categoryParam: "Serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
    cols: "md:col-span-1"
  },
  {
    title: "Moisturizers & Gels",
    subtitle: "Mysore Sandalwood & Lotus Clouds",
    categoryParam: "Moisturizer",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
    cols: "md:col-span-1"
  },
  {
    title: "Mineral Sunscreens",
    subtitle: "Matte Zinc & Dewy Cica SPF 50",
    categoryParam: "Sunscreen",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80",
    cols: "md:col-span-2"
  },
  {
    title: "Ayurvedic Hair Oils",
    subtitle: "Bhringraj & Brahmi Follicle Tonics",
    categoryParam: "Hair Oil",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
    cols: "md:col-span-1"
  },
  {
    title: "Detox Masks & Scrubs",
    subtitle: "Volcanic Clay & Kashmiri Ubtans",
    categoryParam: "Face Mask",
    image: "https://images.unsplash.com/photo-1567928815104-b690d5658602?auto=format&fit=crop&w=700&q=80",
    cols: "md:col-span-2"
  }
];

export const CategoryGrid = () => {
  return (
    <section className="py-20 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block mb-2">
              DISCOVER OUR CRAFT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900 tracking-tight">
              Shop by Botanical Ritual
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-forest-700/70 max-w-md mt-2 md:mt-0 leading-relaxed">
            Every step formulated to restore your skin's natural lipid equilibrium through classical Ayurvedic harmony.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?category=${encodeURIComponent(cat.categoryParam)}`}
              className={`group relative h-80 rounded-3xl overflow-hidden border border-sand-300 shadow-soft hover:shadow-luxury transition-all duration-500 ${cat.cols}`}
            >
              {/* Background Photo */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/30 to-transparent transition-opacity" />

              {/* Text Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-sand-50">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                      Explore Ritual
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-sand-200/80 mt-1 font-light">
                      {cat.subtitle}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-forest-900 transition-colors shrink-0">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
