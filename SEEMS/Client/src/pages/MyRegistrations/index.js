import EventsListWithFilter from '../../components/EventsListWithFilter'
import pageEnum from '../../components/EventsListWithFilter/pageEnum'
import { Box, Typography } from '@mui/material'

const MyRegistrations = () => {
    return (
        <Box component="main" minHeight="65vh" mt={8.5} mx={8} pt={10}>
            <Typography variant="h3" color="primary" align="center" mt={1} fontWeight={700}>
                My Registrations
            </Typography>
            <EventsListWithFilter page={pageEnum.MyRegistrations} />
        </Box>
    )
}

export default MyRegistrations
