import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export const getProfile = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
        throw new Error("User ID not found in localStorage");
    }

    const response = await axios.get(`${API_URL}/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};