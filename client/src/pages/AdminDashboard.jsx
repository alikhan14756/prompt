import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [promos, setPromos] = useState([]);
  const [newPromo, setNewPromo] = useState({ code: '', discountAmount: 10, isActive: true });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [ordersRes, promosRes] = await Promise.all([
        api.get('/admin/orders'),
        api.get('/admin/promos')
      ]);
      setOrders(ordersRes.data);
      setPromos(promosRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}`, { status });
      fetchData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const deleteOrder = async (id) => {
    if(!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/admin/orders/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting order');
    }
  };

  const createPromo = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/promos', newPromo);
      setNewPromo({ code: '', discountAmount: 10, isActive: true });
      fetchData();
    } catch (err) {
      alert('Error creating promo');
    }
  };

  const togglePromo = async (id, isActive) => {
    try {
      await api.put(`/admin/promos/${id}`, { isActive: !isActive });
      fetchData();
    } catch (err) {
      alert('Error updating promo');
    }
  };

  const deletePromo = async (id) => {
    try {
      await api.delete(`/admin/promos/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting promo');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const totalRevenue = orders.filter(o => o.status !== 'pending').reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="min-h-screen bg-navy-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-teal-400">Dashboard</h1>
          <button onClick={logout} className="text-red-400 border border-red-400/50 px-4 py-2 rounded hover:bg-red-400/10">Logout</button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-gray-400 mb-2">Total Revenue</h3>
            <div className="text-3xl font-bold text-teal-400">${totalRevenue}</div>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-gray-400 mb-2">Total Orders</h3>
            <div className="text-3xl font-bold text-white">{orders.length}</div>
          </div>
          <div className="glass p-6 rounded-xl">
            <h3 className="text-gray-400 mb-2">Pending Orders</h3>
            <div className="text-3xl font-bold text-yellow-400">{orders.filter(o => o.status === 'pending').length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass p-6 rounded-xl overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-3">Order ID</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3">Method/TID</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id} className="border-b border-white/5">
                    <td className="py-3 font-mono text-xs">{o.orderId}</td>
                    <td className="py-3">
                      <div>{o.name}</div>
                      <div className="text-xs text-gray-400">{o.phone}</div>
                    </td>
                    <td className="py-3">
                      <div className="uppercase text-teal-400 text-xs">{o.paymentMethod}</div>
                      <div className="font-mono text-xs text-gray-500">{o.trxId}</div>
                    </td>
                    <td className="py-3">${o.amount}</td>
                    <td className="py-3">
                      <select 
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                        className={`bg-transparent border rounded px-2 py-1 text-xs outline-none ${
                          o.status === 'delivered' ? 'border-green-500 text-green-400' :
                          o.status === 'confirmed' ? 'border-blue-500 text-blue-400' :
                          'border-yellow-500 text-yellow-400'
                        }`}
                      >
                        <option value="pending" className="bg-navy-800 text-white">Pending</option>
                        <option value="confirmed" className="bg-navy-800 text-white">Confirmed</option>
                        <option value="delivered" className="bg-navy-800 text-white">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <button onClick={() => deleteOrder(o._id)} className="text-red-400 hover:text-red-300"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan="6" className="py-4 text-center text-gray-500">No orders yet</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Promo Codes</h2>
            <form onSubmit={createPromo} className="mb-6 flex gap-2">
              <input required type="text" placeholder="CODE" value={newPromo.code} onChange={e=>setNewPromo({...newPromo, code: e.target.value.toUpperCase()})} className="w-1/2 bg-navy-800 border border-white/20 rounded px-3 py-1 text-sm text-white" />
              <input required type="number" placeholder="$ Off" value={newPromo.discountAmount} onChange={e=>setNewPromo({...newPromo, discountAmount: Number(e.target.value)})} className="w-1/4 bg-navy-800 border border-white/20 rounded px-3 py-1 text-sm text-white" />
              <button type="submit" className="w-1/4 bg-teal-500 text-navy-900 rounded font-bold text-sm">Add</button>
            </form>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {promos.map(p => (
                <div key={p._id} className="bg-navy-800 p-3 rounded flex justify-between items-center border border-white/5">
                  <div>
                    <div className="font-bold text-teal-400">{p.code}</div>
                    <div className="text-xs text-gray-400">${p.discountAmount} Off</div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => togglePromo(p._id, p.isActive)} className={p.isActive ? 'text-green-400' : 'text-gray-500'}>
                      <i className={`fa-solid fa-toggle-${p.isActive ? 'on' : 'off'} text-xl`}></i>
                    </button>
                    <button onClick={() => deletePromo(p._id)} className="text-red-400"><i className="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
