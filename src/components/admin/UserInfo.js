import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import axios from "axios";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const res = await axios.get("http://localhost:3000/admin/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setUserInfo(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user info");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Admin Info
      </Typography>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h6">Name: {userInfo.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            Email: {userInfo.mail}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Role: {userInfo.role}
          </Typography>
          {/* Add more fields if needed */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInfo;
