import axios from "axios";

const API_URL = "https://e-commerce-laravel-api-production.up.railway.app/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
