import React from 'react'

import Hero from '../../components/Hero'
import { Box } from '@mui/material'

import UpComingEventsOverView from './UpcomingEventsOverview'

const upComingEvents = [
    {
        id: 1,
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Techpeek.png',
        time: '20-10-2022',
        title: 'Nulla nisl tellus hendrerit nec dignissim pellentesqu posu in est Suspendisse ',
        content:
            'Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum ornare velit ut sollicitudin ut sollicitudin.',
    },
    {
        id: 2,
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Techpeek.png',
        time: '20-10-2022',
        title: 'Nulla nisl tellus hendrerit nec dignissim pellentesqu posu in est Suspendisse ',
        content:
            'Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum ornare velit ut sollicitudin ut sollicitudin.',
    },
]

const PublicHome = () => {
    return (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }}>
            <Hero />
            <Box px={5} py={12}>
                <UpComingEventsOverView upComingEvents={upComingEvents} />
            </Box>
        </Box>
    )
}

export default PublicHome
