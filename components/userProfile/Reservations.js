"use client"

import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LoaderSpin from '../LoaderSpin'

export default function Reservations() {

  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [triggerCount, setTriggerCount] = useState(0);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch('/api/reservations', {
        method: 'GET',
        cache: 'no-store',
        });

        const data = await res.json();
        setReservations(data.reservations);
        setIsLoading(false);
        console.log(data);

      } catch(err) {
        console.log(err);
      }
    }

    fetchReservations();
  }, [triggerCount]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch('/api/reservations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationId: id}),
      });

      const data = await res.json();
      console.log(data);

      //To run the useEffect again and fetch updated reservations
      setTriggerCount(prev => prev + 1);

    } catch(err) {
      console.log(err);
    }
  }

  const setStatus = (status) => {
    if(status === true) return 'Confirmed';
    if(status === false) return 'Pending';
    if(status === 'canceled') return 'Canceled';
  }

  // const reservations = [
  //   {id: 1},
  //   {id: 2},
  // ]

  return (
    <section className='p-3'>
      <div>
        <h1 className='text-center text-2xl font-bold'>Reservations</h1>
        <Link href="/reservations" className='text-right text-lg block'>New reservation</Link>
      </div>
      <div className='flex flex-col gap-5 py-5 px-1'>

        {isLoading ? (<LoaderSpin />) : null}

        {reservations.length === 0 && !isLoading ? (<h1 className='text-2xl text-center'>No reservations found</h1>) : null}

        {reservations.map((item) => (

          <div key={item._id} className='bg-amber-800 p-3'>
            <div className='flex gap-5'>
              <h1 className='text-xl'>{item.date.split('T')[0]} at {item.time}</h1>
              <h1 className='text-xl font-bold'>{item.title} {item.reservationName}</h1>
              <div className='flex gap-5 ml-auto mr-10'>
                <h3 onClick={() => handleCancel(item._id)} className='text-lg ml-auto mr-0'>Cancel</h3>
                <button className={`text-lg`}>{setStatus(item.status)}</button>
              </div>
            </div>
            <div className='flex gap-5'>
              <h4 className='inline min-w-24'>Guests: {item.guests}</h4>
              <h4 className='line-clamp-1'>{item.notes}</h4>
            </div>
          </div>
        ))}

        
      </div>

    </section>
  )
}
