"use client"

import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/authSlice';
import { useRouter } from 'next/navigation';
import PopupMessage from '@/components/popupNotifications/PopupMessage';

export default function SignUp() {

    const router = useRouter();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');


    const PopupClose = () => {
        setPopup(false);

        if (popupTitle === 'Success') {
            router.push('/user');

        } else {
            setPopup(false);
            setPopupMessage('');
            setPopupTitle('');
            setIsLoading(false);
            router.refresh();
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    userName: userName,
                }),
                cache: 'no-store',
            });
           
            const newUser = await res.json();
            console.log(newUser);

            if (newUser.message === 'Profile registered successfully') {
                dispatch(setUser({userId: newUser.userId, userName: newUser.userName, userEmail: newUser.userEmail}));
                setPopupTitle('Success');
            } else {
                setPopupTitle('Error during registration');
            }
            
            setPopupMessage(newUser.message);
            setEmail('');
            setPassword('');
            setUserName('');
            setPopup(true);
            
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div>

        {popup ? <PopupMessage title={popupTitle} message={popupMessage} CloseFunc={() => PopupClose()} /> : null}

        <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5'>Sign-Up</h1>
        </div>

        <form onSubmit={(e) => handleRegister(e)} className='w-full lg:w-3/4 mx-auto px-9 py-8 md:text-2xl'>
            <div className="mb-4">
                <label htmlFor="UserName" className="block text-lg font-medium text-white mb-2">Username</label>

                <input value={userName} disabled={isLoading} onChange={(e) => setUserName(e.target.value)} type="text" required placeholder='Lewis Hamilton' maxLength={30} id="UserName" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="eMail" className="block text-lg font-medium text-white mb-2">E-mail</label>

                <input type='email' disabled={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@example.com' maxLength={30} id="eMail" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-lg font-medium text-white mb-2">Password</label>

                <input type="password" disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='password' maxLength={30} id="password" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <button type='submit' disabled={isLoading} className='w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors duration-300'>{isLoading ? 'Please wait...' : 'Sign-Up'}</button>
            </div>
        </form>
    </div>
  )
}
