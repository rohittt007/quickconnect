import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { sampleProviders, sampleBookings, sampleTickets, sampleNotifications, sampleLogs } from '../data/sampleData';

const AppContext = createContext(undefined);
const AUTH_STORAGE_KEY = 'quickconnect-auth';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const readStoredAuth = () => {
    if (typeof window === 'undefined') {
        return { authUser: null, authToken: null };
    }

    try {
        const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
        if (!stored) {
            return { authUser: null, authToken: null };
        }

        const parsed = JSON.parse(stored);
        return {
            authUser: parsed?.user ?? null,
            authToken: parsed?.token ?? null,
        };
    } catch (error) {
        return { authUser: null, authToken: null };
    }
};

export const AppProvider = ({ children }) => {
    const [currentPanel, setCurrentPanel] = useState('public');
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProvider, setSelectedProviderState] = useState(sampleProviders[0]);
    const [selectedCategory, setSelectedCategory] = useState('Home Cleaning');
    const [selectedBookingForTracking, setSelectedBookingForTracking] = useState(null);
    const [providers, setProviders] = useState(sampleProviders);
    const [bookings, setBookings] = useState(sampleBookings);
    const [tickets, setTickets] = useState(sampleTickets);
    const [notifications, setNotifications] = useState(sampleNotifications);
    const [logs, setLogs] = useState(sampleLogs);
    const [walletBalance, setWalletBalance] = useState(12350);
    const [withdrawRequests, setWithdrawRequests] = useState([
        { id: 'W-001', amount: 5000, status: 'Completed', date: '2026-06-30' },
        { id: 'W-002', amount: 2000, status: 'Pending', date: '2026-07-04' }
    ]);
    const [bookingDraft, setBookingDraft] = useState({
        servicePriority: 'Normal',
        propertyType: 'Home',
        amount: 329,
    });
    const [authUser, setAuthUserState] = useState(readStoredAuth().authUser);
    const [authToken, setAuthTokenState] = useState(readStoredAuth().authToken);
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        if (!isAuthenticated && currentPanel === 'customer' && currentPage !== 'login' && currentPage !== 'signup') {
            setPanelAndPage('customer', 'login');
        }
    }, [currentPanel, currentPage, authToken, authUser]);

    const setPanelAndPage = (panel, page) => {
        setCurrentPanel(panel);
        setCurrentPage(page);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const persistAuth = (user, token) => {
        setAuthUserState(user);
        setAuthTokenState(token);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
        }
    };

    const clearAuth = () => {
        setAuthUserState(null);
        setAuthTokenState(null);
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    };

    const setSelectedProvider = (provider) => {
        setSelectedProviderState(provider);
    };

    const loginUser = async ({ email, password }) => {
        setAuthError('');
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            const message = data?.detail || 'Invalid email or password.';
            setAuthError(message);
            throw new Error(message);
        }

        persistAuth(data.user, data.token);
        setPanelAndPage('customer', 'dashboard');
        return data;
    };

    const registerUser = async ({ name, email, phone, password }) => {
        setAuthError('');
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password })
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            const message = data?.detail || 'Unable to create the account.';
            setAuthError(message);
            throw new Error(message);
        }

        return data;
    };

    const logoutUser = () => {
        clearAuth();
        setAuthError('');
        setPanelAndPage('customer', 'login');
    };

    /**
     * submitTicketToAPI
     * -----------------
     * POSTs a support ticket to the FastAPI backend at /api/tickets/create.
     * Requires an active auth session — throws if the user is not logged in.
     * Returns the created ticket object from the server on success.
     */
    const submitTicketToAPI = async ({ category, subject, description, priority = 'Normal' }) => {
        if (!authToken || !authUser) {
            throw new Error('You must be logged in to submit a support request.');
        }

        const response = await fetch(`${API_BASE_URL}/api/tickets/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                user_name: authUser.name || 'Customer',
                user_email: authUser.email || '',
                category,
                subject: subject || category,
                description,
                priority,
            }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data?.detail || 'Unable to submit support request.');
        }

        // Also mirror into local state so the admin support tab stays in sync
        // even before the admin fetches from the backend.
        addTicket({
            id: data.id,
            category: data.category,
            subject: data.subject,
            description: data.description,
            status: data.status,
            date: data.created_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
            email: data.user_email,
            name: data.user_name,
            priority: data.priority,
        });

        return data;
    };

    const addBooking = (booking) => {
        setBookings((prev) => [booking, ...prev]);
        const newNotification = {
            id: `n-${Date.now()}`,
            text: `New booking request received for ${booking.serviceName} from ${booking.customerName}.`,
            time: 'Just now',
            type: 'booking',
            unread: true
        };
        setNotifications((prev) => [newNotification, ...prev]);
        addLog(`Created Booking ${booking.id}`, booking.customerName, 'Customer');
    };

    const updateBookingStatus = (id, status, trackingStep) => {
        setBookings((prev) => prev.map((b) => {
            if (b.id === id) {
                const step = trackingStep !== undefined ? trackingStep : (status === 'Confirmed' ? 1 :
                    status === 'On The Way' ? 2 :
                        status === 'Arriving Soon' ? 3 :
                            status === 'In Progress' ? 4 :
                                status === 'Completed' ? 5 : b.trackingStep);
                const updated = { ...b, status, trackingStep: step };
                if (selectedBookingForTracking && selectedBookingForTracking.id === id) {
                    setSelectedBookingForTracking(updated);
                }
                if (status === 'Completed' && b.status !== 'Completed') {
                    setWalletBalance((prevBal) => prevBal + b.amount);
                }
                return updated;
            }
            return b;
        }));

        const newNotification = {
            id: `n-${Date.now()}`,
            text: `Booking ${id} status updated to: ${status}.`,
            time: 'Just now',
            type: 'system',
            unread: true
        };
        setNotifications((prev) => [newNotification, ...prev]);
        addLog(`Updated Booking ${id} status to ${status}`, 'Amit Sharma', 'Service Provider');
    };

    const addTicket = (ticket) => {
        setTickets((prev) => [ticket, ...prev]);
        addLog(`Submitted Support Ticket ${ticket.id}`, ticket.name, 'Customer');
    };

    const updateTicketStatus = (id, status) => {
        setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
        addLog(`Resolved Support Ticket ${id}`, 'Admin User', 'Admin');
    };

    const addProvider = (provider) => {
        setProviders((prev) => [provider, ...prev]);
        addLog(`Registered new Service Provider ${provider.name}`, provider.name, 'Service Provider');
    };

    const updateProviderStatus = (id, status) => {
        setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
        addLog(`Updated Provider ${id} status to ${status}`, 'Admin User', 'Admin');
    };

    const addLog = (action, user = 'System', role = 'System') => {
        const newLog = {
            id: `L-${Date.now().toString().slice(-3)}`,
            user,
            role,
            action,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            ip: '192.168.1.' + Math.floor(Math.random() * 254 + 1)
        };
        setLogs((prev) => [newLog, ...prev]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const markNotificationRead = (id) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    };

    const addWithdrawRequest = (amount) => {
        const newRequest = {
            id: `W-${Date.now().toString().slice(-3)}`,
            amount,
            status: 'Pending',
            date: new Date().toISOString().slice(0, 10)
        };
        setWithdrawRequests((prev) => [newRequest, ...prev]);
        setWalletBalance((prev) => prev - amount);
        addLog(`Requested payout of ₹${amount}`, 'Amit Sharma', 'Service Provider');
    };

    const isAuthenticated = Boolean(authToken && authUser);

    return (_jsx(AppContext.Provider, { value: {
            currentPanel,
            currentPage,
            setPanelAndPage,
            selectedProvider,
            setSelectedProvider,
            selectedCategory,
            setSelectedCategory,
            selectedBookingForTracking,
            setSelectedBookingForTracking,
            providers,
            bookings,
            tickets,
            notifications,
            logs,
            walletBalance,
            setWalletBalance,
            withdrawRequests,
            addWithdrawRequest,
            addBooking,
            updateBookingStatus,
            addTicket,
            updateTicketStatus,
            addProvider,
            updateProviderStatus,
            addLog,
            clearNotifications,
            markNotificationRead,
            bookingDraft,
            setBookingDraft,
            authUser,
            authToken,
            authError,
            isAuthenticated,
            loginUser,
            registerUser,
            logoutUser,
            submitTicketToAPI,
        }, children: children }));
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
