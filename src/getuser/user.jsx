import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [editingUser, setEditingUser] = useState(null);
  const toast = useRef(null);

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/users");
      setUsers(response.data.users); // ✅ Ensured correct response key
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update User
  const handleSubmit = async () => {
    try {
      if (editingUser) {
        // Update User
        await axios.put(`http://localhost:7000/api/newuser/${editingUser._id}`, formData);
        toast.current.show({ severity: "success", summary: "Updated", detail: "User updated successfully" });
      } else {
        // Add New User
        await axios.post("http://localhost:7000/api/user", formData);
        toast.current.show({ severity: "success", summary: "Added", detail: "User added successfully" });
      }

      setFormData({ name: "", email: "", phone: "", address: "" }); // ✅ Reset form
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "An error occurred",
      });
      console.error("Error saving user:", error);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/deleteduser/${id}`);
      toast.current.show({ severity: "warn", summary: "Deleted", detail: "User deleted successfully" });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <div className="p-fluid grid">
        <div className="col-12 md:col-3">
          <InputText name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        </div>
        <div className="col-12 md:col-3">
          <InputText name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="col-12 md:col-3">
          <InputText name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        </div>
        <div className="col-12 md:col-3">
          <InputText name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        </div>
        <div className="col-12 md:col-3">
          <Button label={editingUser ? "Update" : "Add"} onClick={handleSubmit} severity="success" />
        </div>
      </div>

      <h2 className="mt-4">Users List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <Button label="Edit" severity="info" className="mr-2" onClick={() => handleEdit(user)} />
                  <Button label="Delete" severity="danger" onClick={() => handleDelete(user._id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
