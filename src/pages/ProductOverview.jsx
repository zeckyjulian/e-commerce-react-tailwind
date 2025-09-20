import { StarIcon } from '@heroicons/react/20/solid'
import { products } from '../data/products'
import { useParams } from 'react-router-dom'
import Head from '../components/Head'
import { useEffect, useState } from 'react'
import { getProductById } from '../api/products'
import { getSizes } from '../api/sizes'
import { addToCart } from '../api/cart'
import { Loading } from '../components/Loading'
import { Toast } from '../components/Toast'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [toast, setToast] = useState(null);

    useEffect(() => {
      getProductById(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
      });
    }, [id]);

    useEffect(() => {
      getSizes()
      .then((res) => {
        setSizes(res.data);
      })
      .catch((err) => console.error("Error fetching sizes:", err))
      .finally(() => setLoading(false));
    }, []);

    const handleAddToCart = async (e) => {
      e.preventDefault();

      if (!selectedSize) {
        setToast({ message: "Please select the size first.", type: "error" });
        return;
      }

      try {
        await addToCart(product.id, selectedSize, quantity);
        setToast({ message: "Product successfully add to cart.", type: "success" });
      } catch (err) {
        console.error("Error adding to cart: ", err);
        setToast({ message: "Failed to add to cart.", type: "error" });
      }
    };

  return (
    <div className="bg-white">
        <Head />
      <div className="pt-6">
        {loading ? (
          <Loading />
        ) : !product ? (
          <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-700">Produk tidak ditemukan.</p>
          </div>
        ) : (
          <>
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li>
                  <div className="flex items-center">
                    <a href="/store" className="mr-2 text-sm font-medium text-gray-900">
                      Store
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              <li className="text-sm">
                <a href={product.id} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {product.product_name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            <img
              alt={product.product_name}
              src={`https://e-commerce-laravel-api-production.up.railway.app/storage/products/${product.image}`}
              className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.product_name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                          'size-5 shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form onSubmit={handleAddToCart} className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <div className="flex items-center gap-x-3">
                        <div className="flex rounded-full outline -outline-offset-1 outline-black/10">
                          <input
                            defaultValue={product.color}
                            defaultChecked={product.color}
                            name="color"
                            type="radio"
                            aria-label={product.color}
                            style={{ backgroundColor: product.color }}
                            className='size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3'
                          />
                        </div>
                    </div>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="grid grid-cols-4 gap-3">
                      {sizes.map((size) => (
                        <label
                          key={size.id}
                          aria-label={size.size_name}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                        >
                          <input
                            name="size"
                            type="radio"
                            value={size.id}
                            onChange={() => setSelectedSize(size.id)}
                            className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                          />
                          <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                            {size.size_name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
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
