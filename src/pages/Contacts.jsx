import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
} from "../pages/ContactService.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contacts = () => {
  const API_URL = "https://mern-authentication-backend-lzc7.onrender.com/auth/user/logout";
  // const API_URL = "http://localhost:8000/auth/user/logout";
  // https://mern-authentication-backend-lzc7.onrender.com/

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    contactNumber: "",
    email: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchContacts();
  }, [contacts, setContacts]);

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const data = await addContact(newContact);
      setContacts([...contacts, data]);
      setNewContact({ name: "", contactNumber: "", email: "" });
      toast.success("Contact added");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success("Contact deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const updatedContact = await updateContact(
        editingContact._id,
        editingContact
      );
      setContacts(
        contacts.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        )
      );
      setEditingContact(null);
      toast.success("Contact updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/login");
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (!isAuthenticated) {
    return <div>Please login to view your contacts</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Contacts</h1>
      <form onSubmit={handleAddContact} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Contact Number"
            value={newContact.contactNumber}
            onChange={(e) =>
              setNewContact({ ...newContact, contactNumber: e.target.value })
            }
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-600"
        >
          Add Contact
        </button>
      </form>

      {editingContact && (
        <form onSubmit={handleUpdateContact} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Name"
              value={editingContact.name}
              onChange={(e) =>
                setEditingContact({ ...editingContact, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Contact Number"
              value={editingContact.contactNumber}
              onChange={(e) =>
                setEditingContact({
                  ...editingContact,
                  contactNumber: e.target.value,
                })
              }
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Email"
              value={editingContact.email}
              onChange={(e) =>
                setEditingContact({ ...editingContact, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Update Contact
            </button>
            <button
              type="button"
              onClick={() => setEditingContact(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li
            key={contact._id}
            className="flex items-center justify-between p-4 border rounded-md"
          >
            <div>
              <span className="block font-bold">{contact.name}</span>
              <span className="block text-gray-600">
                {contact.contactNumber}
              </span>
              <span className="block text-gray-600">{contact.email}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditContact(contact)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteContact(contact._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="bg-red-500 mt-4 text-[1.1rem] sm:text-xl py-1 px-1 sm:py-2 sm:px-3 rounded-md text-white hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Contacts;
