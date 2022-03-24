import React, { useState } from 'react'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useHistory, useLocation } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import { useEventAction } from '../../../recoil/event'
import { storage } from '../../../utils/Firebase'
import CreateEventForm from './CreateEventForm'

const CreateEvent = () => {
    const eventActions = useEventAction()
    const [error, setError] = useState(null)
    const history = useHistory()
    const { pathname } = useLocation()
    const showSnackbar = useSnackbar()
    const createEventHandler = ({ eventData, poster }) => {
        return eventActions
            .createEvent(eventData)
            .then((response) => {
                const { id } = response.data.data

                if (poster.file) {
                    let fileType = 'png'
                    if (poster.file.type.endsWith('jpg')) fileType = 'jpg'
                    else if (poster.file.type.endsWith('jpeg')) fileType = 'jpeg'
                    const storageRef = ref(storage, `event-poster/${id}.${fileType}`)
                    const uploadTask = uploadBytesResumable(storageRef, poster.file)

                    uploadTask.on(
                        'state_changed',
                        () => {},
                        () => {
                            showSnackbar({
                                severity: 'error',
                                children: 'Something went wrong, cannot upload event poster.',
                            })
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) =>
                                    eventActions.updateEvent(
                                        id,
                                        {
                                            ...eventData,
                                            imageUrl: downloadURL,
                                        },
                                        1
                                    )
                                )
                                .then(() => {
                                    showSnackbar({
                                        severity: 'success',
                                        children: 'Create event successfully.',
                                    })
                                    const newUrl = pathname.slice(0, pathname.indexOf('create'))
                                    history.push(`${newUrl}${id}`)
                                })
                                .catch(() =>
                                    showSnackbar({
                                        severity: 'error',
                                        children: 'Something went wrong, please try again later.',
                                    })
                                )
                        }
                    )
                } else {
                    showSnackbar({
                        severity: 'success',
                        children: 'Create event successfully.',
                    })
                    const newUrl = pathname.slice(0, pathname.indexOf('create'))
                    history.push(`${newUrl}${id}`)
                }
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
