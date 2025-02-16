import React from 'react';
import Pagination from '@mui/material/Pagination'; // Correct import for Pagination

const PaginationComponent = ({ currentPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / 10); // Calculate total pages (assuming 10 items per page)

    return (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Pagination
                count={totalPages} // Total number of pages
                page={currentPage} // Current page number
                onChange={(_, page) => onPageChange(page)} // Update page when clicked
                color="primary" // Customize color (optional)
            />
        </div>
    );
};

export default PaginationComponent;
