import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import NewsDashboard from './NewsDashboard';
import UserInfo from './UserInfo';
import NewsForm from './NewsForm';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Pagination from './Pagenation';

const AdminDashboard = () => {
    const [news, setNews] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState(null); // For edit mode
    const navigate = useNavigate();

    useEffect(() => {
        // Check token in local storage and redirect if not logged in
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchNews();
        }
    }, [currentPage]);

    const fetchNews = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/admin/news?page=${currentPage}`);
            setNews(response.data.news);
            setTotalItems(response.data.pagedata.totalItems);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching news:', err);
            setIsLoading(false);
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const handleEditNews = (news) => {
        setSelectedNews(news);
    };

    const handleAddNews = () => {
        setSelectedNews(null);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Container style={{ flex: 1, padding: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <UserInfo />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper style={{ padding: '20px' }}>
                            <Typography variant="h4" gutterBottom>News Dashboard</Typography>
                            <button onClick={handleAddNews} style={{ padding: '10px', background: 'green', color: 'white', border: 'none' }}>
                                Add News
                            </button>
                            <NewsDashboard
                                news={news}
                                isLoading={isLoading}
                                onEdit={handleEditNews}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                onPageChange={handlePagination}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <NewsForm
                    selectedNews={selectedNews}
                    onClose={() => setSelectedNews(null)} // Close form when finished
                    fetchNews={fetchNews}
                />
            </Container>
        </div>
    );
};

export default AdminDashboard;
