import React, { useEffect, useState } from 'react'

import CreateEventForm from '../../components/CreateEventForm'
import { Box, Grid, Paper, Typography } from '@mui/material'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const EventRegistration = () => {
    const [posterUrl, setPosterUrl] = useState(src)

    useEffect(() => {
        return () => {
            posterUrl && URL.revokeObjectURL(posterUrl)
        }
    }, [posterUrl])

    const uploadImageHandler = (event) => {
        const imageUrl = URL.createObjectURL(event.target.files[0])
        setPosterUrl(imageUrl)
    }

    return (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }} px={3} pt={10}>
            <Typography color="primary" variant="h3" mb={4} align="center" fontWeight={700}>
                Create Event
            </Typography>
            <Grid container component={Paper} elevation={3}>
                <Grid item xs={12} sm={5}>
                    <Box display="flex" alignItems="center" height="100%">
                        <Box
                            component="img"
                            alt="school-image"
                            src={posterUrl}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <CreateEventForm uploadImageHandler={uploadImageHandler} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default EventRegistration
