import { useEffect, useState } from 'react'

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import { useEventAction } from '../../recoil/event'
import { storage } from '../../utils/Firebase'
import Loading from '../Loading'
import UpdateEventForm from './UpdateEventForm'

const UpdateEvent = () => {
    const showSnackbar = useSnackbar()
    const eventActions = useEventAction()
    const { checkIsMyEvent } = useEventAction()
    const { id } = useParams()
    const [error, setError] = useState(null)
    const history = useHistory()
    const { pathname } = useLocation()
    const [updateEventDisable, setUpdateEventDisable] = useState(true)
    // const [activeUpdateDelete, setActiveUpdateDelete] = useState(false)

    useEffect(() => {
        checkIsMyEvent(id)
            .then((response) => {
                const isMine = response.data.data.isMine
                if (isMine === false) {
                    const newUrl = pathname.slice(0, pathname.indexOf('update') - 1)
                    history.push(newUrl)
                } else {
                    setUpdateEventDisable(false)
                }
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const updateEventHandler = ({ eventData, poster }) => {
        eventActions
            .updateEvent(id, eventData)
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
                                .then((downloadURL) =>
                                    eventActions.updateEvent(eventId, {
                                        //Error at here
                                        imageUrl: downloadURL,
                                    })
                                )
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
                console.log(errorResponse.response)
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
            />
        </Box>
    )
}

export default UpdateEvent
