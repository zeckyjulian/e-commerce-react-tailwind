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

export const updateProfile = async (profileData) => {
    const formData = new FormData();

    formData.append("phone", profileData.phone);
    formData.append("gender", profileData.gender);
    formData.append("date_of_birth", profileData.date_of_birth);
    formData.append("shipping_address", profileData.shipping_address);

    if (profileData.photo instanceof File) {
        formData.append("photo", profileData.photo);
    }

    const response = await axios.put(
        `${API_URL}/profile/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data.data;
};
