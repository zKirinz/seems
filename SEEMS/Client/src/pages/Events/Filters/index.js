import SearchField from '../../../components/SearchField'
import { Box } from '@mui/material'

const Filters = ({ submitHandler, defaultText }) => {
    return (
        <Box mr={8} minWidth="360px">
            <SearchField submitHandler={submitHandler} defaultText={defaultText} />
        </Box>
    )
}

export default Filters
