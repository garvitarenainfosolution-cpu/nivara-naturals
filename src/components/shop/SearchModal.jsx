import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.skinType.toLowerCase().includes(query.toLowerCase()) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6);

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-forest-900/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-20 px-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sand-300 overflow-hidden">
          
          {/* Search Header */}
          <form onSubmit={handleSearchSubmit} className="p-4 sm:p-6 border-b border-sand-200 flex items-center gap-3">
            <Search size={22} className="text-forest-700/60 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search by ingredient, product, or concern (e.g. Saffron, Bakuchiol, Acne)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-base sm:text-lg text-forest-900 placeholder:text-forest-700/40 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-forest-700/50 hover:text-forest-900"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-2 text-xs font-semibold text-forest-700 uppercase tracking-wider hover:text-forest-900"
            >
              Cancel
            </button>
          </form>

          {/* Quick Suggestions when empty */}
          {query.trim() === '' && (
            <div className="p-6 bg-sand-50/70">
              <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700/60 block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Bakuchiol Serum', 'Matte Sunscreen', 'Charcoal Cleanser', 'Kashmiri Saffron', 'Gotu Kola', 'Kannauj Rose'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-white border border-sand-300 hover:border-gold-500 hover:text-forest-900 px-3 py-1.5 rounded-full text-forest-700 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles size={12} className="text-gold-500" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() !== '' && (
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto divide-y divide-sand-200">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm text-forest-700/70 mb-2">No botanical formulations match "{query}"</p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/products');
                    }}
                    className="text-xs font-semibold text-forest-900 underline"
                  >
                    Browse all 20 products
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-forest-700/60 mb-3">
                    Matching Formulations ({filteredProducts.length})
                  </div>
                  <div className="space-y-2">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p.id)}
                        className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-sand-100 cursor-pointer transition-colors group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-16 object-cover rounded-lg bg-sand-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-sage-600 uppercase tracking-wider block">
                            {p.category} • {p.gender === 'men' ? "Men" : "Women"}
                          </span>
                          <h4 className="font-serif text-sm font-medium text-forest-900 group-hover:text-forest-600 truncate">
                            {p.name}
                          </h4>
                          <span className="text-xs font-bold text-forest-900">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <ArrowRight size={16} className="text-forest-700/30 group-hover:text-forest-900 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-2 text-center">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs font-semibold text-forest-900 hover:text-gold-500 inline-flex items-center gap-1.5"
                    >
                      View all results for "{query}" <ArrowRight size={13} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
