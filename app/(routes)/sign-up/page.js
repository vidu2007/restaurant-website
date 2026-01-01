"use client"

import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/authSlice';
import { useRouter } from 'next/navigation';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

export default function SignUp() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const router = useRouter();

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    // const handleSignUp = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const res = await createUserWithEmailAndPassword(email, password)
    //         .then((userCredentials) => {
    //             dispatch(setUser(res.user.email))
    //         })
    //         // console.log(res);
    //         setEmail('');
    //         setPassword('');
    //         router.push('/');


    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const newUser = await fetch('/api/register', {
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
            })
            .then(async (data) => {
                const {message} = await data.json();
                console.log(message);
            })
            .catch((err) => console.log(err));
            
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div>

        <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5'>Sign-Up</h1>
        </div>

        <form onSubmit={(e) => handleRegister(e)} className='w-full lg:w-3/4 mx-auto px-9 py-8 md:text-2xl'>
            <div className="mb-4">
                <label htmlFor="UserName" className="block text-lg font-medium text-white mb-2">Username</label>

                <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" required placeholder='Lewis Hamilton' maxLength={30} id="UserName" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="eMail" className="block text-lg font-medium text-white mb-2">E-mail</label>

                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@example.com' maxLength={30} id="eMail" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-lg font-medium text-white mb-2">Password</label>

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='password' maxLength={30} id="password" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <button type='submit' className='w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors duration-300'>Sign-Up</button>
            </div>
        </form>
    </div>
  )
}
