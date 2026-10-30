import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { BLOGS } from '../data/blogs';

export const BlogListPage = () => {
  return (
    <div className="bg-sand-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block">
            THE BOTANICAL JOURNAL
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-forest-900 tracking-tight">
            Holistic Skincare & Ritual Guidance
          </h1>
          <p className="text-xs sm:text-sm text-forest-700/80 font-light leading-relaxed">
            Dermatological science meets classical Ayurvedic pharmacopeia. Learn how to optimize your daily self-care ritual.
          </p>
        </div>

        {/* Blog Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-soft hover:shadow-luxury transition-all flex flex-col group"
            >
              <Link to={`/blog/${blog.slug}`} className="aspect-[16/10] overflow-hidden bg-sand-200 block">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </Link>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-sage-600 font-semibold uppercase tracking-wider mb-2">
                    <span>{blog.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-forest-700/60 font-normal">
                      <Clock size={11} /> {blog.readTime}
                    </span>
                  </div>

                  <Link to={`/blog/${blog.slug}`}>
                    <h2 className="font-serif text-xl font-medium text-forest-900 group-hover:text-forest-600 transition-colors mb-3 leading-snug">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-forest-700/70 leading-relaxed font-light mb-6">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                  <span className="text-[11px] text-forest-700/60 font-medium">{blog.author.split(',')[0]}</span>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-forest-900 group-hover:text-gold-500 transition-colors"
                  >
                    Read Story <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
