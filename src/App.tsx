/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { StaffSelectPage } from './pages/StaffSelectPage';
import { StaffSaudiPage } from './pages/StaffSaudiPage';
import { StaffPakistanPage } from './pages/StaffPakistanPage';
import { ClientPage } from './pages/ClientPage';
import { ThankYouPage } from './pages/ThankYouPage';

function normalizeRoute(pathname: string): PageRoute {
  if (pathname === '/staff' || pathname.startsWith('/staff/select')) return '/staff';
  if (pathname === '/staff/saudi') return '/staff/saudi';
  if (pathname === '/staff/pakistan') return '/staff/pakistan';
  if (pathname === '/client') return '/client';
  if (pathname === '/thank-you' || pathname === '/thankyou') return '/thank-you';
  return '/';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    return normalizeRoute(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoute(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newRoute: PageRoute) => {
    if (newRoute !== currentRoute) {
      window.history.pushState({}, '', newRoute);
      setCurrentRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/staff':
        return <StaffSelectPage navigate={navigate} />;
      case '/staff/saudi':
        return <StaffSaudiPage navigate={navigate} />;
      case '/staff/pakistan':
        return <StaffPakistanPage navigate={navigate} />;
      case '/client':
        return <ClientPage navigate={navigate} />;
      case '/thank-you':
        return <ThankYouPage navigate={navigate} />;
      case '/':
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#191C1D] selection:bg-[#0B5D3B]/20 selection:text-[#0B5D3B]">
      {/* Top sticky Navbar */}
      <Navbar currentRoute={currentRoute} navigate={navigate} />

      {/* Main Page Content */}
      <main className="flex-1 w-full pb-16">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Floating WhatsApp Button on Every Page */}
      <FloatingWhatsApp />
    </div>
  );
}
