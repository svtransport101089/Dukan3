
import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  addToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ addToCart }) => {
  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Our Store</h2>
        <p className="text-sm text-gray-500">Pick what you need, pay directly via UPI.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {PRODUCTS.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={addToCart}
          />
        ))}
      </div>

      <div className="mt-12 bg-gray-100 rounded-2xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 text-blue-600 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h4 className="text-sm font-semibold text-gray-800">100% Secure Payments</h4>
        <p className="text-xs text-gray-500 mt-1">Direct bank-to-bank transfer via UPI ID. No middleman, no extra charges.</p>
      </div>
    </div>
  );
};

export default Home;
