import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { Home, Receipt } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EventIcon from '@mui/icons-material/Event'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import {
    Box,
    BottomNavigation,
    BottomNavigationAction,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    IconButton,
    Tooltip,
} from '@mui/material'
import { yellow } from '@mui/material/colors'

const BottomNavigationMobile = () => {
    const [value, setValue] = useState(0)
    const [menu, setMenu] = useState(false)
    const handleChangeNavigation = (event, newValue) => {
        setValue(newValue)
    }

    const toggleDrawer = (open) => {
        setMenu(open)
    }
    const NavLinks = (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
            }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChangeNavigation}
                elevation={5}
                sx={{
                    '& > .Mui-selected': { color: `${yellow[300]} !important` },
                    '& > .MuiBottomNavigationAction-root': {
                        color: (theme) => theme.palette.grey[100],
                    },
                    '& > .Mui-selected:after': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        width: '100%',
                        height: '3px',
                        backgroundColor: yellow[300],
                        left: 0,
                        bottom: 0,
                    },
                    backgroundColor: {
                        sm: 'transparent',
                        xs: 'primary.main',
                    },
                    display: { sm: 'none' },
                }}
            >
                <BottomNavigationAction
                    component={Link}
                    to="/"
                    icon={<Home fontSize="large" />}
                    sx={{ position: 'relative' }}
                />
                <BottomNavigationAction
                    icon={<EventIcon fontSize="large" />}
                    component={Link}
                    to="/events"
                    sx={{ position: 'relative' }}
                />
                <BottomNavigationAction
                    icon={<Receipt fontSize="large" />}
                    component={Link}
                    to="/receipt"
                    sx={{ position: 'relative' }}
                />
            </BottomNavigation>
            <Tooltip title="Menu">
                <IconButton size="large" onClick={() => toggleDrawer(true)}>
                    <MenuIcon fontSize="large" sx={{ color: (theme) => theme.palette.grey[100] }} />
                </IconButton>
            </Tooltip>
        </Box>
    )
    return (
        <React.Fragment>
            {NavLinks}
            <Drawer anchor="right" open={menu} onClose={() => toggleDrawer(false)}>
                <Box sx={{ width: 200 }} role="presentation" onClick={() => toggleDrawer(false)}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="My profile" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </React.Fragment>
    )
}

export default BottomNavigationMobile
