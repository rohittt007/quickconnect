import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
    Search, Check, X, AlertCircle, LayoutDashboard, Users, Briefcase, Wrench, Calendar, CreditCard,
    TrendingUp, Star, Grid3X3, Ticket, Bell, FileText, Settings, Activity, LogOut, Globe,
    HelpCircle, MapPin, ChevronDown, Clock, DollarSign, Package, BarChart3, ShieldCheck, ExternalLink,
    Phone, Mail, Eye, ThumbsUp, ArrowUpRight, ArrowDownRight, MessageSquare, FileCheck, Wallet,
    Award, Zap, PieChart as PieChartIcon, CheckCircle2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'providers', label: 'Providers', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'categories', label: 'Categories', icon: Grid3X3 },
    { id: 'coupons', label: 'Coupons', icon: Ticket },
    { id: 'support', label: 'Support Tickets', icon: MessageSquare, badge: true },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'cms', label: 'CMS', icon: Settings },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
];

export const AdminPanel = () => {
    const {
        currentPage, setPanelAndPage, bookings, updateBookingStatus, providers,
        updateProviderStatus, tickets, updateTicketStatus, logs, notifications,
        authToken, authUser
    } = useApp();

    const [providerSearch, setProviderSearch] = useState('');
    const [bookingFilter, setBookingFilter] = useState('all');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogSuccess, setBlogSuccess] = useState(false);
    const [apiTickets, setApiTickets] = useState([]);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Fetch tickets from API for admin support view
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/tickets/create`);
                if (res.ok) {
                    const data = await res.json();
                    setApiTickets(Array.isArray(data) ? data : []);
                }
            } catch (_) { /* use local tickets as fallback */ }
        };
        fetchTickets();
    }, []);

    const allTickets = [...tickets, ...apiTickets.filter(at => !tickets.some(t => t.id === at.id))];
    const openTicketCount = allTickets.filter(t => t.status !== 'Resolved').length;

    const adminOverviewData = [
        { day: '01 May', bookings: 200, earnings: 40000 },
        { day: '05 May', bookings: 450, earnings: 60000 },
        { day: '10 May', bookings: 300, earnings: 45000 },
        { day: '15 May', bookings: 600, earnings: 80000 },
        { day: '20 May', bookings: 550, earnings: 70000 },
        { day: '25 May', bookings: 800, earnings: 95000 },
        { day: '30 May', bookings: 750, earnings: 90000 },
    ];
    const userGrowthData = [
        { name: 'Customers', value: 12543, color: '#4F46E5' },
        { name: 'Providers', value: 2458, color: '#7C3AED' },
        { name: 'Others', value: 870, color: '#cbd5e1' }
    ];

    const topServices = [
        { name: 'Home Cleaning', bookings: 4520, revenue: 'â‚¹8,42,300' },
        { name: 'AC Repair', bookings: 3210, revenue: 'â‚¹6,89,100' },
        { name: 'Plumbing', bookings: 2840, revenue: 'â‚¹4,56,800' },
        { name: 'Electrical', bookings: 2150, revenue: 'â‚¹3,78,200' },
        { name: 'Painting', bookings: 1680, revenue: 'â‚¹5,12,400' },
    ];

    const recentReviews = [
        { name: 'Priya Patel', service: 'Home Cleaning', rating: 5, comment: 'Excellent service! The team was very professional and thorough.', date: '2 hours ago' },
        { name: 'Rahul Mehta', service: 'AC Repair', rating: 4, comment: 'Good work, technician arrived on time and fixed the issue quickly.', date: '5 hours ago' },
        { name: 'Sneha Sharma', service: 'Plumbing', rating: 3, comment: 'Average service. Took longer than expected but the issue was resolved.', date: '1 day ago' },
    ];

    const filteredProviders = providers.filter((p) => p.name.toLowerCase().includes(providerSearch.toLowerCase()) || p.category.toLowerCase().includes(providerSearch.toLowerCase()));
    const filteredBookings = bookings.filter((b) => bookingFilter === 'all' ? true : b.status.toLowerCase() === bookingFilter.toLowerCase());

    const handleResolveTicket = (id) => { updateTicketStatus(id, 'Resolved'); setSelectedTicket(null); };
    const handleAddBlogSubmit = (e) => { e.preventDefault(); if (blogTitle) { setBlogSuccess(true); setBlogTitle(''); setTimeout(() => setBlogSuccess(false), 4000); } };

    const kpiCards = [
        { title: 'Total Users', value: '12,543', trend: '+18.6%', up: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Total Providers', value: '2,458', trend: '+14.2%', up: true, icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50' },
        { title: 'Total Bookings', value: '18,265', trend: '+20.5%', up: true, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Total Earnings', value: 'â‚¹28,74,560', trend: '+22.1%', up: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Completed Services', value: '15,890', trend: '+19.3%', up: true, icon: CheckCircle2, color: 'text-teal-600', bg: 'bg-teal-50' },
        { title: 'Cancelled Bookings', value: '1,245', trend: '-6.3%', up: false, icon: X, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    const pendingActions = [
        { label: 'New Provider Registrations', count: 12, color: 'bg-violet-500' },
        { label: 'Document Verifications', count: 8, color: 'bg-amber-500' },
        { label: 'Pending Payouts', count: 5, color: 'bg-emerald-500' },
        { label: 'Open Support Tickets', count: openTicketCount, color: 'bg-rose-500', page: 'support' },
    ];

    const systemChecks = [
        { label: 'Website Status', status: 'Operational' },
        { label: 'Payment Gateway', status: 'Operational' },
        { label: 'Email Server', status: 'Operational' },
        { label: 'SMS Gateway', status: 'Operational' },
        { label: 'API Backend', status: 'Operational' },
    ];

    // â”€â”€â”€ SIDEBAR â”€â”€â”€
    const Sidebar = () => _jsxs("aside", {
        className: `${sidebarCollapsed ? 'w-[72px]' : 'w-[280px]'} shrink-0 h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 overflow-hidden`,
        children: [
            // Logo
            _jsxs("div", { className: "flex items-center gap-3 px-5 py-5 border-b border-slate-100", children: [
                _jsx("div", { className: "h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0", children: _jsx(Zap, { className: "h-5 w-5 text-white" }) }),
                !sidebarCollapsed && _jsx("span", { className: "font-display text-lg font-extrabold text-slate-900 tracking-tight", children: "QuickConnect" })
            ] }),
            // Nav
            _jsx("nav", { className: "flex-1 overflow-y-auto py-4 px-3 space-y-0.5", children: navItems.map(item => {
                const Icon = item.icon;
                const active = currentPage === item.id;
                return _jsxs("button", {
                    onClick: () => setPanelAndPage('admin', item.id),
                    className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`,
                    children: [
                        _jsxs("div", { className: "relative shrink-0", children: [
                            _jsx(Icon, { className: "h-4.5 w-4.5" }),
                            item.badge && openTicketCount > 0 && _jsx("span", { className: "absolute -top-1.5 -right-1.5 h-4 min-w-4 flex items-center justify-center rounded-full bg-rose-500 text-white text-[8px] font-black px-1", children: openTicketCount })
                        ] }),
                        !sidebarCollapsed && _jsx("span", { children: item.label })
                    ]
                }, item.id);
            }) }),
            // Bottom
            !sidebarCollapsed && _jsxs("div", { className: "p-4 space-y-3 border-t border-slate-100", children: [
                _jsx("button", { className: "w-full flex items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition", children: [_jsx(ExternalLink, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "View Website" })] }),
                _jsxs("div", { className: "rounded-xl bg-indigo-50 border border-indigo-100 p-3 text-center", children: [
                    _jsx(HelpCircle, { className: "h-5 w-5 text-indigo-500 mx-auto mb-1" }),
                    _jsx("p", { className: "text-[10px] font-bold text-slate-700", children: "Need Help?" }),
                    _jsx("p", { className: "text-[9px] text-slate-400 font-semibold", children: "Contact Support" })
                ] })
            ] })
        ]
    });

    // â”€â”€â”€ TOP HEADER â”€â”€â”€
    const TopHeader = () => _jsxs("header", {
        className: "sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 flex items-center justify-between",
        children: [
            _jsxs("div", { className: "space-y-0.5", children: [
                _jsx("h1", { className: "font-display text-sm font-extrabold text-slate-900", children: "Welcome back, Admin! \uD83D\uDC4B" }),
                _jsx("p", { className: "text-[10px] text-slate-400 font-medium", children: "Manage your entire platform from one powerful dashboard." })
            ] }),
            _jsxs("div", { className: "flex items-center gap-4", children: [
                // Location
                _jsxs("div", { className: "hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100", children: [
                    _jsx(MapPin, { className: "h-3.5 w-3.5 text-indigo-500" }),
                    _jsx("span", { children: "Ahmedabad, Gujarat" }),
                    _jsx(ChevronDown, { className: "h-3 w-3 text-slate-400" })
                ] }),
                // Search
                _jsxs("div", { className: "relative hidden md:block", children: [
                    _jsx(Search, { className: "absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" }),
                    _jsx("input", { type: "text", placeholder: "Search anything...", className: "rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 w-56 transition" })
                ] }),
                // Bell
                _jsxs("button", { onClick: () => setPanelAndPage('admin', 'notifications'), className: "relative h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition", children: [
                    _jsx(Bell, { className: "h-4 w-4 text-slate-600" }),
                    notifications.filter(n => n.unread).length > 0 && _jsx("span", { className: "absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center rounded-full bg-rose-500 text-white text-[8px] font-black px-1", children: notifications.filter(n => n.unread).length })
                ] }),
                // Profile
                _jsxs("div", { className: "flex items-center gap-2.5 pl-3 border-l border-slate-100", children: [
                    _jsx("div", { className: "h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0", children: _jsx("span", { className: "text-xs font-extrabold text-indigo-600", children: "A" }) }),
                    _jsxs("div", { className: "hidden sm:block", children: [
                        _jsx("p", { className: "text-xs font-bold text-slate-800 leading-tight", children: "Admin User" }),
                        _jsx("p", { className: "text-[9px] text-slate-400 font-semibold", children: "Super Admin" })
                    ] })
                ] })
            ] })
        ]
    });

    // â”€â”€â”€ DASHBOARD PAGE â”€â”€â”€
    const DashboardPage = () => _jsxs("div", { className: "space-y-6", children: [
        // KPI Stats
        _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4", children: kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            return _jsxs("div", { className: "rounded-xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    _jsx("div", { className: `h-9 w-9 rounded-lg ${kpi.bg} flex items-center justify-center`, children: _jsx(Icon, { className: `h-4.5 w-4.5 ${kpi.color}` }) }),
                    _jsxs("span", { className: `flex items-center gap-0.5 text-[10px] font-black ${kpi.up ? 'text-emerald-500' : 'text-rose-500'}`, children: [
                        kpi.up ? _jsx(ArrowUpRight, { className: "h-3 w-3" }) : _jsx(ArrowDownRight, { className: "h-3 w-3" }),
                        _jsx("span", { children: kpi.trend })
                    ] })
                ] }),
                _jsx("p", { className: "font-display text-xl font-extrabold text-slate-900", children: kpi.value }),
                _jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-wide", children: kpi.title })
            ] }, i);
        }) }),

        // Charts Row
        _jsx("div", { className: "grid grid-cols-12 gap-6", children: [
            // Line Chart
            _jsxs("div", { className: "col-span-12 lg:col-span-8 rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                    _jsxs("div", { children: [
                        _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider", children: "Bookings vs Earnings Trend" }),
                        _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "Monthly platform jobs and commission margins" })
                    ] }),
                    _jsxs("div", { className: "flex items-center gap-4 text-[10px] font-bold", children: [
                        _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-indigo-500" }), _jsx("span", { children: "Bookings" })] }),
                        _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-violet-500" }), _jsx("span", { children: "Earnings (â‚¹)" })] })
                    ] })
                ] }),
                _jsx("div", { className: "h-64 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: adminOverviewData, children: [
                    _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f1f5f9" }),
                    _jsx(XAxis, { dataKey: "day", stroke: "#94a3b8", fontSize: 9 }),
                    _jsx(YAxis, { yAxisId: "left", stroke: "#4F46E5", fontSize: 9 }),
                    _jsx(YAxis, { yAxisId: "right", orientation: "right", stroke: "#7C3AED", fontSize: 9 }),
                    _jsx(Tooltip, {}),
                    _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "bookings", stroke: "#4F46E5", strokeWidth: 3, dot: { fill: '#4F46E5', r: 4 } }),
                    _jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "earnings", stroke: "#7C3AED", strokeWidth: 3, dot: { fill: '#7C3AED', r: 4 } })
                ] }) }) })
            ] }),
            // Earnings Summary
            _jsxs("div", { className: "col-span-12 lg:col-span-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: [
                _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-4", children: "Earnings Summary" }),
                _jsxs("div", { className: "space-y-4", children: [
                    _jsxs("div", { className: "flex justify-between items-center text-xs font-semibold", children: [_jsx("span", { className: "text-slate-600", children: "Platform Commissions" }), _jsx("span", { className: "text-emerald-500 font-bold", children: "+ â‚¹4,32,684" })] }),
                    _jsxs("div", { className: "flex justify-between items-center text-xs font-semibold", children: [_jsx("span", { className: "text-slate-600", children: "Provider Payouts" }), _jsx("span", { className: "text-slate-700 font-bold", children: "â‚¹24,41,876" })] }),
                    _jsxs("div", { className: "flex justify-between items-center text-xs font-semibold", children: [_jsx("span", { className: "text-slate-600", children: "Refund Escrows" }), _jsx("span", { className: "text-rose-500 font-bold", children: "â‚¹31,120" })] }),
                    _jsx("div", { className: "border-t border-slate-100 pt-3" }),
                    _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "font-display text-sm font-extrabold text-slate-800", children: "Total Net Revenue" }), _jsx("span", { className: "font-display text-sm font-extrabold text-indigo-600", children: "â‚¹28,74,560" })] })
                ] }),
                // Pie
                _jsxs("div", { className: "mt-5 pt-4 border-t border-slate-100", children: [
                    _jsx("h4", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2", children: "User Growth" }),
                    _jsxs("div", { className: "h-36 w-full relative flex items-center justify-center", children: [
                        _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsx(PieChart, { children: _jsx(Pie, { data: userGrowthData, cx: "50%", cy: "50%", innerRadius: 38, outerRadius: 55, paddingAngle: 5, dataKey: "value", children: userGrowthData.map((e, i) => _jsx(Cell, { fill: e.color }, `c-${i}`)) }) }) }),
                        _jsxs("div", { className: "absolute text-center", children: [_jsx("p", { className: "font-display text-base font-extrabold text-slate-800", children: "15.8K" }), _jsx("p", { className: "text-[8px] text-slate-400 font-bold", children: "Total Users" })] })
                    ] }),
                    _jsx("div", { className: "flex justify-center gap-4 text-[10px] font-bold text-slate-600 mt-1", children: userGrowthData.map(e => _jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "h-2 w-2 rounded-full", style: { backgroundColor: e.color } }), _jsx("span", { children: `${e.name} (${e.value})` })] }, e.name)) })
                ] })
            ] })
        ] }),

        // Recent Bookings Table
        _jsxs("div", { className: "rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: [
            _jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                _jsxs("div", { children: [_jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider", children: "Recent Bookings" }), _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "Latest platform transactions" })] }),
                _jsx("button", { onClick: () => setPanelAndPage('admin', 'bookings'), className: "text-xs font-bold text-indigo-600 hover:underline", children: "View All" })
            ] }),
            _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
                _jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]", children: [
                    _jsx("th", { className: "pb-3", children: "Booking ID" }), _jsx("th", { className: "pb-3", children: "Customer" }), _jsx("th", { className: "pb-3", children: "Service" }), _jsx("th", { className: "pb-3", children: "Date & Time" }), _jsx("th", { className: "pb-3", children: "Status" }), _jsx("th", { className: "pb-3 text-right", children: "Amount" })
                ] }) }),
                _jsx("tbody", { className: "divide-y divide-slate-50", children: bookings.slice(0, 5).map(b => _jsxs("tr", { className: "hover:bg-slate-50/40 transition", children: [
                    _jsx("td", { className: "py-3 font-mono font-semibold text-slate-600", children: b.id }),
                    _jsx("td", { className: "py-3 font-semibold text-slate-800", children: b.customerName }),
                    _jsx("td", { className: "py-3 font-semibold text-slate-700", children: b.serviceName || b.providerName }),
                    _jsxs("td", { className: "py-3 text-slate-500", children: [b.date, " â€¢ ", b.time] }),
                    _jsx("td", { className: "py-3", children: _jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[8px] font-bold ${b.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : b.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`, children: b.status }) }),
                    _jsxs("td", { className: "py-3 text-right font-bold text-slate-800", children: ["â‚¹", b.amount] })
                ] }, b.id)) })
            ] }) })
        ] }),

        // Bottom Grid: Top Services + Pending Actions + Reviews + System
        _jsx("div", { className: "grid grid-cols-12 gap-6", children: [
            // Top Services
            _jsxs("div", { className: "col-span-12 lg:col-span-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: [
                _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-4", children: "Top Services" }),
                _jsx("div", { className: "space-y-3", children: topServices.map((s, i) => _jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                    _jsxs("div", { className: "flex items-center gap-2.5", children: [
                        _jsx("span", { className: `h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white ${['bg-indigo-500','bg-violet-500','bg-blue-500','bg-emerald-500','bg-amber-500'][i]}`, children: i + 1 }),
                        _jsxs("div", { children: [_jsx("p", { className: "font-bold text-slate-800", children: s.name }), _jsx("p", { className: "text-[10px] text-slate-400", children: `${s.bookings.toLocaleString()} bookings` })] })
                    ] }),
                    _jsx("span", { className: "font-bold text-slate-700", children: s.revenue })
                ] }, i)) })
            ] }),
            // Pending Actions
            _jsxs("div", { className: "col-span-12 lg:col-span-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: [
                _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-4", children: "Pending Actions" }),
                _jsx("div", { className: "space-y-3", children: pendingActions.map((a, i) => _jsxs("button", {
                    onClick: a.page ? () => setPanelAndPage('admin', a.page) : undefined,
                    className: "w-full flex items-center justify-between text-xs hover:bg-slate-50 rounded-lg p-2 -mx-2 transition",
                    children: [
                        _jsxs("div", { className: "flex items-center gap-2.5", children: [
                            _jsx("span", { className: `h-2.5 w-2.5 rounded-full ${a.color}` }),
                            _jsx("span", { className: "font-semibold text-slate-700", children: a.label })
                        ] }),
                        _jsx("span", { className: `h-6 min-w-6 flex items-center justify-center rounded-full text-[10px] font-black text-white ${a.color}`, children: a.count })
                    ]
                }, i)) })
            ] }),
            // Recent Reviews
            _jsxs("div", { className: "col-span-12 lg:col-span-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: [
                _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-4", children: "Recent Reviews" }),
                _jsx("div", { className: "space-y-3", children: recentReviews.map((r, i) => _jsxs("div", { className: "border-b border-slate-50 pb-3 last:border-0 last:pb-0", children: [
                    _jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                        _jsxs("div", { children: [_jsx("p", { className: "text-xs font-bold text-slate-800", children: r.name }), _jsx("p", { className: "text-[10px] text-slate-400", children: r.service })] }),
                        _jsx("div", { className: "flex gap-0.5", children: Array.from({ length: 5 }).map((_, si) => _jsx(Star, { className: `h-3 w-3 ${si < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}` }, si)) })
                    ] }),
                    _jsx("p", { className: "text-[10px] text-slate-500 leading-relaxed", children: r.comment }),
                    _jsx("p", { className: "text-[9px] text-slate-300 font-bold mt-1", children: r.date })
                ] }, i)) })
            ] })
        ] }),

        // System Overview
        _jsxs("div", { className: "rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: [
            _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-4", children: "System Overview" }),
            _jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: systemChecks.map((s, i) => _jsxs("div", { className: "flex items-center gap-2.5 rounded-lg bg-slate-50 p-3", children: [
                _jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" }),
                _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold text-slate-700", children: s.label }), _jsx("p", { className: "text-[9px] text-emerald-600 font-bold", children: s.status })] })
            ] }, i)) })
        ] })
    ] });

    // â”€â”€â”€ PROVIDERS PAGE (unchanged logic) â”€â”€â”€
    const ProvidersPage = () => _jsxs("div", { className: "space-y-6", children: [
        _jsxs("div", { className: "border-b border-slate-100 pb-4", children: [_jsx("h2", { className: "font-display text-xl font-extrabold text-slate-800", children: "Service Provider Management" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Approve, reject, or suspend service provider accounts." })] }),
        _jsxs("div", { className: "bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4", children: [
            _jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: _jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search providers...", value: providerSearch, onChange: (e) => setProviderSearch(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none focus:border-indigo-500" })] }) }),
            _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
                _jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px] pb-2", children: [_jsx("th", { className: "pb-3", children: "Provider" }), _jsx("th", { className: "pb-3", children: "Category" }), _jsx("th", { className: "pb-3", children: "Experience" }), _jsx("th", { className: "pb-3", children: "Jobs" }), _jsx("th", { className: "pb-3", children: "Status" }), _jsx("th", { className: "pb-3 text-right", children: "Actions" })] }) }),
                _jsx("tbody", { className: "divide-y divide-slate-50", children: filteredProviders.map(p => _jsxs("tr", { className: "hover:bg-slate-50/30", children: [
                    _jsx("td", { className: "py-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-8 w-8 overflow-hidden rounded-full border bg-slate-100 shrink-0", children: _jsx("img", { src: p.image, alt: p.name, className: "h-full w-full object-cover" }) }), _jsx("span", { className: "font-bold text-slate-800", children: p.name })] }) }),
                    _jsx("td", { className: "py-3 font-semibold text-slate-700", children: p.category }),
                    _jsx("td", { className: "py-3 text-slate-500", children: p.experience }),
                    _jsx("td", { className: "py-3 text-slate-500 font-mono", children: p.completedJobs }),
                    _jsx("td", { className: "py-3", children: _jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[8px] font-bold ${p.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : p.status === 'Rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`, children: p.status }) }),
                    _jsx("td", { className: "py-3 text-right", children: _jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                        p.status !== 'Verified' && _jsx("button", { onClick: () => updateProviderStatus(p.id, 'Verified'), className: "rounded bg-emerald-500 p-1 text-white hover:bg-emerald-600", children: _jsx(Check, { className: "h-3.5 w-3.5" }) }),
                        p.status !== 'Rejected' && _jsx("button", { onClick: () => updateProviderStatus(p.id, 'Rejected'), className: "rounded bg-rose-500 p-1 text-white hover:bg-rose-600", children: _jsx(X, { className: "h-3.5 w-3.5" }) })
                    ] }) })
                ] }, p.id)) })
            ] }) })
        ] })
    ] });

    // â”€â”€â”€ BOOKINGS PAGE â”€â”€â”€
    const BookingsPage = () => _jsxs("div", { className: "space-y-6", children: [
        _jsxs("div", { className: "border-b border-slate-100 pb-4", children: [_jsx("h2", { className: "font-display text-xl font-extrabold text-slate-800", children: "Booking Sheets Management" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Track, schedule, or cancel active service bookings." })] }),
        _jsxs("div", { className: "bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4", children: [
            _jsx("div", { className: "flex flex-wrap gap-2 border-b border-slate-50 pb-3", children: ['all','pending','confirmed','completed','cancelled'].map(tab => _jsx("button", { onClick: () => setBookingFilter(tab), className: `rounded-full px-4 py-1.5 text-xs font-bold capitalize transition ${bookingFilter === tab ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`, children: tab }, tab)) }),
            _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
                _jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]", children: [_jsx("th", { className: "pb-3", children: "Booking ID" }), _jsx("th", { className: "pb-3", children: "Customer" }), _jsx("th", { className: "pb-3", children: "Provider" }), _jsx("th", { className: "pb-3", children: "Date & Slot" }), _jsx("th", { className: "pb-3", children: "Status" }), _jsx("th", { className: "pb-3 text-right", children: "Actions" })] }) }),
                _jsx("tbody", { className: "divide-y divide-slate-50", children: filteredBookings.map(b => _jsxs("tr", { className: "hover:bg-slate-50/30", children: [
                    _jsx("td", { className: "py-3 font-mono font-semibold text-slate-600", children: b.id }),
                    _jsxs("td", { className: "py-3", children: [_jsx("p", { className: "font-bold text-slate-800", children: b.customerName }), _jsx("p", { className: "text-[10px] text-slate-400", children: b.customerPhone })] }),
                    _jsx("td", { className: "py-3 font-semibold text-slate-700", children: b.providerName }),
                    _jsxs("td", { className: "py-3 text-slate-500", children: [b.date, " â€¢ ", b.time] }),
                    _jsx("td", { className: "py-3", children: _jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[8px] font-bold ${b.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : b.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`, children: b.status }) }),
                    _jsx("td", { className: "py-3 text-right", children: b.status !== 'Cancelled' && b.status !== 'Completed' && _jsx("button", { onClick: () => updateBookingStatus(b.id, 'Cancelled'), className: "rounded bg-rose-500 px-2 py-1 text-[9px] font-bold text-white hover:bg-rose-600", children: "Cancel" }) })
                ] }, b.id)) })
            ] }) })
        ] })
    ] });

    // â”€â”€â”€ SUPPORT PAGE â”€â”€â”€
    const SupportPage = () => _jsxs("div", { className: "space-y-6", children: [
        _jsxs("div", { className: "border-b border-slate-100 pb-4", children: [_jsx("h2", { className: "font-display text-xl font-extrabold text-slate-800", children: "Support Ticket Center" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Respond, resolve, or audit customer support complaints." })] }),
        _jsx("div", { className: "grid grid-cols-12 gap-6", children: [
            _jsxs("div", { className: "col-span-12 lg:col-span-7 bg-white border border-slate-100 rounded-xl p-6 shadow-sm", children: [
                _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider mb-4", children: "Open Support Tickets" }),
                _jsx("div", { className: "space-y-3", children: allTickets.map(t => _jsxs("div", { onClick: () => setSelectedTicket(t), className: `p-4 rounded-xl border transition cursor-pointer flex justify-between items-center ${selectedTicket?.id === t.id ? 'border-indigo-500 bg-indigo-50/10 shadow-sm' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'}`, children: [
                    _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-mono font-bold text-[10px] text-slate-400", children: t.id }), _jsx("h4", { className: "text-xs font-bold text-slate-800", children: t.subject })] }), _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: `Opened by ${t.name} â€¢ ${t.date}` })] }),
                    _jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[8px] font-bold ${t.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`, children: t.status })
                ] }, t.id)) })
            ] }),
            _jsx("div", { className: "col-span-12 lg:col-span-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm", children: selectedTicket ? _jsxs("div", { className: "space-y-4", children: [
                _jsxs("div", { className: "flex items-center justify-between border-b border-slate-50 pb-2", children: [_jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "Support Request" }), _jsx("span", { className: "text-xs font-mono font-bold text-indigo-600", children: selectedTicket.id })] }),
                _jsxs("div", { className: "space-y-1 text-xs", children: [_jsx("p", { className: "font-bold text-slate-800", children: selectedTicket.subject }), _jsx("p", { className: "text-[10px] text-slate-400", children: `Opened by: ${selectedTicket.name} (${selectedTicket.email})` }), _jsx("div", { className: "bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2 text-slate-600 text-[11px] leading-relaxed", children: selectedTicket.description })] }),
                _jsxs("div", { className: "space-y-2 border-t border-slate-50 pt-3", children: [_jsx("label", { className: "block text-[10px] font-bold text-slate-400 uppercase", children: "Response" }), _jsx("textarea", { rows: 3, placeholder: "Write your response...", className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs outline-none focus:border-indigo-500" })] }),
                _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleResolveTicket(selectedTicket.id), className: "rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 flex-1", children: "Mark Resolved" }), _jsx("button", { onClick: () => setSelectedTicket(null), className: "rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex-1", children: "Cancel" })] })
            ] }) : _jsxs("div", { className: "text-center py-12 text-slate-400 font-medium text-xs", children: [_jsx(AlertCircle, { className: "h-6 w-6 text-slate-300 mx-auto mb-2" }), _jsx("span", { children: "Select a ticket to review." })] }) })
        ] })
    ] });

    // â”€â”€â”€ CMS PAGE â”€â”€â”€
    const CmsPage = () => _jsxs("div", { className: "space-y-6", children: [
        _jsxs("div", { className: "border-b border-slate-100 pb-4", children: [_jsx("h2", { className: "font-display text-xl font-extrabold text-slate-800", children: "Content Management System" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Configure landing page content, blogs, and testimonials." })] }),
        _jsx("div", { className: "grid grid-cols-12 gap-6", children: [
            _jsxs("div", { className: "col-span-12 lg:col-span-8 bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4", children: [
                _jsx("h3", { className: "font-display text-sm font-bold text-slate-800", children: "Publish a Blog Post" }),
                blogSuccess && _jsx("div", { className: "rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-emerald-700 font-bold", children: "Blog published successfully!" }),
                _jsxs("form", { onSubmit: handleAddBlogSubmit, className: "space-y-4", children: [
                    _jsxs("div", { children: [_jsx("label", { className: "block text-[10px] font-bold text-slate-400 uppercase mb-1.5", children: "Blog Title *" }), _jsx("input", { type: "text", required: true, placeholder: "Enter blog title...", value: blogTitle, onChange: (e) => setBlogTitle(e.target.value), className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs outline-none focus:border-indigo-500" })] }),
                    _jsxs("div", { children: [_jsx("label", { className: "block text-[10px] font-bold text-slate-400 uppercase mb-1.5", children: "Content *" }), _jsx("textarea", { rows: 6, required: true, placeholder: "Write content here...", className: "w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs outline-none focus:border-indigo-500" })] }),
                    _jsxs("div", { className: "flex gap-3 pt-3 border-t border-slate-100", children: [_jsx("button", { type: "submit", className: "rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-700", children: "Publish" }), _jsx("button", { type: "button", onClick: () => setBlogTitle(''), className: "rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50", children: "Reset" })] })
                ] })
            ] }),
            _jsxs("div", { className: "col-span-12 lg:col-span-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4", children: [
                _jsx("h3", { className: "font-display text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2", children: "CMS Sections" }),
                _jsx("div", { className: "space-y-2.5 text-xs", children: [{ section: 'FAQs', active: true },{ section: 'Testimonials', active: true },{ section: 'Blogs', active: true },{ section: 'Statistics', active: true }].map((s, i) => _jsxs("div", { className: "flex justify-between items-center p-2.5 rounded-lg bg-slate-50", children: [_jsx("span", { className: "font-bold text-slate-700", children: s.section }), _jsx("span", { className: "text-[9px] font-bold bg-emerald-100 text-emerald-700 rounded px-2 py-0.5", children: "Active" })] }, i)) })
            ] })
        ] })
    ] });

    // â”€â”€â”€ LOGS PAGE â”€â”€â”€
    const LogsPage = () => _jsxs("div", { className: "space-y-6", children: [
        _jsxs("div", { className: "border-b border-slate-100 pb-4", children: [_jsx("h2", { className: "font-display text-xl font-extrabold text-slate-800", children: "System Security Audit Logs" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Track all administrative and security actions." })] }),
        _jsxs("div", { className: "bg-white border border-slate-100 rounded-xl p-6 shadow-sm", children: [
            _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
                _jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]", children: [_jsx("th", { className: "pb-3", children: "Log ID" }), _jsx("th", { className: "pb-3", children: "User" }), _jsx("th", { className: "pb-3", children: "Role" }), _jsx("th", { className: "pb-3", children: "Action" }), _jsx("th", { className: "pb-3", children: "IP" }), _jsx("th", { className: "pb-3 text-right", children: "Timestamp" })] }) }),
                _jsx("tbody", { className: "divide-y divide-slate-50 font-medium", children: logs.map(l => _jsxs("tr", { className: "hover:bg-slate-50/50", children: [_jsx("td", { className: "py-3 font-mono font-bold text-slate-500", children: l.id }), _jsx("td", { className: "py-3 text-slate-800 font-semibold", children: l.user }), _jsx("td", { className: "py-3 text-slate-500", children: l.role }), _jsx("td", { className: "py-3 text-indigo-600 font-bold", children: l.action }), _jsx("td", { className: "py-3 font-mono text-slate-400", children: l.ip }), _jsx("td", { className: "py-3 text-right text-slate-400", children: l.timestamp })] }, l.id)) })
            ] }) })
        ] })
    ] });

    // â”€â”€â”€ PLACEHOLDER for other pages â”€â”€â”€
    const PlaceholderPage = (title) => _jsxs("div", { className: "space-y-6", children: [
        _jsxs("div", { className: "border-b border-slate-100 pb-4", children: [_jsx("h2", { className: "font-display text-xl font-extrabold text-slate-800", children: title }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "This module is coming soon. Stay tuned for updates." })] }),
        _jsx("div", { className: "bg-white border border-slate-100 rounded-xl p-12 shadow-sm text-center", children: [_jsx(Package, { className: "h-10 w-10 text-slate-300 mx-auto mb-3" }), _jsx("p", { className: "text-sm font-bold text-slate-500", children: "Coming Soon" })] })
    ] });

    // â”€â”€â”€ PAGE ROUTER â”€â”€â”€
    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return _jsx(DashboardPage, {});
            case 'providers': return _jsx(ProvidersPage, {});
            case 'bookings': return _jsx(BookingsPage, {});
            case 'support': return _jsx(SupportPage, {});
            case 'cms': return _jsx(CmsPage, {});
            case 'logs': return _jsx(LogsPage, {});
            case 'users': return _jsx(PlaceholderPage, { title: "User Management" });
            case 'services': return _jsx(PlaceholderPage, { title: "Service Catalog" });
            case 'payments': return _jsx(PlaceholderPage, { title: "Payment Management" });
            case 'earnings': return _jsx(PlaceholderPage, { title: "Earnings & Revenue" });
            case 'reviews': return _jsx(PlaceholderPage, { title: "Reviews & Ratings" });
            case 'categories': return _jsx(PlaceholderPage, { title: "Category Management" });
            case 'coupons': return _jsx(PlaceholderPage, { title: "Coupon Management" });
            case 'notifications': return _jsx(PlaceholderPage, { title: "Notifications" });
            case 'reports': return _jsx(PlaceholderPage, { title: "Reports & Analytics" });
            default: return _jsx(DashboardPage, {});
        }
    };

    // â”€â”€â”€ MAIN LAYOUT â”€â”€â”€
    return (_jsxs("div", { className: "flex min-h-screen bg-slate-50/50", children: [
        _jsx(Sidebar, {}),
        _jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
            _jsx(TopHeader, {}),
            _jsx("main", { className: "flex-1 p-6 overflow-auto", children: renderPage() })
        ] })
    ] }));
};
