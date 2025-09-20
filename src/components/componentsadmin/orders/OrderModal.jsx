// src/components/UserModal.jsx
import React from "react";

export const OrderModal = ({ isOpen, onClose, onSubmit, orderData, setOrderData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const steps = ["pending", "processing", "shipping", "delivered"];
  const currentStep = steps.indexOf(orderData.status);

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">
          Detail Order
        </h3>

        {/* Header produk */}
        {orderData.items?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
                <img
                src={
                    item.product?.image
                    ? `http://localhost:8000/storage/products/${item.product.image}`
                    : "https://via.placeholder.com/100"
                }
                alt={item.product?.product_name || "product"}
                className="w-24 h-24 object-cover rounded"
                />
                <div>
                <h4 className="font-semibold">{item.product?.product_name}</h4>
                <p className="text-sm text-gray-500">
                    Size: {item.size?.size_name || "-"}
                </p>
                <p className="text-sm text-gray-700">
                    Quantity: {item.quantity || 1}
                </p>
                </div>
            </div>
        ))}

        {/* Info order */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b">
          <div>
            <h4 className="font-semibold">Delivery address</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {orderData.shipping_address}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Shipping updates</h4>
            <p className="text-sm text-gray-600">{orderData.user?.email}</p>
            <p className="text-sm text-gray-600">{orderData.user?.phone || "No phone"}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="py-4 border-b">
          <p className="text-sm text-gray-600 mb-2">
            {orderData.status === "pending"
              ? "Waiting for confirmation"
              : orderData.status === "processing"
              ? "Preparing to ship"
              : orderData.status === "shipping"
              ? "Order is on the way"
              : "Order delivered"}
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full my-3">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span className={currentStep >= 0 ? "text-indigo-600 font-medium" : ""}>
              Pending
            </span>
            <span className={currentStep >= 1 ? "text-indigo-600 font-medium" : ""}>
              Processing
            </span>
            <span className={currentStep >= 2 ? "text-indigo-600 font-medium" : ""}>
              Shipped
            </span>
            <span className={currentStep >= 3 ? "text-indigo-600 font-medium" : ""}>
              Delivered
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Update status order</legend>
            <select 
                name="status"
                value={orderData.status || ""}
                onChange={handleChange}
                className="select"
            >
                <option value="pending">Pending</option>
                <option value="processing">Process</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
                </select>
          </fieldset>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
