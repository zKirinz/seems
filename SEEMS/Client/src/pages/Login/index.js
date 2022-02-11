import { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import GoogleButton from '../../components/Buttons/GoogleButton'
import Carousel from '../../components/Carousel'
import Copyright from '../../components/Copyright'
import { Typography, Grid, CssBaseline, Box, Avatar, Paper } from '@mui/material'

import Logo from '../../assets/images/logo.png'
import { APP_API_URL } from '../../config'

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
    const { search } = useLocation()
    const { error } = queryString.parse(search)
    const [loginError, setLoginError] = useState('')

    useEffect(() => {
        if (error && error === 'fpt-email-invalid') {
            setLoginError('Your email is not valid')
        } else if (error && error === 'unexpected') {
            setLoginError('Something went wrong, please try again later.')
        }
    }, [error])

    const googleClickHandler = () => {
        window.location.assign(`${APP_API_URL}/api/Authentication`)
    }

    return (
        <Grid container component="main" height="100vh" overflow="hidden">
            <CssBaseline />
            <Grid item xs={0} sm={4} md={7} position="relative" overflow="hidden">
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
                        <GoogleButton onClick={googleClickHandler} />
                        <Typography variant="subtitle1" textAlign="center" color="error.main">
                            {loginError}
                        </Typography>
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
