import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import { useEventAction } from '../../recoil/event'
import UpdateEventForm from './UpdateEventForm'

const UpdateEvent = () => {
    const showSnackbar = useSnackbar()
    const { getDetailedEvent } = useEventAction()
    const { id } = useParams()
    const [myEvent, setMyEvent] = useState(null)
    useEffect(() => {
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
    return (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }} px={3} pt={10}>
            <Typography color="primary" variant="h3" mb={4} align="center" fontWeight={700}>
                Update Event
            </Typography>
            <UpdateEventForm event={myEvent} />
        </Box>
    )
}

export default UpdateEvent
