import React from 'react'

import Hero from '../../../components/Hero'
import { Box } from '@mui/material'

import UpComingEvents from './UpcomingEvents'

const PrivateHome = () => {
    return (
        <Box component="main" sx={{ mt: 8.5 }}>
            <Hero />
            <Box px={5} py={12}>
                <UpComingEvents />
            </Box>
        </Box>
    )
}

export default PrivateHome
