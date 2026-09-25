import React, { useState } from 'react';
import api from '../api/axios';

const PromoInput = ({ onApply }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!code) return;
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data } = await api.post('/promo/validate', { code });
      if (data.valid) {
        setMessage('Promo code applied successfully!');
        onApply(data.discountAmount || 10);
      } else {
        setError('Invalid or expired promo code.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error validating code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 p-4 border border-white/10 rounded-lg bg-navy-900/50">
      <label className="block text-sm font-medium mb-2">Have a Promo Code?</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={code} 
          onChange={e => setCode(e.target.value)}
          placeholder="Enter code" 
          className="flex-1 bg-navy-800 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-teal-400 uppercase"
        />
        <button 
          onClick={handleApply} 
          disabled={loading}
          className="bg-navy-800 border border-teal-500/50 text-teal-400 px-4 py-2 rounded hover:bg-teal-500/10 transition"
        >
          {loading ? '...' : 'Apply'}
        </button>
      </div>
      {message && <p className="text-green-400 text-sm mt-2">{message}</p>}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
};
export default PromoInput;
