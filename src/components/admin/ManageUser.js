import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationComponent from "./PaginationComponent";
import "./ManageUsers.css";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/admin/users?page=${currentPage}`);
            setUsers(response.data.users);
            setTotalUsers(response.data.total);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:3000/admin/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleBan = async (id, isBanned) => {
        if (window.confirm(`Are you sure you want to ${isBanned ? "unban" : "ban"} this user?`)) {
            try {
                await axios.put(`http://localhost:3000/admin/users/${id}/ban`, { banned: !isBanned });
                fetchUsers();
            } catch (error) {
                console.error("Error updating user ban status:", error);
            }
        }
    };

    return (
        <div className="manage-users-container">
            <h2>Manage Users</h2>
            {loading ? <p>Loading users...</p> : null}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.mail}</td>
                            <td>{user.role}</td>
                            <td>{user.banned ? "Banned" : "Active"}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                                <button 
                                    className={user.banned ? "unban-button" : "ban-button"} 
                                    onClick={() => handleBan(user._id, user.banned)}
                                >
                                    {user.banned ? "Unban" : "Ban"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationComponent
                currentPage={currentPage}
                totalItems={totalUsers}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default ManageUser;
