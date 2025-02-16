import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CryptoTable.css";

const formatNumber = (value) => {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  return value.toLocaleString();
};

function CryptoTable() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      });
      setCryptos(data);
      setError(null);
    } catch (err) {
      setError("Failed to load cryptocurrency data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCryptos();
    const intervalId = setInterval(fetchCryptos, 300000);
    return () => clearInterval(intervalId);
  }, [fetchCryptos]);

  if (loading) return <div className="loading-message">Loading cryptocurrencies...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!cryptos.length) return <div className="empty-message">No cryptocurrencies found.</div>;

  return (
    <div className="crypto-table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Change % (24h)</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/crypto/${crypto.id}`} className="crypto-link">
                  <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
                  <span>{crypto.name}</span>
                </Link>
              </td>
              <td>${crypto.current_price.toFixed(2)}</td>
              <td className={crypto.price_change_percentage_24h > 0 ? "positive" : "negative"}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${crypto.market_cap}</td>
              <td>${crypto.total_volume}</td>
              <td>${crypto.circulating_supply}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="crypto-cards">
        {cryptos.map((crypto) => (
          <Link to={`/crypto/${crypto.id}`} key={crypto.id} className="crypto-link">
            <div className="crypto-card">
              <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
              <div className="crypto-name">{crypto.name}</div>
              <div className="crypto-price">${crypto.current_price.toFixed(2)}</div>
              <div className={`crypto-change ${crypto.price_change_percentage_24h > 0 ? "positive" : "negative"}`}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="crypto-market-cap">Market Cap: ${formatNumber(crypto.market_cap)}</div>
              <div className="crypto-volume">Volume (24h): ${formatNumber(crypto.total_volume)}</div>
              <div className="crypto-supply">Supply: {formatNumber(crypto.circulating_supply)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CryptoTable;
