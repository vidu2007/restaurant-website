"use client"

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { GetCustomerOrders } from '@/actions/CustomerDetails'
import LoaderSpin from '../LoaderSpin'

export default function Orders() {
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(Array);

  useEffect(() => {

    async function GetOrders() {

      const { plainOrder, message } = await GetCustomerOrders(user.userId);

      if (message === 'Orders success') {
        setOrders(plainOrder);
      } else {
        alert('Please check your connection');
      }

      setIsLoading(false);
    }

    GetOrders();
  }, []);

  return (
    <div className="p-3 text-amber-100">
      <h1 className="text-center text-2xl font-bold">Orders</h1>

      <div className="flex flex-col gap-8 py-2 px-2 mt-3">

        {isLoading && <LoaderSpin />}

        {orders.length === 0 && !isLoading ? (
          <h1 className="text-center text-xl">You have no orders yet.</h1>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-amber-800/40 rounded-xl p-3">

              {/* ORDER HEADER */}
              <div className=" flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-10">
                <h1 className="text-sm lg:text-base">
                  {order.updatedAt}
                </h1>
                <h1 className="font-semibold">
                  Status: {order.status}
                </h1>
              </div>

              {/* ORDER ITEMS */}
              <div className="mt-3">
                {order.order.map((item) => (
                  <div key={item.cartId + order._id} className=" grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] border-b-2 border-zinc-300 px-3 py-3">
                    <h1 className="font-medium">
                      {item.name}
                    </h1>

                    <h3>
                      Quantity: {item.quantity}
                    </h3>

                    <h3 className="lg:text-right">
                      Unit price: ${item.price}
                    </h3>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="text-right px-3 py-3 text-md font-semibold">
                <h1>Total: ${order.billingAmount}</h1>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  )
}
