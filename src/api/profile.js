import axios from "axios";

const API_URL = 'https://octopus-app-api-b2t7o.ondigitalocean.app/api';

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

export const updateProfile = async (id, profileData) => {
    const formData = new FormData();

    if (profileData.phone) formData.append("phone", profileData.phone);
    if (profileData.gender) formData.append("gender", profileData.gender);
    if (profileData.date_of_birth) formData.append("date_of_birth", profileData.date_of_birth);
    if (profileData.shipping_address) formData.append("shipping_address", profileData.shipping_address);

    if (profileData.photo instanceof File) {
        formData.append("photo", profileData.photo);
    }

    const response = await axios.post(
        `${API_URL}/profile/${id}?_method=PUT`,
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
