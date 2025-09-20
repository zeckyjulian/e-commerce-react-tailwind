import { Link } from "react-router-dom"
import Head from "../components/Head"
import { useEffect, useState } from "react"
import { getProducts } from "../api/products"
import { Footer } from "../components/Footer"
import { Loading } from "../components/Loading"

export const Store = () => {
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
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => {
           console.error("Error fetching products:", error);
           setProducts([]);
        })
        .finally(() => setLoading(false));
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="bg-white">
            <Head />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>
                {products.length === 0 ? (
                    <p className='text-gray-500 h-126 flex justify-center items-center text-center'>No products yet.</p>
                ) : (
                    <div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <div key={product.id} className="group relative">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        alt={product.product_name}
                                        src={`http://localhost:8000/storage/products/${product.image}`}
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
                        <div className="flex justify-center items-center gap-2 mt-12">
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
                )}
            </div>
            <Footer />
        </div>
    )
}