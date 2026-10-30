import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'nivara_cart_v1';
const COUPON_STORAGE_KEY = 'nivara_coupon_v1';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // Save coupon to LocalStorage
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to save coupon", e);
    }
  }, [appliedCoupon]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            image: product.images[0],
            category: product.category,
            size: product.size,
            gender: product.gender,
            quantity: quantity
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart item calculations
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalMrp = cart.reduce((total, item) => total + (item.mrp || item.price) * item.quantity, 0);
  const totalSavings = totalMrp - subtotal;

  // Coupon handling
  const applyCoupon = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'NIVARA10') {
      const discountAmount = Math.round(subtotal * 0.10);
      setAppliedCoupon({ code: 'NIVARA10', discount: discountAmount, type: 'percent', label: '10% Botanical Privilege' });
      return { success: true, message: 'Coupon NIVARA10 applied: 10% discount!' };
    } else if (trimmed === 'WELCOME200' && subtotal >= 1000) {
      setAppliedCoupon({ code: 'WELCOME200', discount: 200, type: 'flat', label: '₹200 Welcome Gift' });
      return { success: true, message: 'Coupon WELCOME200 applied: ₹200 discount!' };
    } else if (trimmed === 'WELCOME200' && subtotal < 1000) {
      return { success: false, message: 'WELCOME200 requires minimum cart value of ₹1,000.' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try NIVARA10 or WELCOME200.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  
  // Shipping calculation: Free on orders over ₹999, else ₹99
  const shippingThreshold = 999;
  const shippingFee = subtotal === 0 || subtotal >= shippingThreshold ? 0 : 99;
  const amountToFreeShipping = Math.max(0, shippingThreshold - subtotal);

  // Final Total
  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
