import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button } from '@mui/material'

const EditEventButton = () => {
    const history = useHistory()
    const location = useLocation()
    const navigateUpdateFormHandler = () => {
        history.push(`${location.pathname}/update`)
    }
    return (
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
            <Button variant="contained" onClick={navigateUpdateFormHandler}>
                Edit
            </Button>
        </Box>
    )
}

export default EditEventButton
