import { Box, Button, Typography } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const UnRegisterButton = ({ eventId, resetHandler, registrationDeadline }) => {
    const eventAction = useEventAction()
    const showSnackbar = useSnackbar()
    let isOutOfRegistrationDate = false

    if (registrationDeadline) {
        isOutOfRegistrationDate =
            new Date().getTime() - new Date(registrationDeadline).getTime() > 0
    }

    const unregisterHandler = () => {
        eventAction
            .unregisterEvent(eventId)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Unregister successfully.',
                })
                resetHandler()
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
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
            onClick={unregisterHandler}
        >
            {isOutOfRegistrationDate && (
                <Typography sx={{ mb: 1 }} color="error">
                    Out of register time
                </Typography>
            )}
            <Button variant="contained" color="secondary" disabled={isOutOfRegistrationDate}>
                Unregister
            </Button>
        </Box>
    )
}

export default UnRegisterButton
