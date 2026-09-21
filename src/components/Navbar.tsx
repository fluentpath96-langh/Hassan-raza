import React, { useState } from 'react';
import { PageRoute } from '../types';
import { MessageCircle, Phone, Menu, X, Globe, User, Briefcase, Building2 } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: PageRoute) => {
    navigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E6E9] shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-[#0B2A5B] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4A93A] animate-pulse"></span>
            <span className="font-arabic-body">لاہور، پنجاب سوسائٹی، غازی روڈ • حکومت سے منظور شدہ ادارہ</span>
          </div>
          <div className="flex items-center gap-4 text-[13px]" dir="ltr">
            <a
              href="https://wa.me/923017142648"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#D4A93A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>0301-7142648</span>
            </a>
            <span className="opacity-40">|</span>
            <a
              href="https://wa.me/923218477765"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#D4A93A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>0321-8477765</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 text-right group cursor-pointer focus:outline-hidden"
        >
          {/* Logo Graphic */}
          <div className="relative w-12 h-12 rounded-full bg-[#0B5D3B] text-white flex items-center justify-center shadow-sm overflow-hidden shrink-0 border-2 border-[#D4A93A]">
            <Globe className="w-7 h-7 text-white/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold tracking-tighter text-[#D4A93A] mt-4">GLOBAL FLY</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-lg sm:text-xl text-[#0B2A5B] tracking-tight leading-tight group-hover:text-[#0B5D3B] transition-colors font-urdu-title pt-1">
              گلوبل فلائی پرائیویٹ لمیٹڈ
            </span>
            <span className="text-[11px] sm:text-xs text-[#5F6B72] font-en-label tracking-wider uppercase font-semibold">
              Global Fly Private Limited
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => handleNav('/')}
            className={`px-3.5 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
              currentRoute === '/'
                ? 'bg-[#0B5D3B] text-white shadow-xs'
                : 'text-[#191C1D] hover:bg-[#F3F4F5]'
            }`}
          >
            ہوم <span className="text-xs opacity-75 font-en-label">/ Home</span>
          </button>

          <button
            onClick={() => handleNav('/staff')}
            className={`px-3.5 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              currentRoute.startsWith('/staff')
                ? 'bg-[#0B5D3B] text-white shadow-xs'
                : 'text-[#191C1D] hover:bg-[#F3F4F5]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>میں سٹاف ہوں</span>
            <span className="text-xs opacity-75 font-en-label">/ Staff</span>
          </button>

          <button
            onClick={() => handleNav('/client')}
            className={`px-3.5 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              currentRoute === '/client'
                ? 'bg-[#0B2A5B] text-white shadow-xs'
                : 'text-[#191C1D] hover:bg-[#F3F4F5]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>میں کلائنٹ ہوں</span>
            <span className="text-xs opacity-75 font-en-label">/ Client</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              if (currentRoute !== '/') {
                handleNav('/');
              }
            }}
            className="px-3.5 py-2 rounded-lg font-medium text-sm text-[#191C1D] hover:bg-[#F3F4F5] transition-all cursor-pointer"
          >
            رابطہ <span className="text-xs opacity-75 font-en-label">/ Contact</span>
          </a>
        </nav>

        {/* Action Button: WhatsApp Us */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/923017142648"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0B5D3B] hover:bg-[#08492E] text-white px-4 py-2.5 rounded-lg font-medium text-sm shadow-xs transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#8AD4A8]" />
            <span>واٹس ایپ رابطہ</span>
            <span className="text-xs opacity-80 font-en-label" dir="ltr">/ WhatsApp Us</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-[#191C1D] hover:bg-[#F3F4F5] transition-colors focus:outline-hidden"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E6E9] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-right px-4 py-3 rounded-lg font-medium text-base transition-colors flex items-center justify-between ${
              currentRoute === '/' ? 'bg-[#0B5D3B] text-white' : 'text-[#191C1D] hover:bg-[#F3F4F5]'
            }`}
          >
            <span>ہوم (Home)</span>
            <span className="text-xs opacity-75">مرکزی صفحہ</span>
          </button>

          <button
            onClick={() => handleNav('/staff')}
            className={`w-full text-right px-4 py-3 rounded-lg font-medium text-base transition-colors flex items-center justify-between ${
              currentRoute.startsWith('/staff') ? 'bg-[#0B5D3B] text-white' : 'text-[#191C1D] hover:bg-[#F3F4F5]'
            }`}
          >
            <span>میں سٹاف ہوں (I am Staff)</span>
            <span className="text-xs opacity-75">نوکری تلاش کریں</span>
          </button>

          <button
            onClick={() => handleNav('/client')}
            className={`w-full text-right px-4 py-3 rounded-lg font-medium text-base transition-colors flex items-center justify-between ${
              currentRoute === '/client' ? 'bg-[#0B2A5B] text-white' : 'text-[#191C1D] hover:bg-[#F3F4F5]'
            }`}
          >
            <span>میں کلائنٹ ہوں (I am Client)</span>
            <span className="text-xs opacity-75">سٹاف بھرتی کریں</span>
          </button>

          <div className="pt-2 border-t border-[#E2E6E9] space-y-2">
            <a
              href="https://wa.me/923017142648"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0B5D3B] text-white py-3 rounded-lg font-medium text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واٹس ایپ نمبر 1: 0301-7142648</span>
            </a>
            <a
              href="https://wa.me/923218477765"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0B2A5B] text-white py-3 rounded-lg font-medium text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>واٹس ایپ نمبر 2: 0321-8477765</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
