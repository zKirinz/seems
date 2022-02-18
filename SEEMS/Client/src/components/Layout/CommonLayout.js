import React from 'react'

import { Box } from '@mui/material'

import BottomNavigationMobile from '../BottomNavigation'
import Footer from '../Footer'
import { CommonHeader } from '../Header'

const CommonLayout = ({ children }) => {
    return (
        <React.Fragment>
            <CommonHeader />
            {children}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <BottomNavigationMobile />
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default CommonLayout
