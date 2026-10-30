import React from 'react';
import { Instagram, Heart } from 'lucide-react';

const INSTA_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    likes: 842,
    tag: "#NivaraMorningRitual"
  },
  {
    image: "https://images.unsplash.com/photo-1608248597359-5975267a36cb?auto=format&fit=crop&w=600&q=80",
    likes: 1205,
    tag: "#KannaujRoseHydrosol"
  },
  {
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    likes: 654,
    tag: "#MysoreSandalwood"
  },
  {
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    likes: 1540,
    tag: "#BakuchiolYouth"
  },
  {
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
    likes: 918,
    tag: "#InvisibleDewSPF50"
  }
];

export const InstagramFeed = () => {
  return (
    <section className="py-20 bg-sand-100/60 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1.5 text-forest-800 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Instagram size={16} className="text-gold-500" />
            <span>@NIVARANATURALS</span>
          </div>
          <h2 className="font-serif text-3xl font-normal text-forest-900 tracking-tight">
            Follow the Botanical Aesthetic
          </h2>
          <p className="text-xs text-forest-700/70 mt-1">
            Tag us to be featured in our monthly botanical community spotlight.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {INSTA_POSTS.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft border border-sand-300"
            >
              <img
                src={post.image}
                alt={post.tag}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-forest-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-sand-50 text-center">
                <Instagram size={24} className="mb-2 text-gold-400" />
                <span className="text-[11px] font-bold tracking-wider">{post.tag}</span>
                <span className="text-[10px] text-sand-300/80 flex items-center gap-1 mt-1">
                  <Heart size={11} className="fill-rose-400 text-rose-400" /> {post.likes} loves
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
