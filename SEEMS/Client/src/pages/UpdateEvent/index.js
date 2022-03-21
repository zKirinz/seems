import { useLayoutEffect, useState } from 'react'

import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import { useEventAction } from '../../recoil/event'
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

    useLayoutEffect(() => {
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
    const updateEventHandler = (eventData) => {
        eventActions
            .updateEvent(id, eventData)
            .then(() => {
                console.log(eventData)
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
