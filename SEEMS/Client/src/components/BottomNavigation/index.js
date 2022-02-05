import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Home, Info, Event } from '@mui/icons-material'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { yellow, grey } from '@mui/material/colors'

const getPageIndex = (route) => {
    switch (route) {
        case '/':
            return 0
        case '/events':
            return 1
        case '/about':
            return 2
        case '/receipt':
            return 3
        default:
            return 0
    }
}

const BottomNavigationMobile = () => {
    const location = useLocation()
    const value = getPageIndex(location.pathname)

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
                elevation={5}
                sx={{
                    '& > .Mui-selected': { color: `${yellow[300]} !important` },
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
                    backgroundColor: 'primary.main',
                }}
            >
                <BottomNavigationAction
                    icon={<Home fontSize="large" />}
                    sx={{ position: 'relative', color: grey[100] }}
                    component={Link}
                    to="/"
                    exact="true"
                />
                <BottomNavigationAction
                    icon={<Event fontSize="large" />}
                    sx={{ position: 'relative', color: grey[100] }}
                    component={Link}
                    to="/events"
                />
                <BottomNavigationAction
                    icon={<Info fontSize="large" />}
                    sx={{ position: 'relative', color: grey[100] }}
                    component={Link}
                    to="/about"
                />
            </BottomNavigation>
        </Box>
    )
    return <React.Fragment>{NavLinks}</React.Fragment>
}

export default BottomNavigationMobile
