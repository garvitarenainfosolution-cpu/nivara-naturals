import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const styles = {
    default: 'bg-forest-800 text-sand-50 border-forest-700',
    gold: 'bg-gold-500 text-forest-900 font-semibold',
    sage: 'bg-sage-100 text-forest-800 border-sage-300',
    sale: 'bg-amber-700 text-white',
    outline: 'bg-white/80 backdrop-blur-sm text-forest-800 border-sand-300'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase shadow-sm border ${styles[variant] || styles.default} ${className}`}
    >
      {children}
    </span>
  );
};
