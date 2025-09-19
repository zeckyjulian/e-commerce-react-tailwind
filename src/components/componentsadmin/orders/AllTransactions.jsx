import React, { useEffect, useState } from 'react'
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getAllOrders, updateOrder } from '../../../api/orders';
import { Loading } from '../../Loading';
import { OrderModal } from './OrderModal';
import { Toast } from '../../Toast';

export const AllTransactions = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [toast, setToast] = useState(null);

    const fetchOrder = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            console.error("Error fetching data: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrder(); }, []);

    const handleOpenDetail = (order) => {
        setOrderData(order);
        setModalOpen(true);
    }

    const handleSubmitOrder = async () => {
        try {
            await updateOrder(orderData.id, orderData.status);
            console.log("Order status updated successfully: ", orderData);
            setToast({
                message: "Order status updated successfully!",
                type: "success",
            });
            fetchOrder();
        } catch (err) {
            console.error("Error updating order: ", err);
            setToast({
                message: "Error updating order!",
                type: "error",
            });
        } finally {
            setModalOpen(false);
        }
    }

    return (
        <div className='col-span-12 p-4 rounded border border-stone-300 overflow-x-auto'>
            <div className='mb-4 flex items-center justify-between flex-wrap gap-2'>
                <h3 className='flex items-center gap-1.5 font-medium'>
                    <FiDollarSign /> All Transactions
                </h3>
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
                        orders.map((order, index) => (
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
                                onDetail={() => handleOpenDetail(order)}
                                order={index}
                            />
                        ))
                    )}
                </tbody>
            </table>

            <OrderModal 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmitOrder}
                orderData={orderData}
                setOrderData={setOrderData}
            />

            {toast && (
                <Toast 
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
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
                <th className='text-start p-1.5'>Action</th>
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
        onDetail,
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
            <td className="p-1.5">
                <button onClick={onDetail} className="inline-block rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-center font-medium text-white hover:bg-indigo-700">
                    Detail
                </button>
            </td>
        </tr>
    )
}
