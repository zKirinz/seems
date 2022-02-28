import { useRecoilValue } from 'recoil'

import { Box, Typography } from '@mui/material'

import authAtom from '../../recoil/auth'
import EventsList from './EventsList'

// import Filters from './Filters'

const MyEvents = () => {
    const auth = useRecoilValue(authAtom)

    return (
        <Box component="main" minHeight="65vh" mt={8.5} mx={8} pt={10}>
            <Typography variant="h3" color="primary" align="center" mt={1} fontWeight={700}>
                {auth.organization} Events
            </Typography>
            <Box display="flex" mt={5} mb={10}>
                {/* <Filters /> */}
                <EventsList />
            </Box>
        </Box>
    )
}

export default MyEvents
