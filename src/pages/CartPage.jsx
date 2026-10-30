import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalMrp,
    totalSavings,
    shippingFee,
    shippingThreshold,
    amountToFreeShipping,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    finalTotal
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 bg-sand-50 min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-sand-200 flex items-center justify-center text-forest-700/40 mb-4">
          <ShoppingBag size={36} />
        </div>
        <h2 className="font-serif text-2xl font-medium text-forest-900 mb-2">
          Your Botanical Bag is Empty
        </h2>
        <p className="text-xs text-forest-700/60 max-w-sm mb-6">
          Begin your journey with our artisanal Ayurvedic skincare preparations.
        </p>
        <Link
          to="/products"
          className="bg-forest-800 hover:bg-forest-900 text-sand-50 text-xs font-semibold py-3.5 px-8 rounded-xl uppercase tracking-widest transition-colors shadow-luxury"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const freeShippingPercentage = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-sand-300">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block mb-1">
              RITUAL REVIEW
            </span>
            <h1 className="font-serif text-3xl font-normal text-forest-900">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-sage-50 border border-sage-200 p-4 rounded-2xl mb-8">
          <div className="flex items-center justify-between text-xs font-medium text-forest-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck size={15} className="text-sage-600" />
              {amountToFreeShipping > 0 ? (
                <>Add <strong className="text-forest-900">₹{amountToFreeShipping}</strong> more to qualify for <strong>FREE Express Delivery</strong></>
              ) : (
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Check size={14} className="text-emerald-700" /> You qualify for FREE Express Pan-India Delivery!
                </span>
              )}
            </span>
            <span>{freeShippingPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-sage-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-forest-800 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Items Table / List Column */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-sand-300 shadow-soft flex flex-col sm:flex-row items-center gap-5 justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl bg-sand-100 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-sage-600 uppercase tracking-wider block">
                      {item.category} • {item.size}
                    </span>
                    <h3 className="font-serif text-base font-medium text-forest-900">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-forest-900">₹{item.price}</span>
                      {item.mrp && item.mrp > item.price && (
                        <span className="text-xs text-forest-700/50 line-through">₹{item.mrp}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-sand-200">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-sand-300 rounded-xl bg-sand-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-sand-200 text-forest-800 rounded-l"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 text-xs font-bold text-forest-900 min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-sand-200 text-forest-800 rounded-r"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <span className="text-base font-bold text-forest-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-forest-700/40 hover:text-rose-500 p-2"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-gold-500 pt-2"
            >
              <ArrowLeft size={14} /> Continue Exploring More Rituals
            </Link>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-sand-300 shadow-luxury space-y-6">
            <h3 className="font-serif text-lg font-bold text-forest-900 pb-3 border-b border-sand-200">
              Order Summary
            </h3>

            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-sage-50 border border-sage-200 px-3.5 py-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Sparkles size={14} className="text-gold-500" />
                    <span>{appliedCoupon.code} applied (-₹{couponDiscount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 hover:text-rose-800 font-semibold text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (NIVARA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-sand-50 border border-sand-300 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700"
                  />
                  <button
                    type="submit"
                    className="bg-forest-800 text-sand-50 text-xs px-4 py-2.5 rounded-xl font-medium hover:bg-forest-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-700 mt-1">{couponSuccess}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-forest-700/80 pt-3 border-t border-sand-100">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-forest-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Discount ({appliedCoupon.code})</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {totalSavings > 0 && (
                <div className="flex justify-between text-sage-600 font-medium">
                  <span>MRP Savings</span>
                  <span>₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-forest-900 pt-3 border-t border-sand-200">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-forest-800 hover:bg-forest-900 text-sand-50 text-xs font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest transition-all shadow-luxury"
            >
              Proceed to Checkout <ArrowRight size={15} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
