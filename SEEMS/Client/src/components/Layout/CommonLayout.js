import React from 'react'

import { Box } from '@mui/material'

import BottomNavigationMobile from '../BottomNavigation'
import Footer from '../Footer'
import Header from '../Header'

const CommonLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <BottomNavigationMobile />
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default CommonLayout
