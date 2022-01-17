import { Fragment } from 'react'

import Header from '../../components/Header'
import Introduction from '../../components/Header/Introduction'
import { Box } from '@mui/material'

import CurrentEvent from './CurrentEvent'
import Gallery from './Gallery'

const introHeaderImage = {
    title: 'SEEMS',
    desc: 'Nơi các bạn trẻ sinh viên FPT có thể tìm kiếm các sự kiện vui nhộn, giải trí, hấp dẫn kinh doanh và học thuật thuộc đề tài Software.',
    src: 'https://media-exp1.licdn.com/dms/image/C5616AQEMxYQLodosUA/profile-displaybackgroundimage-shrink_200_800/0/1630122993980?e=1648080000&v=beta&t=qRUkeRz5I8u5kb9NweehGZPucpXkmJ6FIEwPCfdZ0Os',
    size: '100% 100%',
}

const gallery = [
    {
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Telescope.jpg',
        size: 'cover',
    },
    {
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Telescope.jpg',
        size: 'cover',
    },
    {
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Telescope.jpg',
        size: 'cover',
    },
]

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
                sx={{ paddingTop: (theme) => theme.spacing(10), backgroundColor: '#fafafa', px: 5 }}
            >
                <CurrentEvent currentEvents={currentEvents} />
                <Gallery gallery={gallery} />
            </Box>
        </Fragment>
    )
}

export default HomePage
