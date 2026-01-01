import React from 'react';
import LoaderSpin from '../LoaderSpin';
import { LogOutUser } from '@/actions/Auth';
import { clearUser } from '@/app/store/authSlice';
import { useDispatch } from 'react-redux';

export default function Logout() {

    const dispatch = useDispatch();

  return (
    <section className='flex flex-col justify-center items-center gap-5'>
        <h1>Logging out...</h1>
        <h3>Please wait</h3>
        <LoaderSpin/>
        {
            dispatch(clearUser()) && LogOutUser()

        }
    </section>
  )
}
