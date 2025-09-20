import { useLocation, Link, useNavigate } from "react-router-dom";
import Head from "../components/Head";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import { createOrder } from "../api/orders";
import { Forbidden } from "./Forbidden";

export default function Checkout() {
  const location = useLocation();
  const { items = [], subtotal = 0, shipping = 0, tax = 0, total = 0 } = location.state || {};
  const [profile, setProfile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token || role !== "user") {
      setIsLoggedIn(false);
      setLoading(false);
      return
    }

    setIsLoggedIn(true);

    getProfile()
    .then((res) => setProfile(res))
    .catch((err) => console.error("Error fetching profile: ", err));
  }, []);

  if (!isLoggedIn) {
    return <Forbidden />
  }

  const handlePlaceOrder = async () => {
    if (!profile?.phone || !profile?.shipping_address) {
      navigate("/profile", { state: { message: "Please complete your profile before placing an order." } });
      return;
    }

    try {
      setLoading(true);
      const order = await createOrder(paymentMethod, profile.shipping_address);

      console.log("Order created", order);

      navigate("/order", { state: { message: "Order placed successfully!" } });
    } catch (err) {
      console.error("Error fetching order: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <Head />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <p className="text-sm text-gray-700 mb-2">{profile?.shipping_address || (
            <span className="text-red-500">Not Set</span>
          )}</p>
          <h3 className="text-lg font-semibold">Phone</h3>
          <p className="text-sm text-gray-700 mb-2">{profile?.phone || (
            <span className="text-red-500">Not Set</span>
          )}</p>
          <Link to={`/profile`}>
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 hover:bg-indigo-700">
              Change
            </button>
          </Link>
        </div>

        {/* Produk */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-4">
                <img
                  src={`https://e-commerce-laravel-api-production.up.railway.app/storage/products/${item.image}`}
                  alt={item.product_name}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="ml-4 flex flex-col justify-between">
                  <p className="font-medium">{item.product_name}</p>
                  <p className="text-sm text-gray-500">
                    {item.color} {item.size && `| ${item.size}`}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="ml-auto font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Ringkasan */}
        <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <dl className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tax</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
        </div>

        {/* Metode Pembayaran */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="payment" 
                value="credit-card" 
                checked={paymentMethod === "credit-card"}
                onChange={(e) => setPaymentMethod(e.target.value)} 
              />
              <span className="ml-2">Credit Card</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="bank-transfer"
                checked={paymentMethod === "bank-transfer"}
                onChange={(e) => setPaymentMethod(e.target.value)} 
              />
              <span className="ml-2">Bank Transfer</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)} 
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading? "Placing Order..." : "Place Order"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/cart" className="text-indigo-600 hover:underline">
            ← Back to Cart
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
