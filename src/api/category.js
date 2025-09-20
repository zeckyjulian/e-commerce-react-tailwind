import axios from "axios";

const API_URL = "https://e-commerce-laravel-api-production.up.railway.app/api";

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data.data;
};
