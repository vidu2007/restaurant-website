"use client"

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { clearCart } from '@/app/store/cartSlice'
import CartProduct from '@/components/CartProduct'
import PopupMessage from '@/components/popupNotifications/PopupMessage'

export default function page() {

    const router = useRouter();
    const dispatch = useDispatch();

    const [popup, setPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');

    const [billingAmount, setBillingAmount] = useState(0);

    const cartItems = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    console.log(cartItems);

    useEffect(() => {
        if(user === null) {
            alert('Please sign-in to continue');
            router.push('/sign-in');
        }
    }, [])

    useEffect(() => {
        const totalAmount = cartItems.reduce((total, item) => {
            return total + (item.price * 100 * item.quantity);
        }, 0);
        setBillingAmount((totalAmount / 100).toFixed(2));
    }, [cartItems])

    const handlePlaceOrder = async () => {
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.userId,
                    order: cartItems,
                    billingAmount: billingAmount,
                }),
            });

            const {message} = await res.json();
            setPopupTitle(message);
            setPopup(true);
            console.log(message);

        } catch(err) {
            console.log(err);
            setPopupTitle('Error Occured. Please try again');
        }
    }

    const handleClose = () => {
        if(popupTitle === 'Order placed successfully') {
            dispatch(clearCart());
        }

        setPopup(false);
    }

  return (
    <section className='text-black p-0'>

        {
            popup ? <PopupMessage title={popupTitle} message='' CloseFunc={() => handleClose()}/> : null
        }

        <div>
            <h1 className='text-4xl font-bold text-center py-6 bg-amber-950 text-amber-200'>Cart</h1>

            {cartItems.length === 0 ? (
                <h1 className='text-3xl font-bold text-center py-6 bg-amber-950 text-amber-200'>Your cart is empty</h1>
            ) : (<>
                <div className='flex flex-col gap-4 px-5'>
                {cartItems.map((item) => (
                    <CartProduct key={item.cartId} productName={item.name} productPrice={item.price} productId={item.cartId} productQuantity={item.quantity} />
                    
                ))}
                </div>

                <div className='flex gap-5 justify-end items-center p-5 my-5'>
                    <h1 className='text-white text-lg'> Total: ${billingAmount}</h1>
                    <button onClick={() => handlePlaceOrder()} className='text-white text-lg bg-amber-600 rounded-full px-3 py-1'>Place order</button>
                </div>
                </>
            )}

        </div>
    </section>
  )
}