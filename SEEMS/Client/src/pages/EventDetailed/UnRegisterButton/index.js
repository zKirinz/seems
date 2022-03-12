import { useState } from 'react'

import { Cancel as CancelIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const UnRegisterButton = ({ eventId, resetHandler, registrationDeadline }) => {
    const eventAction = useEventAction()
    const showSnackbar = useSnackbar()
    const [isLoading, setIsLoading] = useState(false)
    let isOutOfRegistrationDate = false

    if (registrationDeadline) {
        isOutOfRegistrationDate =
            new Date().getTime() - new Date(registrationDeadline).getTime() > 0
    }

    const unregisterHandler = () => {
        setIsLoading(true)
        setTimeout(() => {
            eventAction
                .unregisterEvent(eventId)
                .then(() => {
                    showSnackbar({
                        severity: 'success',
                        children: 'Unregister successfully.',
                    })
                    resetHandler()
                    setIsLoading(false)
                })
                .catch(() => {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                    setIsLoading(false)
                })
        }, 2000)
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 30,
                right: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {isOutOfRegistrationDate && (
                <Typography sx={{ mb: 1 }} color="error">
                    Out of register time
                </Typography>
            )}
            <LoadingButton
                loading={isLoading}
                disabled={isOutOfRegistrationDate}
                loadingPosition="start"
                startIcon={<CancelIcon />}
                variant="contained"
                color="secondary"
            >
                Unregister
            </LoadingButton>
        </Box>
    )
}

export default UnRegisterButton
