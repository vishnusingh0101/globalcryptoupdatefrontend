import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        axios
            .get(`https://cryptopanic.com/api/v1/posts/${id}/?auth_token=5881409b9b3edd3a658fc718e9e0c69861a62071`)
            .then((response) => {
                console.log("API Response Data:", response.data);  // Log the full response data to the console
                setNews(response.data);
            });
    }, [id]);

    if (!news) return <div>Loading...</div>;

    // Check if image is present in the response
    const newsImage = news.image_url; // Assuming the image URL field is called 'image_url'

    return (
        <div className="news-detail">
            {newsImage && (
                <img src={newsImage} alt={news.title} className="news-image" /> // Render image if available
            )}
            <h1>{news.title}</h1>
            <p>{news.content}</p>
        </div>
    );
}

export default NewsDetail;
