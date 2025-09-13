import React, { useEffect, useState } from 'react'
import Head from '../components/Head'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { getOrders } from '../api/orders'
import { Loading } from '../components/Loading'
import { Forbidden } from './Forbidden'

export const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return
    }

    setIsLoggedIn(true);

    const fetchData = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />
  }

  if (!isLoggedIn) {
    return <Forbidden />
  }

  return (
    <div className="bg-white">
      <Head />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">My Order</h1>
        {orders.length === 0 ? (
          <p className='text-gray-500'>Belum ada order.</p>
        ) : (
          orders.map((order) => (
              <div key={order.id} className="bg-gray-50 p-6 rounded-lg shadow mb-8">
                  <div className='flex justify-start gap-2'>
                      <ShoppingBag size={18} />
                      <p className="text-sm font-bold">Order</p>
                      <p className="text-sm font-normal">{order.date_of_buy}</p>
                      <p className="text-sm font-semibold rounded bg-green-100 text-green-800 px-2">{order.status}</p>
                  </div>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li className="flex py-4">
                      <img
                        src={`http://localhost:8000/products/${item.product.image}`}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="ml-4 flex flex-col justify-between">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.product.color} | {item.size?.size_name}
                        </p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="ml-auto font-semibold">$ {item.price}</p>
                    </li>
                  ))}
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
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}
