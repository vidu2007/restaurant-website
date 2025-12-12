'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import ProductCard2 from '@/components/ProductCard2'

export default function page() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const res = await fetch('/api/products', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-store"
      })
      .then(async (data) => {
        const {productList} = await data.json();
        setProducts(productList);
      })
    }

    FetchData();
  }, []);

  // const productList = [
  //     {
  //       id: 1,
  //       productName: 'Margherita Pizza',
  //       description: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil.',
  //       price: 12.99,
  //       image: "https://cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg"
  //     },
  //     {
  //       id: 2,
  //       productName: 'Caesar Salad',
  //       description: 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',
  //       price: 8.99,
  //       image: "https://mokasusa.com/wp-content/uploads/2022/09/Mokas_ClassicChickenCaesarSalad_7848.jpg"
  //     },
  //     { id: 3,
  //       productName: 'Spaghetti Carbonara',
  //       description: 'Traditional Italian pasta with eggs, cheese, pancetta, and pepper.',
  //       price: 14.99,
  //       image: "https://www.allrecipes.com/thmb/axhH9DPkfGYBPooMrwmyUqP4sEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/245775-spaghetti-alla-carbonara-the-traditional-italian-recipe-DDMFS-4x3-879c32ee3cfb463582e3e6230e311029.jpg"
  //     },
  //     {
  //       id: 4,
  //       productName: 'Margherita Pizza',
  //       description: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil.',
  //       price: 12.99,
  //       image: "https://cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg"
  //     },
  //     {
  //       id: 5,
  //       productName: 'Caesar Salad',
  //       description: 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',
  //       price: 8.99,
  //       image: "https://mokasusa.com/wp-content/uploads/2022/09/Mokas_ClassicChickenCaesarSalad_7848.jpg"
  //     },
  //     { id: 6,
  //       productName: 'Spaghetti Carbonara',
  //       description: 'Traditional Italian pasta with eggs, cheese, pancetta, and pepper.',
  //       price: 14.99,
  //       image: "https://www.allrecipes.com/thmb/axhH9DPkfGYBPooMrwmyUqP4sEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/245775-spaghetti-alla-carbonara-the-traditional-italian-recipe-DDMFS-4x3-879c32ee3cfb463582e3e6230e311029.jpg"
  //     }
  //   ]

  return (
    <section>
      <div>
        <h1 className='text-4xl font-bold text-center py-6 bg-amber-950 text-amber-200'>Our Menu</h1>
      </div>
      <div className='grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-3 gap-4 justify-center items-center bg-amber-950'>
        {
          products.map((product) => (
            <ProductCard2 key={product.id} product={product} />
          ))
        }
      </div>
    </section>
  )
}
