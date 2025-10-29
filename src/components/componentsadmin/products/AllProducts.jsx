import React, { useEffect, useState } from 'react'
import { FiPackage } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Loading } from '../../Loading';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../../api/products';
import { ConfirmModalProduct, ProductModal } from './ProductModal';
import { Toast } from '../../Toast';

export const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [productData, setProductData] = useState({ product_name: "", image: "", category_id: "", color: "", price: "", description: "" });
    const [toast, setToast] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const fetchProducts = (page = 1) => {
        getProducts(page)
        .then((res) => {
            console.log("API response:", res);
            setProducts(res.data.data);
            setCurrentPage(res.data.current_page);
            setLastPage(res.data.last_page);
        })
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAdd = () => {
        setProductData({ product_name: "", image: "", category_id: "", color: "", price: "", description: "" });
        setModalOpen(true);
    };

    const handleEdit = (product) => {
        setProductData(product);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (productData.id) {
                await updateProduct(productData.id, productData);
                setToast({
                    message: "Product data updated successfully.",
                    type: "success"
                });
            } else {
                await createProduct(productData);
                setToast({
                    message: "Product data create successfully.",
                    type: "success"
                });
            }
            fetchProducts();
        } catch (err) {
            console.error("Error saving product: ", err);
            setToast({
                message: "Error saving product.",
                type: "error"
            });
        } finally {
            setModalOpen(false);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteProduct(deleteId);
            setToast({
                message: "Product deleted successfully",
                type: "success"
            });
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product: ", err);
            setToast({
                message: "Error deleting product.",
                type: "error",
            });
        } finally {
            setConfirmOpen(false);
            setDeleteId(null);
        }
    };

    const handleCloseModal = () => {
        setProductData({ product_name: "", image: "", category_id: "", color: "", price: "", description: "" });
        setModalOpen(false);
    }

    return (
        <div className='col-span-12 p-4 rounded border border-stone-300 overflow-x-auto'>
            <div className='mb-4 flex items-center justify-between flex-wrap gap-2'>
                <h3 className='flex items-center gap-1.5 font-medium'>
                    <FiPackage /> All Products
                </h3>
                <button onClick={handleAdd} className='flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'>
                    Input Product
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
                    ) : products.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-stone-500">
                                No products
                            </td>
                        </tr>
                    ) : (
                        products.map((product, index) => (
                            <TableRow
                                key={product.id}
                                no={(currentPage - 1) * 20 + (index + 1)}
                                image={`https://octopus-app-api-b2t7o.ondigitalocean.app/storage/products/${product.image}`}
                                productName={product.product_name}
                                category={product.category?.category_name}
                                color={product.color}
                                price={product.price}
                                description={
                                    product.description
                                        ? product.description.split(" ").slice(0, 5).join(" ") + "..."
                                        : ""
                                }
                                onEdit={() => handleEdit(product)}
                                onDelete={() => handleDelete(product.id)}
                                order={index}
                            />
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    className="px-3 py-1 rounded bg-stone-200 hover:bg-stone-300 disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => fetchProducts(currentPage - 1)}
                >
                    Prev
                </button>

                <span className="px-3 py-1">
                    Page {currentPage} of {lastPage}
                </span>

                <button
                    className="px-3 py-1 rounded bg-stone-200 hover:bg-stone-300 disabled:opacity-50"
                    disabled={currentPage === lastPage}
                    onClick={() => fetchProducts(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            <ProductModal 
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                productData={productData}
                setProductData={setProductData}
            />

            <ConfirmModalProduct
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete this product?"
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
                <th className='text-start p-1.5'>Image</th>
                <th className='text-start p-1.5'>Products Name</th>
                <th className='text-start p-1.5'>Category</th>
                <th className='text-start p-1.5'>Color</th>
                <th className='text-start p-1.5'>Price</th>
                <th className='text-start p-1.5'>Description</th>
                <th className='text-start p-1.5'>Action</th>
            </tr>
        </thead>
    )
}

const TableRow = ({
        no,
        image,
        productName,
        category,
        color,
        price,
        description,
        order,
        onEdit,
        onDelete,
    }) => {
    return (
        <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
            <td className="p-1.5">{no}</td>
            <td className="p-1.5 h-20 w-20">
                <img src={image} alt={productName} />
            </td>
            <td className="p-1.5">{productName}</td>
            <td className="p-1.5">{category}</td>
            <td className="p-1.5">{color}</td>
            <td className="p-1.5">{price}</td>
            <td className="p-1.5">{description}</td>
            <td className="p-1.5">
                <button onClick={onEdit} className="inline-block rounded-md mb-1 border border-transparent bg-indigo-600 px-2 py-2 text-center font-medium text-white hover:bg-indigo-700 mr-1">
                    Edit
                </button>
                <button onClick={onDelete} className="inline-block rounded-md border border-transparent bg-red-500 px-2 py-2 text-center font-medium text-white hover:bg-red-700">
                    Delete
                </button>
            </td>
        </tr>
    )
}
