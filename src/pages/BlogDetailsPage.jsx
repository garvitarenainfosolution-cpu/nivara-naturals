import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles } from 'lucide-react';
import { BLOGS } from '../data/blogs';

export const BlogDetailsPage = () => {
  const { slug } = useParams();
  const blog = BLOGS.find((b) => b.slug === slug) || BLOGS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="bg-sand-50 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900"
        >
          <ArrowLeft size={14} /> Back to Journal Index
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-600 block">
            {blog.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-forest-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-forest-700/70 pt-2 border-b border-sand-300 pb-4">
            <span className="font-medium text-forest-900">{blog.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar size={13} /> {blog.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {blog.readTime}</span>
          </div>
        </header>

        {/* Featured Banner Image */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-sand-200 border border-sand-300 shadow-soft">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sand-300 shadow-soft space-y-6 text-sm sm:text-base text-forest-800/90 leading-relaxed font-light">
          <p className="text-base sm:text-lg font-serif italic text-forest-900 leading-relaxed border-l-2 border-gold-500 pl-4 py-1">
            "{blog.excerpt}"
          </p>

          <div className="whitespace-pre-line space-y-4">
            {blog.content}
          </div>

          <div className="p-6 bg-sand-50 rounded-2xl border border-sand-200 mt-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
              <Sparkles size={14} className="text-gold-500" /> Key Botanical Takeaway
            </span>
            <p className="text-xs text-forest-700/80 leading-relaxed">
              When introducing botanical actives into your ritual, consistency over 28 skin-turnover days produces far superior, longer-lasting radiance than harsh overnight synthetic peels.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Link
            to="/blog"
            className="text-xs font-semibold uppercase tracking-wider text-forest-900 hover:text-gold-500"
          >
            ← Previous Article
          </Link>
          <Link
            to="/products"
            className="bg-forest-800 text-sand-50 text-xs font-semibold py-3 px-6 rounded-xl hover:bg-forest-900 transition-colors uppercase tracking-wider"
          >
            Shop Recommended Formulations
          </Link>
        </div>

      </div>
    </div>
  );
};
