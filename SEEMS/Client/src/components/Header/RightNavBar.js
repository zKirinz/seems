import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import {
    AccountCircle as AccountCircleIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    Receipt as ReceiptIcon,
} from '@mui/icons-material'
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
    Button,
} from '@mui/material'

import { useAuthAction } from '../../recoil/auth'

const RightNavBar = ({ isAuth }) => {
    const history = useHistory()
    const authAction = useAuthAction()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleClickLogin = () => {
        history.push('/login')
    }
    const handleClickLogout = () => {
        authAction.logout()
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {isAuth ? (
                    <React.Fragment>
                        <Tooltip title="Notification">
                            <IconButton size="large" sx={{ mr: 1 }}>
                                <Badge badgeContent={3} color="info">
                                    <NotificationsIcon
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
                    </React.Fragment>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{ fontSize: '1.1rem', color: (theme) => theme.palette.grey[100] }}
                        startIcon={
                            <LoginIcon
                                sx={{
                                    fontSize: '1.6rem!important',
                                    color: (theme) => theme.palette.grey[100],
                                }}
                            />
                        }
                        onClick={handleClickLogin}
                    >
                        Login
                    </Button>
                )}
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
                        <AccountCircleIcon fontSize="large" />
                    </ListItemIcon>
                    <Typography ml={1}>My Profile</Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ReceiptIcon fontSize="large" />
                    </ListItemIcon>
                    <Typography ml={1}>Receipt</Typography>
                </MenuItem>
                <MenuItem onClick={handleClickLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="large" />
                    </ListItemIcon>
                    <Typography ml={1}>Logout</Typography>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default RightNavBar
