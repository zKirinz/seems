import EventsListWithFilter from '../../../components/EventsListWithFilter'
import pageEnum from '../../../components/EventsListWithFilter/pageEnum'
import { Box, Typography } from '@mui/material'

const Events = () => {
    return (
        <Box component="main" minHeight="65vh" mt={8.5} mx={8} pt={10}>
            <Typography variant="h3" color="primary" align="center" mt={1} fontWeight={700}>
                All Events
            </Typography>
            <EventsListWithFilter page={pageEnum.AdminAllEvents} />
        </Box>
    )
}

export default Events
