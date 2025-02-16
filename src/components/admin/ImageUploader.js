import React, { useState } from "react";
import axios from "axios";

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const ImageUploader = ({ setImageUrl }) => {
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setImageUrl(response.data.secure_url); // Set the uploaded image URL
            alert("Image uploaded successfully!");
        } catch (err) {
            console.error("Error uploading image:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && <p>Uploading...</p>}
        </div>
    );
};

export default ImageUploader;
