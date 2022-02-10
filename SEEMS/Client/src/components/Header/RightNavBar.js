import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { AccountCircle, Add, Logout, Notifications, Receipt } from '@mui/icons-material'
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Badge,
    Typography,
    Fab,
} from '@mui/material'

const RightNavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Tooltip title="Create Event">
                    <Fab
                        variant="circular"
                        color="secondary"
                        component={Link}
                        to="/event/create"
                        aria-label="add"
                        size="medium"
                        sx={{ mr: 2 }}
                    >
                        <Add fontSize="large" />
                    </Fab>
                </Tooltip>
                <Tooltip title="Notification">
                    <IconButton size="large" sx={{ mr: 1 }}>
                        <Badge badgeContent={3} color="info">
                            <Notifications
                                fontSize="large"
                                sx={{ color: (theme) => theme.palette.grey[100] }}
                            />
                        </Badge>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="large">
                        <Avatar sx={{ width: 40, height: 40 }}>H</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <AccountCircle fontSize="large" />
                    </ListItemIcon>
                    <Typography ml={1}>My Profile</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Receipt fontSize="large" />
                    </ListItemIcon>
                    <Typography ml={1}>Receipt</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="large" />
                    </ListItemIcon>
                    <Typography ml={1}>Logout</Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default RightNavBar
