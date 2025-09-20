import { Link } from "react-router-dom"
import { getProducts } from "../api/products";
import { useEffect, useState } from "react";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts()
        .then((res) => {
            console.log("API response:", res);
            setProducts(res.data.data); 
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>

                {products.length === 0 ? (
                    <p className='text-gray-500 h-80 flex justify-center items-center text-center'>No products.</p>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.slice(0, 8).map((product) => (
                        <div key={product.id} className="group relative">
                        <Link to={`/product/${product.id}`}>
                            <img
                                alt={product.product_name}
                                src={`https://e-commerce-laravel-api-production.up.railway.app/storage/products/${product.image}`}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                        </Link>
                        <div className="mt-4 flex justify-between">
                            <div>
                            <h3 className="text-sm text-gray-700">
                                <Link to={`/product/${product.id}`}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.product_name}
                                </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    )
}