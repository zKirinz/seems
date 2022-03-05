import { Box, Button } from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'
import useEventAction from '../../../recoil/event/action'

const UnRegisterButton = ({ eventId, resetHandler }) => {
    const eventAction = useEventAction()
    const showSnackbar = useSnackbar()

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
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }} onClick={unregisterHandler}>
            <Button variant="contained" color="secondary">
                Unregister
            </Button>
        </Box>
    )
}

export default UnRegisterButton
