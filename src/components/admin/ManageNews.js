import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Redirect on token expiration
import NewsForm from "./NewsForm";
import PaginationComponent from "./Pagenation";
import "./ManageNews.css";

const ManageNews = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // For redirecting on authentication issues

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token"); // Fetch token from localStorage

            const response = await axios.get(`http://localhost:3000/admin/news?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setNews(response.data.news);
            setTotalItems(response.data.total);
        } catch (error) {
            console.error("Error fetching news:", error);
            if (error.response?.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/admin/login");
            } else {
                setError("Failed to fetch news. Please try again.");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this news?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:3000/admin/news/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchNews();
            } catch (error) {
                console.error("Error deleting news:", error);
                setError("Failed to delete news. Please try again.");
            }
        }
    };

    const handleEdit = (newsItem) => {
        setSelectedNews(newsItem);
    };

    const handleCloseForm = () => {
        setSelectedNews(null);
        fetchNews();
    };

    return (
        <div className="manage-news-container">
            <h2>Manage News</h2>
            <button className="add-button" onClick={() => setSelectedNews({})}>
                Add News
            </button>

            {loading && <p className="loading-message">Loading news...</p>}
            {error && <p className="error-message">{error}</p>}

            <ul className="news-list">
                {news.map((item) => (
                    <li key={item._id} className="news-item">
                        <img src={item.image} alt="News" className="news-image" />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p><strong>Source:</strong> <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.domain || "Unknown"}</a></p>
                        <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                        <p><strong>Tags:</strong> {item.tags?.join(", ") || "None"}</p>
                        <p><strong>Views:</strong> {item.views}</p>
                        <p><strong>Status:</strong> {item.status}</p>
                        <div className="news-actions">
                            <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <PaginationComponent
                currentPage={currentPage}
                totalItems={totalItems}
                onPageChange={(page) => setCurrentPage(page)}
            />

            {selectedNews !== null && (
                <NewsForm selectedNews={selectedNews} onClose={handleCloseForm} fetchNews={fetchNews} />
            )}
        </div>
    );
};

export default ManageNews;