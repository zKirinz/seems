import { Box } from '@mui/material'

import EventsList from './EventsList'
import Filters from './Filters'

const EventsListWithFilter = ({ page }) => {
    return (
        <Box display="flex" mt={5} mb={10}>
            <Filters page={page} />
            <EventsList page={page} />
        </Box>
    )
}

export default EventsListWithFilter
