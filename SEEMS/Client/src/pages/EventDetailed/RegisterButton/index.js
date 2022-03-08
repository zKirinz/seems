import { Box, Button, Typography } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const RegisterButton = ({ eventId, resetHandler, canRegister }) => {
    const eventAction = useEventAction()
    const showSnackbar = useSnackbar()

    const registerHandler = () => {
        eventAction
            .registerEvent(eventId)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Register successfully.',
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
            onClick={registerHandler}
        >
            {canRegister && (
                <Typography sx={{ mb: 1 }} color="error">
                    No more slot available
                </Typography>
            )}
            <Button variant="contained" disabled={!canRegister}>
                Register
            </Button>
        </Box>
    )
}

export default RegisterButton
