import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import CreateEventForm from '../../components/CreateEventForm'
import { Box, Typography } from '@mui/material'

import { useEventAction } from '../../recoil/event'

const CreateEvent = () => {
    const eventActions = useEventAction()
    const history = useHistory()
    const [error, setError] = useState({
        title: null,
        location: null,
        description: null,
        expectPrice: null,
        startDate: null,
        endDate: null,
    })

    const createEventHandler = (eventData) => {
        eventActions
            .createEvent(eventData)
            .then(() => {
                history.push('/events')
            })
            .catch((errorResponse) => {
                if (errorResponse.response.status === 400) {
                    const errorData = errorResponse.response.data.data

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

export default CreateEvent
