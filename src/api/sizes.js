import axios from "axios";

const API_URL = "https://e-commerce-laravel-api-production.up.railway.app/api";

export const getSizes = async () => {
  const response = await axios.get(`${API_URL}/sizes`);
  return response.data;
};

export const getSizeById = async (id) => {
  const response = await axios.get(`${API_URL}/sizes/${id}`);
  return response.data;
};
