"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function ReservationForm() {

    const router = useRouter();

    const [title, setTitle] = useState('Mr.');
    const [reservationName, setReservationName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState('');
    const [notes, setNotes] = useState('');

    const [responseTitle, setResponseTitle] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const [PopupVisible, setPopupVisible] = useState(false);

    const PopupMessage = dynamic(() => import('./popupNotifications/PopupMessage'), {
        loading: () => <p>Loading...</p>,
        ssr: false
    });

    const data = {
        title: title,
        reservationName: reservationName,
        contactNumber: contactNumber,
        date: date,
        time: time,
        guests: guests,
        notes: notes
    }

    const ClosePopup = () => {
        setPopupVisible(false);
        router.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data}),
                cache: 'no-store'
            })
            .then(async (data) => {
                setPopupVisible(true);
                const {message, title} = await data.json();
                console.log('Reservation submitted successfully:', message);
                setResponseTitle(title);
                setResponseMessage(message);
            })
            .catch((err) => console.log(err));
        }
        catch(err) {
            console.log('Error submitting reservation:', err);
        }
    }


  return (
    <section>

        {
            PopupVisible ? <PopupMessage message={responseMessage} title={responseTitle} CloseFunc={ClosePopup}/> : null
        }

        <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5'>Make a Reservation</h1>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className='w-full lg:w-3/4 mx-auto px-9 py-8 md:text-2xl'>
            <div className='mb-4'>
                <label htmlFor='title' className='block text-lg font-medium text-white mb-2'>Title</label>
                <select id='title' required className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setTitle(e.target.value)}>
                    <option value='Mr.'>Mr.</option>
                    <option value='Ms.'>Ms.</option>
                    <option value='Mrs.'>Mrs.</option>
                    <option value='Dr.'>Dr.</option>
                    <option value='Prof.'>Prof.</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="ReservationName" className="block text-lg font-medium text-white mb-2">Name</label>

                <input type="text" onChange={(e) => setReservationName(e.target.value)} required placeholder='Lewis Hamilton' maxLength={30} id="ReservationName" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="ContactNumber" className='block text-lg font-medium text-white mb-2' >Contact number</label>
                <input type='tel' onChange={(e) => setContactNumber(e.target.value)} required placeholder='0999999999' minLength={10} maxLength={10} id="ContactNumber" name="ContactNumber" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Date" className='block text-lg font-medium text-white mb-2' >Date</label>
                <input type='date' onChange={(e) => setDate(e.target.value)} required id="Date" name="Date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Time" className='block text-lg font-medium text-white mb-2' >Time</label>
                <input type='time' onChange={(e) => setTime(e.target.value)} required id="Time" name="Time" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Guests" className='block text-lg font-medium text-white mb-2' >Number of Guests</label>
                <input type='number' onChange={(e) => setGuests(e.target.value)} required placeholder='1' min={1} max={20} id="Guests" name="Guests" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Notes" className='block text-lg font-medium text-white mb-2' >Notes</label>
                <textarea type='text' onChange={(e) => setNotes(e.target.value)} placeholder='Special requests, allergies, etc' rows={5} maxLength={200} id="Notes" name="Notes" className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-wrap"/>
            </div>

            <div className='my-10 w-2/3'>
                <button type='submit' className='w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors duration-300'>Submit Reservation</button>
            </div>
        </form>
    </section>
  )
}