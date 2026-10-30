import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccessPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('nivara_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
        // Fire confetti celebration
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c5a059', '#15291e', '#7b8e78', '#f7f4ee']
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!order) {
    return (
      <div className="py-24 bg-sand-50 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl text-forest-900 mb-2">No Recent Order Found</h2>
        <p className="text-xs text-forest-700/60 mb-6">Explore our apothecary to place a botanical order.</p>
        <Link to="/products" className="bg-forest-800 text-sand-50 text-xs px-6 py-3 rounded-xl font-semibold uppercase tracking-wider">
          Explore Formulations
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-sand-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-sand-300 shadow-luxury p-8 sm:p-12 text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 size={44} />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-600 block mb-1">
              RITUAL ORDER CONFIRMED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-forest-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-forest-700/80 mt-2">
              We have received your order <strong>#{order.orderId}</strong>. A confirmation SMS and email have been dispatched to <strong>{order.customer.email}</strong>.
            </p>
          </div>

          {/* Order Details Receipt Box */}
          <div className="bg-sand-50 p-6 rounded-2xl border border-sand-200 text-left space-y-4 text-xs">
            <div className="flex flex-wrap justify-between items-center pb-3 border-b border-sand-200 gap-2">
              <div>
                <span className="text-forest-700/60 text-[10px] uppercase font-bold tracking-wider block">Order Reference</span>
                <span className="font-serif text-base font-bold text-forest-900">{order.orderId}</span>
              </div>
              <div>
                <span className="text-forest-700/60 text-[10px] uppercase font-bold tracking-wider block">Order Placed</span>
                <span className="font-semibold text-forest-900">{order.date}</span>
              </div>
              <div>
                <span className="text-forest-700/60 text-[10px] uppercase font-bold tracking-wider block">Payment Method</span>
                <span className="font-semibold text-forest-900">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <span className="text-forest-700/60 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Shipping Destination</span>
              <p className="font-medium text-forest-900">
                {order.customer.firstName} {order.customer.lastName} • {order.customer.phone}
              </p>
              <p className="text-forest-700/80 font-light">
                {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
            </div>

            {/* Items summary */}
            <div className="pt-3 border-t border-sand-200">
              <span className="text-forest-700/60 text-[10px] uppercase font-bold tracking-wider block mb-2">Formulations Ordered</span>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="truncate max-w-xs">{item.name} <strong className="text-forest-900">× {item.quantity}</strong></span>
                    <span className="font-bold text-forest-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-sand-200 space-y-1 text-right">
              <div className="flex justify-between text-forest-700/70">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Coupon Savings</span>
                  <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-forest-700/70">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-forest-900 pt-1">
                <span>Total Paid</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-semibold py-3 px-6 rounded-xl border border-sand-300"
            >
              <Printer size={15} /> Print Receipt
            </button>
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest-800 hover:bg-forest-900 text-sand-50 text-xs font-semibold py-3 px-8 rounded-xl uppercase tracking-wider transition-colors shadow-md"
            >
              Explore More Formulations <ArrowRight size={15} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
