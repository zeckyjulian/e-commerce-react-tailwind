import axios from "axios";

const API_URL = "https://e-commerce-laravel-api-production.up.railway.app/api";

export const getProducts = async (page = 1) => {
  const response = await axios.get(`${API_URL}/products?page=${page}`);
  return response.data;
};

export const createProduct = async (payload) => {
  const formData = new FormData();
  
  formData.append('product_name', payload.product_name);
  formData.append('color', payload.color);
  formData.append('category_id', payload.category_id);
  formData.append('price', payload.price);
  formData.append('description', payload.description);

  if (payload.image instanceof File) {
    formData.append('image', payload.image);
  }

  const response = await axios.post(`${API_URL}/admin/product`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
}

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const updateProduct = async (id, payload) => {
  const formData = new FormData();
  
  if (payload.product_name) formData.append('product_name', payload.product_name);
  if (payload.color) formData.append('color', payload.color);
  if (payload.category_id) formData.append('category_id', payload.category_id);
  if (payload.price) formData.append('price', payload.price);
  if (payload.description) formData.append('description', payload.description);

  if (payload.image instanceof File) {
    formData.append('image', payload.image);
  }

  formData.append('_method', 'PUT');

  const response = await axios.post(`${API_URL}/admin/product/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
}

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/product/${id}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
  return response.data
}
