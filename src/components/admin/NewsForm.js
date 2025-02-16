import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import ImageUploader from "./ImageUploader"; 

const categories = [
    "Cryptocurrency", "Blockchain", "Finance", "Technology",
    "Markets", "Investing", "Web3", "DeFi", "NFTs", "Regulations & Policies"
];

const NewsForm = ({ selectedNews, onClose, fetchNews }) => {
    const [newsData, setNewsData] = useState({
        title: "",
        description: "",
        image: "",
        date: "",
        author: "",
        sourceUrl: "",
        category: "",
        tags: "",
        views: 0,
        reactions: { likes: 0, dislikes: 0, shares: 0 },
        video: "",
        location: "",
    });

    useEffect(() => {
        if (selectedNews?._id) {
            setNewsData({
                title: selectedNews.title || "",
                description: selectedNews.description || "",
                image: selectedNews.image || "",
                date: selectedNews.date ? new Date(selectedNews.date).toISOString().split("T")[0] : "",
                author: selectedNews.author || "",
                sourceUrl: selectedNews.sourceUrl || "",
                category: selectedNews.category || "",
                tags: selectedNews.tags?.join(", ") || "",
                views: selectedNews.views || 0,
                reactions: selectedNews.reactions || { likes: 0, dislikes: 0, shares: 0 },
                video: selectedNews.video || "",
                location: selectedNews.location || "",
            });
        }
    }, [selectedNews]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found, user may not be authenticated.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            const dataToSend = {
                ...newsData,
                tags: newsData.tags.split(",").map(tag => tag.trim()),
                reactions: {
                    likes: Number(newsData.reactions.likes),
                    dislikes: Number(newsData.reactions.dislikes),
                    shares: Number(newsData.reactions.shares),
                }
            };

            if (selectedNews?._id) {
                await axios.put(`http://localhost:3000/admin/news/${selectedNews._id}`, dataToSend, { headers });
            } else {
                await axios.post("http://localhost:3000/admin/addNews", dataToSend, { headers });
            }

            fetchNews();
            onClose();
        } catch (err) {
            console.error("Error saving news:", err);
        }
    };

    return (
        <Dialog open={!!selectedNews} onClose={onClose}>
            <DialogContent>
                <TextField label="Title" name="title" value={newsData.title} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Description" name="description" value={newsData.description} onChange={handleChange} fullWidth multiline rows={4} margin="dense" />

                {/* Image Upload Section */}
                <ImageUploader setImageUrl={(url) => setNewsData((prev) => ({ ...prev, image: url }))} />
                console.log(newsData.image);
                
                {/* Show Image Preview */}
                {newsData.image && <img src={newsData.image} alt="Uploaded" style={{ width: "100%", marginTop: "10px" }} />}

                <TextField label="Date" name="date" type="date" value={newsData.date} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Author" name="author" value={newsData.author} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Source URL" name="sourceUrl" value={newsData.sourceUrl} onChange={handleChange} fullWidth margin="dense" />
                
                <TextField select label="Category" name="category" value={newsData.category} onChange={handleChange} fullWidth margin="dense">
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField label="Tags (comma-separated)" name="tags" value={newsData.tags} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Video URL" name="video" value={newsData.video} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Location" name="location" value={newsData.location} onChange={handleChange} fullWidth margin="dense" />
                
                <TextField label="Views" name="views" type="number" value={newsData.views} onChange={handleChange} fullWidth margin="dense" />
                <TextField label="Likes" name="likes" type="number" value={newsData.reactions.likes} onChange={(e) => setNewsData(prev => ({ ...prev, reactions: { ...prev.reactions, likes: Number(e.target.value) } }))} fullWidth margin="dense" />
                <TextField label="Dislikes" name="dislikes" type="number" value={newsData.reactions.dislikes} onChange={(e) => setNewsData(prev => ({ ...prev, reactions: { ...prev.reactions, dislikes: Number(e.target.value) } }))} fullWidth margin="dense" />
                <TextField label="Shares" name="shares" type="number" value={newsData.reactions.shares} onChange={(e) => setNewsData(prev => ({ ...prev, reactions: { ...prev.reactions, shares: Number(e.target.value) } }))} fullWidth margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewsForm;
