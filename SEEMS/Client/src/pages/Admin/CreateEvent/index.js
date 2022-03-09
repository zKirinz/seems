import React, { useState } from 'react'

import { useHistory, useLocation } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useEventAction } from '../../../recoil/event'
import CreateEventForm from './CreateEventForm'

const CreateEvent = () => {
    const eventActions = useEventAction()
    const [error, setError] = useState(null)
    const history = useHistory()
    const { pathname } = useLocation()
    const showSnackbar = useSnackbar()
    const createEventHandler = (eventData) => {
        eventActions
            .createEvent(eventData)
            .then((response) => {
                showSnackbar({
                    severity: 'success',
                    children: 'Create event successfully.',
                })
                const { id } = response.data.data
                const newUrl = pathname.slice(0, pathname.indexOf('create'))
                history.push(`${newUrl}${id}`)
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    const errorData = error.response.data.data
                    setError({
                        title: errorData.title,
                        location: errorData.location,
                        description: errorData.description,
                        startDate: errorData.startDate,
                        endDate: errorData.endDate,
                        registrationDeadline: errorData.registrationDeadline,
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
