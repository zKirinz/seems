import { Box, Button } from '@mui/material'

const EditEventButton = () => {
    return (
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
            <Button variant="contained">Edit</Button>
        </Box>
    )
}

export default EditEventButton
