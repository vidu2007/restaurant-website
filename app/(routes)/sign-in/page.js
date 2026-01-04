"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PopupMessage from '@/components/popupNotifications/PopupMessage';

export default function SignIn() {

    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const [popup, setPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const AuthMessage = searchParams.get('message');

    useEffect(()=> {
        if(AuthMessage === 'unauthorized'){
            setPopupTitle('Please sign-in to continue');
            setPopup(true);
        }

    }, [AuthMessage])

    const PopupClose = () => {
        setPopup(false);
        
        if (popupTitle === 'Success') {
            router.push('/');
        } else {
            setPopup(false);
            setPopupMessage('');
            setPopupTitle('');
            setIsLoading(false);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await fetch('/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: 'include',
                cache: 'no-store',
            })

            const res = await user.json();


            if(res.message === 'Login successful') {
                dispatch(setUser({userId: res.userId, userName: res.userName, userEmail: res.userEmail}));
                setPopupTitle('Success');

            } else {
                setPopupTitle('!');
            }
            
            setPopupMessage(res.message);
            setEmail('');
            setPassword('');
            setPopup(true);

            console.log(user, 'logged in user from async');

        } catch(err) {
            console.log(err);
            setPopup(true);
            setPopupTitle('Error while connecting');
            setPopupMessage('Please check your connection');
            setEmail('');
            setPassword('');
        }

        // setIsLoading(false);
    }

  return (
    <div>

        {/* <Suspense><AuthMessage /></Suspense> */}
        
        { popup ? <PopupMessage title={popupTitle} message={popupMessage} CloseFunc={() => PopupClose()} /> : null }

        <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5'>Sign-In</h1>
        </div>

        <form onSubmit={(e) => handleLogin(e)} className='w-full lg:w-3/4 mx-auto px-9 py-8 md:text-2xl'>

            <div className="mb-4">
                <label htmlFor="eMail" className="block text-lg font-medium text-white mb-2">E-mail</label>

                <input type='email' disabled={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@example.com' maxLength={30} id="eMail" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-lg font-medium text-white mb-2">Passord</label>

                <input type="password" disabled={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='password' maxLength={30} id="password" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <button type='submit' disabled={isLoading} className='w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors duration-300'>{isLoading ? 'Signing in...' : 'Sign-In'}</button>
            </div>
        </form>

        <div>
            <h3 className='text-white text-center'>Don't have an account? <span className='text-amber-200 hover:text-amber-500 transition-colors'> <Link href='/sign-up'>create an account</Link> </span> </h3>
        </div>

    </div>
  )
}