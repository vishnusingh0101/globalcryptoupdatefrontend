import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider, Drawer, AppBar, Toolbar, Typography } from '@mui/material';

const Sidebar = () => {
    return (
        <div style={{ width: '250px' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">Admin Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={true} style={{ marginTop: '64px' }}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/admin/manage-users">
                        <ListItemText primary="Manage Users" />
                    </ListItem>
                    <ListItem button component={Link} to="/admin/news">
                        <ListItemText primary="Manage News" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Sidebar;
