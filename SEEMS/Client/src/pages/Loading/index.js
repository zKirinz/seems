import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
    return (
        <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress thickness={4} color="secondary" />
        </Box>
    )
}

export default Loading
