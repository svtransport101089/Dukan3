
import React, { useState, useRef, useEffect } from 'react';
import { getShoppingAdvice, analyzeShoppingRequest } from '../services/geminiService';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface AIShoppingAssistantProps {
  onAddToCart: (p: Product) => void;
}

const AIShoppingAssistant: React.FC<AIShoppingAssistantProps> = ({ onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Analyze for actions first
      const analysis = await analyzeShoppingRequest(userMsg);
      if (analysis.shouldAdd && analysis.productName) {
        const product = PRODUCTS.find(p => p.name.toLowerCase() === analysis.productName.toLowerCase());
        if (product) {
          onAddToCart(product);
          setMessages(prev => [...prev, { role: 'assistant', text: `Got it! I've added ${product.name} to your cart. Anything else?` }]);
          setLoading(false);
          return;
        }
      }

      // Default chat
      const advice = await getShoppingAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: advice || "I'm not sure how to help with that, but I can tell you about our snacks and stationery!" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having a bit of trouble connecting. Try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[85vw] max-w-[320px] h-[400px] flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" />
                </svg>
              </div>
              <span className="text-white text-xs font-bold">Shopping Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-xs text-gray-400">Ask me anything about our shop!</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <button 
                    onClick={() => setInput("What's for tea?")}
                    className="text-[10px] bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-blue-300"
                  >
                    "What's for tea?"
                  </button>
                  <button 
                    onClick={() => setInput("Help me pick a pen")}
                    className="text-[10px] bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-blue-300"
                  >
                    "Pick a pen"
                  </button>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl px-3 py-2 flex gap-1 items-center">
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask assistant..."
                className="flex-grow bg-gray-50 border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-100"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 hover:scale-110 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIShoppingAssistant;
