import React, { useEffect, useState } from 'react'
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getAllOrders } from '../../../api/orders';
import { Loading } from '../../Loading';

export const RecentTransactions = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
            } catch (err) {
                console.error("Error fetching data: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='col-span-12 p-4 rounded border border-stone-300 overflow-x-auto'>
            <div className='mb-4 flex items-center justify-between flex-wrap gap-2'>
                <h3 className='flex items-center gap-1.5 font-medium'>
                    <FiDollarSign /> Recent Transactions
                </h3>
                <Link to={`/admin/order`}>
                    <button className='flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'>
                        See all
                    </button>
                </Link>
            </div>
            <table className='w-full table-auto'>
                <TableHead />

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4">
                                <Loading />
                            </td>
                        </tr>
                    ) : orders.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-stone-500">
                                No transaction
                            </td>
                        </tr>
                    ) : (
                        orders.slice(0, 5).map((order, index) => (
                            <TableRow
                                key={order.id}
                                no={index + 1}
                                cusName={order.user?.name}
                                productName={order.items?.map(item => `${item.product.product_name} (${item.size?.size_name})`).join(", ")}
                                payMethod={order.payment_method}
                                shipping={order.shipping_address}
                                total={order.total}
                                status={order.status}
                                date={order.date_of_buy}
                                order={index}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

const TableHead = () => {
    return (
        <thead>
            <tr className='text-sm font-normal text-stone-500'>
                <th className='text-start p-1.5'>#</th>
                <th className='text-start p-1.5'>Customer Name</th>
                <th className='text-start p-1.5'>Product Name</th>
                <th className='text-start p-1.5'>Payment Method</th>
                <th className='text-start p-1.5'>Shipping Address</th>
                <th className='text-start p-1.5'>Total</th>
                <th className='text-start p-1.5'>Status</th>
                <th className='text-start p-1.5'>Date</th>
            </tr>
        </thead>
    )
}

const TableRow = ({
        no,
        cusName,
        productName,
        payMethod,
        shipping,
        total,
        status,
        date,
        order,
    }) => {
    return (
        <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
            <td className="p-1.5">{no}</td>
            <td className="p-1.5">{cusName}</td>
            <td className="p-1.5">{productName}</td>
            <td className="p-1.5">{payMethod}</td>
            <td className="p-1.5">{shipping}</td>
            <td className="p-1.5">{total}</td>
            <td className="p-1.5">{status}</td>
            <td className="p-1.5">{date}</td>
        </tr>
    )
}
