import { Box, Button } from '@mui/material'

const UnRegisterButton = ({ eventId }) => {
    return (
        <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
            <Button variant="contained">Unregister</Button>
        </Box>
    )
}

export default UnRegisterButton
