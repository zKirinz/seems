import { Fragment } from 'react'

import Header from '../../components/Header'
import Introduction from '../../components/Header/Introduction'
import { Box, Typography } from '@mui/material'

import CurrentEvent from './CurrentEvent'

const introHeaderImage = {
    title: 'SEEMS',
    desc: 'Nơi các bạn trẻ sinh viên FPT có thể tìm kiếm các sự kiện vui nhộn, giải trí, hấp dẫn kinh doanh và học thuật thuộc đề tài Software.',
    src: 'https://media-exp1.licdn.com/dms/image/C5616AQEMxYQLodosUA/profile-displaybackgroundimage-shrink_200_800/0/1630122993980?e=1648080000&v=beta&t=qRUkeRz5I8u5kb9NweehGZPucpXkmJ6FIEwPCfdZ0Os',
    size: '100% 100%',
}

const paths = [
    {
        path: '/',
        name: 'home',
        text: 'Home',
    },
    {
        path: '/about',
        name: 'about',
        text: 'About',
    },
    {
        path: '/contact',
        name: 'contact',
        text: 'Contact Us',
    },
    {
        path: '/events',
        name: 'events',
        text: 'Events',
    },
]

const currentEvents = [
    {
        id: 1,
        speaker: 'Joseph John',
        time: '10.00 AM - 11.30PM',
        roomNum: '01',
        major: 'Management',
        title: 'Nulla nisl tellus hendrerit nec dignissim pellentesqu posu in est Suspendisse ',
        content:
            'Cras semper, massa vel aliquam luctus, eros odio tempor turpis, ac placerat metus tortor eget magna. Donec mattis posuere pharetra. Donec vestibulum ornare velit ut sollicitudin ut sollicitudin.',
        topics: [
            {
                id: 'GraphicD',
                title: 'Graphic Design',
            },
            {
                id: 'Dev',
                title: 'Development',
            },
            {
                id: 'WebD',
                title: 'Web Design',
            },
        ],
    },
]

const HomePage = () => {
    return (
        <Fragment>
            <Header paths={paths} />
            <Introduction
                src={introHeaderImage.src}
                size={introHeaderImage.size}
                title={introHeaderImage.title}
                desc={introHeaderImage.desc}
            />
            <Box
                component="main"
                sx={{ paddingTop: (theme) => theme.spacing(10), backgroundColor: '#fafafa' }}
            >
                <Typography
                    color="secondary"
                    align="center"
                    sx={{
                        fontWeight: (theme) => theme.typography.fontWeightBold,
                    }}
                    variant="h4"
                    mb={1}
                >
                    Event
                </Typography>
                <Typography
                    align="center"
                    sx={{
                        color: (theme) => theme.palette.grey[800],
                        fontWeight: (theme) => theme.typography.fontWeightBold,
                        textTransform: 'uppercase',
                    }}
                    variant="h4"
                >
                    lịch các sự kiện hiện tại
                </Typography>{' '}
                <Typography
                    component="h1"
                    sx={{
                        fontWeight: (theme) => theme.typography.fontWeightBold,
                        '-webkit-text-stroke': '1px #ce1446',
                        '-webkit-text-fill-color': 'transparent',
                    }}
                    align="center"
                    variant="h3"
                    mt={1}
                >
                    16/01/2022
                </Typography>
                <CurrentEvent currentEvents={currentEvents} />
            </Box>
        </Fragment>
    )
}

export default HomePage
