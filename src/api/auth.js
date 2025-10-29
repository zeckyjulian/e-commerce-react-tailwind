import axios from "axios";

const API_URL = "https://octopus-app-api-b2t7o.ondigitalocean.app/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
