import axios from "axios";

const API_URL = "https://mern-authentication-backend-lzc7.onrender.com/api/contact";
// const API_URL = "http://localhost:8000/api/contact";
// https://mern-authentication-backend-lzc7.onrender.com/

export const getContacts = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Fetching contacts failed");
  }
};

export const addContact = async (contact) => {
  try {
    const response = await axios.post(API_URL, contact, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Adding contact failed");
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Deleting contact failed");
  }
};

export const updateContact = async (id, contact) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, contact, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Updating contact failed");
  }
};
