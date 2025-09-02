import { useEffect, useState } from "react";
import Head from "../components/Head";
import { getCart, removeCartItem, updateCartItem } from "../api/cart";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      getCart()
        .then((cartItems) => {
          setItems(cartItems || []);
        })
        .catch((error) => console.error("Error fetching cart: ", error))
    }
  }, []);

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      setItems((prevItems) =>
        prevItems.map((item) => 
          item.id === itemId ? { ...item, quantity } : item
      ));
      await updateCartItem(itemId, quantity);
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      const cartItems = await getCart();
      setItems(cartItems);
    } catch (error) {
      console.error("Error removing cart item: ", error);
    }
  };

  const subtotal = (items || []).reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = 8.32;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white">
      <Head />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Please login to view your cart or add prodcuts to cart.
            </h2>
            <div className="flex justify-center gap-4">
              <Link
                to={`/stores`}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Continue Shopping
              </Link>
              <Link
                to={`/login`}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
              Shopping Cart
            </h1>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <img
                    src={`http://localhost:8000/products/${item.image}`}
                    alt={item.product_name}
                    className="h-28 w-28 rounded-md object-cover"
                  />
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                        <p className="text-gray-500">
                          {item.color} {item.size && `| ${item.size}`}
                        </p>
                        <p className="mt-1 text-gray-900">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex items-center justify-start gap-1 mt-2">
                      <button
                        onClick={() => 
                          handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        -
                      </button>

                      <input 
                        type="number" 
                        min={`1`}
                        value={item.quantity}
                        onChange={(e) => 
                          handleUpdateQuantity(item.id, Math.max(1, Number(e.target.value)))
                        }
                        className="w-8 text-center border rounded-md py-1"
                      />

                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          </div>
        )}

        {/* Right: Order Summary */}
        {items.length > 0 && (

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
        )}
        </div>
      <Footer />
    </div>
  );
}
