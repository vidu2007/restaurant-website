'use client'

import React from 'react'
import { useSelector } from 'react-redux'

export default function Products() {
    const cartItems = useSelector((state) => state.cart);
    console.log(cartItems);
  return (
    <div>Products</div>
  )
}
