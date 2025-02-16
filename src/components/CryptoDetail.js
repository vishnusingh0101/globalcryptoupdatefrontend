import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './CryptoDetail.css';

function CryptoDetail() {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCryptoDetails = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
                console.log(response); // Log the full response to inspect data
                setCrypto(response.data);
            } catch (err) {
                setError("Failed to load cryptocurrency details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptoDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;

    if (error) return <div className="error">{error}</div>;

    if (!crypto) return <div className="no-details">No details found for this cryptocurrency.</div>;

    // Get the coin's symbol image
    const coinImage = crypto.image?.large;  // Get the large image URL from the response

    return (
        <div className="crypto-detail">
            {coinImage && <img src={coinImage} alt={crypto.name} className="crypto-image" />} {/* Render the image */}
            <h1>{crypto.name}</h1>
            <div className="crypto-description" dangerouslySetInnerHTML={{ __html: crypto.description ? crypto.description.en : "No description available." }}></div>
            <a href={crypto.links?.homepage[0]} target="_blank" rel="noopener noreferrer">
                <button className="official-site-button">Official Site</button>
            </a>
        </div>
    );
}

export default CryptoDetail;
