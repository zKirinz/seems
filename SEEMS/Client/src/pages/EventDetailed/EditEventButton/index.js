import { useHistory, useLocation } from 'react-router-dom'

import { Box, Button, Tooltip } from '@mui/material'

const EditEventButton = ({ isEditable }) => {
    const history = useHistory()
    const location = useLocation()
    const navigateUpdateFormHandler = () => {
        history.push(`${location.pathname}/update`)
    }

    return (
        <Box sx={{ position: 'absolute', bottom: 30, right: 220 }}>
            <Tooltip
                title={
                    isEditable
                        ? 'Edit event is available'
                        : 'You can not edit event before event begins 2 hours'
                }
                placement="top"
            >
                <span>
                    <Button
                        variant="contained"
                        onClick={navigateUpdateFormHandler}
                        disabled={!isEditable}
                    >
                        Edit
                    </Button>
                </span>
            </Tooltip>
        </Box>
    )
}

export default EditEventButton
