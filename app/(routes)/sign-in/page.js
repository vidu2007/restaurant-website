'use client'

import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/authSlice';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

export default function SignIn() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const res = await signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                dispatch(setUser(userCredential.user.email))
            })
            // console.log(res);
            setEmail('');
            setPassword('');
            router.push('/');


        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div>

        <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5'>Sign-In</h1>
        </div>

        <form className='w-full lg:w-3/4 mx-auto px-9 py-8 md:text-2xl'>

            <div className="mb-4">
                <label htmlFor="eMail" className="block text-lg font-medium text-white mb-2">E-mail</label>

                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@example.com' maxLength={30} id="eMail" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-lg font-medium text-white mb-2">Passord</label>

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='password' maxLength={30} id="password" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <button type='submit' onClick={(e) => handleSignUp(e)} className='w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors duration-300'>Sign-In</button>
            </div>
        </form>
    </div>
  )
}