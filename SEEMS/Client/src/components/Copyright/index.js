import { Box, Typography } from '@mui/material'

const Copyright = () => {
    return (
        <Box width="100%" mb={2}>
            <Typography variant="body2" color="primary.light" align="right">
                {'Copyright © '}
                SEEMS {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}

export default Copyright
