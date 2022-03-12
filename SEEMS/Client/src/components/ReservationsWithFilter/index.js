import { Box } from '@mui/material'

import Filters from './Filters'
import ReservationsList from './ReservationsList'

const ReservationsWithFilter = () => {
    return (
        <Box display="flex" mt={5} mb={10}>
            <Filters />
            <ReservationsList />
        </Box>
    )
}

export default ReservationsWithFilter
