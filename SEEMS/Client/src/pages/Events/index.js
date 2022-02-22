import { useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import EventsList from './EventsList'
import Filters from './Filters'

const Events = () => {
    const { search: searchText } = useLocation()
    const { search } = queryString.parse(searchText)
    const [nameFilter, setNameFilter] = useState(search)

    return (
        <Box component="main" sx={{ mt: { sx: 0, sm: 8.5 } }} mx={8} pt={10}>
            <Typography variant="h3" color="primary" align="center" mt={1} fontWeight={700}>
                All Events
            </Typography>
            <Box display="flex" mt={5}>
                <Filters
                    submitHandler={(searchText) => setNameFilter(searchText)}
                    defaultText={nameFilter}
                />
                <EventsList nameFilter={nameFilter} />
            </Box>
        </Box>
    )
}

export default Events
