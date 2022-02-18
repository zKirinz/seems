import React from 'react'

import Hero from '../../components/Hero'
import { Box } from '@mui/material'

import UpComingEventsOverView from './UpcomingEventsOverview'

const PublicHome = () => {
    return (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }}>
            <Hero />
            <Box px={5} py={12}>
                <UpComingEventsOverView />
            </Box>
        </Box>
    )
}

export default PublicHome
