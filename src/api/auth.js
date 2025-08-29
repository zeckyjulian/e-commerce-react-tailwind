import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
