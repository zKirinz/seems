import React, { useEffect, useState } from 'react'

import objectAssign from 'object-assign'

import CreateEventForm from '../../components/CreateEventForm'
import { Box, Grid, Paper, Typography } from '@mui/material'

import { useEventAction } from '../../recoil/event'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const EventRegistration = () => {
    const eventAction = useEventAction()
    const [posterUrl, setPosterUrl] = useState({ src })
    const [error, setError] = useState({
        title: null,
        location: null,
        description: null,
        expectPrice: null,
        startDate: null,
        endDate: null,
    })
    useEffect(() => {
        return () => {
            posterUrl.src && URL.revokeObjectURL(posterUrl.src)
        }
    }, [posterUrl])

    const uploadImageHandler = (event) => {
        const imageUrl = URL.createObjectURL(event.target.files[0])
        setPosterUrl({ src: imageUrl })
    }
    const createEventHandler = async (eventData) => {
        const fullEventData = objectAssign(eventData, { imageUrl: src })
        eventAction.createEvent(fullEventData).catch((errorResponse) => {
            if (errorResponse.status === 400) {
                const errorData = errorResponse.data.data
                setError({
                    title: errorData.title,
                    location: errorData.location,
                    description: errorData.description,
                    expectPrice: errorData.expectPrice,
                    startDate: errorData.startDate,
                    endDate: errorData.endDate,
                })
            }
        })
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
                            src={posterUrl.src}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <CreateEventForm
                        onUploadImage={uploadImageHandler}
                        onCreateEvent={createEventHandler}
                        error={error}
                        setError={setError}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default EventRegistration
