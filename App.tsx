
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Header from './components/Header';
import { CartItem, Product, OrderDetails } from './types';
import AIShoppingAssistant from './components/AIShoppingAssistant';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
        <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        <main className="flex-grow pb-24">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  setOrderDetails={setOrderDetails}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/success"
              element={<Success orderDetails={orderDetails} />}
            />
          </Routes>
        </main>
        <AIShoppingAssistant onAddToCart={addToCart} />
      </div>
    </Router>
  );
};

export default App;
