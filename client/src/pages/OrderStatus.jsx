import React, { useState } from 'react';
import api from '../api/axios';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const checkStatus = async (e) => {
    e.preventDefault();
    if (!orderId) return;
    
    setLoading(true);
    setError('');
    setOrder(null);
    
    try {
      const { data } = await api.get(`/orders/${orderId}`);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found. Please check your Order ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass p-8 rounded-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gradient">Check Order Status</h1>
        
        <form onSubmit={checkStatus} className="mb-8">
          <label className="block text-sm font-medium mb-2 text-gray-300">Enter your Order ID</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              required
              value={orderId} 
              onChange={e => setOrderId(e.target.value)}
              placeholder="e.g. ORD-123456" 
              className="flex-1 bg-navy-800 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-400 uppercase"
            />
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? '...' : 'Check'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </form>

        {order && (
          <div className="border border-white/10 rounded-xl p-6 bg-navy-900/50">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
              <span className="text-gray-400">Order ID:</span>
              <span className="font-mono text-white font-bold">{order.orderId}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 
                order.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 
                'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
              }`}>
                {order.status.toUpperCase()}
              </span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Amount:</span>
              <span className="text-white font-bold">${order.amount}</span>
            </div>

            {order.status === 'pending' && (
              <div className="text-sm text-yellow-400/80 bg-yellow-400/10 p-3 rounded text-center">
                Your payment is being verified. Please ensure you have sent the transaction ID via WhatsApp.
                <a href={`https://wa.me/923055389967?text=Hi, checking my order: ${order.orderId}`} target="_blank" rel="noreferrer" className="block mt-2 text-white underline">Contact Support</a>
              </div>
            )}
            {order.status === 'delivered' && (
              <div className="text-sm text-green-400/80 bg-green-400/10 p-3 rounded text-center">
                Your order has been delivered! Check your email or WhatsApp for the product link.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderStatus;
