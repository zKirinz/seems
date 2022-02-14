import React, { useState } from 'react'

import objectAssign from 'object-assign'

import CreateEventForm from '../../components/CreateEventForm'
import { Box, Typography } from '@mui/material'

import { useEventAction } from '../../recoil/event'

const EventRegistration = () => {
    const eventAction = useEventAction()
    const [error, setError] = useState({
        title: null,
        location: null,
        description: null,
        expectPrice: null,
        startDate: null,
        endDate: null,
    })

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
            <CreateEventForm onCreateEvent={createEventHandler} error={error} setError={setError} />
        </Box>
    )
}

export default EventRegistration
