import ReservationsWithFilter from '../../components/ReservationsWithFilter'
import { Box, Typography } from '@mui/material'

const MyRegistrations = () => {
    return (
        <Box component="main" minHeight="65vh" mt={8.5} mx={8} pt={10}>
            <Typography variant="h3" color="primary" align="center" mt={1} fontWeight={700}>
                My Registrations
            </Typography>
            <ReservationsWithFilter />
        </Box>
    )
}

export default MyRegistrations
