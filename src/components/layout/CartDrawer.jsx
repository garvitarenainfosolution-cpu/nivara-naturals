import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
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

  if (!isCartOpen) return null;

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

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const freeShippingPercentage = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop blur */}
      <div 
        className="fixed inset-0 bg-forest-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-sand-50 shadow-2xl flex flex-col border-l border-sand-300">
          
          {/* Header */}
          <div className="p-5 border-b border-sand-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-forest-800" />
              <h2 className="font-serif text-lg font-bold text-forest-900">Your Botanical Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sand-200 text-forest-800">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-forest-700 hover:text-forest-900 hover:bg-sand-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-sage-50 px-5 py-3 border-b border-sage-100">
            <div className="flex items-center justify-between text-xs font-medium text-forest-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-sage-600" />
                {amountToFreeShipping > 0 ? (
                  <>Add <strong className="text-forest-900">₹{amountToFreeShipping}</strong> more for <strong>FREE Express Shipping</strong></>
                ) : (
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <Check size={13} className="text-emerald-700" /> You have unlocked FREE Express Shipping!
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

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-sand-100 flex items-center justify-center text-forest-700/40 mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="font-serif text-lg font-medium text-forest-900 mb-2">Your cart is empty</h3>
                <p className="text-xs text-forest-700/60 max-w-xs mb-6">
                  Explore our pure Ayurvedic preparations and start your daily natural beauty ritual.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-forest-800 text-sand-50 text-xs font-semibold py-3 px-6 rounded-xl hover:bg-forest-900 transition-colors uppercase tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 rounded-xl bg-white border border-sand-200 shadow-soft"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg bg-sand-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif text-sm font-medium text-forest-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-forest-700/40 hover:text-rose-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className="text-[11px] text-forest-700/60 block">{item.size} • {item.category}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-sand-300 rounded-lg bg-sand-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-sand-200 text-forest-800 transition-colors rounded-l"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-forest-900 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-sand-200 text-forest-800 transition-colors rounded-r"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-forest-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-sand-200 bg-white space-y-4">
              
              {/* Promo code input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-sage-50 border border-sage-200 px-3 py-2 rounded-xl text-xs">
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
                      placeholder="Promo code (e.g. NIVARA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-sand-50 border border-sand-300 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-forest-700"
                    />
                    <button
                      type="submit"
                      className="bg-forest-800 text-sand-50 text-xs px-4 py-2 rounded-xl font-medium hover:bg-forest-900"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-700 mt-1">{couponSuccess}</p>}
              </div>

              {/* Price Details */}
              <div className="space-y-1.5 text-xs text-forest-700/80 pt-2 border-t border-sand-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-forest-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sage-600 font-medium">
                    <span>Catalog Savings</span>
                    <span>₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-forest-900 pt-2 border-t border-sand-200">
                  <span>Grand Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-forest-800 hover:bg-forest-900 text-sand-50 text-xs font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow-lg shadow-forest-800/10"
                >
                  Proceed to Checkout <ArrowRight size={15} />
                </button>
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center block text-xs font-semibold text-forest-700 hover:text-forest-900 py-1"
                >
                  View Full Cart Details
                </Link>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
