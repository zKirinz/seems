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

import Contact from './Contact'
import Members from './Members'

const aboutImage = {
    src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png',
    alt: 'school image',
}

const methodsContact = [
    {
        name: 'Location',
        content: 'Trường Đại học FPT TP. HCM, Khu Công Nghệ Cao, Thành Phố Thủ Đức.',
    },
    {
        name: 'Phone',
        content: '0948264246',
    },
    {
        name: 'Email',
        content: 'hienbui69g@gmail.com',
    },
]

const About = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))
    return (
        <Box component="main" px={8} pt={10} sx={{ mt: { sx: 0, sm: 8.5 } }}>
            <Typography color="primary" variant="h3" mb={4} align="center" fontWeight={700}>
                About Us
            </Typography>
            <Grid container columns={{ md: 10, xs: 12 }} component={Card}>
                <Grid item xs={12} md={5} position="relative" component={Paper}>
                    <CardMedia
                        image={aboutImage.src}
                        alt={aboutImage.alt}
                        component="img"
                        height="100%"
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <CardContent sx={{ p: 5 }}>
                        <Typography
                            paragraph
                            mt={1}
                            sx={{ color: grey[600] }}
                            fontWeight={500}
                            variant={`${matches ? 'h6' : 'subtitle1'}`}
                        >
                            ✨ We are a group of five FPT students studying Software Engineer in FPT
                            university with a great passion for learning and practicing technologies
                            to create meaningful softwares.
                        </Typography>
                        <Typography
                            paragraph
                            mt={1}
                            sx={{ color: grey[600] }}
                            fontWeight={500}
                            variant={`${matches ? 'h6' : 'subtitle1'}`}
                        >
                            ✨ Everyday, There are many interesting and quality technology events
                            occur as well as the number of people missed it. The same situation is
                            happening in FPT University.
                        </Typography>
                        <Typography
                            paragraph
                            mt={1}
                            sx={{ color: grey[600] }}
                            fontWeight={500}
                            variant={`${matches ? 'h6' : 'subtitle1'}`}
                        >
                            ✨ Therefore, in order to bring together FPT students who is interested
                            in technology events as well as for event organizers to approach viewers
                            easily, we create an amazing platform that help students and organizers
                            track and manage events.
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            <Box pt={6}>
                <Members />
            </Box>
            <Box pt={6} pb={10}>
                <Contact contacts={methodsContact} />
            </Box>
        </Box>
    )
}

export default About
