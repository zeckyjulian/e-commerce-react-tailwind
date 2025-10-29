import axios from "axios";

const API_URL = "https://octopus-app-api-b2t7o.ondigitalocean.app/api";

export const getSizes = async () => {
  const response = await axios.get(`${API_URL}/sizes`);
  return response.data;
};

export const getSizeById = async (id) => {
  const response = await axios.get(`${API_URL}/sizes/${id}`);
  return response.data;
};
