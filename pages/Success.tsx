
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { OrderDetails } from '../types';
import { OWNER_NAME, UPI_ID } from '../constants';

interface SuccessProps {
  orderDetails: OrderDetails | null;
}

const Success: React.FC<SuccessProps> = ({ orderDetails }) => {
  if (!orderDetails) {
    return <Navigate to="/" />;
  }

  const handleWhatsApp = () => {
    const itemsText = orderDetails.items.map(i => `${i.name} x ${i.quantity}`).join(', ');
    const message = `Hi ${OWNER_NAME}, I've just placed an order!\n\nOrder ID: ${orderDetails.orderId}\nItems: ${itemsText}\nTotal: ₹${orderDetails.totalAmount}\nName: ${orderDetails.customerName}\nMobile: ${orderDetails.mobileNumber}\n\nPlease confirm my order. Thanks!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="px-4 py-10">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800">Payment Initiated!</h2>
        <p className="text-sm text-gray-500 mt-2">Your order is being processed.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 mb-8">
        <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Summary</span>
          <span className="text-xs font-mono font-bold text-blue-600">{orderDetails.orderId}</span>
        </div>

        <div className="space-y-3">
          {orderDetails.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name} <span className="text-xs text-gray-400">x{item.quantity}</span></span>
              <span className="font-semibold">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200">
          <span className="font-bold text-gray-800">Paid Total</span>
          <span className="text-lg font-extrabold text-green-600">₹{orderDetails.totalAmount}</span>
        </div>

        <div className="text-[11px] text-gray-500 text-center bg-gray-50 p-3 rounded-lg leading-relaxed">
          <span className="font-bold block text-gray-800 mb-1">Important Note</span>
          Payment confirmation is manual. We will check our bank account for <span className="font-bold text-blue-600">{UPI_ID}</span> and process your order shortly.
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48s3.481 5.229 3.481 8.404c0 6.556-5.332 11.888-11.888 11.888-2.097 0-4.143-.547-5.947-1.588l-6.164 1.687zm6.164-3.565c1.745 1.032 3.645 1.577 5.584 1.577 6.059 0 10.988-4.929 10.988-10.988 0-2.936-1.144-5.694-3.221-7.771-2.077-2.077-4.835-3.221-7.77-3.221-6.059 0-10.988 4.929-10.988 10.988 0 1.939.545 3.839 1.577 5.584l-1.031 3.765 3.861-1.034zm11.052-7.405c-.154-.077-.91-.449-1.051-.5s-.243-.077-.346.077-.397.5-.487.603-.18.115-.334.038c-.154-.077-.65-.24-1.238-.764-.458-.409-.767-.914-.857-1.068s-.01-.238.067-.315c.069-.069.154-.18.231-.269s.103-.154.154-.256-.026-.192-.013-.269c-.013-.077-.346-.833-.474-1.141-.124-.299-.25-.258-.346-.263h-.295c-.103 0-.269.038-.41.192s-.538.526-.538 1.282.551 1.487.628 1.59 1.085 1.657 2.628 2.322c.367.158.653.252.877.322.369.117.704.1.97.06.297-.044.91-.372 1.038-.731s.128-.667.089-.731-.154-.115-.308-.192z"/>
          </svg>
          Send Order via WhatsApp
        </button>

        <Link
          to="/"
          className="w-full bg-gray-50 text-gray-500 py-4 rounded-xl font-bold flex items-center justify-center"
        >
          Return to Shop
        </Link>
      </div>
    </div>
  );
};

export default Success;
