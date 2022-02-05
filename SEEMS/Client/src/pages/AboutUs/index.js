import React from 'react'

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Paper,
    CardMedia,
    useMediaQuery,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import BTH from '../../assets/members/BTH.jpg'
import DGP from '../../assets/members/DGP.jpg'
import LTT from '../../assets/members/LTT.jpg'
import NKN from '../../assets/members/NKN.jpg'
import TTK from '../../assets/members/TTK.jpg'
import Contact from './Contact'
import Staffs from './Staff'

const aboutImage = {
    src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png',
    alt: 'school image',
}

const methodsContact = [
    {
        name: 'Location',
        content: 'Trường Đại học FPT TP. HCM, Khu Công Nghệ Cao, Long Thạnh Mỹ, Thành Phố Thủ Đức.',
    },
    {
        name: 'Phone',
        content: '0948264856',
    },
    {
        name: 'Email',
        content: 'hachimanyukinoyui774@gmail.com',
    },
]

const staffs = [
    {
        id: 1,
        src: NKN,
        name: 'Nguyễn Khôi Nguyên',
        grade: 'K13',
        role: 'Leader Backend Developer',
    },
    {
        id: 2,
        src: LTT,
        name: 'Lê Tiến Thịnh',
        grade: 'K15',
        role: 'Backend Developer',
    },
    {
        id: 3,
        src: DGP,
        name: 'Dương Gia Phát',
        grade: 'K14',
        role: 'Backend Developer',
    },
    {
        id: 4,
        src: TTK,
        name: 'Trần Trung Kiên',
        grade: 'K15',
        role: 'Leader Frontend Developer',
    },
    {
        id: 5,
        src: BTH,
        name: 'Bùi Thế Hiển',
        grade: 'K15',
        role: 'Frontend Developer',
    },
]

const About = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
    return (
        <React.Fragment>
            <Box component="main" px={5} pt={5} sx={{ mt: { sx: 0, sm: 8.5 } }}>
                <Typography color="primary" variant="h3" mb={2} align="center" fontWeight={700}>
                    About Us
                </Typography>
                <Grid container columns={{ md: 10, xs: 12 }} component={Card}>
                    <Grid item xs={12} md={6} position="relative" component={Paper}>
                        <CardMedia
                            image={aboutImage.src}
                            alt={aboutImage.alt}
                            component="img"
                            height="100%"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardContent sx={{ p: 3.5 }}>
                            <Typography
                                paragraph
                                mt={1}
                                sx={{ color: grey[600] }}
                                fontWeight={500}
                                variant={`${matches ? 'h6' : 'subtitle1'}`}
                            >
                                We are a group of five FPT student studying Software Engineer in FPT
                                university. We have a great passion for researching and learning
                                technology with a desire to be able to contribute to software
                                developing community and help the country in the future. We have
                                participated a bunch of event and competition related to information
                                technology, then realize that give us great moment and we study a
                                lot of knowledge after each event.
                            </Typography>
                            <Typography
                                paragraph
                                mt={1}
                                sx={{ color: grey[600] }}
                                fontWeight={500}
                                variant={`${matches ? 'h6' : 'subtitle1'}`}
                            >
                                Therefore, an idea was emerged. In order to bring together a group
                                of remarkable FPT students with a great passion for coding and
                                organizing event, to see if we could create something new to change
                                this world.Our team having some expertise in the production of
                                extraordinary events for private and corporate customers, we
                                configuration, plan and deal with each undertaking from origination
                                to execution. In here, you can discover and find the event that
                                suitable for you. Enjoy our website!
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
                <Staffs staffs={staffs} />
                <Contact contacts={methodsContact} />
            </Box>
        </React.Fragment>
    )
}

export default About
