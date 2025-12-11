'use client'

import React from 'react';

export default function PopupMessage({title, message, CloseFunc}) {

  return (
    <div style={{backgroundColor: 'rgba(0, 0, 0, 0)'}} className='fixed top-0 bottom-0 left-0 right-0 z-50 w-screen h-screen flex flex-col justify-center items-center'>
        <div style={{backgroundColor: 'rgba(133, 47, 28, 52)'}} className='flex flex-col w-3/4 md:w-1/2 rounded-lg lg:rounded-2xl border-white border-2 px-5 py-3 md:py-5 justify-center items-center gap-2 md:gap-5'>
            <h1 className='text-lg md:text-xl text-white font-bold'>{`${title}`}</h1>
            <p className='text-md: md:text-lg text-center text-white'>{`${message}`}</p>
            <button onClick={() => CloseFunc()} style={{backgroundColor: 'rgba(216, 63, 32, 85)'}} className='text-lg md:text-xl rounded-md border-zinc-950 py-1 px-4'>OK</button>
        </div>
    </div>
)}