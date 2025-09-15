import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getProducts = async (page = 1) => {
  const response = await axios.get(`${API_URL}/products?page=${page}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};
