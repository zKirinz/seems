import { Fragment } from 'react'

import BottomNavigationMobile from '../../components/BottomNavigation'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

import Introduction from './Introduction'
import CurrentEvent from './UpcomingEvents'

const introHeaderImage = {
    title: 'SEEMS',
    desc: 'Where FPT students will have the opportunity to enhance technical skills as well as soft skill through  many software academic events and activities related to modern technologies.',
    src: 'https://media-exp1.licdn.com/dms/image/C5616AQEMxYQLodosUA/profile-displaybackgroundimage-shrink_200_800/0/1630122993980?e=1648080000&v=beta&t=qRUkeRz5I8u5kb9NweehGZPucpXkmJ6FIEwPCfdZ0Os',
    alt: 'introduction-image',
}

const currentEvents = [
    {
        id: 1,
        banner: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Techpeek.png',
        time: '20-10-2022',
        mode: 'Offline',
        title: 'Nulla nisl tellus hendrerit nec dignissim pellentesqu posu in est Suspendisse ',
        content:
            'Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum ornare velit ut sollicitudin ut sollicitudin.',
    },
    {
        id: 2,
        banner: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Techpeek.png',
        time: '20-10-2022',
        mode: 'Online',
        title: 'Nulla nisl tellus hendrerit nec dignissim pellentesqu posu in est Suspendisse ',
        content:
            'Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum ornare velit ut sollicitudin ut sollicitudin.',
    },
]

const HomePage = () => {
    return (
        <Fragment>
            <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }}>
                <Introduction
                    src={introHeaderImage.src}
                    size={introHeaderImage.size}
                    title={introHeaderImage.title}
                    desc={introHeaderImage.desc}
                />
                <Box sx={{ pt: 10, backgroundColor: grey[200], px: 5 }}>
                    <CurrentEvent currentEvents={currentEvents} />
                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <BottomNavigationMobile />
                </Box>
            </Box>
        </Fragment>
    )
}

export default HomePage
