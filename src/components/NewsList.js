import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewsList.css"; // Import custom styles
import { Link } from "react-router-dom";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(0); // Track last refresh timestamp
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(false); // Disable refresh for 2 minutes

  const newsAPIs = [
    {
      url: "https://financialmodelingprep.com/api/v3/crypto-news",
      params: {
        apikey: process.env.REACT_APP_FMP_API_KEY,
      },
    },
    {
      url: "https://newsdata.io/api/1/news",
      params: {
        apikey: process.env.REACT_APP_NEWSDATAIO_API_KEY,
        q: "crypto",
        language: "en",
        size: 10, // Request 10 articles
      },
    }
  ];

  // Fetch news from a random API and retry on failure
  const fetchNews = async () => {
    const randomAPIs = [...newsAPIs]; // Copy array to shuffle
    let newArticles = [];

    // Try fetching news from each API until one works
    for (let i = 0; i < randomAPIs.length; i++) {
      const randomAPI = randomAPIs[i];

      try {
        const response = await axios.get(randomAPI.url, { params: randomAPI.params });
        newArticles = response.data.results || response.data.articles || [];

        if (newArticles.length > 0) {
          console.log(`Fetched from API: ${randomAPI.url}`);
          break; // Stop once we successfully fetch data
        }
      } catch (err) {
        console.error(`Error fetching from ${randomAPI.url}:`, err);
      }
    }

    if (newArticles.length > 0) {
      setNews((prevNews) => {
        const existingLinks = new Set(prevNews.map((article) => article.link));
        const uniqueArticles = newArticles.filter(
          (article) => !existingLinks.has(article.link)
        );

        console.log("Unique articles fetched:", uniqueArticles); // Debug log
        console.log("Previous news length:", prevNews.length); // Debug log
        console.log("New combined news length:", uniqueArticles.length + prevNews.length); // Debug log

        return [...uniqueArticles, ...prevNews]; // Add new articles to the top
      });
      setError(null);
    } else {
      setError("Failed to load news articles from all APIs.");
    }
    setLoading(false); // Moved setLoading(false) here to ensure it's called after news fetching
  };

  useEffect(() => {
    // Fetch news on mount
    fetchNews();

    // Auto-refresh every 5 minutes
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const handleRefresh = async () => {
    const now = Date.now();

    if (now - lastRefreshed < 2 * 60 * 1000) {
      console.log("Refresh button is disabled. Please wait 2 minutes.");
      setIsRefreshDisabled(true);
      setTimeout(() => setIsRefreshDisabled(false), 2 * 60 * 1000); // Re-enable after 2 minutes
      return;
    }

    console.log("Refresh button clicked. Fetching new news...");
    setLastRefreshed(now);
    setIsRefreshDisabled(true); // Disable button for 2 minutes

    setLoading(true);
    await fetchNews();

    console.log("New news fetched and appended to the top.");
    setTimeout(() => setIsRefreshDisabled(false), 2 * 60 * 1000); // Re-enable after 2 minutes
  };

  const truncateDescription = (description, limit = 50) => {
    if (!description) return "No description available.";
    const words = description.split(" ");
    if (words.length <= limit) return description;
    return words.slice(0, limit).join(" ") + "...";
  };

  const getImageUrl = (article) => {
    return article.image_url || article.image || "https://via.placeholder.com/150"; // Fallback image
  };

  if (loading && news.length === 0) {
    return <div className="loadingMessage">Loading news...</div>;
  }

  if (error) {
    return <div className="errorMessage">{error}</div>;
  }

  if (news.length === 0) {
    return <div className="emptyMessage">No news articles found.</div>;
  }

  return (
    <div className="newsContainer">
      <div className="refreshContainer">
        <button
          className="refreshButton"
          onClick={handleRefresh}
          disabled={isRefreshDisabled}
        >
          {"Refresh News"}
        </button>
      </div>
      <ul className="newsList">
        {news.map((article, index) => (
          <li key={`${article.link}-${index}`} className="newsItem">
            <Link to={`/news/${article.id}`} className="newsLink"> {/* Use Link instead of a tag */}
              <div className={`newsImage ${!getImageUrl(article) ? "noImage" : ""}`}>
                <img
                  src={getImageUrl(article)}
                  alt={article.title}
                  className={article.image_url ? "hasImage" : "noImage"}
                />
              </div>
              <h3>{article.title}</h3>
              <p>{truncateDescription(article.description, 50)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;


