import GoogleButton from '../components/Buttons/GoogleButton'
import Carousel from '../components/Carousel'
import Copyright from '../components/Copyright'
import { Typography, Grid, CssBaseline, Box, Avatar, Paper } from '@mui/material'

import Logo from '../assets/images/logo.png'

const imageList = [
    {
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png',
        size: 'cover',
    },
    {
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134780/Zoohackathon.png',
        size: 'contain',
    },
    {
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Telescope.jpg',
        size: 'contain',
    },
    {
        src: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642134779/Techpeek.png',
        size: 'contain',
    },
]

const Login = () => {
    return (
        <Grid container component="main" height="100vh" overflow="hidden">
            <CssBaseline />
            <Grid item xs={0} sm={4} md={7} position="relative">
                <Carousel imageList={imageList} />
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                component={Paper}
                elevation={12}
                square
            >
                <Box
                    sx={{
                        my: 6,
                        mx: 4,
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4" textAlign="center" color="primary.main">
                        LOOKING FOR <strong>EVENTS?</strong>
                    </Typography>
                    <Avatar src={Logo} alt="SEEMS logo" sx={{ width: 200, height: 80 }}></Avatar>
                    <Typography variant="h6" textAlign="center" color="primary.light">
                        The SE Event Management System
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <GoogleButton />
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography
                                    variant="subtitle2"
                                    textAlign="center"
                                    color="primary.dark"
                                >
                                    Only @fpt.edu.vn account is allowed
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright />
            </Grid>
        </Grid>
    )
}

export default Login