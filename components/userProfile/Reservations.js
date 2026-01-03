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

      await res.json();
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

  return (
    <section className="p-3 w-full text-amber-100">
      <div className="mb-4">
        <h1 className="text-center text-2xl font-bold mb-5">Reservations</h1>
        <Link href="/reservations" className="text-lg border-amber-700 border-2 rounded-full py-0.5 px-2 lg:py-1 lg:px-3 hover:text-amber-200">New reservation</Link>
      </div>

      <div className="flex flex-col gap-4 py-4">

        {isLoading && <LoaderSpin />}

        {reservations.length === 0 && !isLoading && (
          <h1 className="text-2xl text-center">No reservations found</h1>
        )}

        {reservations.map((item) => (
          <div key={item._id} className="bg-amber-800 p-4 rounded-xl"
          >
            {/* TOP ROW */}
            <div className=" flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-5">
              <h1 className="text-lg lg:text-xl">
                {item.date.split('T')[0]} at {item.time}
              </h1>

              <h1 className="text-lg lg:text-xl font-bold">
                {item.title} {item.reservationName}
              </h1>

              <div className="flex gap-4 lg:ml-auto lg:mr-10">
                <h3 className="text-lg text-amber-200">{setStatus(item.status)}</h3>

                <h3 onClick={() => handleCancel(item._id)} className="text-lg cursor-pointer border-2 border-amber-700 rounded-full py-0.5 px-2 hover:text-amber-200">Cancel</h3>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className=" flex flex-col gap-1 mt-2 lg:flex-row lg:gap-5">
              <h4 className="min-w-24">
                Guests: {item.guests}
              </h4>

              <h4 className="line-clamp-2 lg:line-clamp-1">
                {item.notes}
              </h4>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
