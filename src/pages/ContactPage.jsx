import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Skincare Advice',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Your name is required";
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = "Valid email is required";
    if (!formData.message.trim() || formData.message.length < 10) errs.message = "Please enter at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Skincare Advice', message: '' });
    }, 5000);
  };

  return (
    <div className="bg-sand-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-500 block">
            PERSONALIZED CARE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-forest-900 tracking-tight">
            Connect with Our Skincare Concierge
          </h1>
          <p className="text-xs sm:text-sm text-forest-700/80 font-light leading-relaxed">
            Have questions about your Dosha, routine matching, or an existing order? Our Ayurvedic specialists are here to guide you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-forest-900 text-sand-50 p-8 sm:p-10 rounded-3xl shadow-luxury space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block mb-1">
                  APOTHECARY HEADQUARTERS
                </span>
                <h3 className="font-serif text-2xl font-medium text-sand-50">
                  Nivara Naturals Sanctuary
                </h3>
                <p className="text-xs text-sand-300/80 mt-1 font-light">
                  Plot 14, Heritage Botanical Lane, Bandra West, Mumbai, Maharashtra 400050, India
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-sand-300/60 uppercase font-semibold block">Concierge Desk</span>
                    <a href="mailto:concierge@nivaranaturals.com" className="font-medium hover:text-gold-400">
                      concierge@nivaranaturals.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-sand-300/60 uppercase font-semibold block">Toll-Free Helpline</span>
                    <span className="font-medium">+91 1800 212 9000 (Mon - Sat, 9 AM - 7 PM)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest-800 flex items-center justify-center text-gold-400 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-sand-300/60 uppercase font-semibold block">Response Benchmark</span>
                    <span className="font-medium">Under 4 business hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-forest-800 text-xs text-sand-300/70 font-light">
              Complimentary 1-on-1 skin consultations available over WhatsApp and virtual video desk.
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-sand-300 shadow-soft">
            <h3 className="font-serif text-2xl font-medium text-forest-900 mb-6">
              Send an Inquiry
            </h3>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                <CheckCircle2 size={40} className="text-emerald-700 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-forest-900">Message Received</h4>
                <p className="text-xs text-forest-700/80 max-w-sm mx-auto">
                  Thank you for reaching out to Nivara Naturals. One of our botanical skincare concierges will respond to your email within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-forest-900 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anjali Nair"
                      className={`w-full bg-sand-50 border ${errors.name ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-forest-900 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anjali@example.com"
                      className={`w-full bg-sand-50 border ${errors.email ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Topic of Consultation</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-sand-50 border border-sand-300 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700"
                  >
                    <option value="Skincare Advice">Custom Routine Advice / Dosha Check</option>
                    <option value="Order Tracking">Existing Order Status</option>
                    <option value="Ingredient Inquiry">Specific Ingredient Sensitivity Question</option>
                    <option value="Wholesale">Artisanal Spa & Retail Partnerships</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Your Message *</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your skin type, current challenges, or your inquiry..."
                    className={`w-full bg-sand-50 border ${errors.message ? 'border-rose-500' : 'border-sand-300'} text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-forest-700`}
                  />
                  {errors.message && <p className="text-[10px] text-rose-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="bg-forest-800 hover:bg-forest-900 text-sand-50 text-xs font-semibold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest transition-colors shadow-md"
                >
                  <Send size={14} /> Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
