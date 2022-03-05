import { useEffect, useState } from 'react'

import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import { useEventAction } from '../../recoil/event'
import UpdateEventForm from './UpdateEventForm'

const UpdateEvent = () => {
    const showSnackbar = useSnackbar()
    const eventActions = useEventAction()
    const { getDetailedEvent, checkIsMyEvent } = useEventAction()
    const { id } = useParams()
    const [myEvent, setMyEvent] = useState({})
    const [error, setError] = useState(null)
    const history = useHistory()
    const { pathname } = useLocation()

    useEffect(() => {
        checkIsMyEvent(id)
            .then((response) => {
                const isMine = response.data.data.isMine
                if (isMine === false) {
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

        getDetailedEvent(id)
            .then((response) => {
                const { event: responseEvent } = response.data.data
                setMyEvent(responseEvent)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const updateEventHandler = (eventData) => {
        eventActions
            .updateEvent(id, eventData)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Update event successfully.',
                })
                const newUrl = pathname.slice(0, pathname.indexOf('update') - 1)
                history.push(newUrl)
            })
            .catch((errorResponse) => {
                if (errorResponse.response.status === 400) {
                    const errorData = errorResponse.response.data.data
                    setError({
                        title: errorData.title,
                        location: errorData.location,
                        description: errorData.description,
                    })
                }
                showSnackbar({
                    severity: 'error',
                    children: 'Update event unsuccessfully',
                })
            })
    }
    return (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }} px={3} pt={10}>
            <Typography color="primary" variant="h3" mb={4} align="center" fontWeight={700}>
                Update Event
            </Typography>
            <UpdateEventForm
                event={myEvent}
                error={error}
                setError={setError}
                updateEventHandler={updateEventHandler}
            />
        </Box>
    )
}

export default UpdateEvent
