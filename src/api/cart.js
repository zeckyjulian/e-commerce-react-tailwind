import axios from "axios";

const API_URL = 'https://e-commerce-laravel-api-production.up.railway.app/api';

export const getCart = async () => {
    const response = await axios.get(`${API_URL}/cart`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};

export const addToCart = async (productId, sizeId, quantity = 1) => {
    const response = await axios.post(
        `${API_URL}/cart`,
        {
            product_id: productId,
            size_id: sizeId,
            quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        },
    );
    return response.data.data;
};

export const updateCartItem = async (itemId, quantity) => {
    const response = await axios.put(
        `${API_URL}/cart/${itemId}`,
        { quantity },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        },
    );
    return response.data.data;
};

export const removeCartItem = async (itemId) => {
    const response = await axios.delete(`${API_URL}/cart/${itemId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};
