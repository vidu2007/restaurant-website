"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import LoaderSpin from '@/components/LoaderSpin';
import Link from 'next/link';

export default function page() {

  const [activeTab, setActiveTab] = useState('reservations');

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

  if(activeTab === 'reservations') {
    dynamicWindow = <Reservations />;
  } else if(activeTab === 'orders') {
    dynamicWindow = <Orders />;
  } else if(activeTab === 'settings') {
    dynamicWindow = <UserSettings />;
  } else {
    dynamicWindow = <loaderSpin />;
  }

  return (
    <section className="grid grid-cols-[1fr_3fr]">
      <div className="flex flex-col px-5 py-16 gap-5">

        <h1 onClick={() => setActiveTab('reservations')} className={`${activeTab === 'reservations' ? 'bg-white/15' : ''} cursor-pointer text-amber-100 font-bold text-xl px-2 py-1 rounded-2xl hover:text-black hover:bg-white/80 transition-colors`}>My Reservations</h1>

        <h1 onClick={() => setActiveTab('settings')} className={`${activeTab === 'settings' ? 'bg-white/15' : ''} cursor-pointer text-amber-100 font-bold text-xl px-2 py-1 rounded-2xl hover:text-black hover:bg-white/80 transition-colors`}>Settings</h1>

        <h1 onClick={() => setActiveTab('orders')} className={`${activeTab === 'orders' ? 'bg-white/15' : ''} cursor-pointer text-amber-100 font-bold text-xl px-2 py-1 rounded-2xl hover:text-black hover:bg-white/80 transition-colors`}>Orders</h1>

        <Link href='/sign-out' className='cursor-point text-red-500 font-bold text-xl px-2 py-1 rounded-2xl hover:text-black hover:bg-red-500/80 transition-colors'>Log out</Link>
      </div>

      <div className='bg-amber-900 min-h-[80vh]'>
        {/* {
          isReservations ? <Reservations /> : <UserSettings />
        } */}

        {dynamicWindow}
      </div>

      <div></div>
    </section>
  )
}