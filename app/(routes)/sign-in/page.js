'use client'

import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

export default function SignIn() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    // const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    // const handleSignUp = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const res = await signInWithEmailAndPassword(email, password)
    //         .then((userCredential) => {
    //             dispatch(setUser(userCredential.user.email))
    //         })
    //         // console.log(res);
    //         setEmail('');
    //         setPassword('');
    //         router.push('/');


    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    const handleLogin = async (e) => {
        e.preventDefault();

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
            // .then(async (data) => {
            //     const {userName, userId} = await data.json() || null;
            //     dispatch(setUser({userId: userId, userName: userName}));
            //     router.push('/');
            // })
            // .catch((err) => {
            //     console.log(err);
            //     dispatch(setUser(null));
            // });

            const res = await user.json();


            if(res.message === 'Login successful') {
                dispatch(setUser({userId: res.userId, userName: res.userName, userEmail: res.userEmail}));
                router.push('/');;

            } else {
                alert(res.message);
            }

            console.log(user, 'logged in user from async');

        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div>

        <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5'>Sign-In</h1>
        </div>

        <form onSubmit={(e) => handleLogin(e)} className='w-full lg:w-3/4 mx-auto px-9 py-8 md:text-2xl'>

            <div className="mb-4">
                <label htmlFor="eMail" className="block text-lg font-medium text-white mb-2">E-mail</label>

                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@example.com' maxLength={30} id="eMail" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-lg font-medium text-white mb-2">Passord</label>

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='password' maxLength={30} id="password" name="ReservationName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <button type='submit' className='w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors duration-300'>Sign-In</button>
            </div>
        </form>

        <div>
            <h3 className='text-white text-center'>Don't have an account? <span className='text-amber-200 hover:text-amber-500 transition-colors'> <Link href='/sign-up'>create an account</Link> </span> </h3>
        </div>

    </div>
  )
}