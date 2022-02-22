import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'

import SearchField from '../../../components/SearchField'
import { Box } from '@mui/material'

const Filters = () => {
    const history = useHistory()
    const { search: queries } = useLocation()
    const { search } = queryString.parse(queries)

    const searchSubmitHandler = (searchText) => {
        history.push('/events?search=' + searchText)
    }

    return (
        <Box mr={8} minWidth="360px">
            <SearchField submitHandler={searchSubmitHandler} defaultText={search} />
        </Box>
    )
}

export default Filters
