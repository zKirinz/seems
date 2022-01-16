import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { Logout, Notifications } from '@mui/icons-material'
import {
    Badge,
    IconButton,
    Avatar,
    Tooltip,
    Box,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    Typography,
} from '@mui/material'
import { deepOrange } from '@mui/material/colors'

import style from './RightNavBar.module.css'

const RightNavBar = ({ paths }) => {
    const [myAccountSettings, setMyAccountSetting] = useState(null)
    const open = Boolean(myAccountSettings)

    const openAccountSettings = (event) => {
        setMyAccountSetting(event.currentTarget)
    }
    const closeAccountSettings = () => {
        setMyAccountSetting(null)
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-end' },
                    height: '100%',
                }}
            >
                {paths.map((path) => (
                    <NavLink
                        key={path.name}
                        className={style.anchorLink}
                        to={path.path}
                        activeClassName={style.isActive}
                    >
                        <Typography
                            sx={{ mr: 3, fontSize: { sm: 14 } }}
                            align="center"
                            component="span"
                        >
                            {path.text}
                        </Typography>
                    </NavLink>
                ))}
                <IconButton sx={{ mr: 1, minWidth: 60 }}>
                    <Badge badgeContent={4} color="primary" overlap="circular" variant="dot">
                        <Notifications sx={{ color: (theme) => theme.palette.grey[100] }} />
                    </Badge>
                </IconButton>
                <Tooltip title="Account Settings">
                    <IconButton onClick={openAccountSettings} size="small">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }}>H</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={myAccountSettings}
                id="account-menu"
                open={open}
                onClose={closeAccountSettings}
                onClick={closeAccountSettings}
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
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default RightNavBar
