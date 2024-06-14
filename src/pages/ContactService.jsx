import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/contact"
    : "https://mern-authentication-backend-lzc7.onrender.com/api/contact";

export const getContacts = async () => {
  try {
    const response = await axios.get(baseURL, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error("Fetching contacts failed");
  }
};

export const addContact = async (contact) => {
  try {
    const response = await axios.post(baseURL, contact, {
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
    const response = await axios.delete(`${baseURL}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Deleting contact failed");
  }
};

export const updateContact = async (id, contact) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, contact, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Updating contact failed");
  }
};
