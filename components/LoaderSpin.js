import React from 'react'

export default function LoaderSpin() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='h-20 w-20 border-4 border-y-zinc-800 border-x-zinc-700 animate-spin rounded-full'></div>
    </div>
  )
}