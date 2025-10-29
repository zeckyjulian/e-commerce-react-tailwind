import axios from "axios";

const API_URL = 'https://octopus-app-api-b2t7o.ondigitalocean.app/api';

export const getUser = async () => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
}

export const createUser = async (payload) => {
    const response = await axios.post(`${API_URL}/users`, payload, {
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

export const updateUser = async (id, payload) => {
    const response = await axios.put(`${API_URL}/user/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
}

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/user/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data
}
