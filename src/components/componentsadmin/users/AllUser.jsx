import React, { useEffect, useState } from 'react'
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Loading } from '../../Loading'
import { getUser } from '../../../api/user'

export const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                setUsers(data);
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
                    <FiDollarSign /> All Users
                </h3>
                <Link to={`admin/input-product`}>
                    <button className='flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'>
                        Input User
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
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-stone-500">
                                No User Found
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <TableRow
                                key={user.id}
                                no={index + 1}
                                cusName={user.name}
                                mail={user.email}
                                phone={user.profile?.phone || "Not filled in yet"}
                                gender={user.profile?.gender || "Not filled in yet"}
                                dateBirth={user.profile?.date_of_birth  || "Not filled in yet"}
                                shipping={user.profile?.shipping_address  || "Not filled in yet"}
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
                <th className='text-start p-1.5'>E-Mail</th>
                <th className='text-start p-1.5'>Phone</th>
                <th className='text-start p-1.5'>Gender</th>
                <th className='text-start p-1.5'>Date of Birth</th>
                <th className='text-start p-1.5'>Shipping Address</th>
                <th className='text-start p-1.5'>Action</th>
            </tr>
        </thead>
    )
}

const TableRow = ({
        no,
        cusName,
        mail,
        phone,
        gender,
        dateBirth,
        shipping,
        order,
    }) => {

    const renderField = (value) => {
        const isEmpty = value === "Not filled in yet";
        return (
            <span className={isEmpty ? "text-red-500 font-medium" : ""}>
                {value}
            </span>
        );
    };

    return (
        <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
            <td className="p-1.5">{no}</td>
            <td className="p-1.5">{cusName}</td>
            <td className="p-1.5">{mail}</td>
            <td className="p-1.5">{renderField(phone)}</td>
            <td className="p-1.5">{renderField(gender)}</td>
            <td className="p-1.5">{renderField(dateBirth)}</td>
            <td className="p-1.5">{renderField(shipping)}</td>
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
    );
};
