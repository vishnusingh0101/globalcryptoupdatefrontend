import React from "react";
import CryptoTable from "./CryptoTable";
import NewsList from "./NewsList";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page container-fluid">
            <div className="row">
                {/* Crypto section, set for 75% width on larger screens, full width on smaller screens */}
                <div className="crypto-section col-lg-9 col-md-9 col-sm-12 mb-3">
                    <h2 className="section-title">Latest Crypto Rates</h2>
                    <CryptoTable />
                </div>

                {/* News section, set for 25% width on larger screens, full width on smaller screens */}
                <div className="news-section col-lg-3 col-md-3 col-sm-12">
                    <h2 className="section-title">Crypto News</h2>
                    <NewsList />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
