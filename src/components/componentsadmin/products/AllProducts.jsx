import React, { useEffect, useState } from 'react'
import { FiPackage } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Loading } from '../../Loading';
import { getProducts } from '../../../api/products';

export const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

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

    return (
        <div className='col-span-12 p-4 rounded border border-stone-300 overflow-x-auto'>
            <div className='mb-4 flex items-center justify-between flex-wrap gap-2'>
                <h3 className='flex items-center gap-1.5 font-medium'>
                    <FiPackage /> All Products
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
                                image={`http://localhost:8000/products/${product.image}`}
                                productName={product.product_name}
                                category={product.category?.category_name}
                                color={product.color}
                                price={product.price}
                                description={
                                    product.description
                                        ? product.description.split(" ").slice(0, 5).join(" ") + "..."
                                        : ""
                                }
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
