"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/app/store/cartSlice';

export default function CartProduct({productName, productPrice, productId, productQuantity}) {

    const dispatch = useDispatch();

    const [pId, setPId] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setProduct(productName);
        setPrice(productPrice);
        setPId(productId);
        setQuantity(productQuantity);

        console.log(productName)
    }, []);

    const handleIncrement = () => {
        dispatch(increaseQuantity(pId));
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if(quantity === 1) {
            dispatch(removeFromCart(pId));
            
        } else {
            dispatch(decreaseQuantity(pId));
            setQuantity(quantity - 1);
        }
    };

    const handleDelete = () => {
        dispatch(removeFromCart(pId));
    };


  return (
    <>
    {/* Desktop devices (lg) */}
    <div className='hidden w-2/3 lg:grid grid-cols-3 justify-center items-center text-center mx-auto py-5 text-white rounded-full border-white border-2'>
        <div>
            <h1 className='text-2xl'>{product}</h1>
        </div>
        <div className='flex justify-center items-center gap-5'>
            <div onClick={() => handleIncrement()} className="text-white">
                {/* plus sign */}
                <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 448 512" strokeWidth={1}><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>
            </div>
            <h3 className='text-lg font-bold'>{quantity}</h3>
            <div onClick={() => handleDecrement()} className='text-white'>
                {/* minus sign */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512"><path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>
            </div>
            <div onClick={() => handleDelete()} className='text-red-500'>
                <svg className="w-6 h-6" fill='currentColor' viewBox="0 0 448 512" strokeWidth={1}><path d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/></svg>
            </div>
        </div>
        <div>
            <h1 className='text-xl font-bold'>{`Rs.${price}`}</h1>
        </div>
    </div>

    {/* Mobile devices */}

    <div className='lg:hidden w-full flex flex-col gap-3 justify-center items-center text-center mx-auto px-3 py-5 text-white rounded-full border-white border-2'>
        <div>
            <h1 className='text-2xl'>{product}</h1>
        </div>
        <div className='grid grid-cols-2'>
            <div className='flex justify-center items-center gap-5'>
                <div onClick={() => handleIncrement()} className="text-white">
                    {/* plus sign */}
                    <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 448 512" strokeWidth={1}><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>
                </div>
                <h3 className='text-lg font-bold'>{quantity}</h3>
                <div onClick={() => handleDecrement()} className='text-white'>
                    {/* minus sign */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512"><path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>
                </div>
                <div onClick={() => handleDelete()} className='text-red-500'>
                    <svg className="w-6 h-6" fill='currentColor' viewBox="0 0 448 512" strokeWidth={1}><path d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/></svg>
                </div>
            </div>
            <div>
                <h1 className='text-xl font-bold'>{`Rs.${price}`}</h1>
            </div>
        </div>
    </div>
    </>

  )
}