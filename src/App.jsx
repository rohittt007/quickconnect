import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AboutUs } from './components/AboutUs';
import { AuthPages } from './components/AuthPages';
import { CustomerPanel } from './components/CustomerPanel';
import { ProviderPanel } from './components/ProviderPanel';
import { AdminPanel } from './components/AdminPanel';

function DashboardAppContent() {
  const { currentPanel, currentPage, isAuthenticated } = useApp();

  const renderPanel = () => {
    // ── Provider & Admin panels are always authoritative ──────────────────
    if (currentPanel === 'provider') return <ProviderPanel />;
    if (currentPanel === 'admin') return <AdminPanel />;

    // ── Auth pages (login / signup / join-provider) ───────────────────────
    // Show these regardless of auth state when explicitly navigated to.
    if (currentPage === 'login' || currentPage === 'signup') {
      return <AuthPages type={currentPage} />;
    }
    if (currentPage === 'join-provider') {
      return <AuthPages type="join-provider" />;
    }

    // ── About Us is a standalone public page ─────────────────────────────
    if (currentPage === 'about') return <AboutUs />;

    // ── Authenticated users always get the Customer Portal ────────────────
    // This covers: home, browse, contact, dashboard, booking-stepper, etc.
    // whether currentPanel is 'public' or 'customer'.
    if (isAuthenticated) return <CustomerPanel />;

    // ── Unauthenticated users get the public Customer Panel (guest view) ──
    return <CustomerPanel />;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      {currentPanel === 'provider' ? (
        <main className="w-full">{renderPanel()}</main>
      ) : (
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{renderPanel()}</main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardAppContent />
    </AppProvider>
  );
}
