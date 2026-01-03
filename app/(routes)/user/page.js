"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import LoaderSpin from '@/components/LoaderSpin';
import Link from 'next/link';

const Reservations = dynamic(() => import('@/components/userProfile/Reservations'), {
    loading: () => <LoaderSpin />,
  });

  const UserSettings = dynamic(() => import('@/components/userProfile/UserSettings'), {
    loading: () => <LoaderSpin />,
  });

  const Orders = dynamic(() => import('@/components/userProfile/Orders'), {
    loading: () => <LoaderSpin />,
  });

    let dynamicWindow;


export default function page() {

  const [activeTab, setActiveTab] = useState('reservations');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if(activeTab === 'reservations') {
    dynamicWindow = <Reservations />;
  } else if(activeTab === 'orders') {
    dynamicWindow = <Orders />;
  } else if(activeTab === 'settings') {
    dynamicWindow = <UserSettings />;
  } else {
    dynamicWindow = <LoaderSpin />;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // close menu on mobile
  };

  return (
    <section className="min-h-screen lg:grid lg:grid-cols-[1fr_3fr]">

      {/* MOBILE MENU BUTTON */}
      <div className="lg:hidden px-4 py-3 bg-amber-950/60">
        <button onClick={() => setIsMenuOpen(prev => !prev)} className="text-amber-100 font-bold text-lg">Menu</button>
      </div>

      {/* MENU */}
      <aside className={`bg-amber-950/40 px-4 lg:flex lg:flex-col lg:py-16 ${isMenuOpen ? 'flex flex-col gap-3 py-4' : 'hidden'} lg:gap-5`}>

        <h1 onClick={() => handleTabClick('reservations')} className={` ${activeTab === 'reservations' ? 'bg-white/15' : ''} cursor-pointer text-amber-100 font-bold text-lg lg:text-xl px-4 py-2 rounded-2xl hover:text-black hover:bg-white/80 transition-colors`}>My Reservations</h1>

        <h1 onClick={() => handleTabClick('settings')} className={`${activeTab === 'settings' ? 'bg-white/15' : ''}            cursor-pointer text-amber-100 font-bold text-lg lg:text-xl px-4 py-2 rounded-2xl hover:text-black hover:bg-white/80 transition-colors`}>Settings</h1>

        <h1 onClick={() => handleTabClick('orders')} className={` ${activeTab === 'orders' ? 'bg-white/15' : ''} cursor-pointer text-amber-100 font-bold text-lg lg:text-xl px-4 py-2 rounded-2xl hover:text-black hover:bg-white/80 transition-colors`}
        >Orders</h1>

        <Link href="/sign-out" className="text-red-400 font-bold text-lg lg:text-xl px-4 py-2 rounded-2xl hover:text-black hover:bg-red-500/80 transition-colors">Log out</Link>
      </aside>

      {/* CONTENT */}
      <main className="bg-amber-900 min-h-[80vh] p-4 sm:p-6 lg:p-8">
        {dynamicWindow}
      </main>

    </section>
  )
}
