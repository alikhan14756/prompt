import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/admin/login', { username, password });
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-navy-900">
      <form onSubmit={handleLogin} className="glass p-8 rounded-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-400">Admin Area</h2>
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm mb-1">Username</label>
          <input required type="text" value={username} onChange={e=>setUsername(e.target.value)} className="w-full bg-navy-800 border border-white/20 rounded px-3 py-2 text-white" />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-navy-800 border border-white/20 rounded px-3 py-2 text-white" />
        </div>
        <button type="submit" className="btn-primary w-full">Login</button>
      </form>
    </div>
  );
};
export default AdminLogin;
