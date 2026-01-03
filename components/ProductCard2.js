"use client"

import react from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/cartSlice';
import PopupMessage from './popupNotifications/PopupMessage';

export default function ProductCard2({product}) {

    const [popup, setPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');

    const user = useSelector((state) => state.auth.user);
    const cartList = useSelector((state) => state.cart);
    const router = useRouter();
    const dispatch = useDispatch();

    const {image, productName, description, price} = product;

    const handleAddToCart = () => {
        setPopup(true);

        if(user === null) {
            setPopupTitle('Please sign-in to add items to your cart.');

        } else {
            const setProduct = {
                cartId: (Math.random()*12853).toFixed() + Date.now().toString().slice(-5),
                name: productName,
                price: price,
                quantity: 1,
                description: description,
                image: image
            }
            dispatch(addToCart(setProduct));
            setPopupTitle('Item Added to cart');
        }
    }

    const ClosePopup = () => {
        if(user === null) {
            router.push('/sign-in');
        }
        setPopup(false);
    }

    return(
        <div className="w-full h-96 px-3 py-4 bg-amber-700 flex flex-col items-center justify-center gap-5 rounded-4xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">

            { popup ? <PopupMessage title={popupTitle} message='' CloseFunc={() => ClosePopup()} /> : null }

            <div className="w-2/3 h-48 rounded-4xl overflow-hidden object-cover">
                <img src={image} alt={productName} width={960} height={540} className="object-cover w-full h-full"/>
            </div>

            <div className="text-black text-center py-2">
                <h1 className="text-3xl">{productName}</h1>
                <p className="text-lg text-wrap text-justify p-4">{description}</p>
                <div className="flex justify-center items-center gap-10">
                    <h3 className="text-2xl font-bold">{`$${price}`}</h3>
                    <button onClick={() => handleAddToCart()} className="text-lg bg-amber-400 py-2 px-4 rounded-3xl hover:text-xl hover:bg-amber-600 duration-300 ease-in-out">Add to Cart</button>
                </div>
            </div>

        </div>
    )
}