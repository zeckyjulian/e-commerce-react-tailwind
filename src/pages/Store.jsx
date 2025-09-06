import { Link } from "react-router-dom"
import Head from "../components/Head"
import { useEffect, useState } from "react"
import { getProducts } from "../api/products"

export const Store = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
        .then((res) => {
            console.log("API response:", res);
            setProducts(res.data.data); 
        })
        .catch((error) => console.error("Error fetching products:", error))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-white">
            <Head />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>
                {loading ? (
                    [...Array(8)].map((_, i) => (
                        <div key={i} className="h-80 w-full bg-gray-200 animate-pulse rounded-md"></div>
                    ))
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                        <Link to={`/product/${product.id}`}>
                            <img
                                alt={product.product_name}
                                src={`http://localhost:8000/products/${product.image}`}
                                loading="lazy"
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
                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    )
}