import axios from "axios";

const API_URL = "https://octopus-app-api-b2t7o.ondigitalocean.app/api";

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data.data;
};
