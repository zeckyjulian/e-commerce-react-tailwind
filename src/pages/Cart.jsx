import { useState } from "react";
import Head from "../components/Head";

export default function Cart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Basic Tee",
      color: "Sienna",
      size: "Large",
      price: 32.0,
      quantity: 1,
      stock: "In stock",
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
    },
    {
      id: 2,
      name: "Basic Tee",
      color: "Black",
      size: "Large",
      price: 32.0,
      quantity: 1,
      stock: "Ships in 3–4 weeks",
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
    },
    {
      id: 3,
      name: "Nomad Tumbler",
      color: "White",
      size: "",
      price: 35.0,
      quantity: 1,
      stock: "In stock",
      image:
        "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
    },
  ]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = 8.32;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white">
      <Head />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10">
        
        {/* Left: Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
            Shopping Cart
          </h1>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 rounded-md object-cover"
                />
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-500">
                        {item.color} {item.size && `| ${item.size}`}
                      </p>
                      <p className="mt-1 text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500">×</button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((it) =>
                            it.id === item.id
                              ? { ...it, quantity: Number(e.target.value) }
                              : it
                          )
                        )
                      }
                      className="border rounded-md px-2 py-1"
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                    <p
                      className={`text-sm ${
                        item.stock === "In stock"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {item.stock}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-gray-50 shadow rounded-lg p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Order summary
          </h2>
          <dl className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>
                Shipping estimate{" "}
                <span className="text-gray-400 ml-1 cursor-help">?</span>
              </dt>
              <dd>${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>
                Tax estimate <span className="text-gray-400 ml-1 cursor-help">?</span>
              </dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t">
              <dt>Order total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
          <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
