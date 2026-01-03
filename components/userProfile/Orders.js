"use client"

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { GetCustomerOrders } from '@/actions/CustomerDetails'
import LoaderSpin from '../LoaderSpin'

export default function Orders() {
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    async function GetOrders() {

      const {plainOrder, message} = await GetCustomerOrders(user.userId);
  
      console.log(plainOrder, 'user order')
  
      if(message === 'Orders success') {
        setOrders(plainOrder);
      } else {
        alert('Please check your connection');
      }

      setIsLoading(false);
    }

    GetOrders()
  }, []);


  return (
    <div className='p-3 max-h-screen overflow-y-auto'>
        <h1 className='text-center text-2xl font-bold'>Orders</h1>

        <div className='flex flex-col gap-10 py-1 px-2 mt-3'>
          {
            isLoading ? <LoaderSpin /> : null
          }

          {
            orders.length === 0 && !isLoading ? <h1 className='text-center text-xl'>You have no orders yet.</h1> : orders.map((order) => (
              <div key={order._id}>
                <div className='flex items-center gap-10'>
                  <h1>{order.updatedAt}</h1>
                  <h1>Status: {order.status}</h1>
                </div>
                <div>
                  {
                    order.order.map((item) => (
                      <div key={item.cartId} className='grid grid-cols-[2fr_1fr_1fr] border-b-2 border-zinc-300 px-5 py-3'>
                        <h1>{item.name}</h1>
                        <h3>Quantity: {item.quantity}</h3>
                        <h3>Unit price: ${item.price}</h3>
                      </div>
                    ))
                  }
                </div>
                <div className='text-right px-5 py-3 text-md'>
                  <h1>Total: ${order.billingAmount}</h1>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}
