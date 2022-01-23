import { Fragment } from 'react'

import BottomNavigationMobile from '../../components/BottomNavgation'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Introduction from '../../components/Header/Introduction'
import { Box } from '@mui/material'

import AboutUs from './AboutUs/index'
import Contact from './Contact'
import Staffs from './Staff'
import CurrentEvent from './UpcomingEvents'

const introHeaderImage = {
    title: 'SEEMS',
    desc: 'Where FPT students will have the opportunity to enhance technical skills as well as soft skill through  many software academic events and activities related to modern technologies.',
    src: 'https://media-exp1.licdn.com/dms/image/C5616AQEMxYQLodosUA/profile-displaybackgroundimage-shrink_200_800/0/1630122993980?e=1648080000&v=beta&t=qRUkeRz5I8u5kb9NweehGZPucpXkmJ6FIEwPCfdZ0Os',
    size: '100% 100%',
}

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
        id: 2,
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
const aboutImage = {
    src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png',
    alt: 'school image',
}
const staffs = [
    {
        id: 1,
        src: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/103443255_2761752794044416_7990135765714193388_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=4qWmtQTcT24AX977Wmn&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT_UlBxRZARTMta7ceMoDkO3ja6NmXbldI5XRERD8hRsnw&oe=620ABA7C',
        name: 'Hachiman Hikigaya',
        description: 'Description here',
        role: 'Role here',
    },
    {
        id: 2,
        src: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/103443255_2761752794044416_7990135765714193388_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=4qWmtQTcT24AX977Wmn&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT_UlBxRZARTMta7ceMoDkO3ja6NmXbldI5XRERD8hRsnw&oe=620ABA7C',
        name: 'Hachiman Hikigaya',
        description: 'Description here',
        role: 'Role here',
    },
    {
        id: 3,
        src: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/103443255_2761752794044416_7990135765714193388_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=4qWmtQTcT24AX977Wmn&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT_UlBxRZARTMta7ceMoDkO3ja6NmXbldI5XRERD8hRsnw&oe=620ABA7C',
        name: 'Hachiman Hikigaya',
        description: 'Description here',
        role: 'Role here',
    },
]

const methodsContact = [
    {
        name: 'Location',
        content: 'XYZ Address',
    },
    {
        name: 'Phone',
        content: '0904******',
    },
    {
        name: 'Email',
        content: 'XYZ@event.com',
    },
]

const HomePage = () => {
    return (
        <Fragment>
            <Header />
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
                <Staffs staffs={staffs} />
                <AboutUs image={aboutImage} />
                <Contact contacts={methodsContact} />
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <BottomNavigationMobile />
            </Box>
            <Footer />
        </Fragment>
    )
}

export default HomePage
