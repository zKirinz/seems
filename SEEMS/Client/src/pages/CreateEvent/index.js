import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'

import { useChainOfEventAction } from '../../recoil/chainOfEvent'
import { useEventAction } from '../../recoil/event'
import CreateEventForm from './CreateEventForm'

const CreateEvent = () => {
    const eventActions = useEventAction()
    const chainOfEventActions = useChainOfEventAction()
    const [error, setError] = useState(null)

    const createEventHandler = (eventData) => {
        eventActions.createEvent(eventData).catch((errorResponse) => {
            if (errorResponse.response.status === 400) {
                const errorData = errorResponse.response.data.data
                setError({
                    title: errorData.title,
                    location: errorData.location,
                    description: errorData.description,
                    startDate: errorData.startDate,
                    endDate: errorData.endDate,
                })
            }
        })
    }
    const createChainOfEventHandler = (chainOfEventsData) => {
        return chainOfEventActions.createChainOfEvent(chainOfEventsData)
    }
    const loadChainOfEventListHandler = () => {
        return chainOfEventActions.getListChainOfEvent()
    }
    return (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }} px={3} pt={10}>
            <Typography color="primary" variant="h3" mb={4} align="center" fontWeight={700}>
                Create Event
            </Typography>
            <CreateEventForm
                onCreateEvent={createEventHandler}
                error={error}
                setError={setError}
                onCreateChainOfEvent={createChainOfEventHandler}
                onLoadChainOfEvent={loadChainOfEventListHandler}
            />
        </Box>
    )
}

export default CreateEvent
