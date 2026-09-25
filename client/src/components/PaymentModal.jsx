import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import PromoInput from './PromoInput';
import api from '../api/axios';

const PaymentModal = () => {
  const { isPaymentModalOpen, setIsPaymentModalOpen, price } = useCart();
  const [finalPrice, setFinalPrice] = useState(price);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', trxId: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  if (!isPaymentModalOpen) return null;

  const handleApplyPromo = (discountAmount) => {
    setFinalPrice(price - discountAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/orders', {
        ...formData,
        paymentMethod,
        amount: finalPrice
      });
      setSuccessData(data.order);
    } catch (err) {
      setError(err.response?.data?.message || 'Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="glass p-8 rounded-2xl max-w-md w-full text-center">
          <div className="text-teal-400 text-5xl mb-4"><i className="fa-solid fa-circle-check"></i></div>
          <h2 className="text-2xl font-bold mb-2 text-white">Order Placed!</h2>
          <p className="text-gray-300 mb-6">Your order ID is: <span className="font-mono text-teal-300 font-bold">{successData.orderId}</span></p>
          <p className="text-sm text-gray-400 mb-6">Please contact us on WhatsApp to verify your payment and receive the book.</p>
          <a href={`https://wa.me/923055389967?text=Hi! I just paid for the AI Prompt Playbook. My order ID is ${successData.orderId}`} target="_blank" rel="noreferrer" className="btn-primary w-full block mb-4">
            <i className="fa-brands fa-whatsapp mr-2"></i> Send WhatsApp Message
          </a>
          <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-white">Close</button>
        </div>
      </div>
    );
  }

  const methods = [
    { id: 'jazzcash', name: 'JazzCash', detail: '0321 542 3874 (Muhammad Ali)', icon: 'wallet' },
    { id: 'easypaisa', name: 'EasyPaisa', detail: '0321 542 3874 (Muhammad Ali)', icon: 'wallet' },
    { id: 'sadapay', name: 'SadaPay', detail: '0305 538 9967 (Muhammad Ali)', icon: 'credit-card' },
    { id: 'nayapay', name: 'NayaPay', detail: '0321 542 3874 (Muhammad Ali)', icon: 'credit-card' },
    { id: 'ubl', name: 'UBL Bank (IBAN)', detail: 'PK19UNIL0109000402274094 (Muhammad Ali)', icon: 'building-columns' },
    { id: 'binance', name: 'Binance Pay', detail: 'alikhanwebdeveloper@gmail.com', icon: 'bitcoin' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="glass p-6 rounded-2xl max-w-lg w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
        
        <div className="flex justify-between items-center mb-6 p-4 bg-teal-900/30 border border-teal-500/30 rounded-xl">
          <div>
            <span className="font-semibold text-base sm:text-lg block text-white">Total to Pay:</span>
            <span className="text-xs text-teal-300 font-mono font-bold">🇵🇰 Rs. {(finalPrice * 280).toLocaleString()} PKR</span>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-teal-400">${finalPrice}</span>
            <span className="text-xs text-slate-400 block font-mono">USD</span>
          </div>
        </div>

        <PromoInput onApply={handleApplyPromo} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Full Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-navy-800 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-navy-800 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-400" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Phone / WhatsApp</label>
              <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-navy-800 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-400" />
            </div>
          </div>

          <div className="pt-4">
            <label className="block text-sm font-medium mb-3 text-gray-300">Select Payment Method</label>
            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto pr-2">
              {methods.map(m => (
                <div 
                  key={m.id} 
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3 rounded-lg border cursor-pointer flex items-center transition-all ${paymentMethod === m.id ? 'border-teal-400 bg-teal-400/10' : 'border-white/10 bg-navy-800 hover:border-white/30'}`}
                >
                  <i className={`fa-solid fa-${m.icon} text-teal-500 text-xl w-8 text-center`}></i>
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-xs text-gray-400">{m.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {paymentMethod && (
            <div className="pt-2">
              <label className="block text-sm font-medium mb-1 text-gray-300">Transaction ID (TID) / Screenshot Ref</label>
              <input required type="text" placeholder="Enter TID after sending payment" value={formData.trxId} onChange={e => setFormData({...formData, trxId: e.target.value})} className="w-full bg-navy-800 border border-teal-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400" />
            </div>
          )}

          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6 text-lg">
            {loading ? 'Processing...' : 'Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PaymentModal;
