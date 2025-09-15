import React, { useState } from 'react'
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div className='col-span-12 p-4 rounded border border-stone-300 overflow-x-auto'>
            <div className='mb-4 flex items-center justify-between flex-wrap gap-2'>
                <h3 className='flex items-center gap-1.5 font-medium'>
                    <FiDollarSign /> All Products
                </h3>
                <Link to={`admin/input-product`}>
                    <button className='flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'>
                        Input Product
                    </button>
                </Link>
            </div>
            <table className='w-full table-auto'>
                <TableHead />

                <tbody>
                    <TableRow
                        cusId="#48149"
                        sku="Pro 1 Month"
                        date="Aug 2nd"
                        price="$9.75"
                        status="Shipping"
                        order={1}
                    />
                </tbody>
            </table>
        </div>
    )
}

const TableHead = () => {
    return (
        <thead>
            <tr className='text-sm font-normal text-stone-500'>
                <th className='text-start p-1.5'>Customer</th>
                <th className='text-start p-1.5'>SKU</th>
                <th className='text-start p-1.5'>Date</th>
                <th className='text-start p-1.5'>Price</th>
                <th className='text-start p-1.5'>Status</th>
                <th className='text-start p-1.5'>Action</th>
            </tr>
        </thead>
    )
}

const TableRow = ({
        cusId,
        sku,
        date,
        price,
        status,
        order,
    }) => {
    return (
        <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
            <td className="p-1.5">{cusId}</td>
            <td className="p-1.5">{sku}</td>
            <td className="p-1.5">{date}</td>
            <td className="p-1.5">{price}</td>
            <td className="p-1.5">{status}</td>
            <td className="p-1.5">
                <Link to={`/admin/detail/id`}>
                    <button className="inline-block rounded-md mb-1 border border-transparent bg-indigo-600 px-2 py-2 text-center font-medium text-white hover:bg-indigo-700 mr-1">
                        Edit
                    </button>
                </Link>
                <Link to={`/admin/delete/id`}>
                    <button className="inline-block rounded-md border border-transparent bg-red-500 px-2 py-2 text-center font-medium text-white hover:bg-red-700">
                        Delete
                    </button>
                </Link>
            </td>
        </tr>
    )
}
