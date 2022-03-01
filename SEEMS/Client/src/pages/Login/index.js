import { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import GoogleButton from '../../components/Buttons/GoogleButton'
import Carousel from '../../components/Carousel'
import Copyright from '../../components/Copyright'
import { Typography, Grid, CssBaseline, Box, Avatar, Paper } from '@mui/material'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import Logo from '../../assets/images/logo.png'
import { APP_API_URL } from '../../config'
import { useAuthAction } from '../../recoil/auth'
import Loading from '../Loading'

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
    const authAction = useAuthAction()
    const { token, error } = queryString.parse(search)
    const [isLoading, setIsLoading] = useState(token ? true : false)
    const showSnackbar = useSnackbar()

    useEffect(() => {
        if (error && error === 'fpt-invalid-email') {
            showSnackbar({ severity: 'error', children: 'Your email is not allowed to access.' })
        } else if (error && error === 'inactive-user') {
            showSnackbar({
                severity: 'error',
                children: 'Your email is banned, please contact Admin to unban.',
            })
        } else if (error) {
            showSnackbar({
                severity: 'error',
                children: 'Something went wrong, please try again later.',
            })
        } else if (token) {
            authAction.login(token).catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setIsLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const googleClickHandler = () => {
        window.location.assign(`${APP_API_URL}/api/Authentication`)
    }

    return isLoading ? (
        <Loading />
    ) : (
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
