import React from 'react';
import { RotateCcw, X } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export const FilterSidebar = ({
  selectedCategory,
  onSelectCategory,
  selectedGender,
  onSelectGender,
  selectedSkinType,
  onSelectSkinType,
  maxPrice,
  onMaxPriceChange,
  onResetFilters,
  isOpenMobile,
  onCloseMobile
}) => {
  const SKIN_TYPES = [
    "All",
    "Oily & Acne Prone",
    "All Skin Types",
    "Dull & Uneven Tone",
    "Sensitive & Shaved Skin",
    "Dehydrated & Sensitive Skin",
    "Fine Lines & Mature Skin"
  ];

  const content = (
    <div className="space-y-8 text-xs text-forest-800">
      
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-sand-300">
        <h3 className="font-serif text-base font-bold text-forest-900 uppercase tracking-wider">
          Filter Formulations
        </h3>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] font-semibold text-forest-700/60 hover:text-forest-900 transition-colors"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Gender / Ritual Type */}
      <div>
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-forest-900 mb-3">
          Ritual Category
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'women', label: "Women" },
            { id: 'men', label: "Men" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectGender(item.id)}
              className={`py-2 px-3 rounded-xl font-semibold text-center border transition-all ${
                selectedGender === item.id
                  ? 'bg-forest-800 text-sand-50 border-forest-800'
                  : 'bg-white text-forest-700 border-sand-300 hover:border-forest-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Category */}
      <div>
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-forest-900 mb-3">
          Category
        </h4>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 py-1 text-forest-700 hover:text-forest-900 cursor-pointer"
            >
              <input
                type="radio"
                name="categoryFilter"
                checked={selectedCategory === cat}
                onChange={() => onSelectCategory(cat)}
                className="text-forest-800 focus:ring-forest-700 h-3.5 w-3.5"
              />
              <span className={selectedCategory === cat ? 'font-bold text-forest-900' : ''}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type */}
      <div>
        <h4 className="font-bold text-[11px] uppercase tracking-wider text-forest-900 mb-3">
          Skin Type Focus
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {SKIN_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 py-1 text-forest-700 hover:text-forest-900 cursor-pointer"
            >
              <input
                type="radio"
                name="skinTypeFilter"
                checked={selectedSkinType === type}
                onChange={() => onSelectSkinType(type)}
                className="text-forest-800 focus:ring-forest-700 h-3.5 w-3.5"
              />
              <span className={selectedSkinType === type ? 'font-bold text-forest-900' : ''}>
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-[11px] uppercase tracking-wider text-forest-900">
            Max Price
          </h4>
          <span className="font-bold text-forest-900 text-xs">
            ₹{maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="300"
          max="1600"
          step="50"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-forest-800 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-forest-700/60 mt-1">
          <span>₹300</span>
          <span>₹1,600+</span>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white p-6 rounded-3xl border border-sand-300 shadow-soft h-fit sticky top-28">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div 
            className="fixed inset-0 bg-forest-900/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-sand-50 p-6 shadow-2xl z-10 overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button 
                onClick={onCloseMobile}
                className="p-1.5 rounded-full hover:bg-sand-200 text-forest-900"
              >
                <X size={20} />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
