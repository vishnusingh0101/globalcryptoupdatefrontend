import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const NewsDashboard = ({ news, isLoading, onEdit }) => {
    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {news.map((newsItem) => (
                <Grid item xs={12} sm={6} md={4} key={newsItem._id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{newsItem.title}</Typography>
                            <Typography variant="body2">{newsItem.description}</Typography>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => onEdit(newsItem)}
                                style={{ marginTop: '10px' }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default NewsDashboard;
