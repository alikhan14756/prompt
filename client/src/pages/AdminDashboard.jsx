import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [promos, setPromos] = useState([]);
  const [newPromo, setNewPromo] = useState({ code: '', discountPercent: 50 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Password & Security settings state
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityMessage, setSecurityMessage] = useState({ text: '', type: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, promosRes] = await Promise.all([
        api.get('/orders'),
        api.get('/promo')
      ]);
      setOrders(ordersRes.data || []);
      setPromos(promosRes.data || []);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      fetchData();
    } catch (err) {
      alert('Error updating status: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting order: ' + (err.response?.data?.message || err.message));
    }
  };

  const createPromo = async (e) => {
    e.preventDefault();
    if (!newPromo.code.trim()) return;
    try {
      await api.post('/promo', {
        code: newPromo.code.toUpperCase().trim(),
        discountPercent: Number(newPromo.discountPercent) || 50
      });
      setNewPromo({ code: '', discountPercent: 50 });
      fetchData();
    } catch (err) {
      alert('Error creating promo: ' + (err.response?.data?.message || err.message));
    }
  };

  const togglePromo = async (id, currentStatus) => {
    try {
      await api.put(`/promo/${id}`, { isActive: !currentStatus });
      fetchData();
    } catch (err) {
      alert('Error updating promo: ' + (err.response?.data?.message || err.message));
    }
  };

  const deletePromo = async (id) => {
    if (!window.confirm('Delete this promo code?')) return;
    try {
      await api.delete(`/promo/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting promo: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();
    setSecurityMessage({ text: '', type: '' });

    if (!newPassword || newPassword.length < 4) {
      setSecurityMessage({ text: 'Password must be at least 4 characters long', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityMessage({ text: 'Passwords do not match!', type: 'error' });
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const res = await api.put('/admin/password', {
        newUsername: newUsername.trim(),
        newPassword
      });

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }

      setSecurityMessage({ text: '✅ Credentials updated successfully!', type: 'success' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsSecurityModalOpen(false);
        setSecurityMessage({ text: '', type: '' });
      }, 2000);
    } catch (err) {
      setSecurityMessage({
        text: err.response?.data?.message || 'Error updating password',
        type: 'error'
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  // --- STATS CALCULATIONS ---
  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.amount) || 0), 0);
  const totalCopiesSold = orders.length;
  const promoOrders = orders.filter(o => o.promoCode && o.promoCode.trim().length > 0);
  const regularOrders = orders.filter(o => !o.promoCode || o.promoCode.trim().length === 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  // Group sales by Promo Code
  const promoSalesStats = {};

  orders.forEach(order => {
    const code = order.promoCode && order.promoCode.trim() ? order.promoCode.trim().toUpperCase() : 'NO PROMO (FULL PRICE)';
    if (!promoSalesStats[code]) {
      promoSalesStats[code] = {
        count: 0,
        revenue: 0,
        customers: []
      };
    }
    promoSalesStats[code].count += 1;
    promoSalesStats[code].revenue += Number(order.amount) || 0;
    promoSalesStats[code].customers.push(order.customerName || order.name || 'Anonymous');
  });

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const name = (o.customerName || o.name || '').toLowerCase();
    const email = (o.customerEmail || o.email || '').toLowerCase();
    const promo = (o.promoCode || '').toLowerCase();
    const id = (o._id || o.orderId || '').toLowerCase();
    const matchesSearch = !searchQuery || name.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase()) || promo.includes(searchQuery.toLowerCase()) || id.includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-navy-900 shadow-[0_0_15px_rgba(20,184,166,0.5)]">
              AI
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Prompt Playbook Admin</h1>
              <p className="text-xs text-slate-400">Manage orders, sales analytics & promo code performance</p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 transition-colors flex items-center gap-2 shadow-[0_0_10px_rgba(20,184,166,0.2)]"
            >
              <i className="fa-solid fa-key"></i> Update Password
            </button>
            <Link to="/" target="_blank" className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-2">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Store
            </Link>
            <button onClick={logout} className="text-xs font-semibold px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors flex items-center gap-2">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>

        {/* Global Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="glass p-6 rounded-2xl border border-teal-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
            </div>
            <div className="text-3xl font-black text-white tracking-tight">${totalRevenue}</div>
            <div className="text-xs text-slate-400 mt-2">Gross payments received</div>
          </div>

          <div className="glass p-6 rounded-2xl border border-blue-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Copies Sold</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
            <div className="text-3xl font-black text-white tracking-tight">{totalCopiesSold}</div>
            <div className="text-xs text-slate-400 mt-2">Total books ordered</div>
          </div>

          <div className="glass p-6 rounded-2xl border border-purple-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Promo Sales</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <i className="fa-solid fa-tags"></i>
              </div>
            </div>
            <div className="text-3xl font-black text-purple-400 tracking-tight">{promoOrders.length} <span className="text-xs font-normal text-slate-400">({totalCopiesSold > 0 ? Math.round((promoOrders.length / totalCopiesSold) * 100) : 0}%)</span></div>
            <div className="text-xs text-slate-400 mt-2">{regularOrders.length} sold at full price ($20)</div>
          </div>

          <div className="glass p-6 rounded-2xl border border-yellow-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Orders</span>
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                <i className="fa-solid fa-clock"></i>
              </div>
            </div>
            <div className="text-3xl font-black text-yellow-400 tracking-tight">{pendingOrdersCount}</div>
            <div className="text-xs text-slate-400 mt-2">Awaiting PDF dispatch</div>
          </div>
        </div>

        {/* PROMO SALES TRACKER SECTION */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-teal-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                <i className="fa-solid fa-chart-pie"></i> Promo Code Analytics
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Book Sales by Promo Code</h2>
              <p className="text-xs text-slate-400">Track how many copies each partner / influencer code has generated</p>
            </div>

            {/* Add New Promo Code Form */}
            <form onSubmit={createPromo} className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <input
                required
                type="text"
                placeholder="PROMO CODE"
                value={newPromo.code}
                onChange={e => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                className="bg-slate-900 border border-slate-700 focus:border-teal-500 text-white px-3 py-2 rounded-xl text-xs font-mono uppercase focus:outline-none"
              />
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl">
                <input
                  required
                  type="number"
                  min="1"
                  max="100"
                  placeholder="50"
                  value={newPromo.discountPercent}
                  onChange={e => setNewPromo({ ...newPromo, discountPercent: Number(e.target.value) })}
                  className="bg-transparent text-white text-xs w-12 focus:outline-none font-bold"
                />
                <span className="text-xs text-slate-400 font-bold">% OFF</span>
              </div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] flex items-center gap-1.5"
              >
                <i className="fa-solid fa-plus"></i> Create Code
              </button>
            </form>
          </div>

          {/* Promo Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Direct Full Price Card */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-bold font-mono">
                    DIRECT / NO PROMO
                  </span>
                  <span className="text-xs font-bold text-slate-400">$20 / copy</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-white">{regularOrders.length} <span className="text-xs font-normal text-slate-400">copies sold</span></div>
                  <div className="text-sm font-semibold text-teal-400">${regularOrders.reduce((acc, o) => acc + (Number(o.amount) || 0), 0)} Revenue</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
                Regular direct customers without promo
              </div>
            </div>

            {/* List All Active / Configured Promo Codes */}
            {promos.map(p => {
              const codeUpper = p.code.toUpperCase();
              const stats = promoSalesStats[codeUpper] || { count: 0, revenue: 0 };
              return (
                <div key={p._id} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-teal-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-extrabold font-mono">
                          {p.code}
                        </span>
                        <span className="text-xs font-bold text-yellow-400">
                          {p.discountPercent}% OFF (${20 * (1 - p.discountPercent / 100)})
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePromo(p._id, p.isActive)}
                          title={p.isActive ? 'Active (Click to Disable)' : 'Inactive (Click to Enable)'}
                          className={`text-xs px-2 py-0.5 rounded font-bold ${p.isActive ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-500'}`}
                        >
                          {p.isActive ? 'Active' : 'Disabled'}
                        </button>
                        <button
                          onClick={() => deletePromo(p._id)}
                          title="Delete promo code"
                          className="text-slate-500 hover:text-red-400 text-xs p-1"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-2xl font-black text-white">
                        {stats.count} <span className="text-xs font-normal text-slate-400">copies sold</span>
                      </div>
                      <div className="text-sm font-semibold text-teal-400">
                        ${stats.revenue} Total Sales Generated
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
                    <span>Usage: {stats.count} orders</span>
                    <span className="text-teal-400/80 font-mono">checkout code</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDERS MANAGEMENT TABLE */}
        <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Customer Orders</h2>
              <p className="text-xs text-slate-400">Review receipts, promo codes used, and manage PDF deliveries</p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-500 text-xs"></i>
                <input
                  type="text"
                  placeholder="Search customer, promo, ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white pl-8 pr-3 py-2 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">⏳ Pending</option>
                <option value="confirmed">💳 Confirmed</option>
                <option value="delivered">✅ Delivered</option>
              </select>

              <button
                onClick={fetchData}
                title="Refresh orders"
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl text-xs border border-slate-700 transition-colors"
              >
                <i className="fa-solid fa-rotate"></i>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer Info</th>
                  <th className="py-3.5 px-4">Payment Method & TID</th>
                  <th className="py-3.5 px-4">Promo Used</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                {filteredOrders.map(order => {
                  const hasPromo = order.promoCode && order.promoCode.trim().length > 0;
                  return (
                    <tr key={order._id} className="hover:bg-slate-900/50 transition-colors">
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        {order._id}
                        <div className="text-[10px] text-slate-500">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{order.customerName || order.name || 'Anonymous'}</div>
                        <div className="text-slate-400 text-[11px]">{order.customerEmail || order.email || '-'}</div>
                        {order.customerPhone && (
                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-400 hover:underline inline-flex items-center gap-1 text-[11px] mt-0.5"
                          >
                            <i className="fa-brands fa-whatsapp"></i> {order.customerPhone}
                          </a>
                        )}
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-teal-400 flex items-center gap-1.5">
                          <i className="fa-solid fa-wallet text-[10px]"></i> {order.paymentMethod || 'Manual'}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                          TID: <span className="text-white">{order.transactionId || order.trxId || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Promo Code Used */}
                      <td className="py-3.5 px-4">
                        {hasPromo ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono font-bold text-[11px]">
                            <i className="fa-solid fa-tag text-[10px]"></i> {order.promoCode.toUpperCase()}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">None (Full $20)</span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-white text-sm">${order.amount || 20}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status || 'pending'}
                          onChange={e => updateOrderStatus(order._id, e.target.value)}
                          className={`bg-slate-900 border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                            order.status === 'delivered'
                              ? 'border-green-500/50 text-green-400'
                              : order.status === 'confirmed'
                              ? 'border-blue-500/50 text-blue-400'
                              : 'border-yellow-500/50 text-yellow-400'
                          }`}
                        >
                          <option value="pending">⏳ Pending</option>
                          <option value="confirmed">💳 Confirmed</option>
                          <option value="delivered">✅ Delivered</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => deleteOrder(order._id)}
                          title="Delete order"
                          className="text-slate-500 hover:text-red-400 p-1.5 transition-colors"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500">
                      {loading ? 'Loading orders...' : 'No orders found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* SECURITY / UPDATE PASSWORD MODAL */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-teal-500/30 rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl space-y-6">
            <button
              onClick={() => {
                setIsSecurityModalOpen(false);
                setSecurityMessage({ text: '', type: '' });
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div>
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 text-xl mb-3">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-xl font-bold text-white">Security & Password</h3>
              <p className="text-xs text-slate-400">Change your admin username and secret password</p>
            </div>

            {securityMessage.text && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${
                securityMessage.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {securityMessage.text}
              </div>
            )}

            <form onSubmit={handleUpdateSecurity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <input
                  required
                  type="text"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 text-white px-3 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <input
                  required
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter at least 4 characters"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 text-white px-3 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-500 text-white px-3 py-2.5 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsSecurityModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="flex-1 bg-teal-500 hover:bg-teal-400 text-navy-900 font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] disabled:opacity-50"
                >
                  {isUpdatingPassword ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
