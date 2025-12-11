'use client'

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function RestaurantNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [activeUser, setActiveUser] = useState(false);

  useEffect(() => {
    const CheckUser = () => {
      if(user === null) {
        setActiveUser(false);
      } else {
        setActiveUser(true);
      }
    }

    const intervalId = setInterval(CheckUser, 3000);

    return () => clearInterval(intervalId);

  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-amber-950 text-amber-50 shadow-lg sticky top-0 z-50 border-b">
      {/* Top bar with contact info */}
      {/* <div className="bg-amber-900 px-4 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>(555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>123 Food Street, City</span>
          </div>
        </div>
      </div> */}

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-amber-400">
              Bayley's <span className="text-amber-200">Restaurant</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-amber-100 hover:text-amber-400 transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link href='/cart' className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200">
                Cart
              </Link>
              <Link href={activeUser ? '/sign-out' : '/sign-in'} className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200">
                {activeUser ? 'Sign Out' : 'Sign In' }
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-100 hover:text-amber-400 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-amber-900 border-t border-amber-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-amber-100 hover:text-amber-400 hover:bg-amber-800 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href='/cart' className="block text-center w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200">
              Cart
            </Link>
            <Link href='/sign-in' className="block text-center w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200">
              Sign In
            </Link>
            <div className="pt-4 pb-2 space-y-2 border-t border-amber-800 mt-4">
              <div className="flex items-center gap-2 px-3 text-sm text-amber-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 px-3 text-sm text-amber-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Food Street, City</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}