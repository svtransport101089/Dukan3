
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartItem, OrderDetails } from '../types';
import { UPI_ID, OWNER_NAME, CURRENCY } from '../constants';

interface CheckoutProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  setOrderDetails: (details: OrderDetails) => void;
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, removeFromCart, updateQuantity, setOrderDetails, clearCart }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = () => {
    if (cart.length === 0) return;

    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toLocaleString();

    // Store order details locally for the success page
    const details: OrderDetails = {
      customerName: name || 'Guest',
      mobileNumber: mobile || 'N/A',
      items: [...cart],
      totalAmount: total,
      orderId,
      timestamp
    };
    setOrderDetails(details);

    // Deep Link for UPI
    // upi://pay?pa=parthi101089-1@okaxis&pn=Parthiban%20D&am={amount}&cu=INR&tn=Order%20Payment
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(OWNER_NAME)}&am=${total}&cu=${CURRENCY}&tn=${encodeURIComponent(`Order ${orderId}`)}`;

    // Open UPI Link
    window.location.href = upiUrl;

    // After a delay (assuming user navigated), redirect to success page
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add something to the cart to continue.</p>
        <Link to="/" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {cart.map(item => (
          <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-xl border border-gray-100">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-grow">
              <h4 className="font-semibold text-gray-800">{item.name}</h4>
              <p className="text-sm text-blue-600 font-bold">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600"
              >
                -
              </button>
              <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Form */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 mb-8 space-y-4">
        <h3 className="font-bold text-gray-800">Customer Details (Optional)</h3>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="9876543210"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Payment Summary */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Total Amount</span>
          <span className="text-xl font-extrabold text-blue-600">₹{total}</span>
        </div>
        <button
          onClick={handlePay}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
        >
          <span>Pay via UPI</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <p className="text-[10px] text-center text-gray-400 mt-2 uppercase tracking-widest font-bold">
          Pay Directly to {OWNER_NAME}
        </p>
      </div>
    </div>
  );
};

export default Checkout;
