import React, { useEffect, useState } from 'react'
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Loading } from '../../Loading'
import { createUser, deleteUser, getUser, updateUser } from '../../../api/user'
import { ConfirmModal, UserModal } from './UserModal'
import { Toast } from '../../Toast'

export const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [toast, setToast] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await getUser();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching data: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleAdd = () => {
        setUserData({ name: "", email: "" });
        setModalOpen(true);
    };

    const handleEdit = (user) => {
        setUserData(user);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (userData.id) {
                await updateUser(userData.id, userData);
                setToast({
                    message: "User data updated successfully.",
                    type: "success"
                });
            } else {
                await createUser(userData);
                setToast({
                    message: "User data create successfully.",
                    type: "success"
                });
            }
            fetchUsers();
        } catch (err) {
            console.error("Error saving user: ", err);
            setToast({
                message: "Error saving user.",
                type: "error"
            });
        } finally {
            setModalOpen(false);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteUser(deleteId);
            setToast({
                message: "User deleted successfully",
                type: "success"
            });
            fetchUsers();
        } catch (err) {
            console.error("Error deleting user: ", err);
            setToast({
                message: "Error deleting user.",
                type: "error",
            });
        } finally {
            setConfirmOpen(false);
            setDeleteId(null);
        }
    };

    const handleCloseModal = () => {
        setUserData({ name: "", email: "" });
        setModalOpen(false);
    }

    return (
        <div className='col-span-12 p-4 rounded border border-stone-300 overflow-x-auto'>
            <div className='mb-4 flex items-center justify-between flex-wrap gap-2'>
                <h3 className='flex items-center gap-1.5 font-medium'>
                    <FiDollarSign /> All Users
                </h3>
                <button onClick={handleAdd} className='flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'>
                    Input User
                </button>
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
                                onEdit={() => handleEdit(user)}
                                onDelete={() => handleDelete(user.id)}
                            />
                        ))
                    )}
                </tbody>
            </table>

            <UserModal 
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                userData={userData}
                setUserData={setUserData}
            />

            <ConfirmModal 
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure to delete this user?"
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
        onEdit,
        onDelete
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
                <button onClick={onEdit} className="inline-block rounded-md mb-1 border border-transparent bg-indigo-600 px-2 py-2 text-center font-medium text-white hover:bg-indigo-700 mr-1">
                    Edit
                </button>
                <button onClick={onDelete} className="inline-block rounded-md border border-transparent bg-red-500 px-2 py-2 text-center font-medium text-white hover:bg-red-700">
                    Delete
                </button>
            </td>
        </tr>
    );
};
