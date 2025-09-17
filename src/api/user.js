import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export const getUser = async () => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
}

export const getUserById = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
        throw new Error("User ID not found in localStorage");
    }

    const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
}