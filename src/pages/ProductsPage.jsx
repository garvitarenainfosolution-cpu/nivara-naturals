import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X, Search, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { useWishlist } from '../context/WishlistContext';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  // Read initial states from URL
  const initialCategory = searchParams.get('category') || 'All';
  const initialGender = searchParams.get('gender') || 'all';
  const initialConcern = searchParams.get('concern') || '';
  const initialSearch = searchParams.get('search') || '';
  const isWishlistOnly = searchParams.get('wishlist') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedSkinType, setSelectedSkinType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('gender')) setSelectedGender(searchParams.get('gender'));
    if (searchParams.get('search')) setSearchTerm(searchParams.get('search'));
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('all');
    setSelectedSkinType('All');
    setMaxPrice(2000);
    setSearchTerm('');
    setSearchParams({});
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Wishlist filter
      if (isWishlistOnly && !wishlist.includes(p.id)) return false;

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Gender filter
      if (selectedGender !== 'all' && p.gender !== selectedGender) return false;

      // Skin type filter
      if (selectedSkinType !== 'All' && !p.skinType.toLowerCase().includes(selectedSkinType.toLowerCase())) return false;

      // Concern URL filter
      if (initialConcern) {
        if (initialConcern === 'anti-aging' && !p.skinType.toLowerCase().includes('fine lines') && !p.name.toLowerCase().includes('bakuchiol')) return false;
        if (initialConcern === 'acne' && !p.skinType.toLowerCase().includes('acne') && !p.category.includes('Cleanser')) return false;
        if (initialConcern === 'hydration' && !p.skinType.toLowerCase().includes('dehydrated') && !p.category.includes('Moisturizer')) return false;
        if (initialConcern === 'brightening' && !p.skinType.toLowerCase().includes('dull') && !p.name.toLowerCase().includes('saffron') && !p.name.toLowerCase().includes('vitamin c')) return false;
        if (initialConcern === 'sensitive' && !p.skinType.toLowerCase().includes('sensitive') && !p.category.includes('Toner')) return false;
      }

      // Max price filter
      if (p.price > maxPrice) return false;

      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesIngredients = p.ingredients.some(i => i.toLowerCase().includes(query));
        if (!matchesName && !matchesCat && !matchesIngredients) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedGender, selectedSkinType, maxPrice, sortBy, searchTerm, isWishlistOnly, wishlist, initialConcern]);

  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block mb-1">
            {isWishlistOnly ? "PERSONAL SANCTUARY" : "BOTANICAL APOTHECARY"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900 tracking-tight">
            {isWishlistOnly ? "Saved Wishlist Formulations" : "All Natural Formulations"}
          </h1>
          <p className="text-xs sm:text-sm text-forest-700/70 mt-1 max-w-xl">
            {isWishlistOnly
              ? "Your curated collection of favorites waiting to become part of your daily ritual."
              : "Cold-pressed herbal preparations crafted for restorative daily self-care rituals."}
          </p>
        </div>

        {/* Filter bar & sorting top row */}
        <div className="bg-white rounded-2xl p-4 border border-sand-300 shadow-soft mb-8 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-sand-100 hover:bg-sand-200 text-forest-900 px-4 py-2 rounded-xl text-xs font-semibold"
            >
              <SlidersHorizontal size={15} />
              <span>Filters</span>
            </button>

            {/* Showing count */}
            <span className="text-xs text-forest-700 font-medium">
              Showing <strong className="text-forest-900">{filteredProducts.length}</strong> of {PRODUCTS.length} formulations
            </span>
          </div>

          {/* Active Filter Chips */}
          <div className="hidden md:flex items-center gap-2 flex-wrap text-xs">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-sand-100 text-forest-800 px-3 py-1 rounded-full border border-sand-300 text-[11px]">
                {selectedCategory}
                <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory('All')} />
              </span>
            )}
            {selectedGender !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-sand-100 text-forest-800 px-3 py-1 rounded-full border border-sand-300 text-[11px] capitalize">
                {selectedGender}'s Care
                <X size={12} className="cursor-pointer" onClick={() => setSelectedGender('all')} />
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center gap-1 bg-sand-100 text-forest-800 px-3 py-1 rounded-full border border-sand-300 text-[11px]">
                Search: "{searchTerm}"
                <X size={12} className="cursor-pointer" onClick={() => setSearchTerm('')} />
              </span>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-forest-700/60 hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-sand-50 border border-sand-300 text-xs text-forest-900 font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-forest-700"
            >
              <option value="featured">Featured Rituals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

        </div>

        {/* Main Content: Sidebar + Products Grid */}
        <div className="flex gap-8 items-start">
          
          {/* Sidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedGender={selectedGender}
            onSelectGender={setSelectedGender}
            selectedSkinType={selectedSkinType}
            onSelectSkinType={setSelectedSkinType}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            onResetFilters={handleResetFilters}
            isOpenMobile={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-sand-300">
                <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-forest-700/40 mb-4">
                  <Search size={28} />
                </div>
                <h3 className="font-serif text-xl font-medium text-forest-900 mb-2">
                  No formulations found
                </h3>
                <p className="text-xs text-forest-700/60 max-w-sm mx-auto mb-6">
                  Try broadening your filters or resetting the price range to explore our remedies.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-forest-800 text-sand-50 text-xs font-semibold py-3 px-6 rounded-xl uppercase tracking-wider hover:bg-forest-900 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
