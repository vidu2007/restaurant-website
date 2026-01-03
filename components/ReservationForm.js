"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import PopupMessage from './popupNotifications/PopupMessage';

export default function ReservationForm() {

    const router = useRouter();

    const user = useSelector((state) => state.auth.user);

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

    useEffect(() => {
        if(user === null) {
            alert('please sign-in to continue');
            router.push('/sign-in');
        }
    }, [])

    // const PopupMessage = dynamic(() => import('./popupNotifications/PopupMessage'), {
    //     loading: () => <p>Loading...</p>,
    //     ssr: false,
    //     error: (err) => <p>Error loading popup</p>,
    // });

    const data = {
        userId: user.userId,
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
            });

            const {message, title} = await res.json();
            console.log('Reservation submitted successfully:', message);
            setResponseTitle(title);
            setResponseMessage(message);
            setPopupVisible(true);
        }
        catch(err) {
            console.log('Error submitting reservation:', err);
            setResponseTitle('Error!');
            setResponseMessage('There was an error submitting your reservation. Please check your connection.');
            setPopupVisible(true);
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
                <select id='title' required className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white' onChange={(e) => setTitle(e.target.value)}>
                    <option className='bg-amber-950' value='Mr.'>Mr.</option>
                    <option className='bg-amber-950' value='Ms.'>Ms.</option>
                    <option className='bg-amber-950' value='Mrs.'>Mrs.</option>
                    <option className='bg-amber-950' value='Dr.'>Dr.</option>
                    <option className='bg-amber-950' value='Prof.'>Prof.</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="ReservationName" className="block text-lg font-medium text-white mb-2">Name</label>

                <input type="text" onChange={(e) => setReservationName(e.target.value)} required placeholder='Lewis Hamilton' maxLength={30} id="ReservationName" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="ContactNumber" className='block text-lg font-medium text-white mb-2' >Contact number</label>
                <input type='tel' onChange={(e) => setContactNumber(e.target.value)} required placeholder='0999999999' minLength={10} maxLength={10} id="ContactNumber" name="ContactNumber" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Date" className='block text-lg font-medium text-white mb-2' >Date</label>
                <input type='date' onChange={(e) => setDate(e.target.value)} required id="Date" name="Date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Time" className='block text-lg font-medium text-white mb-2' >Time</label>
                <input type='time' onChange={(e) => setTime(e.target.value)} required id="Time" name="Time" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Guests" className='block text-lg font-medium text-white mb-2' >Number of Guests</label>
                <input type='number' onChange={(e) => setGuests(e.target.value)} required placeholder='1' min={0} max={40} id="Guests" name="Guests" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="Notes" className='block text-lg font-medium text-white mb-2' >Notes</label>
                <textarea type='text' onChange={(e) => setNotes(e.target.value)} placeholder='Special requests, allergies, etc' rows={5} maxLength={200} id="Notes" name="Notes" className="w-full px-3 py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-wrap text-white placeholder-text-white"/>
            </div>

            <div className='my-10 w-2/3'>
                <button type='submit' className='w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors duration-300'>Submit Reservation</button>
            </div>
        </form>
    </section>
  )
}