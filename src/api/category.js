import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data.data;
};
