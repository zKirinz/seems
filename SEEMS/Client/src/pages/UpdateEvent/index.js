import { useEffect, useState } from 'react'

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import { useEventAction } from '../../recoil/event'
import { storage } from '../../utils/Firebase'
import Loading from '../Loading'
import UpdateEventForm from './UpdateEventForm'

const UpdateEvent = () => {
    const showSnackbar = useSnackbar()
    const eventActions = useEventAction()
    const { checkIsMyEvent, deleteEvent, isUpdateEventAvailable } = useEventAction()
    const { id } = useParams()
    const [error, setError] = useState(null)
    const history = useHistory()
    const { pathname } = useLocation()
    const [updateEventDisable, setUpdateEventDisable] = useState(true)

    useEffect(() => {
        checkIsMyEvent(id)
            .then((response) => {
                const isMine = response.data.data.isMine
                if (isMine === false) {
                    const newUrl = pathname.slice(0, pathname.indexOf('update') - 1)
                    history.push(newUrl)
                } else {
                    isUpdateEventAvailable(id)
                        .then((res) => {
                            const isUpdatable = res.data.data.isUpdatable
                            if (isUpdatable === false) {
                                const newUrl = pathname.slice(0, pathname.indexOf('update') - 1)
                                history.push(newUrl)
                            }
                        })
                        .catch(() => {
                            showSnackbar({
                                severity: 'error',
                                children: 'Something went wrong, please try again later.',
                            })
                        })
                    setUpdateEventDisable(false)
                }
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setError(true)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const updateEventHandler = ({ eventData, poster }) => {
        eventActions
            .updateEvent(id, eventData, 1)
            .then((response) => {
                const { id: eventId } = response.data.data

                if (poster.file) {
                    let fileType = 'png'
                    if (poster.file.type.endsWith('jpg')) fileType = 'jpg'
                    else if (poster.file.type.endsWith('jpeg')) fileType = 'jpeg'
                    const storageRef = ref(storage, `event-poster/${eventId}.${fileType}`)
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
                                .then((downloadURL) => {
                                    eventActions.updateEvent(
                                        eventId,
                                        {
                                            ...eventData,
                                            imageUrl: downloadURL,
                                        },
                                        2
                                    )
                                })
                                .then(() => {
                                    showSnackbar({
                                        severity: 'success',
                                        children: 'Update event successfully.',
                                    })
                                    const newUrl = pathname.slice(0, pathname.indexOf('update') - 1)
                                    history.push(newUrl)
                                })
                                .catch(() => {
                                    showSnackbar({
                                        severity: 'error',
                                        children: 'Something went wrong, please try again later.',
                                    })
                                })
                        }
                    )
                } else {
                    showSnackbar({
                        severity: 'success',
                        children: 'Update event successfully.',
                    })
                    const newUrl = pathname.slice(0, pathname.indexOf('update') - 1)
                    history.push(newUrl)
                }
            })
            .catch((errorResponse) => {
                if (errorResponse.response.status === 400) {
                    const errorData = errorResponse.response.data.data
                    setError({
                        title: errorData.title,
                        location: errorData.location,
                        description: errorData.description,
                        startDate: errorData.startDate,
                        endDate: errorData.endDate,
                        registrationDeadline: errorData.registrationDeadline,
                    })
                }
                showSnackbar({
                    severity: 'error',
                    children: 'Update event unsuccessfully',
                })
            })
    }
    const deleteEventHandler = () => {
        deleteEvent(id)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Delete event successfully',
                })
                history.push('/events')
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Delete event unsuccessfully',
                })
            })
    }

    if (error === true) {
        return (
            <Box
                sx={{
                    height: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" fontWeight={700} sx={{ color: grey[800] }}>
                    Something went wrong, does not find the event.
                </Typography>
                <Button variant="contained" sx={{ mt: 1 }} onClick={() => history.goBack()}>
                    Go back
                </Button>
            </Box>
        )
    }

    return updateEventDisable ? (
        <Loading />
    ) : (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }} px={3} pt={10}>
            <Typography color="primary" variant="h3" mb={4} align="center" fontWeight={700}>
                Update Event
            </Typography>
            <UpdateEventForm
                error={error}
                setError={setError}
                updateEventHandler={updateEventHandler}
                id={id}
                deleteEventHandler={deleteEventHandler}
            />
        </Box>
    )
}

export default UpdateEvent
