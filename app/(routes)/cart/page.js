"use client"

import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '@/components/CartProduct'  

export default function page() {

    const cartItems = useSelector((state) => state.cart);
    console.log(cartItems);

  return (
    <section className='text-black p-0'>
        <div>
            <h1 className='text-4xl font-bold text-center py-6 bg-amber-950 text-amber-200'>Cart</h1>

            {cartItems.length === 0 ? (
                <h1 className='text-3xl font-bold text-center py-6 bg-amber-950 text-amber-200'>Your cart is empty</h1>
            ) : (
                <div className='flex flex-col gap-4 px-5'>
                {cartItems.map((item) => (
                    <CartProduct key={item.cartId} productName={item.name} productPrice={item.price} productId={item.cartId} productQuantity={item.quantity} />
                    
                ))}
                </div>
            )}


        </div>
    </section>
  )
}