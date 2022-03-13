import { useState } from 'react'

import { AppRegistration as AppRegistrationIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const RegisterButton = ({ eventId, resetHandler, canRegister, registrationDeadline }) => {
    const eventAction = useEventAction()
    const showSnackbar = useSnackbar()
    const [isLoading, setIsLoading] = useState(false)
    let isOutOfRegistrationDate = false

    if (registrationDeadline) {
        isOutOfRegistrationDate =
            new Date().getTime() - new Date(registrationDeadline).getTime() > 0
    }
    const registerHandler = () => {
        setIsLoading(true)
        setTimeout(() => {
            eventAction
                .registerEvent(eventId)
                .then(() => {
                    showSnackbar({
                        severity: 'success',
                        children: 'Register successfully.',
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
            {!isOutOfRegistrationDate && !canRegister && (
                <Typography sx={{ mb: 1 }} color="error">
                    No more slot available
                </Typography>
            )}
            {isOutOfRegistrationDate && (
                <Typography sx={{ mb: 1 }} color="error">
                    Out of register time
                </Typography>
            )}
            <LoadingButton
                loading={isLoading}
                disabled={isOutOfRegistrationDate || !canRegister}
                loadingPosition="start"
                startIcon={<AppRegistrationIcon />}
                variant="contained"
                onClick={registerHandler}
            >
                Register
            </LoadingButton>
        </Box>
    )
}

export default RegisterButton
