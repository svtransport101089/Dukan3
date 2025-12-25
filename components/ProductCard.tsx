
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
          <span className="text-blue-600 font-bold text-sm">₹{product.price}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3 line-clamp-1">{product.description}</p>
        <button
          onClick={() => onAdd(product)}
          className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 hover:text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
