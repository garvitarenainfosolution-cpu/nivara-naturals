import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Smartphone, Check, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutPage = () => {
  const { cart, subtotal, shippingFee, appliedCoupon, couponDiscount, finalTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center bg-sand-50">
        <h2 className="font-serif text-2xl text-forest-900 mb-2">No Items to Checkout</h2>
        <p className="text-xs text-forest-700/60 mb-6">Your shopping bag is currently empty.</p>
        <Link to="/products" className="bg-forest-800 text-sand-50 text-xs px-6 py-3 rounded-xl font-semibold uppercase tracking-wider">
          Return to Shop
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = "Valid 10-digit mobile number is required";
    if (!formData.address.trim()) errs.address = "Delivery address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errs.pincode = "Valid 6-digit PIN code is required";
    if (paymentMethod === 'upi' && !upiId.trim()) errs.upiId = "Enter your UPI VPA ID (e.g. yourname@okhdfcbank)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Generate random realistic Order ID
    const orderId = "NIV-" + Math.floor(100000 + Math.random() * 900000);

    const orderReceipt = {
      orderId,
      customer: formData,
      items: cart,
      paymentMethod: paymentMethod.toUpperCase(),
      subtotal,
      shippingFee,
      discount: couponDiscount,
      total: finalTotal,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    // Store in sessionStorage for confirmation page
    sessionStorage.setItem('nivara_latest_order', JSON.stringify(orderReceipt));

    // Clear cart
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    }, 1200);
  };

  return (
    <div className="py-12 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-forest-700/60 mb-6">
          <Link to="/cart" className="hover:text-forest-900 flex items-center gap-1">
            <ArrowLeft size={13} /> Back to Bag
          </Link>
          <span>/</span>
          <span className="text-forest-900 font-semibold">Secure Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form & Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Delivery Details Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-soft">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-sand-200">
                <h2 className="font-serif text-xl font-bold text-forest-900">
                  1. Delivery Destination
                </h2>
                <span className="text-xs text-forest-700/60 flex items-center gap-1">
                  <Lock size={12} className="text-emerald-700" /> 256-Bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Garvit"
                    className={`w-full bg-sand-50 border ${errors.firstName ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.firstName && <p className="text-[10px] text-rose-500 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sharma"
                    className={`w-full bg-sand-50 border ${errors.lastName ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.lastName && <p className="text-[10px] text-rose-500 mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="garvit@example.com"
                    className={`w-full bg-sand-50 border ${errors.email ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Phone Number (10 Digits) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full bg-sand-50 border ${errors.phone ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Flat, House No., Apartment & Street *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat 402, Lotus Residency, MG Road"
                    className={`w-full bg-sand-50 border ${errors.address ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className={`w-full bg-sand-50 border ${errors.city ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.city && <p className="text-[10px] text-rose-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-sand-50 border border-sand-300 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">PIN Code (6 Digits) *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    maxLength={6}
                    className={`w-full bg-sand-50 border ${errors.pincode ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.pincode && <p className="text-[10px] text-rose-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-soft">
              <h2 className="font-serif text-xl font-bold text-forest-900 pb-4 mb-6 border-b border-sand-200">
                2. Payment Method
              </h2>

              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'bg-sage-50/70 border-forest-800 ring-1 ring-forest-800' : 'border-sand-300 hover:border-sand-400'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-0.5 accent-forest-800"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-forest-900">Instant UPI Payment (Recommended)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">FASTEST</span>
                    </div>
                    <p className="text-[11px] text-forest-700/70 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                    
                    {paymentMethod === 'upi' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Enter UPI VPA (e.g. mobile@upi or username@okhdfcbank)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className={`w-full bg-white border ${errors.upiId ? 'border-rose-500' : 'border-sand-300'} text-xs px-3 py-2 rounded-xl focus:outline-none`}
                        />
                        {errors.upiId && <p className="text-[10px] text-rose-500 mt-1">{errors.upiId}</p>}
                      </div>
                    )}
                  </div>
                </label>

                {/* Card Option */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'bg-sage-50/70 border-forest-800 ring-1 ring-forest-800' : 'border-sand-300 hover:border-sand-400'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5 accent-forest-800"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-forest-900">Credit or Debit Card</span>
                    <p className="text-[11px] text-forest-700/70 mt-0.5">Visa, Mastercard, RuPay & American Express</p>
                    {paymentMethod === 'card' && (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <input type="text" placeholder="Card Number (Demo)" className="col-span-2 bg-white border border-sand-300 p-2 rounded-xl" />
                        <input type="text" placeholder="MM/YY" className="bg-white border border-sand-300 p-2 rounded-xl" />
                        <input type="password" placeholder="CVV" maxLength={3} className="bg-white border border-sand-300 p-2 rounded-xl" />
                      </div>
                    )}
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'bg-sage-50/70 border-forest-800 ring-1 ring-forest-800' : 'border-sand-300 hover:border-sand-400'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 accent-forest-800"
                  />
                  <div>
                    <span className="text-xs font-bold text-forest-900">Cash on Delivery (COD)</span>
                    <p className="text-[11px] text-forest-700/70 mt-0.5">Pay in cash or UPI when your order arrives at your doorstep.</p>
                  </div>
                </label>
              </div>

              {/* Note on sandbox */}
              <div className="p-3 bg-sand-100 rounded-xl text-[11px] text-forest-700/80 mt-6 border border-sand-200">
                <strong>Demonstration Mode:</strong> No actual money will be deducted from your account. This simulates the production flow ready for Razorpay gateway integration.
              </div>
            </div>

          </div>

          {/* Right Column: Order Review */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-luxury space-y-6 h-fit sticky top-28">
            <h3 className="font-serif text-lg font-bold text-forest-900 pb-3 border-b border-sand-200">
              Order Summary ({cart.length} Formulations)
            </h3>

            {/* Items mini list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt="" className="w-12 h-14 object-cover rounded-lg bg-sand-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-forest-900 truncate">{item.name}</h5>
                    <span className="text-[10px] text-forest-700/60">Qty: {item.quantity} • {item.size}</span>
                  </div>
                  <span className="font-bold text-forest-900 shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-forest-700/80 pt-4 border-t border-sand-200">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-forest-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Privilege Coupon ({appliedCoupon.code})</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Pan-India Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-forest-900 pt-3 border-t border-sand-200">
                <span>Total Payable</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="w-full bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-sand-50 text-xs font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest transition-all shadow-luxury"
            >
              {isSubmitting ? "Processing Order..." : (
                <>
                  <Lock size={14} /> Confirm & Place Order • ₹{finalTotal.toLocaleString('en-IN')}
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-forest-700/60 space-y-1">
              <p>🌿 100% Satisfaction & 15-Day Quality Guarantee</p>
              <p>Ships via Express Bluedart / Delhivery</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
