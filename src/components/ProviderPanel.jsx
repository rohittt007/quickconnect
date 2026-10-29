import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, CalendarDays, Briefcase, IndianRupee, Star, Bell,
  FileText, User, Settings, LogOut, Headphones, Search, MapPin,
  Check, X, Wallet, ChevronRight, TrendingUp, Clock, Eye,
  MessageSquare, ArrowUpRight, ArrowDownRight, Zap, Shield, Award, DollarSign
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

export const ProviderPanel = () => {
  const {
    currentPage, setPanelAndPage, bookings, updateBookingStatus,
    walletBalance, withdrawRequests, addWithdrawRequest, notifications,
    markNotificationRead, logoutUser
  } = useApp();

  const [activeNav, setActiveNav] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceSuccess, setNewServiceSuccess] = useState(false);
  const [workingDays, setWorkingDays] = useState({
    Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: false, Sunday: false
  });

  const activeRequests = bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed' || b.status === 'On The Way');
  const completedJobs = bookings.filter(b => b.status === 'Completed');

  const earningsData = [
    { name: 'Jan', earnings: 15000 }, { name: 'Feb', earnings: 21000 },
    { name: 'Mar', earnings: 18000 }, { name: 'Apr', earnings: 32000 },
    { name: 'May', earnings: 45000 }, { name: 'Jun', earnings: 48500 },
  ];

  const todaySchedule = [
    { time: '10:00 AM', name: 'Rohit Gohil', service: 'Home Deep Cleaning', status: 'Completed', color: 'bg-emerald-500' },
    { time: '11:30 AM', name: 'Priya Mehta', service: 'Kitchen Cleaning', status: 'Completed', color: 'bg-emerald-500' },
    { time: '01:30 PM', name: 'Jay Patel', service: 'Sofa Cleaning', status: 'Confirmed', color: 'bg-blue-500' },
    { time: '03:00 PM', name: 'Sneha Desai', service: 'Bathroom Sanitizing', status: 'Pending', color: 'bg-amber-500' },
    { time: '04:30 PM', name: 'Neha Trivedi', service: 'Kitchen Cleaning', status: 'Pending', color: 'bg-amber-500' },
    { time: '06:30 PM', name: 'Arjun Rao', service: 'Full Home Cleaning', status: 'Upcoming', color: 'bg-slate-300' },
  ];

  const reviews = [
    { name: 'Rohit Gohil', avatar: 'RG', rating: 5, time: '2 hours ago', text: 'Excellent deep cleaning service! Very thorough and professional. Highly recommended.' },
    { name: 'Priya Mehta', avatar: 'PM', rating: 5, time: '5 hours ago', text: 'Amazing work on the kitchen. Everything looks spotless and sanitized.' },
    { name: 'Jay Patel', avatar: 'JP', rating: 4, time: 'Yesterday', text: 'Good sofa cleaning, arrived on time. Could improve on drying time.' },
  ];

  const recentNotifications = [
    { id: 1, text: 'New booking from Sneha Desai for Kitchen Cleaning', time: '10 min ago', type: 'booking' },
    { id: 2, text: 'Payment of ₹2,499 received for Home Deep Cleaning', time: '1 hour ago', type: 'payment' },
    { id: 3, text: 'Your profile verification is now complete!', time: '3 hours ago', type: 'system' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'My Bookings', icon: Briefcase },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'services', label: 'Services', icon: Zap },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    if (['dashboard', 'wallet', 'services', 'calendar'].includes(id)) {
      setPanelAndPage('provider', id);
    }
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (amount > 0 && amount <= walletBalance) {
      addWithdrawRequest(amount);
      setWithdrawAmount('');
      setWithdrawSuccess(true);
      setTimeout(() => setWithdrawSuccess(false), 4000);
    }
  };

  const handleAddServiceSubmit = (e) => {
    e.preventDefault();
    if (newServiceName && newServicePrice) {
      setNewServiceSuccess(true);
      setNewServiceName('');
      setNewServicePrice('');
      setTimeout(() => setNewServiceSuccess(false), 4000);
    }
  };

  const statusBadge = (status) => {
    const map = {
      'New': 'bg-blue-50 text-blue-600 border-blue-100',
      'Pending': 'bg-amber-50 text-amber-600 border-amber-100',
      'Accepted': 'bg-indigo-50 text-indigo-600 border-indigo-100',
      'Confirmed': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'Completed': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'On The Way': 'bg-purple-50 text-purple-600 border-purple-100',
    };
    return map[status] || 'bg-slate-50 text-slate-600 border-slate-100';
  };

  /* ─── SIDEBAR ─── */
  const Sidebar = () => (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col z-50 shadow-sm">
      {/* Logo */}
      <div className="px-5 pt-6 pb-4 border-b border-slate-50">
        <h1 className="font-display text-xl font-extrabold text-gradient">QuickConnect</h1>
        <p className="text-[9px] text-slate-400 font-semibold mt-0.5 tracking-wide">One Platform, Every Local Need.</p>
      </div>

      {/* Profile mini-card */}
      <div className="px-4 py-4 border-b border-slate-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">AS</div>
            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
              <Check className="h-2.5 w-2.5 text-white" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">Amit Sharma</p>
            <p className="text-[10px] text-slate-400 font-medium">Cleaning Professional</p>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="text-amber-400 text-xs">★</span>
              <span className="text-[10px] font-bold text-slate-600">4.9</span>
              <span className="text-[9px] text-slate-400">(248 Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button key={item.id} onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative
                ${isActive ? 'bg-indigo-50 text-primary-indigo' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-[8px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">{item.badge}</span>
              )}
              {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary-indigo rounded-r-full" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-3 space-y-2 border-t border-slate-50 pt-3">
        <button onClick={() => { logoutUser && logoutUser(); }}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 transition">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
        <div className="bg-indigo-50/60 rounded-xl p-3 flex items-center space-x-2.5 border border-indigo-100/60">
          <div className="h-8 w-8 rounded-lg bg-primary-indigo/10 flex items-center justify-center shrink-0">
            <Headphones className="h-4 w-4 text-primary-indigo" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-700">Need Help?</p>
            <p className="text-[9px] text-primary-indigo font-semibold cursor-pointer hover:underline">Contact Support</p>
          </div>
        </div>
      </div>
    </aside>
  );

  /* ─── TOP NAVBAR ─── */
  const TopNavbar = () => (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div>
        <h2 className="font-display text-xl font-extrabold text-slate-800">Welcome, Amit! 👋</h2>
        <p className="text-xs text-slate-400 mt-0.5">Here's what's happening with your business today.</p>
      </div>
      <div className="flex items-center space-x-3 flex-wrap gap-2">
        <div className="flex items-center space-x-1.5 bg-white border border-slate-100 rounded-full px-3 py-1.5 shadow-sm">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[11px] font-semibold text-slate-600">Ahmedabad, Gujarat 🧭</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
          <input type="text" placeholder="Search anything..." className="rounded-full border border-slate-100 bg-white pl-9 pr-4 py-1.5 text-[11px] w-48 outline-none shadow-sm" />
        </div>
        <button className="relative p-2 rounded-full bg-white border border-slate-100 shadow-sm hover:bg-slate-50">
          <Bell className="h-4 w-4 text-slate-500" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center space-x-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold border shadow-sm transition
            ${isOnline ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
          <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </button>
      </div>
    </div>
  );

  /* ─── STATS CARDS ─── */
  const StatsRow = () => {
    const stats = [
      { label: "Today's Bookings", value: '12', change: '+20% vs yesterday', up: true, icon: CalendarDays, bg: 'bg-blue-50', ic: 'text-blue-500' },
      { label: 'Pending Requests', value: '5', change: '-12% vs yesterday', up: false, icon: Clock, bg: 'bg-amber-50', ic: 'text-amber-500' },
      { label: 'Completed Jobs', value: '248', change: '+18% vs last month', up: true, icon: Check, bg: 'bg-emerald-50', ic: 'text-emerald-500' },
      { label: 'Monthly Earnings', value: '₹48,500', change: '+15% vs last month', up: true, icon: IndianRupee, bg: 'bg-purple-50', ic: 'text-purple-500' },
      { label: 'Average Rating', value: '4.9', change: 'Based on 248 reviews', up: true, icon: Star, bg: 'bg-amber-50', ic: 'text-amber-500' },
      { label: 'Wallet Balance', value: `₹${walletBalance.toLocaleString()}`, change: 'Withdraw', up: true, icon: Wallet, bg: 'bg-indigo-50', ic: 'text-indigo-500', action: true },
    ];
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${s.ic}`} />
                </div>
                {s.up ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" /> : <ArrowDownRight className="h-3.5 w-3.5 text-rose-400" />}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{s.label}</p>
              <p className="font-display text-xl font-extrabold text-slate-800 mt-0.5">{s.value}</p>
              {s.action ? (
                <button onClick={() => setPanelAndPage('provider', 'wallet')} className="text-[10px] font-bold text-primary-indigo hover:underline mt-0.5">{s.change} →</button>
              ) : (
                <p className={`text-[9px] font-bold mt-0.5 ${s.up ? 'text-emerald-500' : 'text-rose-400'}`}>{s.change}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ─── BOOKING TABLE ─── */
  const BookingTable = () => (
    <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider">Booking Requests</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Review, accept, or reject incoming orders</p>
        </div>
        <button className="text-[10px] font-bold text-primary-indigo hover:underline flex items-center">View All <ChevronRight className="h-3 w-3 ml-0.5" /></button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
              <th className="pb-3">Customer</th>
              <th className="pb-3">Service</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Time</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {activeRequests.slice(0, 5).map(b => (
              <tr key={b.id} className="hover:bg-slate-50/50">
                <td className="py-3"><p className="font-bold text-slate-800">{b.customerName}</p><p className="text-[10px] text-slate-400">{b.customerPhone}</p></td>
                <td className="py-3"><span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-primary-indigo">{b.serviceName}</span></td>
                <td className="py-3 font-semibold text-slate-700">{b.date}</td>
                <td className="py-3 text-slate-500">{b.time}</td>
                <td className="py-3"><span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${statusBadge(b.status)}`}>{b.status}</span></td>
                <td className="py-3 text-right">
                  {b.status === 'Pending' ? (
                    <div className="flex items-center justify-end space-x-1.5">
                      <button onClick={() => updateBookingStatus(b.id, 'Confirmed')} className="rounded-lg bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white hover:bg-emerald-600 shadow-sm">Accept</button>
                      <button onClick={() => updateBookingStatus(b.id, 'Rejected')} className="rounded-lg bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white hover:bg-rose-600 shadow-sm">Reject</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-[10px] font-bold text-primary-indigo hover:underline flex items-center"><Eye className="h-3 w-3 mr-0.5" />View Details</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {activeRequests.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-slate-400 text-xs">No active booking requests at the moment.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ─── TODAY'S SCHEDULE ─── */
  const TodaySchedule = () => (
    <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider">Today's Schedule</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Chronological work timeline</p>
        </div>
        <button className="text-[10px] font-bold text-primary-indigo hover:underline flex items-center"><CalendarDays className="h-3 w-3 mr-0.5" />Calendar</button>
      </div>
      <div className="space-y-3">
        {todaySchedule.map((s, i) => (
          <div key={i} className="flex items-start space-x-3 text-xs relative">
            <span className="font-bold text-slate-400 shrink-0 w-16 text-[10px] pt-0.5">{s.time}</span>
            <div className="flex flex-col items-center shrink-0">
              <span className={`h-3 w-3 rounded-full ${s.color} border-2 border-white shadow`} />
              {i < todaySchedule.length - 1 && <span className="w-px h-8 bg-slate-100 mt-1" />}
            </div>
            <div className="flex-1 pb-2">
              <p className="font-bold text-slate-800 text-[11px]">{s.name}</p>
              <p className="text-[10px] text-slate-400">{s.service}</p>
              <span className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-[8px] font-bold border
                ${s.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  s.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  s.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-slate-50 text-slate-400 border-slate-100'}`}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── EARNINGS CHART ─── */
  const EarningsChart = () => (
    <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider">Earnings Overview</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Monthly income flow trends</p>
        </div>
        <span className="text-xs font-extrabold text-emerald-500 flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" />+15% growth</span>
      </div>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={earningsData}>
            <defs>
              <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="earnings" stroke="#4F46E5" strokeWidth={2.5} fill="url(#colorEarn)" dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  /* ─── SERVICE PERFORMANCE ─── */
  const ServicePerformance = () => {
    const metrics = [
      { label: 'Jobs Completed', value: '248', change: '+18%', good: true },
      { label: 'Cancellation Rate', value: '2%', change: '+1%', good: false },
      { label: 'Response Time', value: '5 mins', change: 'Excellent', good: true },
      { label: 'Customer Satisfaction', value: '98%', change: 'Excellent', good: true },
    ];
    return (
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Service Performance</h3>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="bg-slate-50/80 rounded-xl p-3 border border-slate-50">
              <p className="text-[9px] font-bold text-slate-400 uppercase">{m.label}</p>
              <p className="text-lg font-extrabold text-slate-800 mt-0.5">{m.value}</p>
              <p className={`text-[9px] font-bold ${m.good ? 'text-emerald-500' : 'text-rose-400'}`}>{m.change}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── CUSTOMER REVIEWS ─── */
  const CustomerReviews = () => (
    <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider">Customer Reviews</h3>
        <button className="text-[10px] font-bold text-primary-indigo hover:underline">View All</button>
      </div>
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="flex space-x-3 p-3 bg-slate-50/60 rounded-xl border border-slate-50">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{r.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-slate-800">{r.name}</p>
                <span className="text-[9px] text-slate-400">{r.time}</span>
              </div>
              <div className="flex items-center space-x-0.5 text-amber-400 text-xs my-0.5">
                {Array.from({ length: 5 }).map((_, j) => <span key={j}>{j < r.rating ? '★' : '☆'}</span>)}
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── WALLET CARD ─── */
  const WalletCard = () => (
    <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Wallet Balance</p>
        <Wallet className="h-5 w-5 text-white/30" />
      </div>
      <p className="font-display text-3xl font-extrabold">₹{walletBalance.toLocaleString()}</p>
      <p className="text-[10px] text-white/60 mt-1 mb-4">Available for withdrawal</p>
      <div className="flex space-x-2">
        <button onClick={() => setPanelAndPage('provider', 'wallet')} className="flex-1 rounded-lg bg-white/20 hover:bg-white/30 px-3 py-2 text-[10px] font-bold transition backdrop-blur-sm">Withdraw Money</button>
        <button onClick={() => setPanelAndPage('provider', 'wallet')} className="flex-1 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2 text-[10px] font-bold transition backdrop-blur-sm">Transaction History</button>
      </div>
    </div>
  );

  /* ─── PROFILE COMPLETION ─── */
  const ProfileCompletion = () => {
    const items = [
      { label: 'Email Verified', done: true },
      { label: 'Phone Verified', done: true },
      { label: 'Aadhaar Uploaded', done: true },
      { label: 'Bank Details Added', done: true },
      { label: 'Profile Photo', done: false },
    ];
    const pct = Math.round((items.filter(i => i.done).length / items.length) * 100);
    return (
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Profile Completion</h3>
        <div className="flex items-center justify-center mb-4">
          <div className="relative h-24 w-24">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${pct * 2.64} ${264 - pct * 2.64}`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-extrabold text-slate-800">{pct}%</span>
          </div>
        </div>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center space-x-2 text-[10px]">
              <span className={`h-4 w-4 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {item.done ? <Check className="h-2.5 w-2.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />}
              </span>
              <span className={item.done ? 'text-slate-600 font-semibold' : 'text-slate-400'}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── RECENT NOTIFICATIONS ─── */
  const RecentNotifications = () => (
    <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Notifications</h3>
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-500">{recentNotifications.length} New</span>
      </div>
      <div className="space-y-2">
        {recentNotifications.map(n => (
          <div key={n.id} className="flex items-start space-x-2.5 p-2.5 bg-slate-50/60 rounded-lg border border-slate-50">
            <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${n.type === 'booking' ? 'bg-blue-500' : n.type === 'payment' ? 'bg-emerald-500' : 'bg-purple-500'}`} />
            <div className="flex-1">
              <p className="text-[10px] text-slate-700 font-semibold">{n.text}</p>
              <p className="text-[9px] text-slate-400 mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── QUICK ACTIONS ─── */
  const QuickActions = () => {
    const actions = [
      { label: 'Add Service', icon: Zap, color: 'bg-blue-50 text-blue-500' },
      { label: 'View Earnings', icon: IndianRupee, color: 'bg-emerald-50 text-emerald-500' },
      { label: 'Update Profile', icon: User, color: 'bg-purple-50 text-purple-500' },
      { label: 'Support', icon: MessageSquare, color: 'bg-amber-50 text-amber-500' },
    ];
    return (
      <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2">
          {actions.map((a, i) => {
            const Icon = a.icon;
            return (
              <button key={i} className="flex flex-col items-center space-y-1.5 p-3 rounded-xl hover:bg-slate-50 transition">
                <div className={`h-9 w-9 rounded-xl ${a.color} flex items-center justify-center`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[9px] font-bold text-slate-500">{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /* ───────────────────────── MAIN DASHBOARD VIEW ───────────────────────── */
  const DashboardView = () => (
    <div className="space-y-6">
      <TopNavbar />
      <StatsRow />
      {/* Middle Split: Table + Schedule */}
      <div className="grid xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8"><BookingTable /></div>
        <div className="xl:col-span-4"><TodaySchedule /></div>
      </div>
      {/* Lower Section: Charts + Performance + Reviews + Wallet + Profile */}
      <div className="grid xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <EarningsChart />
          <div className="grid md:grid-cols-2 gap-6">
            <ServicePerformance />
            <CustomerReviews />
          </div>
        </div>
        <div className="xl:col-span-4 space-y-6">
          <WalletCard />
          <ProfileCompletion />
        </div>
      </div>
      {/* Bottom Section */}
      <div className="grid xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8"><RecentNotifications /></div>
        <div className="xl:col-span-4"><QuickActions /></div>
      </div>
    </div>
  );

  /* ───────────────────────── WALLET VIEW ───────────────────────── */
  const WalletView = () => (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="font-display text-xl font-extrabold text-slate-800">Your Wallet & Payments</h2>
        <p className="text-xs text-slate-400 mt-0.5">Withdraw earnings securely and view full transaction histories.</p>
      </div>
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white/80 block uppercase">Escrow Hold Balance</span>
              <span className="font-display text-3xl font-extrabold">₹{walletBalance.toLocaleString()}</span>
              <p className="text-[10px] text-white/70 mt-1">Available for immediate settlement payouts</p>
            </div>
            <Wallet className="h-10 w-10 text-white/20 shrink-0" />
          </div>
          {withdrawSuccess && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-700 font-bold flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Withdrawal request submitted! Settlement inside 2 hours.</span>
            </div>
          )}
          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            <h4 className="font-display text-sm font-bold text-slate-800">Submit Payout Settlement</h4>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Withdrawal Amount *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input type="number" required min="500" max={walletBalance} placeholder="Minimum ₹500" value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-indigo" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Receiving Bank / UPI *</label>
                <input type="text" required placeholder="SBI Account ending in 4321 / UPI ID"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs outline-none focus:border-primary-indigo" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Account Holder Name *</label>
                <input type="text" required placeholder="Amit Sharma"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs outline-none focus:border-primary-indigo" />
              </div>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
              <button type="submit" className="rounded-xl bg-primary-indigo px-6 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700">Confirm & Settle Payout</button>
              <button type="button" onClick={() => setWithdrawAmount('')} className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">Reset</button>
            </div>
          </form>
        </div>
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">Settlement History</h3>
          <div className="space-y-3">
            {withdrawRequests.map(req => (
              <div key={req.id} className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-700">₹{req.amount}</p>
                  <p className="text-[10px] text-slate-400">{req.date} • {req.id}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${req.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'}`}>{req.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ───────────────────────── SERVICES VIEW ───────────────────────── */
  const ServicesView = () => (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="font-display text-xl font-extrabold text-slate-800">Your Services Catalog</h2>
        <p className="text-xs text-slate-400 mt-0.5">List the core repair, cleaning or setup services you specialize in.</p>
      </div>
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-display text-sm font-bold text-slate-800">Configure & Add New Service Offer</h3>
          {newServiceSuccess && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-700 font-bold flex items-center space-x-2">
              <Check className="h-4 w-4" /><span>New service successfully added to your catalog!</span>
            </div>
          )}
          <form onSubmit={handleAddServiceSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Service Display Name *</label>
                <input type="text" required placeholder="e.g. Premium Bathroom Sanitization" value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs outline-none focus:border-primary-indigo" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Starting Pricing (₹) *</label>
                <input type="number" required placeholder="e.g. 399" value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs outline-none focus:border-primary-indigo" />
              </div>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
              <button type="submit" className="rounded-xl bg-primary-indigo px-6 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700">Publish to Catalog</button>
              <button type="button" onClick={() => { setNewServiceName(''); setNewServicePrice(''); }} className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">Reset</button>
            </div>
          </form>
        </div>
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">Existing Services Catalog</h3>
          <div className="space-y-2">
            {[{ name: 'Home Deep Cleaning', price: 2499 }, { name: 'Kitchen Chimney Sanitizing', price: 1199 }, { name: 'Bathroom Acid Wash', price: 799 }].map((s, idx) => (
              <div key={idx} className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">{s.name}</span>
                <span className="font-extrabold text-primary-indigo">₹{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ───────────────────────── CALENDAR VIEW ───────────────────────── */
  const CalendarView = () => (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="font-display text-xl font-extrabold text-slate-800">Your Work Calendar</h2>
        <p className="text-xs text-slate-400 mt-0.5">Set availability schedules and toggle active workdays.</p>
      </div>
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-display text-sm font-bold text-slate-800">Set Weekly Workdays</h3>
          <div className="space-y-3">
            {Object.entries(workingDays).map(([day, active]) => (
              <div key={day} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{day}</span>
                <button type="button" onClick={() => setWorkingDays({ ...workingDays, [day]: !active })}
                  className={`rounded-full px-4 py-1 text-xs font-bold transition ${active ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-200 text-slate-500'}`}>
                  {active ? 'Active (Open)' : 'Inactive (Closed)'}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">Active Slot List</h3>
          <p className="text-[10px] text-slate-400">These slots are displayed during customer reservation checkout.</p>
          <div className="space-y-2">
            {['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '01:00 PM - 04:00 PM', '04:00 PM - 06:00 PM'].map(s => (
              <div key={s} className="text-xs bg-indigo-50/30 p-2.5 rounded-xl border border-indigo-100 text-slate-700 font-semibold">{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── GENERIC PLACEHOLDER for nav items without dedicated views ─── */
  const PlaceholderView = ({ title, subtitle }) => (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="font-display text-xl font-extrabold text-slate-800">{title}</h2>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>
      <div className="bg-white border border-slate-100 rounded-xl p-12 shadow-sm text-center">
        <Shield className="h-12 w-12 text-slate-200 mx-auto mb-3" />
        <p className="text-sm font-bold text-slate-500">This section is under development</p>
        <p className="text-[10px] text-slate-400 mt-1">Check back soon for updates.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    if (currentPage === 'wallet') return <WalletView />;
    if (currentPage === 'services') return <ServicesView />;
    if (currentPage === 'calendar') return <CalendarView />;
    switch (activeNav) {
      case 'dashboard': return <DashboardView />;
      case 'bookings': return <PlaceholderView title="My Bookings" subtitle="Manage all your active and past bookings." />;
      case 'earnings': return <PlaceholderView title="Earnings" subtitle="Track your income and financial reports." />;
      case 'reviews': return <PlaceholderView title="Reviews" subtitle="See what your customers say about your services." />;
      case 'notifications': return <PlaceholderView title="Notifications" subtitle="Stay updated with all alerts and messages." />;
      case 'documents': return <PlaceholderView title="Documents" subtitle="Upload and manage your verification documents." />;
      case 'profile': return <PlaceholderView title="Profile" subtitle="Manage your personal and professional details." />;
      case 'settings': return <PlaceholderView title="Settings" subtitle="Configure your app preferences and privacy." />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 fade-in">
      <Sidebar />
      <div className="ml-64 flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};
