import React, { useEffect, useState } from "react";
import { getCategories } from "../../../api/category";

export const ProductModal = ({ isOpen, onClose, onSubmit, productData, setProductData }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
        getCategories()
        .then((res) => {
            setCategories(res);
        })
        .catch((err) => {
            console.error("Error fetching categories:", err);
        });
    }
  }, [isOpen]);
    
    if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
        setProductData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "category_id") {
        setProductData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "price") {
        setProductData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
        setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {productData?.id ? "Edit Product" : "Add Product"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <fieldset className="fieldset">
            <div>
              <legend className="fieldset-legend">Enter a Product Name</legend>
              <input
                type="text"
                name="product_name"
                value={productData.product_name || ""}
                onChange={handleChange}
                placeholder="Product Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <legend className="fieldset-legend">Pick a Photo</legend>

              {productData.image && (
                <div className="mb-2">
                    <p className="text-sm text-gray-500">Current Image:</p>
                    <img 
                        src={
                            productData.image instanceof File
                             ? URL.createObjectURL(productData.image)
                             : `https://e-commerce-laravel-api-production.up.railway.app/storage/products/${productData.image}`
                        }
                        alt={productData.product_name}
                        className="w-28 h-28 object-cover rounded"
                    />
                </div>
              )}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="file-input w-full"
                required={!productData.id}
              />
              <p className="label">Max size 2MB</p>
            </div>
            <div>
              <legend className="fieldset-legend">Enter a Color Name</legend>
              <input
                type="text"
                name="color"
                value={productData.color || ""}
                onChange={handleChange}
                placeholder="Color Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
                <legend className="fieldset-legend">Select Category</legend>
                <select 
                    name="category_id"
                    value={productData.category_id || ""}
                    onChange={handleChange}
                    className="select w-full"
                >
                    <option value="" disabled hidden>Pick a Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
              <legend className="fieldset-legend">Enter a Price</legend>
              <input
                type="number"
                name="price"
                value={productData.price || ""}
                onChange={handleChange}
                placeholder="Price"
                className="input input-bordered w-full"
                required
                step={0.01}
                min={0}
              />
            </div>
            <div>
              <legend className="fieldset-legend">Enter a Description Product</legend>
              <textarea
                type="text"
                name="description"
                value={productData.description || ""}
                onChange={handleChange}
                placeholder="Product Description"
                className="textarea h-24 w-full"
                required
              >
              </textarea>
            </div>
          </fieldset>
          {/* Tambahkan field lain sesuai kebutuhan */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {productData?.id ? "Update" : "Save"}
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

export const ConfirmModalProduct = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button
            onClick={onConfirm}
            className="btn btn-error"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};
