import { Box, Button } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const RegisterButton = ({ eventId, resetHandler }) => {
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
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
            <Button variant="contained" onClick={registerHandler}>
                Register
            </Button>
        </Box>
    )
}

export default RegisterButton
