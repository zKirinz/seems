import { Box, Button } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const RegisterButton = ({ eventId }) => {
    const eventAction = useEventAction()
    const showSnackbar = useSnackbar()

    const registerHandler = () => {
        eventAction
            .registerEvent(eventId)
            .then(() => {
                showSnackbar({
                    severity: 'success',
                    children: 'Something went wrong, please try again later.',
                })
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
    }

    return (
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }} onClick={registerHandler}>
            <Button variant="contained">Register</Button>
        </Box>
    )
}

export default RegisterButton
