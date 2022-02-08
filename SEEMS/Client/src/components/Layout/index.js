import React from 'react'

import { useLocation } from 'react-router-dom'

import { Box } from '@mui/material'

import BottomNavigationMobile from '../BottomNavigation'
import Footer from '../Footer'
import Header from '../Header'

const Layout = ({ children }) => {
    const location = useLocation()
    const isLoginPage = location.pathname === '/login'
    return (
        <React.Fragment>
            {!isLoginPage && <Header />}
            {children}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <BottomNavigationMobile />
            </Box>
            {!isLoginPage && <Footer />}
        </React.Fragment>
    )
}

export default Layout
