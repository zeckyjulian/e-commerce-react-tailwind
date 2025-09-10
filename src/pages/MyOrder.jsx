import React from 'react'
import Head from '../components/Head'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

export const MyOrder = () => {
  return (
    <div className="bg-white">
      <Head />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">My Order</h1>

        {/* Produk */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
            <div className='flex justify-start gap-2'>
                <ShoppingBag size={18} />
                <p className="text-sm font-bold">Order</p>
                <p className="text-sm font-normal">27 Juli 2025</p>
                <p className="text-sm font-semibold rounded bg-green-100 text-green-800 px-2">Status</p>
            </div>
          <ul className="divide-y divide-gray-200">
              <li className="flex py-4">
                <img
                  src="public/images/example.jpg"
                  alt=""
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="ml-4 flex flex-col justify-between">
                  <p className="font-medium">Produk 1</p>
                  <p className="text-sm text-gray-500">
                    black | L
                  </p>
                  <p className="text-sm">Qty: 1</p>
                </div>
                <p className="ml-auto font-semibold">$ 40.00</p>
              </li>
          </ul>
          <div className='flex justify-end'>
            <Link to={`/detail`}>
                <button className="rounded-md me-2 bg-sky-600 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 hover:bg-sky-700">
                Detail
                </button>
            </Link>
            <Link to={`/cart`}>
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 hover:bg-indigo-700">
                Buy Again
                </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
