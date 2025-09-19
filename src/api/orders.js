import axios from "axios";

const API_URL = 'http://localhost:8000/api';

export const getOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};

export const getAllOrders = async () => {
    const response = await axios.get(`${API_URL}/admin/orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};

export const getOrderDetail = async ($id) => {
    const response = await axios.get(`${API_URL}/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    });
    return response.data.data
};

export const createOrder = async (paymentMethod, shippingAddress) => {
    const response = await axios.post(`${API_URL}/orders`, {
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.data;
};

export const updateOrder = async (id, status) => {
    const response = await axios.put(
        `${API_URL}/admin/orders/${id}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        },
    );
    return response.data.data;
};
